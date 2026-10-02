import React from 'react';
import { StudentInfo } from '../types';
import { KienSangMascot } from './KienSangMascot';
import {
  AVATAR_PERSONAS,
  AVATAR_BACKGROUNDS,
  AVATAR_FRAMES,
} from '../data/avatarOptions';

interface StudentAvatarProps {
  studentInfo?: Partial<StudentInfo>;
  size?: number;
  className?: string;
  showFrame?: boolean;
}

export const StudentAvatar: React.FC<StudentAvatarProps> = ({
  studentInfo = {},
  size = 64,
  className = '',
  showFrame = true,
}) => {
  const avatarId = studentInfo.avatarId || 'ant_learner';
  const bgId = studentInfo.avatarBg || 'bg_ocean';
  const frameId = studentInfo.avatarFrame || 'ocean_blue';

  const persona =
    AVATAR_PERSONAS.find((p) => p.id === avatarId) || AVATAR_PERSONAS[0];
  const bg =
    AVATAR_BACKGROUNDS.find((b) => b.id === bgId) || AVATAR_BACKGROUNDS[0];
  const frame =
    AVATAR_FRAMES.find((f) => f.id === frameId) || AVATAR_FRAMES[0];

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-3xl flex items-center justify-center overflow-hidden shrink-0 select-none ${
        bg.gradientClass
      } ${showFrame ? `${frame.frameClass} ${frame.glowClass}` : ''} ${className}`}
    >
      <div className="w-full h-full flex items-center justify-center p-1">
        <KienSangMascot
          state="normal"
          size={Math.round(size * 0.9)}
          animated={false}
          costumeId={persona.costumeId}
        />
      </div>
    </div>
  );
};
