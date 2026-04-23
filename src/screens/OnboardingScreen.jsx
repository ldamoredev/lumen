import { Eyebrow, Serif, PrimaryBtn, GhostBtn } from '../components/primitives';
import { useState } from 'react';

const STEPS = [
  {
    eyebrow: 'Welcome',
    title: 'A quieter place\nto think.',
    body: 'Lumen is a private journal. Just you, your thoughts, and a little structure when you want it.',
  },
  {
    eyebrow: 'Why write',
    title: 'Track how\nyou actually\nfeel.',
    body: 'Daily mood check-ins turn into patterns. Patterns turn into self-awareness.',
  },
  {
    eyebrow: 'Privacy first',
    title: 'Nothing leaves\nyour phone.',
    body: 'Locked with Face ID, encrypted on-device. Optional iCloud backup is end-to-end.',
  },
];

export default function OnboardingScreen({ dark, onDone }) {
  const [step, setStep] = useState(0);
  const s = STEPS[step];

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '60px 28px 40px', overflow: 'hidden' }}>
      {/* Decorative orbs */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-30%', width: 400, height: 400, borderRadius: '50%',
        background: dark
          ? 'radial-gradient(circle, rgba(159,162,255,0.35), transparent 70%)'
          : 'radial-gradient(circle, rgba(232,181,200,0.55), transparent 70%)',
        filter: 'blur(20px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '-20%', width: 320, height: 320, borderRadius: '50%',
        background: dark
          ? 'radial-gradient(circle, rgba(201,138,168,0.25), transparent 70%)'
          : 'radial-gradient(circle, rgba(168,197,232,0.45), transparent 70%)',
        filter: 'blur(24px)', pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Eyebrow dark={dark}>{s.eyebrow}</Eyebrow>
        <Serif size={40} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 12, whiteSpace: 'pre-line' }}>
          {s.title}
        </Serif>
        <div style={{ marginTop: 20, fontSize: 17, lineHeight: '26px', fontFamily: 'Fraunces, serif', fontVariationSettings: "'opsz' 24", color: dark ? '#A8A5BE' : '#55526B', maxWidth: 300 }}>
          {s.body}
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 6, marginBottom: 20 }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{
            height: 4, flex: i === step ? 3 : 1, borderRadius: 2,
            background: i === step ? (dark ? '#9FA2FF' : '#7B7DE8') : (dark ? 'rgba(255,255,255,0.12)' : 'rgba(26,24,38,0.1)'),
            transition: 'flex 300ms var(--ease), background 300ms var(--ease)',
          }} />
        ))}
      </div>

      {/* Buttons */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 10 }}>
        <GhostBtn dark={dark} onClick={onDone} style={{ flex: 1 }}>Skip</GhostBtn>
        <PrimaryBtn dark={dark} accent onClick={() => step < 2 ? setStep(step + 1) : onDone()} style={{ flex: 2 }}>
          {step < 2 ? 'Continue' : 'Begin'}
        </PrimaryBtn>
      </div>
    </div>
  );
}
