import { useGame } from '../context/GameContext';

export default function ResponsibleScreening() {
  const { navigate, state } = useGame();

  return (
    <div className="screen" style={{ background: '#FFF8EE', minHeight: '100%' }}>
      <div style={{ padding: '24px 24px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(state.isParentMode ? 'settings' : 'parentLogin')} style={{ background: 'white', border: 'none', borderRadius: 12, width: 40, height: 40, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(36,49,58,0.1)' }}>←</button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#24313A', margin: 0 }}>ℹ️ About Untangle</h1>
      </div>

      <div style={{ padding: '0 24px 40px' }}>
        {/* Main message */}
        <div style={{ background: 'white', borderRadius: 24, padding: '28px 24px', boxShadow: '0 4px 20px rgba(36,49,58,0.1)', marginBottom: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🌱</div>
          <h2 style={{ fontSize: 22, color: '#24313A', margin: '0 0 16px' }}>What is Untangle?</h2>
          <p style={{ fontSize: 16, color: '#756B63', lineHeight: 1.7, margin: 0 }}>
            Untangle is a <strong style={{ color: '#D9683B' }}>screening and learning-support tool</strong>. It helps children practise reading, sounds, and letters through playful adventures.
          </p>
        </div>

        {/* Important notice */}
        <div style={{ background: '#F7DDD0', borderRadius: 20, padding: '20px', marginBottom: 16, borderLeft: '4px solid #D9683B' }}>
          <h3 style={{ fontSize: 17, color: '#D9683B', margin: '0 0 10px' }}>Important</h3>
          <p style={{ fontSize: 15, color: '#24313A', lineHeight: 1.6, margin: 0 }}>
            <strong>Untangle does not diagnose dyslexia or any learning condition.</strong>
          </p>
          <p style={{ fontSize: 14, color: '#756B63', lineHeight: 1.6, margin: '10px 0 0' }}>
            The activities are designed to support learning and identify areas where more practice may be helpful — not to provide a medical assessment.
          </p>
        </div>

        {/* What it does */}
        <div className="card" style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, color: '#4B9180', margin: '0 0 12px' }}>✅ What Untangle does:</h3>
          {[
            'Provides engaging, game-based reading practice',
            'Identifies skills that may need more attention',
            'Tracks progress over time in a supportive way',
            'Keeps all child data private and parent-controlled',
          ].map((item, i) => (
            <p key={i} style={{ fontSize: 14, color: '#24313A', margin: '0 0 8px', lineHeight: 1.5 }}>• {item}</p>
          ))}
        </div>

        {/* Professional advice */}
        <div style={{ background: '#DDE9DD', borderRadius: 20, padding: '20px', marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, color: '#4B9180', margin: '0 0 10px' }}>👨‍⚕️ When to seek professional advice</h3>
          <p style={{ fontSize: 14, color: '#24313A', lineHeight: 1.6, margin: 0 }}>
            If certain patterns persist over time, consider discussing your observations with a qualified educational professional or your child's school.
          </p>
          <p style={{ fontSize: 14, color: '#756B63', lineHeight: 1.6, margin: '10px 0 0' }}>
            Untangle's insights are a starting point for conversation — not a clinical diagnosis.
          </p>
        </div>

        <div style={{ background: '#F7DDD0', borderRadius: 16, padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: '#756B63', margin: 0, lineHeight: 1.6 }}>
            🔒 <strong>Privacy:</strong> All data is stored locally on this device. No individual child information is shared externally without explicit consent.
          </p>
        </div>

        <button className="btn-sage" onClick={() => navigate(state.isParentMode ? 'settings' : 'parentLogin')}>
          ← Back
        </button>
      </div>
    </div>
  );
}
