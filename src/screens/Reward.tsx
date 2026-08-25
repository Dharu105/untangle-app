import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';

const CONFETTI_COLORS = ['#D9683B', '#4B9180', '#F6C343', '#F7DDD0', '#DDE9DD'];

export default function Reward() {
  const { state, dispatch, navigate } = useGame();
  const reward = state.rewardPending;
  const [showStars, setShowStars] = useState(false);
  const [showCoins, setShowCoins] = useState(false);
  const [showStorm, setShowStorm] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowStars(true), 350);
    const t2 = setTimeout(() => setShowCoins(true), 700);
    const t3 = setTimeout(() => setShowStorm(true), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  function handleContinue() {
    dispatch({ type: 'CLEAR_REWARD' });
    navigate('worldChange');
  }

  const starCount = reward?.stars ?? 2;

  return (
    <div className="screen" style={{
      background: 'linear-gradient(160deg, #FFF3E0 0%, #FFF8EE 50%, #E8F4E8 100%)',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '44px 28px 36px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Confetti dots */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>
        {CONFETTI_COLORS.flatMap((color, ci) =>
          [18, 35, 55, 75].map(top => (
            <div key={`${ci}-${top}`} style={{
              position: 'absolute',
              width: 7 + ci * 2,
              height: 7 + ci * 2,
              borderRadius: '50%',
              background: color,
              top: `${top}%`,
              left: `${8 + ci * 22}%`,
              opacity: 0.35,
              animation: `float ${2.2 + ci * 0.4}s ease-in-out infinite`,
              animationDelay: `${top * 0.03}s`,
            }}/>
          ))
        )}
      </div>

      <div className="bounce-in" style={{ width: '100%' }}>
        {/* Big emoji */}
        <div style={{ fontSize: 60, marginBottom: 6 }}>🎉</div>

        <h1 style={{ fontSize: 30, fontWeight: 700, color: '#D9683B', margin: '0 0 6px', lineHeight: 1.2 }}>
          You untangled it!
        </h1>
        <p style={{ fontSize: 17, color: '#756B63', margin: '0 0 20px', lineHeight: 1.5 }}>
          {reward?.message ?? 'Amazing work, explorer!'}
        </p>

        <Mindy mood="celebrating" size={130} style={{ display: 'block', margin: '0 auto 20px' }}/>

        {/* Stars */}
        {showStars && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }} className="bounce-in">
            {Array.from({ length: starCount }).map((_, i) => (
              <span key={i} style={{ fontSize: 48, animation: `star-pop 0.5s ease-out ${i * 0.12}s both`, display: 'inline-block' }}>⭐</span>
            ))}
          </div>
        )}

        {/* Reward tiles */}
        {showCoins && (
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 20 }} className="bounce-in">
            {[
              { icon: '🪙', val: `+${reward?.coins ?? 5}`, label: 'Coins', bg: '#FFF3CC', border: '#F6C343' },
              { icon: '⭐', val: `+${starCount}`,         label: 'Stars', bg: '#FFF8EE', border: '#F6C343' },
            ].map(tile => (
              <div key={tile.label} style={{ background: tile.bg, borderRadius: 20, padding: '18px 22px', border: `2px solid ${tile.border}`, boxShadow: '0 4px 16px rgba(36,49,58,0.09)' }}>
                <div style={{ fontSize: 36 }}>{tile.icon}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#24313A' }}>{tile.val}</div>
                <div style={{ fontSize: 12, color: '#756B63' }}>{tile.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Totals */}
        {showStorm && (
          <div style={{ background: 'white', borderRadius: 18, padding: '14px 20px', marginBottom: 24, boxShadow: '0 2px 12px rgba(36,49,58,0.08)' }} className="bounce-in">
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 11, color: '#756B63', margin: '0 0 2px' }}>Total coins</p>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#24313A', margin: 0 }}>🪙 {state.coins}</p>
              </div>
              <div style={{ width: 1, background: '#F7DDD0' }}/>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 11, color: '#756B63', margin: '0 0 2px' }}>Storm cleared</p>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#4B9180', margin: 0 }}>⛅ {state.stormProgress}%</p>
              </div>
              <div style={{ width: 1, background: '#F7DDD0' }}/>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 11, color: '#756B63', margin: '0 0 2px' }}>Cards</p>
                <p style={{ fontSize: 20, fontWeight: 700, color: '#D9683B', margin: 0 }}>📖 {state.lessonCards.length}</p>
              </div>
            </div>
          </div>
        )}

        <button className="btn-primary" onClick={handleContinue} style={{ fontSize: 18, padding: '18px 28px' }}>
          🌟 See what changed!
        </button>
      </div>
    </div>
  );
}
