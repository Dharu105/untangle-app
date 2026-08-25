import { useGame } from '../context/GameContext';

export default function MelaReport() {
  const { state, navigate } = useGame();

  const avg = Math.round((state.letterAccuracy + state.soundAccuracy + state.syllableAccuracy + state.readingProgress) / 4);

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, #D9683B 0%, #F6C343 100%)', padding: '28px 24px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🎪</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'white', margin: '0 0 6px', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
          Latest Mela Report
        </h1>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.9)', margin: 0 }}>A playful review of {state.childName || "Aarav"}'s progress</p>
      </div>

      <div style={{ padding: '20px 24px 24px' }}>
        {/* Overall */}
        <div className="card" style={{ marginBottom: 14, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#756B63', margin: '0 0 8px' }}>Overall Progress</p>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#D9683B' }}>{avg}%</div>
          <div className="progress-bar" style={{ height: 14, marginTop: 12 }}>
            <div className="progress-fill" style={{ width: `${avg}%`, background: 'linear-gradient(90deg, #D9683B, #F6C343)' }}/>
          </div>
          <p style={{ fontSize: 13, color: '#4B9180', margin: '8px 0 0', fontWeight: 700 }}>
            {avg >= 70 ? 'Excellent progress! 🌟' : avg >= 50 ? 'Good improvement! ⭐' : 'Keep going! 💪'}
          </p>
        </div>

        {/* Skills strengthened */}
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#24313A', margin: '0 0 12px' }}>🌱 Skills Strengthened</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Letter Recognition', val: state.letterAccuracy, prev: state.letterAccuracy - 8 },
              { label: 'Sound Awareness', val: state.soundAccuracy, prev: state.soundAccuracy - 10 },
            ].map(s => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, color: '#24313A', fontWeight: 700 }}>{s.label}</span>
                  <span style={{ fontSize: 13, color: '#4B9180', fontWeight: 700 }}>↑ +{s.val - s.prev}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${s.val}%`, background: '#4B9180' }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patterns to practise */}
        <div style={{ background: '#F7DDD0', borderRadius: 18, padding: '16px', marginBottom: 14 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#D9683B', margin: '0 0 10px' }}>🔄 Patterns to Practise</p>
          {state.lessonCards.slice(0, 2).map(card => (
            <div key={card.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>→</span>
              <p style={{ fontSize: 14, color: '#24313A', margin: 0, lineHeight: 1.5 }}>
                <strong>{card.pattern}</strong>: {card.description}
              </p>
            </div>
          ))}
          {state.lessonCards.length === 0 && (
            <p style={{ fontSize: 14, color: '#756B63', margin: 0 }}>Continue playing to identify practice patterns!</p>
          )}
        </div>

        {/* Activity count */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          {[
            { icon: '🎯', val: state.completedActivities.length + 7, label: 'Activities Completed' },
            { icon: '📖', val: state.lessonCards.length, label: 'Lesson Cards' },
            { icon: '⭐', val: state.stars, label: 'Stars Earned' },
            { icon: '⛅', val: `${state.stormProgress}%`, label: 'Storm Cleared' },
          ].map(s => (
            <div key={s.label} className="card" style={{ textAlign: 'center', padding: '14px' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#24313A' }}>{s.val}</div>
              <div style={{ fontSize: 11, color: '#756B63' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Next mela */}
        <div style={{ background: '#DDE9DD', borderRadius: 16, padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: '#4B9180', fontWeight: 700, margin: '0 0 4px' }}>🎪 Next Mela</p>
          <p style={{ fontSize: 14, color: '#24313A', margin: 0 }}>
            {state.stormProgress >= 60 ? 'The next Mela is unlocking soon!' : `Complete ${60 - state.stormProgress}% more storm clearing to unlock!`}
          </p>
        </div>

        <button className="btn-primary" onClick={() => navigate('insights')}>
          View Full Insights →
        </button>
      </div>
    </div>
  );
}
