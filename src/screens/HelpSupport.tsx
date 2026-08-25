import { useState } from 'react';
import { useGame } from '../context/GameContext';

const faqs = [
  { q: 'How does Untangle work?', a: 'Untangle is a game-based learning app where your child helps Mindy the fox restore the Tangle Village by practising sounds, letters, and words through fun adventures.' },
  { q: 'Is Untangle a diagnostic tool?', a: 'No. Untangle is a screening and learning-support tool. It does not diagnose dyslexia or any other condition. If you have concerns, please speak with a qualified professional.' },
  { q: 'How long should each session be?', a: 'We recommend 10-15 minutes per day. Short, consistent practice sessions are most effective for building reading skills.' },
  { q: 'What languages are supported?', a: 'Currently: English, Tamil, Hindi, Telugu, Kannada, and Malayalam. More languages are coming soon.' },
  { q: 'How do I add another child?', a: 'Go to Settings → Child Profiles to add and manage multiple child profiles.' },
  { q: 'What is the Mela?', a: 'The Mela is a special festival event that unlocks as your child clears the Tangle Storm. It secretly revisits practised skills through festival-themed games.' },
];

export default function HelpSupport() {
  const { navigate } = useGame();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '24px 24px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('settings')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: 0 }}>❓ Help & Support</h1>
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        <div style={{ background: '#F7DDD0', borderRadius: 18, padding: '18px', marginBottom: 20, textAlign: 'center' }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#D9683B', margin: '0 0 4px' }}>👋 How can we help?</p>
          <p style={{ fontSize: 14, color: '#756B63', margin: 0 }}>Browse questions below or contact us</p>
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#24313A', margin: '0 0 12px' }}>Frequently Asked Questions</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(36,49,58,0.07)' }}
            >
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{ width: '100%', padding: '16px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif", textAlign: 'left' }}
              >
                <span style={{ fontSize: 15, fontWeight: 700, color: '#24313A', flex: 1, lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ color: '#D9683B', fontSize: 20, marginLeft: 10, transition: 'transform 0.2s', transform: expanded === i ? 'rotate(180deg)' : 'rotate(0)' }}>⌄</span>
              </button>
              {expanded === i && (
                <div style={{ padding: '0 16px 16px' }}>
                  <p style={{ fontSize: 14, color: '#756B63', margin: 0, lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a
            href="mailto:support@untangle.app"
            style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'white', borderRadius: 16, padding: '16px', textDecoration: 'none', boxShadow: '0 2px 8px rgba(36,49,58,0.07)' }}
          >
            <span style={{ fontSize: 24 }}>✉️</span>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#24313A', margin: '0 0 2px' }}>Email Support</p>
              <p style={{ fontSize: 13, color: '#756B63', margin: 0 }}>support@untangle.app</p>
            </div>
          </a>
          <button
            onClick={() => navigate('responsibleScreening')}
            style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'white', borderRadius: 16, padding: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.07)', width: '100%', fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif", textAlign: 'left' }}
          >
            <span style={{ fontSize: 24 }}>ℹ️</span>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#24313A', margin: '0 0 2px' }}>About Untangle</p>
              <p style={{ fontSize: 13, color: '#756B63', margin: 0 }}>Screening disclaimer & privacy</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
