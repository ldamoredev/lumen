import { GlassCard, Eyebrow, Serif, LumenIcon } from '../components/primitives';

const PROMPT_SECTIONS = [
  { label: 'Gratitude', prompts: [
    "What's something small that went well this week?",
    "Who are you quietly thankful for?",
    "What did your body thank you for today?",
  ]},
  { label: 'Reflection', prompts: [
    "What have you been avoiding?",
    "What did you learn about yourself this month?",
    "Where did you feel most yourself?",
  ]},
  { label: 'Stress & anxiety', prompts: [
    "What do you need that you haven't asked for?",
    "Name the feeling underneath the restlessness.",
    "What would enough look like today?",
  ]},
];

export default function PromptsScreen({ dark, onBack }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 40 }}>
      <div style={{ padding: '60px 16px 10px', display: 'flex', alignItems: 'center' }}>
        <button onClick={onBack} style={{
          width: 38, height: 38, borderRadius: 999, border: 'none',
          background: dark ? 'rgba(30,34,48,0.7)' : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: dark ? '#ECEAF5' : '#1A1826',
        }}>
          <LumenIcon name="chevron-left" size={20} />
        </button>
      </div>

      <div style={{ padding: '10px 20px 20px' }}>
        <Eyebrow dark={dark}>For when you don't know where to start</Eyebrow>
        <Serif size={32} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 6 }}>Prompts</Serif>
      </div>

      {PROMPT_SECTIONS.map((sec, si) => (
        <div key={si} style={{ padding: '0 20px 16px' }}>
          <Eyebrow dark={dark} style={{ marginBottom: 10, paddingLeft: 4 }}>{sec.label}</Eyebrow>
          {sec.prompts.map((p, pi) => (
            <div key={pi} style={{ marginBottom: 10 }}>
              <GlassCard dark={dark} style={{ padding: '16px 18px', cursor: 'pointer' }}>
                <Serif size={18} italic color={dark ? '#ECEAF5' : '#1A1826'}>{p}</Serif>
              </GlassCard>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
