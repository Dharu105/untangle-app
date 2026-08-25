import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { GameState, GameAction, Screen, Language, LessonCard, Creature, Activity, AppNotification, Settings } from '../types';

const STORAGE_KEY = 'untangle-state-v1';

const defaultSettings: Settings = {
  textSize: 2,
  audio: true,
  haptics: true,
  highContrast: false,
};

const initialState: GameState = {
  childName: '',
  childAge: 7,
  childLanguage: 'en',
  childAvatar: '🦊',
  soundAccuracy: 55,
  letterAccuracy: 70,
  syllableAccuracy: 60,
  readingProgress: 40,
  lessonCards: [
    { id: '1', pattern: 'B / D', example: 'ball vs doll', date: 'Yesterday', description: 'These letters face different ways!' },
    { id: '2', pattern: 'SH sound', example: 'ship, shell, shop', date: '2 days ago', description: 'SH makes a hushing sound.' },
  ],
  coins: 24,
  stars: 8,
  stickers: 3,
  unlockedCreatures: [
    { id: '1', name: 'Bumble', emoji: '🐝', unlockedAt: 'Sound Garden' },
    { id: '2', name: 'Fern', emoji: '🌿', unlockedAt: 'Letter Grove' },
  ],
  stormProgress: 30,
  melaProgress: 0,
  melaUnlocked: false,
  melaCompletedStalls: [],
  completedActivities: [],
  currentScreen: 'welcome',
  previousScreen: 'welcome',
  isParentMode: false,
  rewardPending: null,
  activeChildNav: 'home',
  activeParentNav: 'home',
  notificationsCount: 3,
  notifications: [
    { id: '1', icon: '🎯', title: 'Adventure completed!', body: 'completed today\'s Sound Garden adventure.', time: '2 hours ago', read: false },
    { id: '2', icon: '📋', title: 'New Mela Report ready', body: 'A new Mela Report is available. See the latest progress insights.', time: 'Yesterday', read: false },
    { id: '3', icon: '📖', title: '3 new Lesson Cards unlocked!', body: 'taught Mindy about B/D, M/N, and SH sounds.', time: '2 days ago', read: false },
    { id: '4', icon: '🌟', title: 'Keep going!', body: 'is making great progress. Short daily sessions make a big difference!', time: '3 days ago', read: true },
    { id: '5', icon: '⛅', title: 'Storm clearing!', body: 'The Tangle Storm is now 30% cleared. Amazing work!', time: '4 days ago', read: true },
  ],
  settings: { ...defaultSettings },
};

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const saved = JSON.parse(raw) as Partial<GameState>;
    return {
      ...initialState,
      ...saved,
      settings: { ...defaultSettings, ...saved.settings },
      notifications: saved.notifications ?? initialState.notifications,
      unlockedCreatures: saved.unlockedCreatures ?? initialState.unlockedCreatures,
      lessonCards: saved.lessonCards ?? initialState.lessonCards,
      completedActivities: saved.completedActivities ?? [],
      melaCompletedStalls: saved.melaCompletedStalls ?? [],
      rewardPending: null,
      currentScreen: 'welcome',
      previousScreen: 'welcome',
      isParentMode: false,
    };
  } catch {
    return initialState;
  }
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state;
    case 'SET_SCREEN':
      return { ...state, previousScreen: state.currentScreen, currentScreen: action.screen };
    case 'SET_CHILD_NAME':
      return { ...state, childName: action.name };
    case 'SET_CHILD_AGE':
      return { ...state, childAge: action.age };
    case 'SET_CHILD_LANGUAGE':
      return { ...state, childLanguage: action.language };
    case 'SET_CHILD_AVATAR':
      return { ...state, childAvatar: action.avatar };
    case 'SET_PARENT_MODE':
      return { ...state, isParentMode: action.value };
    case 'COMPLETE_ACTIVITY':
      return {
        ...state,
        completedActivities: [...state.completedActivities, action.activity],
      };
    case 'ADD_LESSON_CARD':
      return { ...state, lessonCards: [action.card, ...state.lessonCards] };
    case 'UNLOCK_CREATURE':
      if (state.unlockedCreatures.some(c => c.id === action.creature.id)) return state;
      return { ...state, unlockedCreatures: [...state.unlockedCreatures, action.creature] };
    case 'EARN_REWARD':
      return {
        ...state,
        coins: state.coins + action.coins,
        stars: state.stars + action.stars,
        rewardPending: { coins: action.coins, stars: action.stars, message: action.message },
      };
    case 'CLEAR_REWARD':
      return { ...state, rewardPending: null };
    case 'UPDATE_SOUND_ACCURACY':
      return { ...state, soundAccuracy: clamp(state.soundAccuracy + action.delta) };
    case 'UPDATE_LETTER_ACCURACY':
      return { ...state, letterAccuracy: clamp(state.letterAccuracy + action.delta) };
    case 'UPDATE_SYLLABLE_ACCURACY':
      return { ...state, syllableAccuracy: clamp(state.syllableAccuracy + action.delta) };
    case 'UPDATE_READING_PROGRESS':
      return { ...state, readingProgress: clamp(state.readingProgress + action.delta) };
    case 'ADVANCE_STORM': {
      const newStorm = clamp(state.stormProgress + action.amount);
      return {
        ...state,
        stormProgress: newStorm,
        melaUnlocked: newStorm >= 50,
      };
    }
    case 'SET_CHILD_NAV':
      return { ...state, activeChildNav: action.tab };
    case 'SET_PARENT_NAV':
      return { ...state, activeParentNav: action.tab };
    case 'SET_TEXT_SIZE':
      return { ...state, settings: { ...state.settings, textSize: action.size } };
    case 'TOGGLE_AUDIO':
      return { ...state, settings: { ...state.settings, audio: !state.settings.audio } };
    case 'TOGGLE_HAPTICS':
      return { ...state, settings: { ...state.settings, haptics: !state.settings.haptics } };
    case 'TOGGLE_CONTRAST':
      return { ...state, settings: { ...state.settings, highContrast: !state.settings.highContrast } };
    case 'ADD_NOTIFICATION': {
      const notifications = [action.notification, ...state.notifications];
      return {
        ...state,
        notifications,
        notificationsCount: notifications.filter(n => !n.read).length,
      };
    }
    case 'MARK_NOTIFICATION_READ': {
      const notifications = state.notifications.map(n =>
        n.id === action.id ? { ...n, read: true } : n
      );
      return {
        ...state,
        notifications,
        notificationsCount: notifications.filter(n => !n.read).length,
      };
    }
    case 'MARK_ALL_NOTIFICATIONS_READ': {
      const notifications = state.notifications.map(n => ({ ...n, read: true }));
      return {
        ...state,
        notifications,
        notificationsCount: 0,
      };
    }
    case 'SET_MELA_STALLS':
      return { ...state, melaCompletedStalls: action.stalls };
    case 'RESET_PROGRESS':
      return {
        ...initialState,
        settings: state.settings,
        childLanguage: state.childLanguage,
      };
    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  navigate: (screen: Screen) => void;
  goBack: () => void;
  adaptiveRecommendation: () => Screen;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  function navigate(screen: Screen) {
    dispatch({ type: 'SET_SCREEN', screen });
  }

  function goBack() {
    dispatch({ type: 'SET_SCREEN', screen: state.previousScreen });
  }

  function adaptiveRecommendation(): Screen {
    const { soundAccuracy, letterAccuracy, syllableAccuracy, readingProgress } = state;
    if (soundAccuracy < 60) return 'soundGarden';
    if (letterAccuracy < 65) return 'letterGrove';
    if (syllableAccuracy < 60) return 'pulsePath';
    if (soundAccuracy > 80 && letterAccuracy > 80) return 'kiteMeadow';
    if (readingProgress < 50) return 'bookCorner';
    return 'mindyMixup';
  }

  return (
    <GameContext.Provider value={{ state, dispatch, navigate, goBack, adaptiveRecommendation }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
