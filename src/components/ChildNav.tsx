import { useGame } from '../context/GameContext';
import type { Screen } from '../types';

const tabs = [
  { key: 'home' as const, label: 'Home', icon: '🏡', screen: 'villageHome' as Screen },
  { key: 'garden' as const, label: 'Garden', icon: '🌱', screen: 'childGarden' as Screen },
  { key: 'adventures' as const, label: 'Adventures', icon: '🗺️', screen: 'adventureMap' as Screen },
  { key: 'mela' as const, label: 'Mela', icon: '🎪', screen: 'theMela' as Screen },
  { key: 'profile' as const, label: 'Me', icon: '🦊', screen: 'childProfileView' as Screen },
];

export default function ChildNav() {
  const { state, dispatch, navigate } = useGame();

  function handleTab(tab: typeof tabs[0]) {
    dispatch({ type: 'SET_CHILD_NAV', tab: tab.key });
    navigate(tab.screen);
  }

  return (
    <nav style={{
      background: 'white',
      borderTop: '1px solid rgba(36,49,58,0.07)',
      padding: '8px 8px 16px',
      display: 'flex',
      justifyContent: 'space-around',
      flexShrink: 0,
      boxShadow: '0 -4px 20px rgba(36,49,58,0.06)',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`nav-tab ${state.activeChildNav === tab.key ? 'active' : ''}`}
          onClick={() => handleTab(tab)}
        >
          <span style={{ fontSize: 22 }}>{tab.icon}</span>
          <span style={{ fontSize: 11, fontWeight: state.activeChildNav === tab.key ? 700 : 400 }}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
