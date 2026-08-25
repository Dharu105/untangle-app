import { useState } from 'react';
import { useGame } from '../context/GameContext';

const initialNotifs = [
  { id: '1', icon: '🎯', title: `Adventure completed!`, body: 'completed today\'s Sound Garden adventure.', time: '2 hours ago', read: false },
  { id: '2', icon: '📋', title: 'New Mela Report ready', body: 'A new Mela Report is available. See the latest progress insights.', time: 'Yesterday', read: false },
  { id: '3', icon: '📖', title: '3 new Lesson Cards unlocked!', body: 'taught Mindy about B/D, M/N, and SH sounds.', time: '2 days ago', read: false },
  { id: '4', icon: '🌟', title: 'Keep going!', body: 'is making great progress. Short daily sessions make a big difference!', time: '3 days ago', read: true },
  { id: '5', icon: '⛅', title: 'Storm clearing!', body: 'The Tangle Storm is now 30% cleared. Amazing work!', time: '4 days ago', read: true },
];

export default function Notifications() {
  const { state, navigate } = useGame();
  const [notifs, setNotifs] = useState(initialNotifs);

  function markRead(id: string) {
    setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  }

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '24px 24px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('parentDashboard')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: 0 }}>🔔 Notifications</h1>
      </div>

      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {notifs.map(n => (
          <button
            key={n.id}
            onClick={() => markRead(n.id)}
            style={{
              background: n.read ? 'white' : '#FFF3E8',
              borderRadius: 16,
              padding: '16px',
              border: `1.5px solid ${n.read ? 'transparent' : '#F7DDD0'}`,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              gap: 12,
              boxShadow: n.read ? '0 1px 4px rgba(36,49,58,0.05)' : '0 2px 8px rgba(217,104,59,0.1)',
              fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif",
              transition: 'all 0.2s',
              width: '100%',
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: n.read ? '#F7DDD0' : '#D9683B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
              {n.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#24313A' }}>{n.title}</span>
                {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D9683B', flexShrink: 0, marginTop: 4 }}/>}
              </div>
              <p style={{ fontSize: 13, color: '#756B63', margin: '0 0 4px', lineHeight: 1.5 }}>
                {state.childName || 'Aarav'} {n.body}
              </p>
              <span style={{ fontSize: 11, color: '#B0A89E' }}>{n.time}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
