import { useState } from 'react';
import { useGame } from '../context/GameContext';

const sections = [
  {
    title: 'Account',
    items: [
      { icon: '👦', label: 'Child Profiles', screen: 'childProfileView' },
      { icon: '🌐', label: 'Language', screen: 'languageSelect' },
      { icon: '👨‍👩‍👧', label: 'Family Voice', screen: 'familyVoice' },
    ],
  },
  {
    title: 'Notifications & Privacy',
    items: [
      { icon: '🔔', label: 'Notifications', screen: 'notifications' },
      { icon: '🔒', label: 'Privacy', screen: 'privacy' },
    ],
  },
  {
    title: 'Accessibility',
    items: [
      { icon: '🔤', label: 'Text Size', screen: null, toggle: 'textSize' },
      { icon: '🔉', label: 'Audio', screen: null, toggle: 'audio' },
      { icon: '📳', label: 'Haptics', screen: null, toggle: 'haptics' },
      { icon: '🎨', label: 'High Contrast', screen: null, toggle: 'contrast' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: '❓', label: 'Help & Support', screen: 'helpSupport' },
      { icon: 'ℹ️', label: 'About Untangle', screen: 'responsibleScreening' },
    ],
  },
];

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      onClick={e => { e.stopPropagation(); onChange(); }}
      style={{
        width: 44, height: 26, borderRadius: 13,
        background: value ? '#4B9180' : '#DDE9DD',
        border: 'none', cursor: 'pointer', position: 'relative',
        transition: 'background 0.2s', flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: value ? 21 : 3,
        width: 20, height: 20, borderRadius: '50%', background: 'white',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s',
      }}/>
    </button>
  );
}

export default function Settings() {
  const { navigate, dispatch } = useGame();
  const [textSize, setTextSize] = useState(2);
  const [audio, setAudio] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  function handleLogout() {
    dispatch({ type: 'SET_PARENT_MODE', value: false });
    navigate('welcome');
  }

  function getAccessoryFor(label: string) {
    if (label === 'Audio') return <Toggle value={audio} onChange={() => setAudio(v => !v)}/>;
    if (label === 'Haptics') return <Toggle value={haptics} onChange={() => setHaptics(v => !v)}/>;
    if (label === 'High Contrast') return <Toggle value={highContrast} onChange={() => setHighContrast(v => !v)}/>;
    if (label === 'Text Size') {
      return (
        <div style={{ display: 'flex', gap: 4 }}>
          {[1,2,3].map(s => (
            <button
              key={s}
              onClick={e => { e.stopPropagation(); setTextSize(s); }}
              style={{ width: 28, height: 28, borderRadius: 8, background: textSize === s ? '#D9683B' : '#F7DDD0', border: 'none', cursor: 'pointer', fontFamily: "'OpenDyslexic', sans-serif", fontSize: 10 + s * 2, color: textSize === s ? 'white' : '#24313A', fontWeight: 700 }}
            >A</button>
          ))}
        </div>
      );
    }
    return <span style={{ color: '#756B63', fontSize: 18 }}>›</span>;
  }

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '24px 24px 12px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#24313A', margin: 0 }}>⚙️ Settings</h1>
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        {sections.map(sec => (
          <div key={sec.title} style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#756B63', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {sec.title}
            </p>
            <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(36,49,58,0.07)' }}>
              {sec.items.map((item, i) => {
                const isLast = i === sec.items.length - 1;
                const isToggle = ['Audio', 'Haptics', 'High Contrast', 'Text Size'].includes(item.label);
                return (
                  <div
                    key={item.label}
                    onClick={() => !isToggle && item.screen && navigate(item.screen as any)}
                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px', borderBottom: isLast ? 'none' : '1px solid #F7DDD0', cursor: isToggle ? 'default' : 'pointer' }}
                  >
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#24313A', flex: 1 }}>{item.label}</span>
                    {getAccessoryFor(item.label)}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <button
          onClick={handleLogout}
          style={{ width: '100%', padding: '16px', background: '#F7DDD0', borderRadius: 16, border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: '#D9683B', fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif", marginBottom: 16 }}
        >
          🚪 Log Out
        </button>

        <p style={{ fontSize: 12, color: '#B0A89E', textAlign: 'center' }}>UNTANGLE v1.0 · Smart India Hackathon 2024</p>
      </div>
    </div>
  );
}
