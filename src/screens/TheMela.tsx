import { useState } from 'react';
import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';

const melaActivities = [
  { id: 'stall1', emoji: '🪁', name: 'Kite Stall', desc: 'Match the kite colours to words!', points: 10 },
  { id: 'stall2', emoji: '🎵', name: 'Music Corner', desc: 'Follow Mindy\'s clapping beat!', points: 8 },
  { id: 'stall3', emoji: '🍊', name: 'Orange Stall', desc: 'Find the rhyming pairs!', points: 12 },
  { id: 'stall4', emoji: '🎠', name: 'Story Wheel', desc: 'Spin and explore a mini story!', points: 15 },
];

export default function TheMela() {
  const { state, dispatch, navigate } = useGame();
  const [completed, setCompleted] = useState<string[]>(state.melaCompletedStalls);
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [gamePhase, setGamePhase] = useState<'browse' | 'playing' | 'done'>('browse');
  const [choice, setChoice] = useState<string | null>(null);

  function startActivity(id: string) {
    setCurrentActivity(id);
    setGamePhase('playing');
    setChoice(null);
  }

  function completeActivity(actId: string, points: number) {
    const newCompleted = [...completed, actId];
    setCompleted(newCompleted);
    dispatch({ type: 'SET_MELA_STALLS', stalls: newCompleted });
    setGamePhase('browse');
    setCurrentActivity(null);

    if (newCompleted.length >= melaActivities.length) {
      dispatch({ type: 'ADVANCE_STORM', amount: 8 });
      dispatch({ type: 'EARN_REWARD', coins: 20, stars: 3, message: 'Mela complete! 🎪' });
      dispatch({ type: 'COMPLETE_ACTIVITY', activity: { id: Date.now().toString(), type: 'theMela', completedAt: new Date().toISOString(), accuracy: 100 } });
      if (!state.unlockedCreatures.some(c => c.id === 'festival')) {
        dispatch({ type: 'UNLOCK_CREATURE', creature: { id: 'festival', name: 'Fest', emoji: '🎪', unlockedAt: 'The Mela' } });
      }
      setTimeout(() => navigate('melaReport'), 500);
    }
  }

  const activity = melaActivities.find(a => a.id === currentActivity);

  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg, #F7DDD0 0%, #FFF8EE 100%)', minHeight: '100%' }}>
      {/* Festival banner */}
      <div style={{
        background: 'linear-gradient(135deg, #D9683B 0%, #F6C343 100%)',
        padding: '24px 24px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decoration */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-around', padding: '4px' }}>
          {['🔴', '🟡', '🟢', '🔵', '🟣', '🔴', '🟡', '🟢'].map((c, i) => (
            <span key={i} style={{ fontSize: 8 }}>▲</span>
          ))}
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: 'white', margin: '0 0 4px', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
          🎪 THE MELA!
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', margin: 0 }}>The Festival of Adventures</p>
      </div>

      {/* Kite garland */}
      <div style={{ background: '#F7DDD0', padding: '10px 24px', display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
        {['🪁', '⭐', '🌸', '🎵', '🪁', '⭐', '🌸'].map((e, i) => (
          <span key={i} style={{ fontSize: 18 }}>{e}</span>
        ))}
      </div>

      {gamePhase === 'browse' ? (
        <div style={{ padding: '16px 24px 24px' }}>
          {/* Mindy */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Mindy mood="excited" size={72}/>
            <div style={{ background: 'white', borderRadius: 14, padding: '12px 14px', flex: 1, boxShadow: '0 2px 8px rgba(36,49,58,0.08)' }}>
              <p style={{ fontSize: 14, color: '#24313A', margin: 0 }}>
                Welcome to the Mela! {completed.length}/{melaActivities.length} stalls visited! 🎉
              </p>
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginBottom: 16, background: 'white', borderRadius: 14, padding: '12px 16px', boxShadow: '0 2px 8px rgba(36,49,58,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: '#756B63', fontWeight: 700 }}>Mela Progress</span>
              <span style={{ fontSize: 13, color: '#D9683B', fontWeight: 700 }}>{completed.length * 25}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${completed.length * 25}%`, background: 'linear-gradient(90deg, #D9683B, #F6C343)' }}/>
            </div>
          </div>

          {/* Stalls */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {melaActivities.map(act => (
              <button
                key={act.id}
                onClick={() => !completed.includes(act.id) && startActivity(act.id)}
                style={{
                  background: completed.includes(act.id) ? '#DDE9DD' : 'white',
                  borderRadius: 18,
                  padding: '18px 14px',
                  border: `2px solid ${completed.includes(act.id) ? '#4B9180' : '#F7DDD0'}`,
                  cursor: completed.includes(act.id) ? 'default' : 'pointer',
                  boxShadow: '0 2px 12px rgba(36,49,58,0.08)',
                  textAlign: 'center',
                  opacity: completed.includes(act.id) ? 0.85 : 1,
                  transition: 'all 0.2s',
                  fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{act.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#24313A', marginBottom: 4 }}>{act.name}</div>
                <div style={{ fontSize: 12, color: '#756B63', lineHeight: 1.4 }}>{act.desc}</div>
                {completed.includes(act.id) ? (
                  <div style={{ marginTop: 8, fontSize: 12, color: '#4B9180', fontWeight: 700 }}>✓ Done!</div>
                ) : (
                  <div style={{ marginTop: 8, fontSize: 12, color: '#D9683B', fontWeight: 700 }}>+{act.points} pts →</div>
                )}
              </button>
            ))}
          </div>

          <button className="btn-secondary" onClick={() => navigate('villageHome')} style={{ marginTop: 20 }}>
            ← Back to Village
          </button>
        </div>
      ) : (
        /* Mini game */
        <div style={{ padding: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: 48 }}>{activity?.emoji}</span>
            <h2 style={{ fontSize: 22, color: '#24313A', margin: '8px 0 4px' }}>{activity?.name}</h2>
            <p style={{ fontSize: 15, color: '#756B63', margin: 0 }}>{activity?.desc}</p>
          </div>

          <Mindy mood="encouraging" size={80} className="float-anim" style={{ display: 'block', margin: '0 auto 16px' }}/>

          {/* Mini game content */}
          <div style={{ background: 'white', borderRadius: 20, padding: '20px', boxShadow: '0 4px 16px rgba(36,49,58,0.1)', marginBottom: 16 }}>
            <p style={{ fontSize: 16, color: '#24313A', margin: '0 0 16px', textAlign: 'center', fontWeight: 700 }}>
              Which one rhymes with "CAT"?
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['BAT', 'DOG', 'SUN'].map(opt => (
                <button
                  key={opt}
                  className={`game-card ${choice === opt ? (opt === 'BAT' ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => setChoice(opt)}
                  style={{ flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 700, padding: '16px 8px' }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {choice && (
            <div className="bounce-in">
              <div style={{ background: '#DDE9DD', borderRadius: 14, padding: '12px', marginBottom: 16, textAlign: 'center' }}>
                {choice === 'BAT'
                  ? <p style={{ color: '#4B9180', fontWeight: 700, margin: 0 }}>🌟 CAT and BAT rhyme! Amazing!</p>
                  : <p style={{ color: '#D9683B', margin: 0 }}>Almost! CAT rhymes with BAT! Try again at the next stall!</p>
                }
              </div>
              <button className="btn-primary" onClick={() => completeActivity(currentActivity!, activity?.points || 0)}>
                🎪 Back to the Festival!
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
