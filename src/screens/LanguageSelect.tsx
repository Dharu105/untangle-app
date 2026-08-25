import { useGame } from '../context/GameContext';
import type { Language } from '../types';

const languages: { code: Language; label: string; native: string; flag: string; sample: string }[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧', sample: 'Let\'s start the adventure!' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🌸', sample: 'நாம் சாகசம் தொடங்குவோம்!' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', sample: 'चलो साहसिक कार्य शुरू करें!' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '⭐', sample: 'సాహసయాత్రను ప్రారంభిద్దాం!' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🌺', sample: 'ಸಾಹಸಯಾನ ಪ್ರಾರಂಭಿಸೋಣ!' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🌴', sample: 'നമുക്ക് സാഹസം ആരംഭിക്കാം!' },
];

export default function LanguageSelect() {
  const { state, dispatch, navigate } = useGame();

  function handleSelect(code: Language) {
    dispatch({ type: 'SET_CHILD_LANGUAGE', language: code });
  }

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '24px 24px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('settings')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: '0 0 2px' }}>🌐 Language</h1>
          <p style={{ fontSize: 13, color: '#756B63', margin: 0 }}>Choose your language</p>
        </div>
      </div>

      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            style={{
              background: state.childLanguage === lang.code ? '#F7DDD0' : 'white',
              borderRadius: 16,
              padding: '16px 18px',
              border: `2px solid ${state.childLanguage === lang.code ? '#D9683B' : 'transparent'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(36,49,58,0.07)',
              textAlign: 'left',
              fontFamily: "'OpenDyslexic', 'Atkinson Hyperlegible', sans-serif",
              transition: 'all 0.2s',
              width: '100%',
            }}
          >
            <span style={{ fontSize: 28 }}>{lang.flag}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#24313A', marginBottom: 2 }}>{lang.native}</div>
              <div style={{ fontSize: 13, color: '#756B63', marginBottom: 4 }}>{lang.label}</div>
              {state.childLanguage === lang.code && (
                <div style={{ fontSize: 12, color: '#4B9180', fontStyle: 'italic' }}>{lang.sample}</div>
              )}
            </div>
            {state.childLanguage === lang.code && (
              <span style={{ fontSize: 22, color: '#D9683B' }}>✓</span>
            )}
          </button>
        ))}

        <div style={{ marginTop: 8, background: '#DDE9DD', borderRadius: 14, padding: '14px' }}>
          <p style={{ fontSize: 13, color: '#4B9180', margin: 0, lineHeight: 1.5 }}>
            🌍 More languages coming soon! Content adapts to provide culturally appropriate examples.
          </p>
        </div>

        <button className="btn-primary" onClick={() => navigate('settings')} style={{ marginTop: 8 }}>
          Save →
        </button>
      </div>
    </div>
  );
}
