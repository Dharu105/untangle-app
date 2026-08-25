import { useGame } from '../context/GameContext';

export default function Privacy() {
  const { navigate } = useGame();

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '24px 24px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('settings')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: 0 }}>🔒 Privacy</h1>
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        <div style={{ background: '#DDE9DD', borderRadius: 18, padding: '18px', marginBottom: 20 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#4B9180', margin: '0 0 8px' }}>🛡️ Your data is private</p>
          <p style={{ fontSize: 14, color: '#24313A', margin: 0, lineHeight: 1.6 }}>
            Untangle stores all child progress data locally on this device. Your family's information is never shared or sold.
          </p>
        </div>

        {[
          { icon: '👦', title: 'Child Data', desc: 'Name, age, language, and game progress are stored only on this device.' },
          { icon: '🎤', title: 'Family Voice', desc: 'Voice recordings are stored locally and are never uploaded to any server.' },
          { icon: '📊', title: 'Progress Data', desc: 'Learning patterns are used only to personalise your child\'s experience within the app.' },
          { icon: '📷', title: 'Camera', desc: 'The camera is only accessed when using Book Corner scanning. No photos are stored.' },
        ].map(item => (
          <div key={item.title} className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#24313A', margin: '0 0 4px' }}>{item.title}</p>
                <p style={{ fontSize: 14, color: '#756B63', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(36,49,58,0.07)', marginTop: 8, marginBottom: 20 }}>
          {[
            { label: '🗑️ Delete Child Profile', color: '#D9683B' },
            { label: '📤 Export Progress Data', color: '#4B9180' },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{ padding: '16px', borderBottom: i === 0 ? '1px solid #F7DDD0' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <span style={{ fontSize: 15, fontWeight: 700, color: item.color }}>{item.label}</span>
              <span style={{ color: '#756B63' }}>›</span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12, color: '#B0A89E', textAlign: 'center', lineHeight: 1.6 }}>
          By using Untangle, you agree to our terms of use. We are committed to child safety and data privacy.
        </p>
      </div>
    </div>
  );
}
