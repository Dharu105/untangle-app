import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { GameState, GameAction, Screen, Language, LessonCard, Creature, Activity } from '../types';

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
  completedActivities: [],
  currentScreen: 'welcome',
  previousScreen: 'welcome',
  isParentMode: false,
  rewardPending: null,
  activeChildNav: 'home',
  activeParentNav: 'home',
  notificationsCount: 3,
};

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
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
    case 'ADVANCE_STORM':
      return {
        ...state,
        stormProgress: clamp(state.stormProgress + action.amount),
        melaUnlocked: state.stormProgress + action.amount >= 50,
      };
    case 'SET_CHILD_NAV':
      return { ...state, activeChildNav: action.tab };
    case 'SET_PARENT_NAV':
      return { ...state, activeParentNav: action.tab };
    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  navigate: (screen: Screen) => void;
  adaptiveRecommendation: () => Screen;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function navigate(screen: Screen) {
    dispatch({ type: 'SET_SCREEN', screen });
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
    <GameContext.Provider value={{ state, dispatch, navigate, adaptiveRecommendation }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
