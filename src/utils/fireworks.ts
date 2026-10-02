import confetti from 'canvas-confetti';
import { soundManager } from './soundManager';

// Hiệu ứng Bắn Pháo Hoa Đỉnh Cao mừng hoàn thành Chương học & Đạt Huy Hiệu Mới
export const triggerFireworks = (durationMs = 2800, playSound = true) => {
  if (playSound) {
    soundManager.playFireworksCelebration();
  }

  const animationEnd = Date.now() + durationMs;
  const defaults = {
    startVelocity: 35,
    spread: 360,
    ticks: 70,
    zIndex: 99999,
  };

  const oceanColors = [
    '#0284c7', // Sky Blue
    '#0ea5e9', // Ocean Cyan
    '#f59e0b', // Amber Gold
    '#fbbf24', // Yellow Gold
    '#10b981', // Emerald
    '#f43f5e', // Coral Rose
    '#8b5cf6', // Violet
    '#ffffff', // Sparkle White
  ];

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // 1. Loạt pháo hoa mở màn tức thì ở giữa
  confetti({
    ...defaults,
    particleCount: 80,
    origin: { x: 0.5, y: 0.4 },
    colors: oceanColors,
  });

  // 2. Chuỗi pháo hoa nổ liên hoàn từ hai cánh và các góc trời
  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = Math.round(55 * (timeLeft / durationMs));

    // Pháo nổ bên trái
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.15, 0.4), y: randomInRange(0.2, 0.5) },
      colors: oceanColors,
    });

    // Pháo nổ bên phải
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.85), y: randomInRange(0.2, 0.5) },
      colors: oceanColors,
    });
  }, 280);
};

// Hiệu ứng chùm sao vinh danh (Stars Blast)
export const triggerStarBurst = () => {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['star'] as any,
    colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
    zIndex: 99999,
  };

  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    origin: { x: 0.5, y: 0.5 },
  });
  confetti({
    ...defaults,
    particleCount: 25,
    scalar: 0.75,
    origin: { x: 0.5, y: 0.5 },
  });
};
