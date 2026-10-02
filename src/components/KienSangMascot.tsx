import React from 'react';
import { MascotState } from '../types';

interface KienSangMascotProps {
  state?: MascotState;
  className?: string;
  size?: number;
  showCaption?: boolean;
  animated?: boolean;
  costumeId?: string;
}

export const KienSangMascot: React.FC<KienSangMascotProps> = ({
  state = 'normal',
  className = '',
  size = 140,
  showCaption = false,
  animated = true,
  costumeId,
}) => {
  // Caption text based on state
  const captions: Record<MascotState, string> = {
    normal: 'Kiến thân thiện',
    explaining: 'Kiến Sáng giải thích',
    thinking: 'Kiến Sáng đang suy nghĩ...',
    celebrating: 'Hoan hô! Xuất sắc lắm!',
    suggesting: 'Gợi ý từ Kiến Sáng',
  };

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div
        style={{ width: size, height: size }}
        className={`relative flex items-center justify-center ${
          animated ? 'transition-transform duration-300 hover:scale-105' : ''
        }`}
      >
        <svg
          viewBox="0 0 200 240"
          width={size}
          height={(size * 240) / 200}
          className="w-full h-full drop-shadow-md overflow-visible"
        >
          {/* FPT Small Badge at top left */}
          <g transform="translate(10, 8)">
            <rect x="0" y="0" width="34" height="15" rx="3" fill="#ffffff" />
            <text x="3" y="11" fontSize="9" fontWeight="800" fill="#f26f21">
              FPT
            </text>
            <circle cx="28" cy="7" r="3" fill="#10b981" />
          </g>

          {/* Sparkles / Effects based on state */}
          {state === 'celebrating' && (
            <g className="animate-pulse">
              <path d="M25,35 L30,42 L25,49 L20,42 Z" fill="#fbbf24" />
              <path d="M175,35 L180,42 L175,49 L170,42 Z" fill="#fbbf24" />
              <circle cx="35" cy="70" r="4" fill="#38bdf8" />
              <circle cx="165" cy="70" r="4" fill="#f43f5e" />
            </g>
          )}

          {state === 'explaining' && (
            <g transform="translate(145, 10)" className="animate-bounce">
              <circle cx="15" cy="15" r="14" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
              <path d="M12,18 L18,18 L16,23 L14,23 Z" fill="#ca8a04" />
              <circle cx="15" cy="13" r="5" fill="#ca8a04" />
              <line x1="15" y1="2" x2="15" y2="0" stroke="#ca8a04" strokeWidth="2" />
              <line x1="24" y1="6" x2="26" y2="4" stroke="#ca8a04" strokeWidth="2" />
              <line x1="6" y1="6" x2="4" y2="4" stroke="#ca8a04" strokeWidth="2" />
            </g>
          )}

          {state === 'thinking' && (
            <g transform="translate(148, 20)">
              <circle cx="6" cy="22" r="3" fill="#cbd5e1" />
              <circle cx="14" cy="14" r="5" fill="#94a3b8" />
              <circle cx="26" cy="4" r="8" fill="#64748b" />
              <text x="22" y="8" fontSize="11" fontWeight="bold" fill="#ffffff">
                ?
              </text>
            </g>
          )}

          {/* Backpack (Green & Blue shell) */}
          <ellipse cx="78" cy="142" rx="22" ry="26" fill="#15803d" />
          <ellipse cx="80" cy="142" rx="16" ry="20" fill="#0284c7" />

          {/* Antennas */}
          {/* Left Antenna */}
          <path
            d="M85,55 C78,38 72,28 68,22"
            fill="none"
            stroke="#1e293b"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <rect x="62" y="16" width="14" height="9" rx="3" fill="#0284c7" stroke="#1e293b" strokeWidth="2" />

          {/* Right Antenna (angled) */}
          <path
            d="M125,55 C132,38 138,28 142,22"
            fill="none"
            stroke="#1e293b"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <rect x="136" y="16" width="14" height="9" rx="3" fill="#0284c7" stroke="#1e293b" strokeWidth="2" />

          {/* Ant Head (Bright Orange Robot Head) */}
          <ellipse cx="106" cy="82" rx="46" ry="42" fill="#f26f21" stroke="#1e293b" strokeWidth="4" />
          {/* Head shine */}
          <path
            d="M78,60 C85,52 98,48 114,48"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Robot Ear Pieces */}
          <rect x="56" y="74" width="8" height="16" rx="3" fill="#ea580c" stroke="#1e293b" strokeWidth="3" />
          <rect x="148" y="74" width="8" height="16" rx="3" fill="#ea580c" stroke="#1e293b" strokeWidth="3" />

          {/* Eyes based on state */}
          {state === 'normal' || state === 'explaining' || state === 'celebrating' ? (
            <>
              {/* Left Eye: Winking / playful or open */}
              {state === 'normal' ? (
                // Winking Left Eye as in original image
                <path
                  d="M82,78 Q93,70 102,78"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              ) : (
                // Wide open left eye
                <g>
                  <ellipse cx="90" cy="74" rx="10" ry="12" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
                  <circle cx="91" cy="73" r="6" fill="#1e293b" />
                  <circle cx="93" cy="70" r="2.5" fill="#ffffff" />
                </g>
              )}

              {/* Right Eye: Big friendly anime eye with reflection */}
              <ellipse cx="122" cy="73" rx="12" ry="14" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
              <circle cx="122" cy="72" r="8" fill="#1e293b" />
              <circle cx="125" cy="69" r="3.5" fill="#ffffff" />
              <circle cx="119" cy="75" r="1.5" fill="#ffffff" />
            </>
          ) : state === 'thinking' ? (
            <>
              {/* Thinking eyes looking up */}
              <ellipse cx="88" cy="73" rx="10" ry="12" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
              <circle cx="89" cy="68" r="6" fill="#1e293b" />
              <ellipse cx="122" cy="73" rx="11" ry="13" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
              <circle cx="123" cy="68" r="7" fill="#1e293b" />
            </>
          ) : (
            <>
              {/* Suggesting / Alert eyes */}
              <ellipse cx="88" cy="73" rx="11" ry="13" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
              <circle cx="88" cy="73" r="7" fill="#1e293b" />
              <ellipse cx="124" cy="73" rx="11" ry="13" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
              <circle cx="124" cy="73" r="7" fill="#1e293b" />
            </>
          )}

          {/* Cute Smile / Mouth */}
          <path
            d="M93,92 Q106,108 123,92 Z"
            fill="#b91c1c"
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Tongue */}
          <path d="M99,99 Q108,106 117,99" fill="#f43f5e" />

          {/* Rosy Cheeks */}
          <ellipse cx="78" cy="88" rx="6" ry="3.5" fill="#fb7185" opacity="0.6" />
          <ellipse cx="134" cy="88" rx="6" ry="3.5" fill="#fb7185" opacity="0.6" />

          {/* Torso / Robot Armor (White Chest with Orange Armor Panels) */}
          <path
            d="M84,124 Q106,120 128,124 L132,158 Q106,165 80,158 Z"
            fill="#ffffff"
            stroke="#1e293b"
            strokeWidth="4"
          />
          {/* Center chest details */}
          <path d="M96,126 L116,126 L112,142 L100,142 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M90,154 Q106,160 122,154" stroke="#f26f21" strokeWidth="3" fill="none" />

          {/* Legs */}
          {/* Left Leg */}
          <path
            d="M82,158 C72,170 65,190 74,212 C82,216 100,216 102,208 C98,188 94,170 94,158 Z"
            fill="#ea580c"
            stroke="#1e293b"
            strokeWidth="3.5"
          />
          {/* Left Foot Shoe */}
          <ellipse cx="88" cy="214" rx="14" ry="6" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />

          {/* Right Leg */}
          <path
            d="M118,158 C122,172 120,188 126,206 C134,215 148,214 152,206 C144,188 138,172 130,158 Z"
            fill="#ea580c"
            stroke="#1e293b"
            strokeWidth="3.5"
          />
          {/* Right Foot Shoe */}
          <ellipse cx="138" cy="210" rx="14" ry="6" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />

          {/* Arms and Hands */}
          {/* Right Arm: Peace sign or finger heart */}
          <g>
            <path
              d="M128,130 Q148,136 156,152"
              fill="none"
              stroke="#ea580c"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* White Glove Right Hand: Peace sign */}
            <circle cx="158" cy="154" r="10" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            <path d="M155,145 L155,136" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M162,146 L166,138" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* Left Arm: Finger Heart (from original Kiến Sáng mascot) */}
          <g>
            <path
              d="M84,130 Q62,132 66,150"
              fill="none"
              stroke="#ea580c"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* White Glove Left Hand: Finger heart gesture */}
            <circle cx="68" cy="150" r="11" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
            <path d="M64,142 Q68,138 72,143" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Tiny pink heart above fingers */}
            <path
              d="M72,134 C72,130 68,128 66,131 C64,128 60,130 60,134 C60,138 66,142 66,142 C66,142 72,138 72,134 Z"
              fill="#f43f5e"
            />
          </g>

          {/* ======================================================== */}
          {/* CUSTOMIZABLE COSTUME ACCESSORIES OVERLAY                 */}
          {/* ======================================================== */}
          {costumeId === 'captain' && (
            /* Navy Captain Cap */
            <g id="costume-captain">
              {/* Cap visor */}
              <path
                d="M72,56 Q106,66 140,56 L136,62 Q106,72 76,62 Z"
                fill="#0f172a"
                stroke="#1e293b"
                strokeWidth="1.5"
              />
              {/* White Cap Crown */}
              <path
                d="M74,54 C70,34 90,26 106,26 C122,26 142,34 138,54 Z"
                fill="#ffffff"
                stroke="#0f172a"
                strokeWidth="3"
              />
              {/* Golden Naval Band */}
              <path
                d="M74,53 Q106,60 138,53"
                stroke="#eab308"
                strokeWidth="5"
                fill="none"
              />
              {/* Golden Anchor Emblem */}
              <circle cx="106" cy="42" r="7" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
              <path d="M106,37 L106,47 M102,44 Q106,49 110,44" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>
          )}

          {costumeId === 'diver' && (
            /* Diving Goggles & Yellow Snorkel */
            <g id="costume-diver">
              {/* Goggles Glass & Frame */}
              <rect
                x="70"
                y="63"
                width="72"
                height="26"
                rx="11"
                fill="#38bdf8"
                fillOpacity="0.45"
                stroke="#f59e0b"
                strokeWidth="4"
              />
              <path d="M72,67 Q88,65 104,74" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.8" strokeLinecap="round" />
              {/* Strap around head */}
              <path d="M70,76 L56,76 M142,76 L156,76" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
              {/* Snorkel tube */}
              <path
                d="M142,75 Q158,80 158,102 L158,126 Q158,134 150,134"
                fill="none"
                stroke="#facc15"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="150" cy="134" r="4" fill="#ea580c" />
            </g>
          )}

          {costumeId === 'lifevest' && (
            /* Safety Life Vest */
            <g id="costume-lifevest">
              <path
                d="M76,122 L136,122 L138,162 L74,162 Z"
                rx="5"
                fill="#f97316"
                stroke="#c2410c"
                strokeWidth="3"
              />
              {/* Silver Reflective Safety Stripes */}
              <rect x="88" y="124" width="7" height="36" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
              <rect x="117" y="124" width="7" height="36" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
              {/* Black clip buckles */}
              <rect x="102" y="132" width="8" height="4" rx="1" fill="#0f172a" />
              <rect x="102" y="146" width="8" height="4" rx="1" fill="#0f172a" />
            </g>
          )}

          {costumeId === 'graduate' && (
            /* FPT Graduation Mortarboard */
            <g id="costume-graduate">
              {/* Mortarboard Skullcap */}
              <path d="M84,46 L128,46 L124,58 L88,58 Z" fill="#1e1b4b" stroke="#0f172a" strokeWidth="2" />
              {/* Diamond Cap Flat Top */}
              <path
                d="M106,20 L152,36 L106,50 L60,36 Z"
                fill="#1e1b4b"
                stroke="#312e81"
                strokeWidth="2.5"
              />
              {/* Cap button */}
              <circle cx="106" cy="35" r="3" fill="#f97316" />
              {/* Orange FPT Tassel */}
              <path
                d="M106,35 L76,42 L72,66"
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <rect x="68" y="66" width="8" height="10" rx="2" fill="#f97316" />
            </g>
          )}

          {costumeId === 'sunglasses' && (
            /* Cool Sailor Sunglasses */
            <g id="costume-sunglasses">
              {/* Left Lens */}
              <rect x="74" y="65" width="28" height="20" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="2.5" />
              {/* Right Lens */}
              <rect x="110" y="65" width="28" height="20" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="2.5" />
              {/* Bridge */}
              <line x1="102" y1="72" x2="110" y2="72" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
              {/* Sunglasses Glint */}
              <path d="M78,69 L86,69 L79,79 L75,79 Z" fill="#ffffff" opacity="0.4" />
              <path d="M114,69 L122,69 L115,79 L111,79 Z" fill="#ffffff" opacity="0.4" />
            </g>
          )}

          {costumeId === 'crown' && (
            /* Ocean King Crown */
            <g id="costume-crown">
              <path
                d="M74,54 L80,28 L94,42 L106,20 L118,42 L132,28 L138,54 Z"
                fill="#fbbf24"
                stroke="#d97706"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Ruby & Pearls */}
              <circle cx="106" cy="38" r="5" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
              <circle cx="80" cy="27" r="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              <circle cx="106" cy="19" r="3.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              <circle cx="132" cy="27" r="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            </g>
          )}

          {costumeId === 'scarf' && (
            /* Traditional Red/Checkered Scarf */
            <g id="costume-scarf">
              <path
                d="M74,116 Q106,134 138,116 Q106,142 74,116 Z"
                fill="#ef4444"
                stroke="#b91c1c"
                strokeWidth="2"
              />
              <path
                d="M102,126 L94,152 L106,148 L114,126 Z"
                fill="#dc2626"
                stroke="#991b1b"
                strokeWidth="1.5"
              />
            </g>
          )}

          {costumeId === 'explorer' && (
            /* Safari Explorer Hat */
            <g id="costume-explorer">
              {/* Wide Brim */}
              <ellipse cx="106" cy="56" rx="44" ry="10" fill="#a16207" stroke="#78350f" strokeWidth="2.5" />
              {/* Hat Crown */}
              <path
                d="M80,52 C82,32 92,26 106,26 C120,26 130,32 132,52 Z"
                fill="#ca8a04"
                stroke="#78350f"
                strokeWidth="2.5"
              />
              {/* Olive Green Band */}
              <path d="M80,49 Q106,55 132,49" stroke="#65a30d" strokeWidth="4" fill="none" />
            </g>
          )}

          {costumeId === 'non_la' && (
            /* Traditional Vietnamese Conical Hat (Nón Lá) */
            <g id="costume-non-la">
              {/* Conical body */}
              <polygon
                points="106,12 50,58 162,58"
                fill="#fde68a"
                stroke="#b45309"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Bamboo weave rings */}
              <path d="M64,48 Q106,52 148,48" stroke="#d97706" strokeWidth="1.5" fill="none" />
              <path d="M78,38 Q106,41 134,38" stroke="#d97706" strokeWidth="1.5" fill="none" />
              <path d="M92,26 Q106,28 120,26" stroke="#d97706" strokeWidth="1.5" fill="none" />
              {/* Red Ribbon with yellow star emblem */}
              <path d="M68,56 Q106,78 144,56" stroke="#dc2626" strokeWidth="3" fill="none" />
              <circle cx="106" cy="67" r="4.5" fill="#dc2626" />
              <polygon points="106,64 107.2,66.8 110,66.8 107.8,68.2 108.5,71 106,69.2 103.5,71 104.2,68.2 102,66.8 104.8,66.8" fill="#facc15" />
            </g>
          )}

          {costumeId === 'navy_suit' && (
            /* Vietnam Navy Officer Uniform */
            <g id="costume-navy-suit">
              {/* White Naval Tunic */}
              <path
                d="M74,120 L138,120 L142,168 L70,168 Z"
                fill="#ffffff"
                stroke="#0f172a"
                strokeWidth="2.5"
              />
              {/* Navy blue sailor collar / lapel */}
              <polygon points="106,146 82,120 130,120" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
              <polygon points="106,142 90,120 122,120" fill="#ffffff" />
              {/* Golden tie clip & anchor */}
              <circle cx="106" cy="144" r="3" fill="#eab308" />
              {/* Golden shoulder epaulettes */}
              <rect x="68" y="118" width="16" height="6" rx="2" fill="#eab308" stroke="#78350f" strokeWidth="1" />
              <rect x="128" y="118" width="16" height="6" rx="2" fill="#eab308" stroke="#78350f" strokeWidth="1" />
              {/* Gold buttons */}
              <circle cx="106" cy="154" r="2.5" fill="#eab308" />
              <circle cx="106" cy="162" r="2.5" fill="#eab308" />
            </g>
          )}

          {costumeId === 'lab_coat' && (
            /* Marine Biologist Lab Coat */
            <g id="costume-lab-coat">
              <path
                d="M72,120 L140,120 L144,170 L68,170 Z"
                fill="#f8fafc"
                stroke="#475569"
                strokeWidth="2.5"
              />
              {/* Blue scientist shirt underneath */}
              <polygon points="106,144 86,120 126,120" fill="#0284c7" />
              {/* Pen in pocket */}
              <rect x="80" y="136" width="12" height="12" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
              <line x1="84" y1="132" x2="84" y2="138" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
              {/* Marine icon badge */}
              <circle cx="124" cy="142" r="6" fill="#059669" />
              <circle cx="124" cy="142" r="3" fill="#34d399" />
            </g>
          )}

          {costumeId === 'gis_visor' && (
            /* Futuristic Cyber AR GIS Visor */
            <g id="costume-gis-visor">
              {/* Holographic glowing visor band */}
              <path
                d="M66,66 Q106,60 146,66 L144,82 Q106,78 68,82 Z"
                fill="#06b6d4"
                fillOpacity="0.75"
                stroke="#22d3ee"
                strokeWidth="2.5"
              />
              {/* Glowing digital grid lines */}
              <line x1="72" y1="74" x2="140" y2="74" stroke="#ffffff" strokeWidth="1" strokeDasharray="3,2" opacity="0.9" />
              <circle cx="86" cy="74" r="2" fill="#facc15" />
              <circle cx="126" cy="74" r="2" fill="#4ade80" />
              {/* Visor side nodes */}
              <circle cx="66" cy="74" r="4.5" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
              <circle cx="146" cy="74" r="4.5" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            </g>
          )}

          {costumeId === 'compass' && (
            /* Golden Marine Navigation Compass */
            <g id="costume-compass" transform="translate(130, 130)">
              {/* Golden Ring */}
              <circle cx="14" cy="14" r="15" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
              <circle cx="14" cy="14" r="11" fill="#0f172a" />
              {/* Needle (Red North, Blue South) */}
              <polygon points="14,6 17,14 14,12 11,14" fill="#ef4444" />
              <polygon points="14,22 17,14 14,16 11,14" fill="#38bdf8" />
              <circle cx="14" cy="14" r="2" fill="#ffffff" />
              {/* Chain to ant body */}
              <path d="M14,0 Q5,-15 -20,-10" stroke="#ca8a04" strokeWidth="2" fill="none" strokeDasharray="2,2" />
            </g>
          )}

          {costumeId === 'oxygen_tank' && (
            /* Twin Titanium Deep-Sea Oxygen Tanks */
            <g id="costume-oxygen-tank">
              {/* Left tank */}
              <rect x="52" y="112" width="16" height="48" rx="8" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
              <rect x="55" y="106" width="10" height="7" rx="2" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
              {/* Right tank */}
              <rect x="144" y="112" width="16" height="48" rx="8" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
              <rect x="147" y="106" width="10" height="7" rx="2" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
              {/* Pressure gauge */}
              <circle cx="152" cy="120" r="5" fill="#f8fafc" stroke="#334155" strokeWidth="1.5" />
              <line x1="152" y1="120" x2="154" y2="118" stroke="#ef4444" strokeWidth="1.5" />
              {/* Breathing hose to mouthpiece */}
              <path d="M60,108 Q50,90 76,88" stroke="#334155" strokeWidth="3" fill="none" />
            </g>
          )}

          {costumeId === 'laurel' && (
            /* Golden Laurel Wreath of Wisdom */
            <g id="costume-laurel">
              {/* Left branch leaves */}
              <path d="M72,58 C68,46 76,34 94,30" stroke="#eab308" strokeWidth="3" fill="none" />
              <ellipse cx="68" cy="52" rx="5" ry="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1" transform="rotate(-30 68 52)" />
              <ellipse cx="72" cy="42" rx="5" ry="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1" transform="rotate(-20 72 42)" />
              <ellipse cx="82" cy="34" rx="5" ry="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1" transform="rotate(-10 82 34)" />
              {/* Right branch leaves */}
              <path d="M140,58 C144,46 136,34 118,30" stroke="#eab308" strokeWidth="3" fill="none" />
              <ellipse cx="144" cy="52" rx="5" ry="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1" transform="rotate(30 144 52)" />
              <ellipse cx="140" cy="42" rx="5" ry="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1" transform="rotate(20 140 42)" />
              <ellipse cx="130" cy="34" rx="5" ry="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1" transform="rotate(10 130 34)" />
              {/* Center gem */}
              <polygon points="106,28 109,32 106,36 103,32" fill="#38bdf8" />
            </g>
          )}

          {costumeId === 'lighthouse' && (
            /* Miniature Song Tu Tay Lighthouse Companion */
            <g id="costume-lighthouse" transform="translate(142, 60)">
              {/* Rotating Light Beam */}
              <polygon points="16,30 -60,0 -50,-20 16,26" fill="#fef08a" opacity="0.35" />
              {/* Tower Body with Red/White Bands */}
              <polygon points="10,28 22,28 25,95 7,95" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />
              <polygon points="9,46 23,46 24,62 8,62" fill="#ef4444" />
              <polygon points="8,76 24,76 25,92 7,92" fill="#ef4444" />
              {/* Lantern Room & Dome */}
              <rect x="11" y="24" width="10" height="6" fill="#fef08a" stroke="#1e293b" strokeWidth="1.5" />
              <path d="M10,24 Q16,16 22,24 Z" fill="#1e293b" />
              {/* Bright lantern light */}
              <circle cx="16" cy="27" r="3.5" fill="#facc15" />
            </g>
          )}

          {costumeId === 'trident' && (
            /* Mythic Ocean King Trident */
            <g id="costume-trident" transform="translate(138, 40)">
              {/* Staff */}
              <line x1="16" y1="10" x2="16" y2="135" stroke="#eab308" strokeWidth="4.5" strokeLinecap="round" />
              {/* Crossbar */}
              <path d="M4,28 Q16,36 28,28" stroke="#ca8a04" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              {/* Center prong */}
              <polygon points="16,4 19,26 13,26" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
              {/* Left prong */}
              <polygon points="4,12 7,30 2,30" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
              {/* Right prong */}
              <polygon points="28,12 30,30 25,30" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
              {/* Center glowing aquatic gem */}
              <circle cx="16" cy="34" r="4.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
            </g>
          )}
        </svg>
      </div>

      {showCaption && (
        <div className="mt-1 px-2.5 py-0.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 font-semibold text-xs text-center shadow-xs">
          {captions[state]}
        </div>
      )}
    </div>
  );
};
