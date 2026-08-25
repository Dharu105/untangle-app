import { useState } from 'react';
import { useGame } from '../context/GameContext';
import Mindy from '../components/Mindy';

const pages = [
  {
    title: 'The Brave Little Sun',
    text: 'The sun woke up and saw the storm clouds. "I will shine!" said the sun. The clouds moved away.',
    highlight: ['sun', 'storm', 'shine'],
    emoji: '☀️',
  },
  {
    title: "Mindy's Big Day",
    text: 'Mindy the fox wanted to help. She found a word on the path. She sounded it out: S-U-N. Sun!',
    highlight: ['fox', 'word', 'path'],
    emoji: '🦊',
  },
];

export default function BookCorner() {
  const { dispatch, navigate, state } = useGame();
  const [pageIdx, setPageIdx] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [tappedWord, setTappedWord] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const page = pages[pageIdx];

  function handleScan() {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2000);
  }

  function renderText(text: string) {
    const words = text.split(' ');
    return words.map((word, i) => {
      const clean = word.replace(/[.,!?]/g, '').toLowerCase();
      const isHighlight = page.highlight.includes(clean);
      return (
        <span
          key={i}
          onClick={() => isHighlight && setTappedWord(clean)}
          style={{
            fontSize: 18,
            lineHeight: 1.8,
            color: tappedWord === clean ? '#D9683B' : '#24313A',
            background: isHighlight ? (tappedWord === clean ? '#F7DDD0' : '#DDE9DD') : 'transparent',
            borderRadius: 6,
            padding: isHighlight ? '1px 4px' : '0',
            cursor: isHighlight ? 'pointer' : 'default',
            fontWeight: isHighlight ? 700 : 400,
            marginRight: 4,
            transition: 'all 0.2s',
          }}
        >
          {word}{' '}
        </span>
      );
    });
  }

  function handleFinish() {
    dispatch({ type: 'UPDATE_READING_PROGRESS', delta: 8 });
    dispatch({ type: 'ADVANCE_STORM', amount: 4 });
    dispatch({ type: 'EARN_REWARD', coins: 5, stars: 2, message: 'Story explored! 📖' });
    dispatch({ type: 'COMPLETE_ACTIVITY', activity: { id: Date.now().toString(), type: 'bookCorner', completedAt: new Date().toISOString(), accuracy: 100 } });
    if (!state.unlockedCreatures.some(c => c.id === 'book')) {
      dispatch({ type: 'UNLOCK_CREATURE', creature: { id: 'book', name: 'Pages', emoji: '📖', unlockedAt: 'Book Corner' } });
    }
    navigate('reward');
  }

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('villageHome')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: '0 0 2px' }}>📖 Book Corner</h1>
          <p style={{ fontSize: 13, color: '#756B63', margin: 0 }}>Let's explore a page!</p>
        </div>
      </div>

      {!scanned ? (
        /* Scan card */
        <div style={{ padding: '24px' }}>
          <div style={{ background: 'white', borderRadius: 24, padding: '32px 24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(36,49,58,0.1)' }}>
            <span style={{ fontSize: 64, display: 'block', marginBottom: 16 }}>📚</span>
            <h2 style={{ fontSize: 22, color: '#24313A', margin: '0 0 10px' }}>Scan Adventure Card</h2>
            <p style={{ fontSize: 15, color: '#756B63', margin: '0 0 24px' }}>
              Tap to scan your story card and bring it to life!
            </p>

            {scanning ? (
              <div style={{ padding: '20px' }}>
                <div style={{ width: 120, height: 120, border: '3px solid #D9683B', borderRadius: 16, margin: '0 auto 16px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, height: 3,
                    background: '#D9683B',
                    animation: 'scan-line 2s linear forwards',
                  }}/>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(217,104,59,0.1) 0%, transparent 100%)', animation: 'float 1s ease-in-out infinite' }}/>
                  <span style={{ fontSize: 40, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>📖</span>
                </div>
                <p style={{ color: '#D9683B', fontWeight: 700, fontSize: 15 }}>Scanning...</p>
              </div>
            ) : (
              <button className="btn-primary" onClick={handleScan}>
                📷 Scan Adventure Card
              </button>
            )}
          </div>

          <div style={{ marginTop: 20, background: '#DDE9DD', borderRadius: 16, padding: '14px 16px' }}>
            <p style={{ fontSize: 13, color: '#4B9180', margin: 0 }}>
              🌟 Tap highlighted words to hear them!
            </p>
          </div>
        </div>
      ) : (
        /* Story page */
        <div style={{ padding: '16px 24px 24px' }}>
          {/* Book */}
          <div style={{ background: 'white', borderRadius: 24, padding: '24px', boxShadow: '0 4px 20px rgba(36,49,58,0.1)', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 32 }}>{page.emoji}</span>
              <h2 style={{ fontSize: 20, color: '#24313A', margin: 0 }}>{page.title}</h2>
            </div>
            <div style={{ fontSize: 18, lineHeight: 1.8, color: '#24313A' }}>
              {renderText(page.text)}
            </div>
            <div style={{ marginTop: 14, background: '#F7DDD0', borderRadius: 10, padding: '10px 12px' }}>
              <p style={{ fontSize: 13, color: '#D9683B', margin: 0 }}>
                💡 Tap the <strong>coloured words</strong> to practise them!
              </p>
            </div>
          </div>

          {tappedWord && (
            <div className="card bounce-in" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Mindy mood="happy" size={52}/>
                <div>
                  <p style={{ fontSize: 15, color: '#4B9180', fontWeight: 700, margin: '0 0 2px' }}>
                    🔉 "{tappedWord.toUpperCase()}"
                  </p>
                  <p style={{ fontSize: 13, color: '#756B63', margin: 0 }}>You're practising this sound! ✨</p>
                </div>
              </div>
            </div>
          )}

          {/* Page nav */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => { setPageIdx(i); setTappedWord(null); }}
                style={{
                  flex: 1, padding: '12px', borderRadius: 12,
                  background: pageIdx === i ? '#D9683B' : 'white',
                  color: pageIdx === i ? 'white' : '#756B63',
                  border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700,
                  fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif",
                  boxShadow: '0 2px 8px rgba(36,49,58,0.07)',
                }}
              >
                Page {i + 1}
              </button>
            ))}
          </div>

          <button className="btn-primary" onClick={handleFinish}>
            🌟 I explored it! Finish
          </button>
        </div>
      )}
    </div>
  );
}
