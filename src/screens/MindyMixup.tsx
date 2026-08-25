import { useState } from 'react';
import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';

const mistakes = [
  {
    mindySays: '"dog" starts with the B sound!',
    correct: 'D',
    options: ['B', 'D', 'P'],
    pattern: 'B / D',
    lesson: 'B makes the buh sound, D makes the duh sound!',
    example: 'Ball vs Doll',
  },
  {
    mindySays: '"moon" starts with the N sound!',
    correct: 'M',
    options: ['N', 'M', 'W'],
    pattern: 'M / N',
    lesson: 'M has two humps, N has one hump!',
    example: 'Moon vs Night',
  },
  {
    mindySays: '"pat" sounds like "bat"!',
    correct: 'P',
    options: ['B', 'P', 'D'],
    pattern: 'P / B',
    lesson: 'P points down, B points right!',
    example: 'Pat vs Bat',
  },
  {
    mindySays: '"ship" starts with the S sound alone!',
    correct: 'SH',
    options: ['S', 'SH', 'CH'],
    pattern: 'SH sound',
    lesson: 'SH together makes a hushing sound — shhhh!',
    example: 'Ship, Shell, Shop',
  },
];

export default function MindyMixup() {
  const { dispatch, navigate, state } = useGame();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<'question' | 'teaching' | 'learned'>('question');
  const [cardsEarned, setCardsEarned] = useState(0);

  const mistake = mistakes[idx];

  function handleSelect(opt: string) {
    if (selected) return;
    setSelected(opt);
    if (opt === mistake.correct) {
      setPhase('teaching');
      setCardsEarned(c => c + 1);
    } else {
      setPhase('teaching');
    }
  }

  function handleLearned() {
    dispatch({ type: 'ADD_LESSON_CARD', card: {
      id: Date.now().toString(),
      pattern: mistake.pattern,
      example: mistake.example,
      date: 'Just now',
      description: mistake.lesson,
    }});
    setPhase('learned');
    setTimeout(() => {
      if (idx + 1 >= mistakes.length) {
        dispatch({ type: 'ADVANCE_STORM', amount: 6 });
        dispatch({ type: 'EARN_REWARD', coins: 6 + cardsEarned, stars: 3, message: `${cardsEarned} lesson cards earned!` });
        dispatch({ type: 'COMPLETE_ACTIVITY', activity: { id: Date.now().toString(), type: 'mindyMixup', completedAt: new Date().toISOString(), accuracy: Math.round((cardsEarned / mistakes.length) * 100) } });
        if (!state.unlockedCreatures.some(c => c.id === 'owl')) {
          dispatch({ type: 'UNLOCK_CREATURE', creature: { id: 'owl', name: 'Hoot', emoji: '🦉', unlockedAt: 'Mindy\'s House' } });
        }
        navigate('reward');
      } else {
        setIdx(i => i + 1);
        setSelected(null);
        setPhase('question');
      }
    }, 1200);
  }

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('villageHome')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: '0 0 2px' }}>🐱 Mindy's House</h1>
          <p style={{ fontSize: 13, color: '#756B63', margin: 0 }}>Teach Mindy something new!</p>
        </div>
      </div>

      {/* Mindy's house scene */}
      <div style={{ padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ background: '#F7DDD0', borderRadius: 24, padding: '24px 20px', position: 'relative' }}>
          <Mindy mood={phase === 'learned' ? 'celebrating' : phase === 'teaching' ? 'thinking' : 'confused'} size={110} className="float-anim"/>

          {/* Speech bubble */}
          <div style={{
            background: 'white',
            borderRadius: 18,
            padding: '16px 18px',
            marginTop: 12,
            boxShadow: '0 4px 16px rgba(36,49,58,0.1)',
            position: 'relative',
          }}>
            {phase === 'question' && (
              <>
                <p style={{ fontSize: 13, color: '#756B63', margin: '0 0 6px', fontWeight: 700 }}>Oops! Mindy made a mistake:</p>
                <p style={{ fontSize: 17, color: '#24313A', margin: 0, lineHeight: 1.5 }}>
                  "Mindy thinks: {mistake.mindySays}"
                </p>
                <p style={{ fontSize: 14, color: '#D9683B', margin: '10px 0 0' }}>Can you teach Mindy the right answer? 🎓</p>
              </>
            )}
            {phase === 'teaching' && (
              <>
                <p style={{ fontSize: 14, color: '#24313A', fontWeight: 700, margin: '0 0 6px' }}>
                  {selected === mistake.correct ? '✅ That\'s right!' : 'Hmm, the answer is ' + mistake.correct + '!'}
                </p>
                <p style={{ fontSize: 16, color: '#4B9180', margin: 0, lineHeight: 1.5 }}>
                  "{mistake.lesson}"
                </p>
                <p style={{ fontSize: 13, color: '#756B63', margin: '8px 0 0' }}>Example: {mistake.example}</p>
              </>
            )}
            {phase === 'learned' && (
              <p style={{ fontSize: 17, color: '#4B9180', fontWeight: 700, margin: 0 }}>
                Ohhh! Now I understand! Thank you! 🌟
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Answer options */}
      {phase === 'question' && (
        <div style={{ padding: '0 24px' }}>
          <p style={{ fontSize: 15, color: '#756B63', marginBottom: 12 }}>Which is correct?</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {mistake.options.map(opt => (
              <button
                key={opt}
                className="game-card"
                onClick={() => handleSelect(opt)}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#24313A',
                  padding: '20px 10px',
                  background: selected === opt ? (opt === mistake.correct ? '#DDE9DD' : '#F7DDD0') : 'white',
                  borderColor: selected === opt ? (opt === mistake.correct ? '#4B9180' : '#D9683B') : 'transparent',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lesson card preview */}
      {phase === 'teaching' && (
        <div style={{ padding: '0 24px 24px' }} className="bounce-in">
          <div style={{ background: '#DDE9DD', borderRadius: 18, padding: '16px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>📖</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#24313A' }}>New Lesson Card!</span>
            </div>
            <p style={{ fontSize: 17, fontWeight: 700, color: '#D9683B', margin: '0 0 4px' }}>Pattern: {mistake.pattern}</p>
            <p style={{ fontSize: 14, color: '#24313A', margin: 0 }}>{mistake.lesson}</p>
          </div>
          <button className="btn-primary" onClick={handleLearned}>
            📚 Save to Collection!
          </button>
        </div>
      )}
    </div>
  );
}
