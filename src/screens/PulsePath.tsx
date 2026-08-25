import { useState, useEffect, useRef } from 'react';import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';

const patterns = [
  { word: 'SUN', syllables: 1, pattern: [1], display: 'SUN' },
  { word: 'CAT-FISH', syllables: 2, pattern: [1, 1], display: 'CAT • FISH' },
  { word: 'EL-E-PHANT', syllables: 3, pattern: [1, 1, 1], display: 'EL • E • PHANT' },
  { word: 'BUT-TER-FLY', syllables: 3, pattern: [1, 1, 1], display: 'BUT • TER • FLY' },
  { word: 'SPI-DER', syllables: 2, pattern: [1, 1], display: 'SPI • DER' },
];

export default function PulsePath() {
  const { dispatch, navigate, state } = useGame();
  const [patIdx, setPatIdx] = useState(0);
  const [phase, setPhase] = useState<'preview' | 'tap' | 'result'>('preview');
  const [taps, setTaps] = useState<number[]>([]);
  const [pathLit, setPathLit] = useState(0);
  const [score, setScore] = useState(0);
  const [mindyPos, setMindyPos] = useState(0);
  const [previewBeat, setPreviewBeat] = useState(-1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scoreRef = useRef(0);
  scoreRef.current = score;

  const pat = patterns[patIdx];

  useEffect(() => {
    if (phase === 'preview') {
      let i = 0;
      function showBeat() {
        setPreviewBeat(i);
        i++;
        if (i < pat.syllables) {
          timeoutRef.current = setTimeout(showBeat, 600);
        } else {
          timeoutRef.current = setTimeout(() => {
            setPreviewBeat(-1);
            setPhase('tap');
            setTaps([]);
          }, 600);
        }
      }
      timeoutRef.current = setTimeout(showBeat, 800);
    }
    return () => { if (timeoutRef.current !== null) clearTimeout(timeoutRef.current); };
  }, [phase, patIdx]);

  function handleTap() {
    if (phase !== 'tap') return;
    const newTaps = [...taps, Date.now()];
    setTaps(newTaps);
    setPathLit(newTaps.length);
    if (newTaps.length >= pat.syllables) {
      const correct = newTaps.length === pat.syllables;
      setPhase('result');
      if (correct) {
        setScore(s => s + 1);
        setMindyPos(p => p + 1);
      }
      setTimeout(() => {
        if (patIdx + 1 >= patterns.length) {
          const finalScore = scoreRef.current;
          const accuracy = Math.round((finalScore / patterns.length) * 100);
          dispatch({ type: 'UPDATE_SYLLABLE_ACCURACY', delta: Math.round((accuracy - state.syllableAccuracy) * 0.3) });
          dispatch({ type: 'ADVANCE_STORM', amount: 5 });
          dispatch({ type: 'EARN_REWARD', coins: 4 + finalScore, stars: finalScore >= 3 ? 3 : 2, message: `${finalScore} beats matched!` });
          dispatch({ type: 'COMPLETE_ACTIVITY', activity: { id: Date.now().toString(), type: 'pulsePath', completedAt: new Date().toISOString(), accuracy } });
          if (finalScore >= 3 && !state.unlockedCreatures.some(c => c.id === 'drum')) {
            dispatch({ type: 'UNLOCK_CREATURE', creature: { id: 'drum', name: 'Drum', emoji: '🥁', unlockedAt: 'Pulse Path' } });
          }
          navigate('reward');
        } else {
          setPatIdx(i => i + 1);
          setTaps([]);
          setPathLit(0);
          setPhase('preview');
        }
      }, 1500);
    }
  }

  const pathDots = 5;

  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg, #FFF8EE 0%, #DDE9DD 100%)', minHeight: '100%' }}>
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('villageHome')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: '0 0 2px' }}>🥁 Pulse Path</h1>
          <p style={{ fontSize: 13, color: '#756B63', margin: 0 }}>Follow the village beat</p>
        </div>
      </div>

      {/* Path */}
      <div style={{ padding: '24px 24px 0' }}>
        <div style={{ background: '#DDE9DD', borderRadius: 20, padding: '20px', position: 'relative' }}>
          {/* Mindy walking */}
          <div style={{
            position: 'absolute',
            top: 10,
            left: `${(mindyPos / pathDots) * 80 + 5}%`,
            transition: 'left 0.5s ease',
          }}>
            <Mindy mood={phase === 'result' && taps.length === pat.syllables ? 'celebrating' : 'happy'} size={48}/>
          </div>

          <div style={{ height: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '0 8px' }}>
            {Array.from({ length: pathDots }).map((_, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div
                  className="pulse-dot"
                  style={{
                    background: i < pathLit ? '#D9683B' : previewBeat === i ? '#F6C343' : '#F7DDD0',
                    transform: (i < pathLit || previewBeat === i) ? 'scale(1.4)' : 'scale(1)',
                    transition: 'all 0.15s',
                    borderColor: i < pathLit ? '#D9683B' : '#D9683B',
                  }}
                />
                <div style={{ width: 2, height: 20, background: i < pathLit ? '#D9683B' : '#DDE9DD', opacity: 0.7, borderRadius: 1 }}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Word display */}
      <div style={{ padding: '20px 24px', textAlign: 'center' }}>
        <div style={{ background: 'white', borderRadius: 18, padding: '20px', boxShadow: '0 4px 16px rgba(36,49,58,0.08)' }}>
          <p style={{ fontSize: 14, color: '#756B63', margin: '0 0 8px' }}>Count the syllables:</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: '#24313A', margin: '0 0 4px', letterSpacing: '0.1em' }}>{pat.display}</p>
          <p style={{ fontSize: 14, color: '#D9683B', margin: 0, fontWeight: 700 }}>{pat.syllables} beat{pat.syllables !== 1 ? 's' : ''}</p>

          {/* Beat indicators */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 14 }}>
            {Array.from({ length: pat.syllables }).map((_, i) => (
              <div key={i} style={{
                width: 36, height: 36, borderRadius: 10,
                background: previewBeat === i ? '#F6C343' : taps.length > i ? '#D9683B' : '#F7DDD0',
                border: `2px solid ${taps.length > i ? '#D9683B' : '#E8D5C4'}`,
                transition: 'all 0.15s',
                transform: previewBeat === i || taps.length > i ? 'scale(1.2)' : 'scale(1)',
              }}/>
            ))}
          </div>
        </div>

        {/* Phase message */}
        <div style={{ marginTop: 14, background: '#F7DDD0', borderRadius: 14, padding: '12px' }}>
          {phase === 'preview' && <p style={{ fontSize: 15, color: '#24313A', margin: 0 }}>🎵 Watch the beat... then copy it!</p>}
          {phase === 'tap' && <p style={{ fontSize: 15, color: '#D9683B', fontWeight: 700, margin: 0 }}>Tap {pat.syllables} time{pat.syllables !== 1 ? 's' : ''}! 👇</p>}
          {phase === 'result' && taps.length === pat.syllables && <p style={{ fontSize: 15, color: '#4B9180', fontWeight: 700, margin: 0 }}>🌟 Perfect beat! Mindy dances!</p>}
          {phase === 'result' && taps.length !== pat.syllables && <p style={{ fontSize: 15, color: '#D9683B', margin: 0 }}>Almost! Let's try the next one!</p>}
        </div>
      </div>

      {/* Big tap button */}
      {phase === 'tap' && (
        <div style={{ padding: '0 24px 24px' }}>
          <button
            onClick={handleTap}
            style={{
              width: '100%',
              height: 100,
              borderRadius: 24,
              background: '#D9683B',
              border: 'none',
              fontSize: 40,
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(217,104,59,0.4)',
              transition: 'transform 0.1s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif",
            }}
            onMouseDown={e => { (e.target as HTMLElement).style.transform = 'scale(0.95)'; }}
            onMouseUp={e => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
          >
            <span>🥁</span>
            <span style={{ fontSize: 20, color: 'white', fontWeight: 700 }}>TAP!</span>
          </button>
        </div>
      )}
    </div>
  );
}
