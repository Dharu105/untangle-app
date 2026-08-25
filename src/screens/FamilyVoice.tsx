import { useState, useRef } from 'react';
import { useGame } from '../context/GameContext';

export default function FamilyVoice() {
  const { navigate } = useGame();
  const [phase, setPhase] = useState<'idle' | 'recording' | 'recorded' | 'playing'>('idle');
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startRecording() {
    setPhase('recording');
    setSeconds(0);
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s >= 15) { stopRecording(); return s; }
        return s + 1;
      });
    }, 1000);
  }

  function stopRecording() {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    setPhase('recorded');
  }

  function playBack() {
    setPhase('playing');
    setTimeout(() => setPhase('recorded'), 3000);
  }

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '24px 24px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('parentDashboard')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: 0 }}>👨‍👩‍👧 Family Voice</h1>
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        <div className="card" style={{ marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎤</div>
          <h2 style={{ fontSize: 22, color: '#24313A', margin: '0 0 8px' }}>Add a Familiar Voice</h2>
          <p style={{ fontSize: 15, color: '#756B63', lineHeight: 1.5, margin: '0 0 24px' }}>
            Record a short message to encourage your child during their adventure!
          </p>

          {/* Recording circle */}
          <div style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            margin: '0 auto 20px',
            background: phase === 'recording' ? '#D9683B' : phase === 'playing' ? '#4B9180' : '#F7DDD0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
            boxShadow: phase === 'recording' ? '0 0 0 12px rgba(217,104,59,0.2), 0 0 0 24px rgba(217,104,59,0.1)' : '0 4px 16px rgba(36,49,58,0.1)',
            transition: 'all 0.3s',
            cursor: 'pointer',
            position: 'relative',
          }}
            onClick={phase === 'idle' ? startRecording : phase === 'recording' ? stopRecording : undefined}
          >
            {phase === 'idle' && '🎤'}
            {phase === 'recording' && '⏹️'}
            {phase === 'recorded' && '✅'}
            {phase === 'playing' && '🔊'}

            {phase === 'recording' && (
              <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '3px solid #D9683B', animation: 'pulse-ring 1s ease-out infinite' }}/>
            )}
          </div>

          {phase === 'idle' && (
            <p style={{ fontSize: 14, color: '#756B63' }}>Tap to start recording (max 15 seconds)</p>
          )}
          {phase === 'recording' && (
            <p style={{ fontSize: 16, color: '#D9683B', fontWeight: 700 }}>Recording... {seconds}s / 15s<br/><span style={{ fontSize: 14, fontWeight: 400 }}>Tap to stop</span></p>
          )}
          {phase === 'recorded' && (
            <p style={{ fontSize: 15, color: '#4B9180', fontWeight: 700 }}>Voice saved! ✨</p>
          )}
          {phase === 'playing' && (
            <p style={{ fontSize: 15, color: '#4B9180', fontWeight: 700 }}>Playing back... 🔊</p>
          )}
        </div>

        {phase === 'recorded' && (
          <div className="bounce-in" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn-sage" onClick={playBack}>
              ▶️ Play Back
            </button>
            <button className="btn-primary" onClick={startRecording}>
              🔁 Re-record
            </button>
          </div>
        )}

        <div style={{ marginTop: 20, background: '#DDE9DD', borderRadius: 16, padding: '16px' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#4B9180', margin: '0 0 8px' }}>💡 Ideas for your message:</p>
          {[
            '"You\'re doing amazing! Keep exploring!"',
            '"I love watching you help Mindy!"',
            '"Every adventure makes you stronger!"',
          ].map((msg, i) => (
            <p key={i} style={{ fontSize: 13, color: '#24313A', margin: '0 0 6px', lineHeight: 1.5 }}>• {msg}</p>
          ))}
        </div>

        <div style={{ marginTop: 16, background: '#F7DDD0', borderRadius: 16, padding: '14px 16px' }}>
          <p style={{ fontSize: 13, color: '#756B63', margin: 0 }}>
            🔒 Voice recordings are stored locally on this device and are never shared.
          </p>
        </div>
      </div>
    </div>
  );
}
