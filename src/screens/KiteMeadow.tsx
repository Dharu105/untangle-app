import { useState, useMemo, useRef } from 'react';
import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';

const words = [
  { answer: ['C','A','T'], emoji: '🐱', isReal: true },
  { answer: ['S','U','N'], emoji: '☀️', isReal: true },
  { answer: ['D','O','G'], emoji: '🐶', isReal: true },
  { answer: ['H','A','T'], emoji: '🎩', isReal: true },
  { answer: ['B','U','G'], emoji: '🐛', isReal: true },
];

type Phase = 'build' | 'flying' | 'wobbling';

export default function KiteMeadow() {
  const { dispatch, navigate, state } = useGame();
  const [wordIdx, setWordIdx] = useState(0);
  const [slots, setSlots]     = useState<(string | null)[]>([null, null, null]);
  const [phase, setPhase]     = useState<Phase>('build');
  const [score, setScore]     = useState(0);
  const [kiteY, setKiteY]     = useState(80);
  const scoreRef = useRef(0);
  scoreRef.current = score;

  const word = words[wordIdx];
  const tiles = useMemo(() => [...word.answer].sort(() => Math.random() - 0.5), [wordIdx]);

  function slotClick(i: number) {
    if (phase !== 'build' || slots[i] === null) return;
    const s = [...slots]; s[i] = null; setSlots(s);
  }

  function tileClick(letter: string) {
    if (phase !== 'build') return;
    const emptyIdx = slots.findIndex(s => s === null);
    if (emptyIdx === -1) return;
    const s = [...slots]; s[emptyIdx] = letter; setSlots(s);
  }

  function launch() {
    if (slots.some(s => s === null)) return;
    const formed = slots.join('');
    const correct = formed === word.answer.join('');
    setPhase(correct ? 'flying' : 'wobbling');
    if (correct) { setScore(sc => sc + 1); setKiteY(y => y - 28); }
    setTimeout(advance, 2000);
  }

  function advance() {
    if (wordIdx + 1 >= words.length) {
      const finalScore = scoreRef.current;
      const accuracy = Math.round((finalScore / words.length) * 100);
      dispatch({ type: 'UPDATE_SYLLABLE_ACCURACY', delta: Math.round((accuracy - state.syllableAccuracy) * 0.3) });
      dispatch({ type: 'ADVANCE_STORM', amount: 5 });
      dispatch({ type: 'EARN_REWARD', coins: 5 + finalScore, stars: finalScore >= 4 ? 3 : 2, message: `${finalScore} kites launched! 🪁` });
      dispatch({ type: 'COMPLETE_ACTIVITY', activity: { id: Date.now().toString(), type: 'kiteMeadow', completedAt: new Date().toISOString(), accuracy } });
      if (finalScore >= 4 && !state.unlockedCreatures.some(c => c.id === 'kite')) {
        dispatch({ type: 'UNLOCK_CREATURE', creature: { id: 'kite', name: 'Kitey', emoji: '🪁', unlockedAt: 'Kite Meadow' } });
      }
      navigate('reward');
    } else {
      setWordIdx(i => i + 1);
      setSlots([null, null, null]);
      setPhase('build');
    }
  }

  // Track which tile letters have been used
  const usedLetters: Record<string, number> = {};
  slots.forEach(s => { if (s) usedLetters[s] = (usedLetters[s] || 0) + 1; });
  const tileUsedCount: Record<string, number> = {};

  const kiteColor = phase === 'flying' ? '#D9683B' : phase === 'wobbling' ? '#F6C343' : '#DDE9DD';
  const kiteString = phase === 'flying' ? '#4B9180' : '#A09080';

  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg, #A8C8E0 0%, #D0E8D0 50%, #FFF8EE 85%)', minHeight: '100%' }}>

      {/* Header */}
      <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => navigate('villageHome')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#24313A', margin: '0 0 1px' }}>🪁 Kite Meadow</h1>
          <p style={{ fontSize: 12, color: '#756B63', margin: 0 }}>Word {wordIdx + 1} of {words.length}</p>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {words.map((_, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: i < wordIdx ? '#D9683B' : i === wordIdx ? '#F6C343' : '#DDE9DD', transition: 'background 0.3s' }}/>
          ))}
        </div>
      </div>

      {/* Sky + kite scene */}
      <div style={{ margin: '10px 20px', height: 150, position: 'relative', borderRadius: 20, overflow: 'hidden', background: 'linear-gradient(180deg, #7AAEC8 0%, #A8D0E8 100%)' }}>
        <svg viewBox="0 0 350 150" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* Clouds */}
          <ellipse cx="60"  cy="35" rx="48" ry="20" fill="white" opacity="0.6"/>
          <ellipse cx="280" cy="25" rx="60" ry="24" fill="white" opacity="0.55"/>
          {/* Grass */}
          <ellipse cx="175" cy="148" rx="190" ry="18" fill="#B0C890" opacity="0.8"/>
          {/* Kite */}
          <g style={{ transform: `translateY(${kiteY - 80}px)`, transition: 'transform 0.8s ease', animation: phase === 'flying' ? 'float 2s ease-in-out infinite' : phase === 'wobbling' ? 'wiggle 0.5s ease-in-out 3' : 'none' }}>
            <polygon points="175,30 192,50 175,70 158,50" fill={kiteColor} stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
            <line x1="175" y1="70" x2="172" y2="130" stroke={kiteString} strokeWidth="1.5" opacity="0.7"/>
            {/* Letter on kite */}
            <text x="175" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white" opacity="0.9">
              {slots.filter(Boolean).join('')}
            </text>
          </g>
          {/* Emoji reward */}
          {phase === 'flying' && (
            <text x="210" y="40" fontSize="22" className="bounce-in">{word.emoji}</text>
          )}
        </svg>
      </div>

      {/* Mindy + message */}
      <div style={{ padding: '8px 20px 10px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Mindy mood={phase === 'flying' ? 'celebrating' : phase === 'wobbling' ? 'encouraging' : 'curious'} size={68} style={{ flexShrink: 0 }}/>
        <div style={{ flex: 1, background: 'white', borderRadius: '16px 16px 16px 4px', padding: '11px 14px', boxShadow: '0 2px 10px rgba(36,49,58,0.08)' }}>
          {phase === 'build'      && <p style={{ fontSize: 14, color: '#24313A', margin: 0 }}>Tap letters to build a word, then launch the kite! 🪁</p>}
          {phase === 'flying'    && <p style={{ fontSize: 14, color: '#4B9180', margin: 0, fontWeight: 700 }}>🌟 {word.emoji} {word.answer.join('')}! The kite soars!</p>}
          {phase === 'wobbling'  && <p style={{ fontSize: 14, color: '#D9683B', margin: 0 }}>The kite wobbles... Try it again! You're getting there!</p>}
        </div>
      </div>

      {/* Word slots */}
      <div style={{ padding: '0 20px 12px' }}>
        <p style={{ fontSize: 13, color: '#756B63', margin: '0 0 10px', fontWeight: 700 }}>Build the word:</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 14 }}>
          {slots.map((s, i) => (
            <div
              key={i}
              onClick={() => slotClick(i)}
              style={{
                width: 68, height: 68, borderRadius: 16,
                background: s ? '#DDE9DD' : '#F7DDD0',
                border: `2.5px ${s ? 'solid #4B9180' : 'dashed #D9683B'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 30, fontWeight: 700, color: '#24313A',
                cursor: s ? 'pointer' : 'default',
                transition: 'all 0.2s',
                fontFamily: "'OpenDyslexic','Atkinson Hyperlegible',sans-serif",
              }}
            >
              {s || ''}
            </div>
          ))}
        </div>

        {/* Letter tiles */}
        <p style={{ fontSize: 13, color: '#756B63', margin: '0 0 10px', fontWeight: 700 }}>Available letters:</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          {tiles.map((letter, i) => {
            tileUsedCount[letter] = (tileUsedCount[letter] || 0);
            const timesInTiles = tiles.filter(t => t === letter).length;
            const timesUsed = usedLetters[letter] || 0;
            const isThisUsed = tileUsedCount[letter]++ < timesUsed;
            return (
              <button
                key={i}
                onClick={() => !isThisUsed && tileClick(letter)}
                style={{
                  width: 64, height: 64, borderRadius: 14,
                  background: isThisUsed ? '#F0EAE0' : 'white',
                  border: `2px solid ${isThisUsed ? '#E8E0D8' : '#F7DDD0'}`,
                  fontSize: 26, fontWeight: 700, color: isThisUsed ? '#C0B8B0' : '#24313A',
                  cursor: isThisUsed ? 'default' : 'pointer',
                  boxShadow: isThisUsed ? 'none' : '0 3px 10px rgba(36,49,58,0.09)',
                  transition: 'all 0.2s',
                  fontFamily: "'OpenDyslexic','Atkinson Hyperlegible',sans-serif",
                }}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Launch button */}
      {phase === 'build' && (
        <div style={{ padding: '0 20px 24px' }}>
          <button
            className="btn-primary"
            onClick={launch}
            disabled={slots.some(s => s === null)}
            style={{ opacity: slots.some(s => s === null) ? 0.45 : 1, fontSize: 18, padding: '18px' }}
          >
            🪁 Launch Kite!
          </button>
          {slots.some(s => s !== null) && (
            <button
              onClick={() => setSlots([null, null, null])}
              style={{ width: '100%', marginTop: 10, background: 'transparent', border: 'none', color: '#756B63', fontSize: 14, cursor: 'pointer', fontFamily: "'OpenDyslexic','Atkinson Hyperlegible',sans-serif", padding: '8px' }}
            >
              Clear & start again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
