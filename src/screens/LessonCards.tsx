import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';

export default function LessonCards() {
  const { state, navigate } = useGame();

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('childProfileView')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: '0 0 2px' }}>📖 Lesson Cards</h1>
          <p style={{ fontSize: 13, color: '#756B63', margin: 0 }}>{state.lessonCards.length} cards collected</p>
        </div>
      </div>

      <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Mindy mood="happy" size={60}/>
        <div style={{ background: '#DDE9DD', borderRadius: 14, padding: '12px 14px', flex: 1 }}>
          <p style={{ fontSize: 14, color: '#24313A', margin: 0 }}>You taught Mindy {state.lessonCards.length} things! 🌟</p>
        </div>
      </div>

      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {state.lessonCards.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <span style={{ fontSize: 48 }}>📚</span>
            <p style={{ color: '#756B63', marginTop: 12 }}>Visit Mindy's House to earn your first card!</p>
          </div>
        ) : (
          state.lessonCards.map((card, i) => (
            <div key={card.id} className="card" style={{ animation: `bounce-in 0.3s ease-out ${i * 0.05}s both` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ background: '#F7DDD0', borderRadius: 10, padding: '6px 12px' }}>
                  <span style={{ fontSize: 17, fontWeight: 700, color: '#D9683B' }}>{card.pattern}</span>
                </div>
                <span style={{ fontSize: 12, color: '#756B63' }}>{card.date}</span>
              </div>
              <p style={{ fontSize: 15, color: '#24313A', margin: '0 0 8px', lineHeight: 1.5 }}>{card.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>🐱</span>
                <span style={{ fontSize: 13, color: '#756B63' }}>Example: <strong style={{ color: '#24313A' }}>{card.example}</strong></span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
