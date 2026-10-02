export type GradeLevel = 'tieuhoc' | 'thcs' | 'thpt';

export type PageId =
  | 'home'
  | 'explore'
  | 'map'
  | 'learn'
  | 'games'
  | 'challenges'
  | 'mascot'
  | 'references'
  | 'profile';

export type MascotState = 'normal' | 'explaining' | 'thinking' | 'celebrating' | 'suggesting';

export interface StudentInfo {
  fullName: string;
  studentId: string;
  gradeClass: string;
  schoolName: string;
  schoolAddress: string;
  avatarId?: string;
  avatarBg?: string;
  avatarFrame?: string;
  learningTitle?: string;
}

export interface UserProgress {
  xp: number;
  coins: number;
  level?: number;
  streakDays: number;
  completedLessons?: string[];
  completedPillars: string[];
  completedQuizzes?: string[];
  gameScores: Record<string, number>;
  unlockedBadges?: string[];
  badges: string[];
  lastActiveDate?: string;
  ownedCostumes: string[];
  equippedCostume: string;
}

export interface CostumeItem {
  id: string;
  name: string;
  category: 'hat' | 'suit' | 'glasses' | 'accessory' | 'special';
  icon: string;
  price: number;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  buffDescription?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
  unlocked: boolean;
}

export interface KnowledgePillar {
  id: string;
  title: string;
  subtitle: string;
  adaptedSummary: Record<GradeLevel, string>;
  keyFacts?: string[];
  sections: {
    heading: string;
    content: string;
    bulletPoints?: string[];
  }[];
}

export interface ResourceItem {
  id: string;
  name: string;
  category: 'fishery' | 'oilgas' | 'mineral' | 'shipping' | 'port' | 'tourism' | 'aquaculture' | 'windenergy';
  title: string;
  shortDesc: Record<GradeLevel, string>;
  characteristics: string[];
  role: string[];
  howExtracted: string[];
  vietnamExample: string;
  environmentalRisk: string;
  iconName: string;
  tags: string[];
}

export interface CooperationItem {
  id: string;
  title: string;
  field: string;
  content: Record<GradeLevel, string>;
  keyAgreements: string[];
  peacefulPrinciples: string[];
  impactOnEconomy: string;
  impactOnEnvironment: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  state?: MascotState;
  suggestedPrompts?: string[];
}
