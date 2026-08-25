export type Screen =
  | 'welcome'
  | 'childProfile'
  | 'villageHome'
  | 'adventureMap'
  | 'soundGarden'
  | 'letterGrove'
  | 'kiteMeadow'
  | 'pulsePath'
  | 'mindyMixup'
  | 'lessonCards'
  | 'reward'
  | 'worldChange'
  | 'bookCorner'
  | 'theMela'
  | 'childGarden'
  | 'childProfileView'
  | 'parentLogin'
  | 'parentDashboard'
  | 'parentGarden'
  | 'readingWeather'
  | 'progressDetails'
  | 'insights'
  | 'melaReport'
  | 'notifications'
  | 'familyVoice'
  | 'settings'
  | 'responsibleScreening'
  | 'languageSelect'
  | 'privacy'
  | 'helpSupport';

export type MindyMood =
  | 'idle'
  | 'happy'
  | 'curious'
  | 'confused'
  | 'thinking'
  | 'celebrating'
  | 'encouraging'
  | 'excited';

export type Language = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'ml';

export interface LessonCard {
  id: string;
  pattern: string;
  example: string;
  date: string;
  description: string;
}

export interface Creature {
  id: string;
  name: string;
  emoji: string;
  unlockedAt: string;
}

export interface Activity {
  id: string;
  type: string;
  completedAt: string;
  accuracy: number;
}

export interface AppNotification {
  id: string;
  icon: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export interface Settings {
  textSize: 1 | 2 | 3;
  audio: boolean;
  haptics: boolean;
  highContrast: boolean;
}

export interface GameState {
  childName: string;
  childAge: number;
  childLanguage: Language;
  childAvatar: string;
  soundAccuracy: number;
  letterAccuracy: number;
  syllableAccuracy: number;
  readingProgress: number;
  lessonCards: LessonCard[];
  coins: number;
  stars: number;
  stickers: number;
  unlockedCreatures: Creature[];
  stormProgress: number;
  melaProgress: number;
  melaUnlocked: boolean;
  melaCompletedStalls: string[];
  completedActivities: Activity[];
  currentScreen: Screen;
  previousScreen: Screen;
  isParentMode: boolean;
  rewardPending: { coins: number; stars: number; message: string } | null;
  activeChildNav: 'home' | 'garden' | 'adventures' | 'mela' | 'profile';
  activeParentNav: 'home' | 'garden' | 'insights' | 'mela' | 'more';
  notificationsCount: number;
  notifications: AppNotification[];
  settings: Settings;
}

export type GameAction =
  | { type: 'SET_SCREEN'; screen: Screen }
  | { type: 'SET_CHILD_NAME'; name: string }
  | { type: 'SET_CHILD_AGE'; age: number }
  | { type: 'SET_CHILD_LANGUAGE'; language: Language }
  | { type: 'SET_CHILD_AVATAR'; avatar: string }
  | { type: 'SET_PARENT_MODE'; value: boolean }
  | { type: 'COMPLETE_ACTIVITY'; activity: Activity }
  | { type: 'ADD_LESSON_CARD'; card: LessonCard }
  | { type: 'UNLOCK_CREATURE'; creature: Creature }
  | { type: 'EARN_REWARD'; coins: number; stars: number; message: string }
  | { type: 'CLEAR_REWARD' }
  | { type: 'UPDATE_SOUND_ACCURACY'; delta: number }
  | { type: 'UPDATE_LETTER_ACCURACY'; delta: number }
  | { type: 'UPDATE_SYLLABLE_ACCURACY'; delta: number }
  | { type: 'UPDATE_READING_PROGRESS'; delta: number }
  | { type: 'ADVANCE_STORM'; amount: number }
  | { type: 'SET_CHILD_NAV'; tab: GameState['activeChildNav'] }
  | { type: 'SET_PARENT_NAV'; tab: GameState['activeParentNav'] }
  | { type: 'SET_TEXT_SIZE'; size: 1 | 2 | 3 }
  | { type: 'TOGGLE_AUDIO' }
  | { type: 'TOGGLE_HAPTICS' }
  | { type: 'TOGGLE_CONTRAST' }
  | { type: 'ADD_NOTIFICATION'; notification: AppNotification }
  | { type: 'MARK_NOTIFICATION_READ'; id: string }
  | { type: 'MARK_ALL_NOTIFICATIONS_READ' }
  | { type: 'SET_MELA_STALLS'; stalls: string[] }
  | { type: 'RESET_PROGRESS' }
  | { type: 'HYDRATE'; state: GameState };
