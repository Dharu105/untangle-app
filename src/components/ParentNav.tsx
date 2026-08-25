import { useGame } from '../context/GameContext';
import type { Screen } from '../types';

const tabs = [
  { key: 'home' as const, label: 'Home', icon: '📊', screen: 'parentDashboard' as Screen },
  { key: 'garden' as const, label: 'Garden', icon: '🌻', screen: 'parentGarden' as Screen },
  { key: 'insights' as const, label: 'Insights', icon: '💡', screen: 'insights' as Screen },
  { key: 'mela' as const, label: 'Reports', icon: '📋', screen: 'melaReport' as Screen },
  { key: 'more' as const, label: 'More', icon: '⚙️', screen: 'settings' as Screen },
];

export default function ParentNav() {
  const { state, dispatch, navigate } = useGame();

  function handleTab(tab: typeof tabs[0]) {
    dispatch({ type: 'SET_PARENT_NAV', tab: tab.key });
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
          className={`nav-tab ${state.activeParentNav === tab.key ? 'active' : ''}`}
          onClick={() => handleTab(tab)}
        >
          <span style={{ fontSize: 22 }}>{tab.icon}</span>
          <span style={{ fontSize: 11, fontWeight: state.activeParentNav === tab.key ? 700 : 400 }}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
