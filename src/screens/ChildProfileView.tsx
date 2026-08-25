import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';

export default function ChildProfileView() {
  const { state, navigate } = useGame();

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, #F7DDD0 0%, #FFF8EE 100%)', padding: '32px 24px 24px', textAlign: 'center' }}>
        <div style={{ width: 90, height: 90, borderRadius: '50%', background: '#F7DDD0', border: '3px solid #D9683B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 50 }}>
          {state.childAvatar}
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#24313A', margin: '0 0 4px' }}>{state.childName || 'Explorer'}</h1>
        <p style={{ fontSize: 15, color: '#756B63', margin: 0 }}>Age {state.childAge} · Village Explorer</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
          {[
            { icon: '🪙', val: state.coins, label: 'Coins' },
            { icon: '⭐', val: state.stars, label: 'Stars' },
            { icon: '🎯', val: state.stickers, label: 'Stickers' },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: 14, padding: '10px 16px', textAlign: 'center', boxShadow: '0 2px 8px rgba(36,49,58,0.07)' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#24313A' }}>{s.val}</div>
              <div style={{ fontSize: 11, color: '#756B63' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        {/* Storm progress */}
        <div className="card" style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#24313A', margin: '0 0 8px' }}>⛅ Tangle Storm Progress</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${state.stormProgress}%`, background: 'linear-gradient(90deg, #4B9180, #DDE9DD)' }}/>
          </div>
          <p style={{ fontSize: 13, color: '#4B9180', margin: '6px 0 0', fontWeight: 700 }}>{state.stormProgress}% cleared!</p>
        </div>

        {/* Quick actions */}
        {[
          { label: '📖 Lesson Cards', count: state.lessonCards.length, screen: 'lessonCards' },
          { label: '🌱 My Garden', count: null, screen: 'childGarden' },
          { label: '🗺️ Adventure Map', count: null, screen: 'adventureMap' },
        ].map(item => (
          <button
            key={item.screen}
            onClick={() => navigate(item.screen as any)}
            style={{ width: '100%', background: 'white', borderRadius: 16, padding: '16px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, boxShadow: '0 2px 8px rgba(36,49,58,0.07)', fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif" }}
          >
            <span style={{ fontSize: 16, fontWeight: 700, color: '#24313A' }}>{item.label}</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {item.count !== null && <span style={{ fontSize: 14, background: '#F7DDD0', color: '#D9683B', borderRadius: 8, padding: '2px 10px', fontWeight: 700 }}>{item.count}</span>}
              <span style={{ color: '#756B63', fontSize: 18 }}>›</span>
            </div>
          </button>
        ))}

        {/* Creatures */}
        <div className="card" style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#24313A', margin: '0 0 12px' }}>🐾 Village Friends</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {state.unlockedCreatures.map(c => (
              <div key={c.id} className="creature-badge" title={c.name}>{c.emoji}</div>
            ))}
          </div>
        </div>

        <Mindy mood="happy" size={64} className="float-anim" style={{ display: 'block', margin: '16px auto 0' }}/>
      </div>
    </div>
  );
}
