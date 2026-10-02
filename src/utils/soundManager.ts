// Hệ thống Âm thanh Tương tác & Âm thanh Nền Đại Dương cho "KHÁM PHÁ BIỂN ĐÔNG"
// Hoạt động 100% bằng Web Audio API: Không cần tải file ngoài, không lo lỗi mạng, mượt mà và nhẹ nhàng.

export type BgmMode = 'ocean_waves' | 'peaceful_melody' | 'ocean_harmony';

class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmGainNode: GainNode | null = null;
  private sfxGainNode: GainNode | null = null;

  // Background audio nodes
  private isBgmPlaying: boolean = false;
  private bgmMode: BgmMode = 'ocean_harmony';
  private waveGain: GainNode | null = null;
  private waveFilter: BiquadFilterNode | null = null;
  private waveLfo: OscillatorNode | null = null;
  private waveLfoGain: GainNode | null = null;
  private waveSource: AudioBufferSourceNode | null = null;
  private melodyInterval: any = null;

  // Settings
  public isBgmMuted: boolean = false;
  public isSfxMuted: boolean = false;
  public bgmVolume: number = 0.25;
  public sfxVolume: number = 0.35;

  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedBgm = localStorage.getItem('kpd_bgm_muted');
        const savedSfx = localStorage.getItem('kpd_sfx_muted');
        const savedVol = localStorage.getItem('kpd_bgm_volume');
        const savedMode = localStorage.getItem('kpd_bgm_mode') as BgmMode | null;

        if (savedBgm !== null) this.isBgmMuted = savedBgm === 'true';
        if (savedSfx !== null) this.isSfxMuted = savedSfx === 'true';
        if (savedVol !== null) this.bgmVolume = parseFloat(savedVol) || 0.25;
        if (savedMode) this.bgmMode = savedMode;
      } catch {}
    }
  }

  // Khởi tạo AudioContext khi có tương tác đầu tiên của người dùng
  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.ctx && !this.bgmGainNode) {
      this.bgmGainNode = this.ctx.createGain();
      this.bgmGainNode.gain.setValueAtTime(this.isBgmMuted ? 0 : this.bgmVolume, this.ctx.currentTime);
      this.bgmGainNode.connect(this.ctx.destination);
    }

    if (this.ctx && !this.sfxGainNode) {
      this.sfxGainNode = this.ctx.createGain();
      this.sfxGainNode.gain.setValueAtTime(this.isSfxMuted ? 0 : this.sfxVolume, this.ctx.currentTime);
      this.sfxGainNode.connect(this.ctx.destination);
    }

    return this.ctx;
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getStatus() {
    return {
      isPlaying: this.isBgmPlaying,
      isBgmMuted: this.isBgmMuted,
      isSfxMuted: this.isSfxMuted,
      bgmVolume: this.bgmVolume,
      sfxVolume: this.sfxVolume,
      bgmMode: this.bgmMode,
    };
  }

  // ==========================================
  // BẬT / TẮT ÂM THANH NỀN (BGM AMBIENCE)
  // ==========================================
  public toggleBgm() {
    if (this.isBgmPlaying) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    this.notify();
  }

  public startBgm() {
    const ctx = this.initContext();
    if (!ctx) return;

    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    if (this.bgmGainNode) {
      this.bgmGainNode.gain.setValueAtTime(
        this.isBgmMuted ? 0 : this.bgmVolume,
        ctx.currentTime
      );
    }

    if (this.bgmMode === 'ocean_waves' || this.bgmMode === 'ocean_harmony') {
      this.startOceanWaves(ctx);
    }

    if (this.bgmMode === 'peaceful_melody' || this.bgmMode === 'ocean_harmony') {
      this.startPeacefulMelody(ctx);
    }

    this.notify();
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    this.stopOceanWaves();
    this.stopPeacefulMelody();
    this.notify();
  }

  public setBgmMode(mode: BgmMode) {
    this.bgmMode = mode;
    try {
      localStorage.setItem('kpd_bgm_mode', mode);
    } catch {}

    if (this.isBgmPlaying) {
      this.stopBgm();
      this.startBgm();
    } else {
      this.notify();
    }
  }

  public setBgmMuted(muted: boolean) {
    this.isBgmMuted = muted;
    try {
      localStorage.setItem('kpd_bgm_muted', String(muted));
    } catch {}

    if (this.ctx && this.bgmGainNode) {
      const now = this.ctx.currentTime;
      this.bgmGainNode.gain.cancelScheduledValues(now);
      this.bgmGainNode.gain.linearRampToValueAtTime(
        muted ? 0 : this.bgmVolume,
        now + 0.1
      );
    }
    this.notify();
  }

  public setSfxMuted(muted: boolean) {
    this.isSfxMuted = muted;
    try {
      localStorage.setItem('kpd_sfx_muted', String(muted));
    } catch {}

    if (this.ctx && this.sfxGainNode) {
      const now = this.ctx.currentTime;
      this.sfxGainNode.gain.setValueAtTime(muted ? 0 : this.sfxVolume, now);
    }
    this.notify();
  }

  public setBgmVolume(val: number) {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    try {
      localStorage.setItem('kpd_bgm_volume', String(this.bgmVolume));
    } catch {}

    if (this.ctx && this.bgmGainNode && !this.isBgmMuted) {
      const now = this.ctx.currentTime;
      this.bgmGainNode.gain.cancelScheduledValues(now);
      this.bgmGainNode.gain.linearRampToValueAtTime(this.bgmVolume, now + 0.05);
    }
    this.notify();
  }

  // ==========================================
  // BỘ TỔNG HỢP SÓNG BIỂN ÊM DỊU (OCEAN WAVES SYNTH)
  // Tạo sóng vỗ rì rào tuần hoàn bằng Pink Noise + LFO Filter
  // ==========================================
  private startOceanWaves(ctx: AudioContext) {
    this.stopOceanWaves();

    // Tạo buffer Pink Noise tự nhiên (5 giây vòng lặp vô tận)
    const bufferSize = ctx.sampleRate * 5;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Filter lọc tần số sóng biển (Lowpass 200Hz - 900Hz)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    filter.Q.value = 1.8;

    // LFO mô phỏng chu kỳ sóng biển dâng lên rồi rút xuống (chu kỳ 0.14 Hz ~ 7 giây/nhịp)
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.14;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 320; // Dao động tần số +/- 320Hz

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    // Gain riêng cho sóng biển
    const waveGain = ctx.createGain();
    waveGain.gain.value = 0.65;

    noiseSource.connect(filter);
    filter.connect(waveGain);

    if (this.bgmGainNode) {
      waveGain.connect(this.bgmGainNode);
    } else {
      waveGain.connect(ctx.destination);
    }

    noiseSource.start();
    lfo.start();

    this.waveSource = noiseSource;
    this.waveFilter = filter;
    this.waveLfo = lfo;
    this.waveLfoGain = lfoGain;
    this.waveGain = waveGain;
  }

  private stopOceanWaves() {
    try {
      if (this.waveSource) {
        this.waveSource.stop();
        this.waveSource.disconnect();
        this.waveSource = null;
      }
      if (this.waveLfo) {
        this.waveLfo.stop();
        this.waveLfo.disconnect();
        this.waveLfo = null;
      }
    } catch {}
  }

  // ==========================================
  // GIAI ĐIỆU BIỂN XANH DU DƯƠNG (PEACEFUL MELODIC CHIMES)
  // Các hợp âm Pentatonic êm ái, mang lại sự thư thái và tập trung khi học
  // ==========================================
  private startPeacefulMelody(ctx: AudioContext) {
    this.stopPeacefulMelody();

    // Thang âm ngũ cung F Lydian / C Major êm đềm
    const chordPenta = [
      [261.63, 329.63, 392.0, 523.25], // C - E - G - C
      [293.66, 349.23, 440.0, 587.33], // D - F - A - D
      [329.63, 392.0, 493.88, 659.25], // E - G - B - E
      [349.23, 440.0, 523.25, 698.46], // F - A - C - F
      [392.0, 493.88, 587.33, 783.99], // G - B - D - G
    ];

    let chordStep = 0;

    const playChord = () => {
      if (!this.isBgmPlaying || !this.ctx) return;
      const currentChord = chordPenta[chordStep % chordPenta.length];
      chordStep++;

      const now = this.ctx.currentTime;
      currentChord.forEach((freq, noteIdx) => {
        const osc = this.ctx!.createOscillator();
        const noteGain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + noteIdx * 0.15);

        noteGain.gain.setValueAtTime(0, now + noteIdx * 0.15);
        noteGain.gain.linearRampToValueAtTime(0.06, now + noteIdx * 0.15 + 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + noteIdx * 0.15 + 2.8);

        osc.connect(noteGain);
        if (this.bgmGainNode) {
          noteGain.connect(this.bgmGainNode);
        } else {
          noteGain.connect(this.ctx!.destination);
        }

        osc.start(now + noteIdx * 0.15);
        osc.stop(now + noteIdx * 0.15 + 3.0);
      });
    };

    // Chơi ngay nốt đầu tiên rồi lặp lại mỗi 4.5 giây
    playChord();
    this.melodyInterval = setInterval(playChord, 4500);
  }

  private stopPeacefulMelody() {
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
  }

  // ==========================================
  // ÂM THANH TƯƠNG TÁC GIAO DIỆN (UI SFX)
  // Phản hồi trực quan, tinh tế và dễ chịu
  // ==========================================

  // 1. Âm thanh Click nút bấm nhẹ nhàng (Haptic Soft Water Tap)
  public playButtonClick() {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Âm click gỗ/nước tinh tế (600Hz -> 200Hz cực nhanh trong 40ms)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.04);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(gain);
    if (this.sfxGainNode) {
      gain.connect(this.sfxGainNode);
    } else {
      gain.connect(ctx.destination);
    }

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // 2. Âm thanh chuyển Tab / Mục chuyên đề (Marimba Soft Chime)
  public playTabSwitch() {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.08); // G5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    if (this.sfxGainNode) {
      gain.connect(this.sfxGainNode);
    } else {
      gain.connect(ctx.destination);
    }

    osc.start(now);
    osc.stop(now + 0.13);
  }

  // 3. Âm thanh bong bóng Pop (Bubble Pop khi chọn thẻ/mặt hàng)
  public playPop() {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.06);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    if (this.sfxGainNode) {
      gain.connect(this.sfxGainNode);
    } else {
      gain.connect(ctx.destination);
    }

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // 4. Âm thanh nhận Xu thưởng (Coin Chime Keng)
  public playCoinReward() {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [987.77, 1318.51]; // B5 -> E6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.22, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

      osc.connect(gain);
      if (this.sfxGainNode) {
        gain.connect(this.sfxGainNode);
      } else {
        gain.connect(ctx.destination);
      }

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  // 5. Âm thanh Hoàn thành xuất sắc / Chúc mừng (Achievement Fanfare Chime)
  public playSuccessChime() {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      if (this.sfxGainNode) {
        gain.connect(this.sfxGainNode);
      } else {
        gain.connect(ctx.destination);
      }

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  // 6. Âm thanh Pháo Hoa & Chúc Mừng Hoành Tráng (Fireworks Explosions + Celebratory Fanfare)
  public playFireworksCelebration() {
    if (this.isSfxMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const dest = this.sfxGainNode || ctx.destination;

    // A. Tiếng rít pháo hoa phóng lên bầu trời (Whistle / Rocket Rise)
    const whistleOsc = ctx.createOscillator();
    const whistleGain = ctx.createGain();
    whistleOsc.type = 'sawtooth';
    whistleOsc.frequency.setValueAtTime(450, now);
    whistleOsc.frequency.exponentialRampToValueAtTime(1600, now + 0.35);

    whistleGain.gain.setValueAtTime(0.01, now);
    whistleGain.gain.linearRampToValueAtTime(0.12, now + 0.2);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    whistleOsc.connect(whistleGain);
    whistleGain.connect(dest);
    whistleOsc.start(now);
    whistleOsc.stop(now + 0.4);

    // B. Chuỗi tiếng nổ đùng pháo hoa (Fireworks Booms)
    const boomTimes = [0.35, 0.72, 1.12, 1.52];
    boomTimes.forEach((delay, idx) => {
      const boomTime = now + delay;

      // 1. Âm trầm nổ bùm (Low frequency impact boom)
      const boomOsc = ctx.createOscillator();
      const boomGain = ctx.createGain();
      boomOsc.type = 'sine';
      boomOsc.frequency.setValueAtTime(140 - idx * 15, boomTime);
      boomOsc.frequency.exponentialRampToValueAtTime(35, boomTime + 0.4);

      boomGain.gain.setValueAtTime(0.24, boomTime);
      boomGain.gain.exponentialRampToValueAtTime(0.001, boomTime + 0.42);

      boomOsc.connect(boomGain);
      boomGain.connect(dest);
      boomOsc.start(boomTime);
      boomOsc.stop(boomTime + 0.45);

      // 2. Tiếng lách tách nổ rực rỡ (Crackle / Noise burst)
      try {
        const bufferSize = Math.floor(ctx.sampleRate * 0.22);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1100 + Math.random() * 700, boomTime);
        filter.Q.setValueAtTime(2.5, boomTime);

        const crackleGain = ctx.createGain();
        crackleGain.gain.setValueAtTime(0.12, boomTime);
        crackleGain.gain.exponentialRampToValueAtTime(0.001, boomTime + 0.22);

        whiteNoise.connect(filter);
        filter.connect(crackleGain);
        crackleGain.connect(dest);

        whiteNoise.start(boomTime);
        whiteNoise.stop(boomTime + 0.24);
      } catch {}
    });

    // C. Giai điệu Khúc Ca Chiến Thắng / Vinh Danh (Triumphant Celebration Fanfare)
    // C major 9th ascending fanfare: C5, E5, G5, B5, C6, E6
    const fanfareNotes = [
      { freq: 523.25, start: 0.38, dur: 0.22 }, // C5
      { freq: 659.25, start: 0.52, dur: 0.22 }, // E5
      { freq: 783.99, start: 0.66, dur: 0.25 }, // G5
      { freq: 987.77, start: 0.82, dur: 0.28 }, // B5
      { freq: 1046.5, start: 1.0, dur: 0.55 },  // C6
      { freq: 1318.51, start: 1.25, dur: 0.85 }, // E6 (Đỉnh cao ngân vang)
    ];

    fanfareNotes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + note.start;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.dur);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(startTime);
      osc.stop(startTime + note.dur + 0.05);
    });

    // D. Chùm chuông lấp lánh (Sparkle Chimes)
    const sparkles = [1567.98, 1760.0, 2093.0, 2637.02];
    sparkles.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + 1.45 + idx * 0.12;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(dest);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }
}

export const soundManager = new SoundManager();
