import { useState } from 'react';
import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';
import type { MindyMood } from '../types';

const rounds = [
  { prompt: 'Which word starts with the S sound?',    target: 'SUN',   options: ['SUN',  'BALL',  'FISH'],  emoji: ['☀️','⚽','🐟'], audio: 'sss...' },
  { prompt: 'Which word starts with the M sound?',    target: 'MOON',  options: ['STAR', 'MOON',  'ROSE'],  emoji: ['⭐','🌙','🌹'], audio: 'mmm...' },
  { prompt: 'Which word ends with the T sound?',      target: 'CAT',   options: ['DOG',  'CAT',   'BEE'],   emoji: ['🐶','🐱','🐝'], audio: '...t'   },
  { prompt: 'Which word has the short A sound?',      target: 'HAT',   options: ['KITE', 'HAT',   'MOON'],  emoji: ['🪁','🎩','🌙'], audio: 'aaa...' },
  { prompt: 'Which word starts with the F sound?',    target: 'FROG',  options: ['FROG', 'BIRD',  'LION'],  emoji: ['🐸','🐦','🦁'], audio: 'fff...' },
];

export default function SoundGarden() {
  const { dispatch, navigate, state } = useGame();
  const [roundIdx, setRoundIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<'question' | 'correct' | 'hint'>('question');
  const [score, setScore] = useState(0);
  const [mindyMood, setMindyMood] = useState<MindyMood>('curious');
  const [flowerCount, setFlowerCount] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const round = rounds[roundIdx];

  function handleSelect(option: string) {
    if (selected) return;
    setSelected(option);
    if (option === round.target) {
      setPhase('correct');
      setScore(s => s + 1);
      setFlowerCount(f => Math.min(f + 1, 5));
      setMindyMood('celebrating');
    } else {
      setPhase('hint');
      setMindyMood('encouraging');
    }
  }

  function simulateAudio() {
    setAudioPlaying(true);
    setTimeout(() => setAudioPlaying(false), 800);
  }

  function handleNext() {
    if (roundIdx + 1 >= rounds.length) finishGame();
    else {
      setRoundIdx(r => r + 1);
      setSelected(null);
      setPhase('question');
      setMindyMood('curious');
    }
  }

  function finishGame() {
    const accuracy = Math.round((score / rounds.length) * 100);
    dispatch({ type: 'UPDATE_SOUND_ACCURACY', delta: Math.round((accuracy - state.soundAccuracy) * 0.3) });
    dispatch({ type: 'ADVANCE_STORM', amount: 5 });
    dispatch({ type: 'EARN_REWARD', coins: 5 + score, stars: score >= 4 ? 3 : score >= 2 ? 2 : 1, message: `You untangled ${score} sounds! 🔊` });
    dispatch({ type: 'COMPLETE_ACTIVITY', activity: { id: Date.now().toString(), type: 'soundGarden', completedAt: new Date().toISOString(), accuracy } });
    if (score >= 4 && !state.unlockedCreatures.some(c => c.id === 'bird')) {
      dispatch({ type: 'UNLOCK_CREATURE', creature: { id: 'bird', name: 'Song', emoji: '🐦', unlockedAt: 'Sound Garden' } });
    }
    navigate('reward');
  }

  const cardStyle = (opt: string): React.CSSProperties => {
    const base: React.CSSProperties = { flex: 1, borderRadius: 20, padding: '20px 10px', border: '2.5px solid', cursor: selected ? 'default' : 'pointer', textAlign: 'center', transition: 'all 0.25s', background: 'white', fontFamily: "'OpenDyslexic','Atkinson Hyperlegible',sans-serif" };
    if (!selected) return { ...base, borderColor: '#F7DDD0', boxShadow: '0 3px 14px rgba(36,49,58,0.09)' };
    if (opt === round.target) return { ...base, borderColor: '#4B9180', background: '#DDE9DD', transform: 'scale(1.04)' };
    if (opt === selected) return { ...base, borderColor: '#F7DDD0', background: '#FFF8EE', opacity: 0.7 };
    return { ...base, borderColor: '#F0ECE6', opacity: 0.5 };
  };

  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg, #C8E0D0 0%, #E8F2E8 30%, #FFF8EE 65%)', minHeight: '100%' }}>

      {/* Header */}
      <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => navigate('villageHome')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#24313A', margin: '0 0 1px' }}>🔊 Sound Garden</h1>
          <p style={{ fontSize: 12, color: '#756B63', margin: 0 }}>Round {roundIdx + 1} of {rounds.length}</p>
        </div>
        {/* Round dots */}
        <div style={{ display: 'flex', gap: 5 }}>
          {rounds.map((_, i) => (
            <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: i < roundIdx ? '#4B9180' : i === roundIdx ? '#D9683B' : '#DDE9DD', transition: 'background 0.3s' }}/>
          ))}
        </div>
      </div>

      {/* Garden scene — flowers grow as child gets answers right */}
      <div style={{ margin: '12px 20px 4px', height: 72, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-evenly', background: 'rgba(255,248,238,0.5)', borderRadius: 16, padding: '0 12px 8px', overflow: 'hidden' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <span style={{ fontSize: i < flowerCount ? 22 : 14, transition: 'font-size 0.5s ease', opacity: i < flowerCount ? 1 : 0.25 }}>
              {['🌸','🌼','🌺','🌻','🌷'][i]}
            </span>
            <div style={{ width: 3, height: i < flowerCount ? 28 : 18, background: '#4B9180', borderRadius: 2, opacity: i < flowerCount ? 0.8 : 0.25, transition: 'height 0.5s ease, opacity 0.5s ease' }}/>
          </div>
        ))}
      </div>

      {/* Mindy + speech bubble */}
      <div style={{ padding: '8px 20px 12px', display: 'flex', alignItems: 'flex-end', gap: 10 }}>
        <Mindy mood={mindyMood} size={88} style={{ flexShrink: 0 }}/>
        <div style={{ flex: 1, background: 'white', borderRadius: '18px 18px 18px 4px', padding: '14px 16px', boxShadow: '0 4px 16px rgba(36,49,58,0.09)' }}>
          {phase === 'question' && (
            <>
              <p style={{ fontSize: 16, color: '#24313A', margin: '0 0 10px', lineHeight: 1.5, fontWeight: 700 }}>{round.prompt}</p>
              <button
                onClick={simulateAudio}
                style={{ background: audioPlaying ? '#D9683B' : '#DDE9DD', border: 'none', borderRadius: 10, padding: '8px 14px', fontSize: 13, color: audioPlaying ? 'white' : '#4B9180', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'OpenDyslexic','Atkinson Hyperlegible',sans-serif", transition: 'all 0.2s' }}
              >
                {audioPlaying ? '🔊 Playing...' : '🔉 Hear it again'}
              </button>
            </>
          )}
          {phase === 'correct' && <p style={{ fontSize: 16, color: '#4B9180', margin: 0, fontWeight: 700, lineHeight: 1.5 }}>🌸 Amazing! A flower grew in the garden!</p>}
          {phase === 'hint' && <p style={{ fontSize: 15, color: '#D9683B', margin: 0, lineHeight: 1.5 }}>Almost! Let's listen again and try another way. 🎵</p>}
        </div>
      </div>

      {/* Answer cards */}
      <div style={{ padding: '0 20px', display: 'flex', gap: 10 }}>
        {round.options.map((opt, i) => (
          <button key={opt} style={cardStyle(opt)} onClick={() => handleSelect(opt)}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>{round.emoji[i]}</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#24313A' }}>{opt}</div>
            {selected && opt === round.target && <div style={{ fontSize: 20, marginTop: 8 }}>✓</div>}
          </button>
        ))}
      </div>

      {/* Next button */}
      {selected && (
        <div style={{ padding: '18px 20px' }} className="slide-up">
          <button className="btn-primary" onClick={handleNext}>
            {roundIdx + 1 >= rounds.length ? '🎉 Finish Adventure!' : 'Next sound →'}
          </button>
        </div>
      )}
    </div>
  );
}
