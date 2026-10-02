import React, { useState, useEffect } from 'react';
import { PageId, GradeLevel, StudentInfo, UserProgress } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/ChatbotWidget';
import { StudentInfoModal } from './components/StudentInfoModal';
import { MascotShopModal } from './components/MascotShopModal';
import { AvatarEditorModal } from './components/AvatarEditorModal';
import { HomePage } from './pages/HomePage';
import { MapPage } from './pages/MapPage';
import { LearnPage } from './pages/LearnPage';
import { GamesPage } from './pages/GamesPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { MascotPage } from './pages/MascotPage';
import { ReferencesPage } from './pages/ReferencesPage';
import { ProfilePage } from './pages/ProfilePage';
import { soundManager } from './utils/soundManager';
import { CelebrationModal, CelebrationEvent } from './components/CelebrationModal';
import { BADGE_DEFINITIONS } from './data/badgeDefinitions';

const DEFAULT_STUDENT_INFO: StudentInfo = {
  fullName: 'Nguyễn Ngọc Kim Ngân',
  studentId: 'FHG30016',
  gradeClass: '11A',
  schoolName: 'Trường Tiểu học, THCS & THPT FPT Hậu Giang',
  schoolAddress: 'quốc lộ 61C, xã Vị Thủy, thành phố Cần Thơ',
  avatarId: 'ant_learner',
  avatarBg: 'bg_ocean',
  avatarFrame: 'ocean_blue',
  learningTitle: 'Nhà Thám Hiểm Biển Đông 🌊',
};

