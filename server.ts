import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy initialize Gemini client safely
  let aiClient: GoogleGenAI | null = null;
  function getAIClient(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      try {
        aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      } catch (err) {
        console.error("Failed to init GoogleGenAI:", err);
      }
    }
    return aiClient;
  }

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      geminiAvailable: Boolean(process.env.GEMINI_API_KEY),
      app: "Bien Dong Quest",
    });
  });

  // Helper: Normalize Vietnamese text for optimal speech synthesis
  function cleanVietnameseForSpeech(text: string): string {
    if (!text) return "";
    return text
      // Remove emojis
      .replace(
        /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
        ""
      )
      // Remove markdown symbols
      .replace(/[#*_~`]/g, "")
      // Convert standard numbers and units to spoken Vietnamese words
      .replace(/1\.010\.274\s*km²/gi, "hơn một triệu ki-lô-mét vuông")
      .replace(/1010274\s*km²/gi, "hơn một triệu ki-lô-mét vuông")
      .replace(/3\.260\s*km/gi, "ba nghìn hai trăm sáu mươi ki-lô-mét")
      .replace(/3260\s*km/gi, "ba nghìn hai trăm sáu mươi ki-lô-mét")
      .replace(/3,44\s*triệu/gi, "ba phẩy bốn mươi bốn triệu")
      .replace(/(\d+)\s*km²/gi, "$1 ki-lô-mét vuông")
      .replace(/(\d+)\s*km/gi, "$1 ki-lô-mét")
      .replace(/(\d+)\s*°\s*B/gi, "$1 độ Bắc")
      .replace(/(\d+)\s*°\s*Đ/gi, "$1 độ Đông")
      .replace(/(\d+)\s*°/gi, "$1 độ ")
      .replace(/200\s*hải\s*lý/gi, "hai trăm hải lý")
      .replace(/UNCLOS\s*1982/gi, "Công ước Luật biển Liên Hợp Quốc năm 1982")
      .replace(/UNCLOS/gi, "Công ước Luật biển Liên Hợp Quốc An-clốt")
      .replace(/DOC/gi, "Tuyên bố Đi-ô-xi")
      .replace(/DK1/gi, "nhà giàn Đê-Ka một")
      .replace(/TP\.\s*Hồ Chí Minh/gi, "Thành phố Hồ Chí Minh")
      .replace(/TP\./g, "Thành phố ")
      .replace(/QĐ\./g, "Quần đảo ")
      .replace(/•\s*/g, ". ")
      .replace(/-\s+/g, ". ")
      .replace(/\n+/g, ". ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Helper: Split long text into chunks for TTS streaming
  function splitTextForTTS(text: string, maxLen = 180): string[] {
    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    const chunks: string[] = [];
    let current = "";

    for (const s of sentences) {
      const trimmed = s.trim();
      if (!trimmed) continue;
      if ((current + " " + trimmed).trim().length <= maxLen) {
        current = (current + " " + trimmed).trim();
      } else {
        if (current) chunks.push(current);
        if (trimmed.length <= maxLen) {
          current = trimmed;
        } else {
          const words = trimmed.split(" ");
          let sub = "";
          for (const w of words) {
            if ((sub + " " + w).trim().length <= maxLen) {
              sub = (sub + " " + w).trim();
            } else {
              if (sub) chunks.push(sub);
              sub = w;
            }
          }
          current = sub;
        }
      }
    }
    if (current) chunks.push(current);
    return chunks;
  }

  // TTS Audio Streaming API (100% authentic Vietnamese speech)
  app.get("/api/tts", async (req, res) => {
    try {
      const rawText = (req.query.text as string) || "";
      if (!rawText.trim()) {
        return res.status(400).json({ error: "Text parameter is required" });
      }

      const cleaned = cleanVietnameseForSpeech(rawText);
      if (!cleaned) {
        return res.status(400).json({ error: "Empty speech text" });
      }

      const chunks = splitTextForTTS(cleaned, 180);
      const audioBuffers: Buffer[] = [];

      for (const chunk of chunks.slice(0, 10)) {
        if (!chunk.trim()) continue;
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(
          chunk.trim()
        )}`;
        const upstream = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Referer: "https://translate.google.com/",
          },
        });

        if (upstream.ok) {
          const arrayBuf = await upstream.arrayBuffer();
          audioBuffers.push(Buffer.from(arrayBuf));
        }
      }

      if (audioBuffers.length === 0) {
        return res.status(500).json({ error: "Could not generate speech audio" });
      }

      const combinedAudio = Buffer.concat(audioBuffers);
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.send(combinedAudio);
    } catch (err) {
      console.error("TTS endpoint error:", err);
      res.status(500).json({ error: "Lỗi tạo âm thanh tiếng Việt" });
    }
  });

  // Chat API endpoint for "Kiến Sáng" Mascot AI
  app.post("/api/chat", async (req, res) => {
    try {
      const {
        message,
        gradeLevel, // 'tieuhoc' | 'thcs' | 'thpt'
        currentGrade,
        currentPage,
        contextInfo,
        conversationHistory = [],
      } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const client = getAIClient();

      // System instruction for Kiến Sáng FPT Mascot
      const systemInstruction = `Bạn là Kiến Sáng 🐜 - linh vật thông minh, thân thiện và tràn đầy năng lượng của trường FPT, đồng hành cùng học sinh trong ứng dụng học tập "BIỂN ĐÔNG QUEST" (Khám phá Biển Đông – Kết nối Việt Nam – Học tập qua trải nghiệm).

QUY ĐỊNH BẮT BUỘC VỀ NGÔN NGỮ (ƯU TIÊN TUYỆT ĐỐI CAO NHẤT):
1. BẮT BUỘC GIAO TIẾP 100% BẰNG TIẾNG VIỆT:
   - Dù người dùng hỏi bằng bất kỳ ngôn ngữ nào, câu trả lời dạng chữ (văn bản) lẫn giọng đọc âm thanh (Text-to-Speech) của bạn BẮT BUỘC phải hoàn toàn bằng Tiếng Việt chuẩn mực, trong sáng, thân thiện và giàu cảm xúc.
   - Tuyệt đối KHÔNG trả lời bằng tiếng Anh hay các ngôn ngữ khác (ngoại trừ thuật ngữ viết tắt quốc tế cần giải nghĩa tiếng Việt, ví dụ UNCLOS, DOC).
2. THIẾT KẾ CÂU TỪ TỐI ƯU ĐỒNG THỜI CHO CẢ "ĐỌC BẰNG MẮT" VÀ "NGHE BẰNG ÂM THANH":
   - Viết câu văn gãy gọn, mạch lạc, có chấm phẩy tự nhiên để khi hệ thống phát âm thanh tiếng Việt nghe trôi chảy, ấm áp, truyền cảm.
   - Tránh dùng các ký hiệu markdown rối rắm hay emoji liên tiếp làm ngắt quãng giọng đọc.
3. BÁM SÁT KIẾN THỨC ĐỊA LÍ LỚP 11 VÀ CHỦ QUYỀN BIỂN ĐẢO VIỆT NAM:
   - Sách Chuyên đề Địa lí lớp 11 (bộ Kết nối tri thức với cuộc sống), mục II "Hợp tác hoà bình trong khai thác Biển Đông".
   - Diện tích Biển Đông: ~3,44 triệu km², từ 3°B đến 26°B, bao bọc bởi 9 quốc gia. Nối Thái Bình Dương và Ấn Độ Dương qua eo biển Ma-lắc-ca.
   - Vùng biển Việt Nam: diện tích hơn 1.010.274 km², bờ biển dài trên 3.260 km. Khẳng định chủ quyền và toàn vẹn lãnh thổ đối với hai quần đảo thiêng liêng Hoàng Sa (thuộc TP. Đà Nẵng) và Trường Sa (thuộc tỉnh Khánh Hòa), cùng các đảo ven bờ (Phú Quốc, Côn Đảo, Cát Bà, Lý Sơn, Bạch Long Vĩ, Phú Quý, Cồn Cỏ,...).
   - 4 ngành kinh tế biển: Thủy sản, Khoáng sản (dầu mỏ, khí đốt), Du lịch biển, Kinh tế hàng hải (cảng biển & vận tải), cùng năng lượng gió/biển.
   - Hợp tác hòa bình: Hiệp định phân định Vịnh Bắc Bộ năm 2000 (Việt Nam - Trung Quốc), Hiệp định Vịnh Thái Lan 1997, UNCLOS 1982, DOC.
   - Mô hình: Hợp tác hòa bình → Khai thác hợp lí → Phát triển kinh tế → Bảo vệ môi trường → Phát triển bền vững.

Đối tượng người dùng hiện tại:
- Cấp học: ${gradeLevel || "THPT"} (Lớp ${currentGrade || "11"})
- Vị trí trong app: ${currentPage || "Trang chủ"}
- Ngữ cảnh: ${contextInfo || "Học tập chung"}

Phong cách của Kiến Sáng:
- Thân thiện, tích cực, thông minh, dùng biểu tượng 🐜, 🌊, 💡, 🇻🇳 tinh tế.
- Nếu học sinh ở Tiểu học: dùng từ ngữ đơn giản, câu ngắn, cổ vũ nhiều.
- Nếu học sinh ở THCS: giải thích mối quan hệ nguyên nhân - kết quả, ví dụ thực tế.
- Nếu học sinh ở THPT: dùng thuật ngữ Địa lí chuẩn xác, phân tích sâu và liên hệ chuyên đề 11.
- Nếu học sinh đang hỏi trong trò chơi hoặc thử thách: Gợi ý và hướng dẫn suy luận, không đưa ngay đáp án cụt ngủn.`;

      if (client) {
        try {
          const contents = [
            ...conversationHistory.slice(-6).map((msg: { role: string; text: string }) => ({
              role: msg.role === "user" ? "user" : "model",
              parts: [{ text: msg.text }],
            })),
            {
              role: "user",
              parts: [{ text: message }],
            },
          ];

          const response = await client.models.generateContent({
            model: "gemini-3.8-flash",
            contents,
            config: {
              systemInstruction,
              temperature: 0.7,
              maxOutputTokens: 800,
            },
          });

          return res.json({
            reply: response.text || "Kiến Sáng luôn đồng hành cùng bạn khám phá Biển Đông thân yêu!",
            source: "gemini",
          });
        } catch (apiError) {
          console.warn("Gemini API call failed, falling back to local textbook knowledge:", apiError);
        }
      }

      // Fallback knowledge response if no Gemini API key or error
      const fallbackReply = generateKnowledgeFallback(message, gradeLevel, currentPage);
      return res.json({
        reply: fallbackReply,
        source: "local-knowledge",
      });
    } catch (error) {
      console.error("Chat route error:", error);
      res.status(500).json({ error: "Lỗi xử lý tin nhắn tiếng Việt" });
    }
  });

  // Local knowledge-base generator for offline/fast response (100% Vietnamese)
  function generateKnowledgeFallback(message: string, grade: string, page: string): string {
    const q = message.toLowerCase();
    
    if (
      q.includes("biển đông là gì") ||
      q.includes("vị trí") ||
      q.includes("ở đâu") ||
      q.includes("diện tích") ||
      q.includes("rộng") ||
      q.includes("bao nhiêu")
    ) {
      if (grade === "tieuhoc") {
        return "Xin chào bạn nhỏ! 🌊 Biển Đông là vùng biển bao la, xanh biếc nằm ở phía Đông đất nước Việt Nam thân yêu của chúng mình! Biển Đông rộng thứ hai ở châu Á và ôm trọn bờ biển hình chữ S tươi đẹp đấy! 🇻🇳";
      }
      return "Biển Đông là một biển nửa kín thuộc Thái Bình Dương, có diện tích khoảng 3,44 triệu km², trải rộng từ khoảng 3 độ Bắc đến 26 độ Bắc. Biển được bao bọc bởi 9 quốc gia: Việt Nam, Trung Quốc, Cam-pu-chia, Thái Lan, Ma-lai-xi-a, Xin-ga-po, In-đô-nê-xi-a, Bru-nây và Phi-líp-pin. Biển Đông kết nối Thái Bình Dương và Ấn Độ Dương qua eo biển Ma-lắc-ca.";
    }

    if (
      q.includes("việt nam") ||
      q.includes("quan trọng") ||
      q.includes("vai trò") ||
      q.includes("ý nghĩa") ||
      q.includes("hoàng sa") ||
      q.includes("trường sa")
    ) {
      return "Biển Đông có ý nghĩa sinh mạng thiêng liêng đối với Việt Nam 🇻🇳:\n• Bờ biển nước ta dài trên 3.260 km với hơn một triệu ki-lô-mét vuông vùng biển thuộc chủ quyền và quyền tài phán.\n• Có hai quần đảo thiêng liêng Hoàng Sa (TP. Đà Nẵng) và Trường Sa (tỉnh Khánh Hòa).\n• Nguồn lợi hải sản phong phú, trữ lượng dầu khí lớn, tiềm năng cảng biển nước sâu và du lịch biển tuyệt đẹp.\n• Là cửa ngõ giao thương quốc tế và vị trí chiến lược bảo vệ an ninh Tổ quốc!";
    }

    if (q.includes("tài nguyên") || q.includes("dầu khí") || q.includes("hải sản") || q.includes("khoáng sản")) {
      return "Tài nguyên Biển Đông cực kỳ giàu có 💎:\n1. Nguồn lợi hải sản: Hơn hai nghìn loài cá và hàng trăm loài tôm, mực có giá trị kinh tế cao.\n2. Dầu khí và khoáng sản: Trữ lượng lớn ở thềm lục địa như mỏ Bạch Hổ, Lan Tây, Rồng, Đại Hùng, cùng cát thủy tinh và titan.\n3. Giao thông và Cảng biển nước sâu: Cảng Hải Phòng, Đà Nẵng, Cái Mép - Thị Vải, Vân Phong.\n4. Du lịch biển và tiềm năng năng lượng gió ngoài khơi vô cùng rộng mở.";
    }

    if (q.includes("hợp tác") || q.includes("hòa bình") || q.includes("unclos") || q.includes("hiệp định")) {
      return "Hợp tác hòa bình trên Biển Đông theo Chuyên đề 11 🕊️:\n• Hiệp định phân định Vịnh Bắc Bộ và Hiệp định nghề cá năm 2000 giữa Việt Nam và Trung Quốc: Vùng đánh cá chung, bảo tồn nguồn lợi và hợp tác bình đẳng.\n• Hiệp định vùng nước lịch sử Vịnh Thái Lan năm 1997.\n• Tôn trọng luật pháp quốc tế, đặc biệt là UNCLOS 1982 và Tuyên bố DOC.\n• Mô hình phát triển: Hợp tác hòa bình → Khai thác hợp lí → Phát triển kinh tế → Bảo vệ môi trường → Phát triển bền vững!";
    }

    if (q.includes("bản đồ") || page === "map") {
      return "💡 Mẹo khám phá bản đồ Biển Đông của Kiến Sáng:\n• Bạn có thể dùng nút phóng to (+) hoặc thu nhỏ (-) và kéo rê chuột để khám phá toàn cảnh.\n• Bấm vào các mốc đường cơ sở A1 đến A11, 21 điểm phân định Vịnh Bắc Bộ và hai quần đảo Hoàng Sa, Trường Sa để xem dữ liệu chuẩn xác.\n• Bản đồ số GIS hiển thị chính xác tọa độ vĩ độ và kinh độ theo chuẩn WGS84.";
    }

    if (q.includes("chơi") || q.includes("game") || q.includes("không biết")) {
      return "Đừng lo lắng nhé! Kiến Sáng luôn ở bên hỗ trợ bạn 🐜: Hãy đọc kỹ yêu cầu từng màn chơi. Ở trò chơi Định vị, hãy quan sát vị trí địa lý trên bản đồ. Ở trò chơi Nhà quản lí biển, hãy luôn ưu tiên phương án phát triển bền vững và bảo vệ môi trường biển nhé!";
    }

    return `Kiến Sáng đã nhận được câu hỏi của bạn! 🐜\nĐể học tập tốt Chuyên đề Biển Đông, bạn hãy ghi nhớ năm trụ cột cốt lõi: Vị trí địa lí chiến lược (3,44 triệu km²), Tài nguyên biển phong phú, Hợp tác hòa bình quốc tế (UNCLOS 1982), Phát triển kinh tế gắn với bảo vệ môi trường, và Chủ quyền biển đảo thiêng liêng của Việt Nam 🇻🇳.\nBạn muốn Kiến Sáng giải thích cụ thể phần kiến thức nào tiếp theo?`;
  }

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Biển Đông Quest running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
