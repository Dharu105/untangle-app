import { useState, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';

const rounds = [
  { target: 'B', pool: ['D','P','Q','R','B','G','E','F','H','I','J','K'], hint: 'B has a bump on the RIGHT side!' },
  { target: 'D', pool: ['B','P','D','Q','G','O','C','R','N','M','S','T'], hint: 'D has a stick on the LEFT side!' },
  { target: 'M', pool: ['N','W','M','H','U','V','Y','X','A','Z','L','K'], hint: 'M has two humps going UP!' },
  { target: 'P', pool: ['B','D','P','Q','F','G','R','E','T','Y','H','J'], hint: 'P has its bump at the TOP right!' },
  { target: 'S', pool: ['Z','S','C','5','G','J','E','F','2','8','3','9'], hint: 'S curves like a little snake!' },
];

export default function LetterGrove() {
  const { dispatch, navigate, state } = useGame();
  const [roundIdx, setRoundIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<'question' | 'correct' | 'hint'>('question');
  const [score, setScore] = useState(0);
  const [treeCount, setTreeCount] = useState(0);

  const round = rounds[roundIdx];

  // Shuffle and pick 8 letters including the target
  const letters = useMemo(() => {
    const pool = round.pool.filter(l => l !== round.target);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const pick = shuffled.slice(0, 7);
    const withTarget = [round.target, ...pick].sort(() => Math.random() - 0.5);
    return withTarget;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIdx]);

  function handleSelect(letter: string) {
    if (selected) return;
    setSelected(letter);
    if (letter === round.target) {
      setPhase('correct');
      setScore(s => s + 1);
      setTreeCount(t => Math.min(t + 1, 5));
    } else {
      setPhase('hint');
    }
  }

  function handleNext() {
    if (roundIdx + 1 >= rounds.length) {
      const accuracy = Math.round((score / rounds.length) * 100);
      dispatch({ type: 'UPDATE_LETTER_ACCURACY', delta: Math.round((accuracy - state.letterAccuracy) * 0.3) });
      dispatch({ type: 'ADVANCE_STORM', amount: 5 });
      dispatch({ type: 'EARN_REWARD', coins: 4 + score, stars: score >= 4 ? 3 : score >= 2 ? 2 : 1, message: `${score} letter friends found! 🌳` });
      navigate('reward');
    } else {
      setRoundIdx(r => r + 1);
      setSelected(null);
      setPhase('question');
    }
  }

  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg, #D0E8D0 0%, #EEF6EE 35%, #FFF8EE 65%)', minHeight: '100%' }}>

      {/* Header */}
      <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => navigate('villageHome')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#24313A', margin: '0 0 1px' }}>🌳 Letter Grove</h1>
          <p style={{ fontSize: 12, color: '#756B63', margin: 0 }}>Round {roundIdx + 1} of {rounds.length}</p>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {rounds.map((_, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: i < roundIdx ? '#4B9180' : i === roundIdx ? '#D9683B' : '#DDE9DD', transition: 'background 0.3s' }}/>
          ))}
        </div>
      </div>

      {/* Grove scene — trees grow */}
      <div style={{ margin: '12px 20px 0', height: 64, background: 'rgba(200,232,200,0.4)', borderRadius: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly', padding: '0 16px 6px', overflow: 'hidden' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: i < treeCount ? 28 : 16, transition: 'font-size 0.6s ease', opacity: i < treeCount ? 1 : 0.3 }}>🌳</span>
          </div>
        ))}
        <span style={{ fontSize: 11, color: '#4B9180', fontWeight: 700, alignSelf: 'center', marginLeft: 8 }}>
          {treeCount}/{rounds.length} joined!
        </span>
      </div>

      {/* Target letter */}
      <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ flex: 1, background: '#F7DDD0', borderRadius: 20, padding: '16px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 70, height: 70, borderRadius: 18, background: '#D9683B', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(217,104,59,0.3)', flexShrink: 0 }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: 'white', fontFamily: "'OpenDyslexic','Atkinson Hyperlegible',sans-serif" }}>{round.target}</span>
          </div>
          <div>
            <p style={{ fontSize: 13, color: '#756B63', margin: '0 0 3px' }}>Find this letter friend:</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: 0 }}>{round.target}</p>
          </div>
        </div>
        <Mindy mood={phase === 'correct' ? 'celebrating' : phase === 'hint' ? 'encouraging' : 'curious'} size={72} style={{ flexShrink: 0 }}/>
      </div>

      {/* Mindy hint */}
      {phase !== 'question' && (
        <div style={{ margin: '0 20px 10px', background: phase === 'correct' ? '#DDE9DD' : '#FFF3E8', borderRadius: 14, padding: '12px 16px' }} className="slide-up">
          <p style={{ fontSize: 14, color: phase === 'correct' ? '#4B9180' : '#D9683B', margin: 0, fontWeight: 700, lineHeight: 1.5 }}>
            {phase === 'correct' ? `🌳 Found it! ${round.target} joins the village!` : `💡 ${round.hint}`}
          </p>
        </div>
      )}

      {/* Letter grid */}
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 9 }}>
        {letters.map((letter, i) => {
          const isTarget = letter === round.target;
          const isChosen = selected === letter;
          const isReveal = selected !== null && isTarget;
          return (
            <button
              key={`${letter}-${i}`}
              onClick={() => handleSelect(letter)}
              style={{
                height: 62,
                borderRadius: 14,
                border: `2.5px solid ${isReveal ? '#4B9180' : isChosen && !isTarget ? '#F7DDD0' : 'transparent'}`,
                background: isReveal ? '#DDE9DD' : isChosen && !isTarget ? '#FFF3E8' : 'white',
                fontSize: 26,
                fontWeight: 700,
                color: '#24313A',
                cursor: selected ? 'default' : 'pointer',
                boxShadow: '0 2px 8px rgba(36,49,58,0.07)',
                transition: 'all 0.2s',
                fontFamily: "'OpenDyslexic','Atkinson Hyperlegible',sans-serif",
                transform: isReveal ? 'scale(1.06)' : 'scale(1)',
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {selected && (
        <div style={{ padding: '16px 20px' }} className="slide-up">
          <button className="btn-primary" onClick={handleNext}>
            {roundIdx + 1 >= rounds.length ? '🎉 Finish!' : 'Next letter →'}
          </button>
        </div>
      )}
    </div>
  );
}