const DEFAULT_PROGRESS: UserProgress = {
  xp: 120,
  coins: 150,
  streakDays: 3,
  completedPillars: ['location'],
  badges: ['navigator'],
  ownedCostumes: ['default'],
  equippedCostume: 'default',
  gameScores: {},
};

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>('thpt');
  const [currentGrade, setCurrentGrade] = useState<number>(11);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [selectedLearnPillar, setSelectedLearnPillar] = useState<string | undefined>(undefined);
  const [celebrationEvent, setCelebrationEvent] = useState<CelebrationEvent | null>(null);

  // Persistence in localStorage
  const [studentInfo, setStudentInfo] = useState<StudentInfo>(() => {
    try {
      const saved = localStorage.getItem('bdq_student_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Replace previous mock placeholders automatically with the student's real profile
        if (
          !parsed.fullName ||
          parsed.fullName === 'Nguyễn Hoàng Kim Ngân' ||
          parsed.studentId === 'FS-2026-8899'
        ) {
          localStorage.setItem('bdq_student_info', JSON.stringify(DEFAULT_STUDENT_INFO));
          return DEFAULT_STUDENT_INFO;
        }
        return { ...DEFAULT_STUDENT_INFO, ...parsed };
      }
      localStorage.setItem('bdq_student_info', JSON.stringify(DEFAULT_STUDENT_INFO));
      return DEFAULT_STUDENT_INFO;
    } catch {
      return DEFAULT_STUDENT_INFO;
    }
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('bdq_user_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PROGRESS,
          ...parsed,
          coins: parsed.coins !== undefined ? parsed.coins : 150,
          ownedCostumes: parsed.ownedCostumes || ['default'],
          equippedCostume: parsed.equippedCostume || 'default',
        };
      }
      return DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bdq_student_info', JSON.stringify(studentInfo));
    } catch {}
  }, [studentInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('bdq_user_progress', JSON.stringify(progress));
    } catch {}
  }, [progress]);

  // Global interactive sound feedback on all buttons and clickable controls
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        'button, [role="button"], a, input[type="radio"], input[type="checkbox"], select'
      );
      if (target && !target.hasAttribute('data-no-sound')) {
        soundManager.playButtonClick();
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  const handleAddXp = (amount: number) => {
    setProgress((prev) => ({ ...prev, xp: prev.xp + amount }));
  };

  const handleAddCoins = (amount: number) => {
    soundManager.playCoinReward();
    setProgress((prev) => ({
      ...prev,
      coins: (prev.coins ?? 0) + amount,
    }));
  };

  const handleBuyCostume = (costumeId: string, price: number) => {
    setProgress((prev) => {
      const currentCoins = prev.coins ?? 0;
      if (currentCoins < price) return prev;
      const owned = prev.ownedCostumes || ['default'];
      if (owned.includes(costumeId)) return prev;
      soundManager.playCoinReward();
      return {
        ...prev,
        coins: currentCoins - price,
        ownedCostumes: [...owned, costumeId],
        equippedCostume: costumeId,
      };
    });
  };

  const handleEquipCostume = (costumeId: string) => {
    soundManager.playPop();
    setProgress((prev) => ({
      ...prev,
      equippedCostume: costumeId,
    }));
  };

  const handleCompletePillar = (pillarId: string, pillarTitle: string) => {
    const isNew = !(progress.completedPillars || []).includes(pillarId);
    if (isNew) {
      setProgress((prev) => ({
        ...prev,
        completedPillars: [...(prev.completedPillars || []), pillarId],
        xp: prev.xp + 50,
        coins: (prev.coins ?? 0) + 150,
      }));

      setCelebrationEvent({
        type: 'chapter',
        title: 'Hoàn Thành Trọn Vẹn Chương Học!',
        name: pillarTitle,
        desc: 'Chúc mừng bạn đã tiếp thu trọn vẹn kiến thức cốt lõi của chương học Địa lí Biển Đông.',
        icon: '🌊',
        xpReward: 50,
        coinReward: 150,
      });
    }
  };

  const handleUnlockBadge = (badgeId: string) => {
    const badgeDef = BADGE_DEFINITIONS[badgeId] || {
      id: badgeId,
      name: 'Huy Hiệu Danh Dự',
      desc: 'Ghi nhận nỗ lực vượt bậc trong việc học tập và bảo vệ chủ quyền biển đảo.',
      icon: '🎖️',
      xpReward: 50,
      coinReward: 150,
    };

    setProgress((prev) => {
      if (!prev.badges.includes(badgeId)) {
        setCelebrationEvent({
          type: 'badge',
          title: 'Mở Khóa Huy Hiệu Mới Vinh Dự!',
          name: badgeDef.name,
          desc: badgeDef.desc,
          icon: badgeDef.icon,
          xpReward: badgeDef.xpReward,
          coinReward: badgeDef.coinReward,
        });

        return {
          ...prev,
          badges: [...prev.badges, badgeId],
          xp: prev.xp + badgeDef.xpReward,
          coins: (prev.coins ?? 0) + badgeDef.coinReward,
        };
      }
      return prev;
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Bạn có chắc chắn muốn đặt lại toàn bộ điểm và huy hiệu học tập?')) {
      setProgress({
        xp: 0,
        coins: 50,
        streakDays: 1,
        completedPillars: [],
        badges: [],
        ownedCostumes: ['default'],
        equippedCostume: 'default',
        gameScores: {},
      });
    }
  };

  const handleSelectKnowledgeSection = (sectionId: string) => {
    setSelectedLearnPillar(sectionId);
    setCurrentPage('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50 via-sky-100/40 to-blue-50/60 font-sans text-slate-900 selection:bg-sky-500 selection:text-white relative overflow-x-hidden">
      {/* Ambient glowing ocean blue backgrounds */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-sky-200/40 via-cyan-100/20 to-transparent pointer-events-none -z-10 blur-2xl"></div>
      <div className="absolute top-[40rem] -right-32 w-96 h-96 rounded-full bg-blue-200/30 pointer-events-none -z-10 blur-3xl"></div>
      <div className="absolute top-[80rem] -left-32 w-96 h-96 rounded-full bg-sky-200/30 pointer-events-none -z-10 blur-3xl"></div>

      {/* Navigation Header */}
      <Header
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        gradeLevel={gradeLevel}
        onGradeLevelChange={setGradeLevel}
        currentGrade={currentGrade}
        onGradeChange={setCurrentGrade}
        progress={progress}
        studentInfo={studentInfo}
        onOpenEditProfile={() => setIsEditModalOpen(true)}
        onOpenShop={() => setIsShopOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            gradeLevel={gradeLevel}
            currentGrade={currentGrade}
            progress={progress}
            onOpenChat={() => setCurrentPage('mascot')}
          />
        )}

        {(currentPage === 'explore' || currentPage === 'map') && (
          <MapPage gradeLevel={gradeLevel} currentGrade={currentGrade} />
        )}

        {currentPage === 'learn' && (
          <LearnPage
            gradeLevel={gradeLevel}
            currentGrade={currentGrade}
            initialSectionId={selectedLearnPillar}
            onAddXp={handleAddXp}
            onAddCoins={handleAddCoins}
            completedPillars={progress.completedPillars}
            onCompletePillar={handleCompletePillar}
            onUnlockBadge={handleUnlockBadge}
          />
        )}

        {currentPage === 'games' && (
          <GamesPage
            gradeLevel={gradeLevel}
            currentGrade={currentGrade}
            onAddXp={handleAddXp}
            onUnlockBadge={handleUnlockBadge}
            onAddCoins={handleAddCoins}
            onOpenShop={() => setIsShopOpen(true)}
          />
        )}

        {currentPage === 'challenges' && (
          <ChallengesPage
            gradeLevel={gradeLevel}
            currentGrade={currentGrade}
            onAddXp={handleAddXp}
            onUnlockBadge={handleUnlockBadge}
            onAddCoins={handleAddCoins}
          />
        )}

        {currentPage === 'mascot' && (
          <MascotPage
            gradeLevel={gradeLevel}
            currentGrade={currentGrade}
            userProgress={progress}
            onOpenShop={() => setIsShopOpen(true)}
          />
        )}

        {currentPage === 'references' && <ReferencesPage />}

        {currentPage === 'profile' && (
          <ProfilePage
            studentInfo={studentInfo}
            progress={progress}
            onOpenEditModal={() => setIsEditModalOpen(true)}
            onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
            onResetProgress={handleResetProgress}
            onOpenShop={() => setIsShopOpen(true)}
          />
        )}
      </main>

      {/* Mandatory 3-Part Educational Footer */}
      <Footer
        studentInfo={studentInfo}
        onOpenEditModal={() => setIsEditModalOpen(true)}
        onSelectKnowledgeSection={handleSelectKnowledgeSection}
      />

      {/* Floating AI Mascot Chatbot "Kiến Sáng" */}
      <ChatbotWidget
        currentPage={currentPage}
        gradeLevel={gradeLevel}
        currentGrade={currentGrade}
        activeContext={`Đang xem trang ${currentPage}`}
        onNavigate={(p) => setCurrentPage(p)}
        equippedCostume={progress.equippedCostume}
      />

      {/* Student Info Modal */}
      <StudentInfoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        studentInfo={studentInfo}
        onSave={(updated) => setStudentInfo(updated)}
        onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
      />

      {/* Learning Avatar Editor Modal */}
      <AvatarEditorModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        studentInfo={studentInfo}
        onSave={(updated) => setStudentInfo(updated)}
      />

      {/* Mascot Costume & Customization Shop Modal */}
      <MascotShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        progress={progress}
        onBuyCostume={handleBuyCostume}
        onEquipCostume={handleEquipCostume}
      />

      {/* Chapter Completion & Badge Unlock Fireworks Celebration Modal */}
      <CelebrationModal
        event={celebrationEvent}
        onClose={() => setCelebrationEvent(null)}
        onNavigateToProfile={() => setCurrentPage('profile')}
        onNavigateToShop={() => setIsShopOpen(true)}
      />
    </div>
  );
}

export default App;
