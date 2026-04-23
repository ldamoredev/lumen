import { useState } from 'react';
import { Eyebrow, Serif, MoodChip, PrimaryBtn, moodGradient, MOODS } from '../components/primitives';

const INTENSITY_LABELS = ['barely','a little','clearly','strongly','intensely'];

export default function MoodCheckinScreen({ dark, onDone }) {
  const [selected, setSelected] = useState('tender');
  const [intensity, setIntensity] = useState(3);

  return (
    <div style={{ position: 'absolute', inset: 0, padding: '60px 20px 40px', display: 'flex', flexDirection: 'column' }}>
      <Eyebrow dark={dark}>Check-in · Thu 9:42</Eyebrow>
      <Serif size={32} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 10 }}>
        How are you,<br />
        <span style={{ fontStyle: 'italic' }}>really</span>?
      </Serif>

      {/* Breathing mood orb */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', width: 220, height: 220, borderRadius: '50%',
          background: moodGradient(selected, dark),
          filter: 'blur(40px)', opacity: 0.6,
          animation: 'breath 2800ms cubic-bezier(0.32,0.72,0,1) infinite alternate',
        }} />
        <div style={{
          position: 'relative', width: 170, height: 170, borderRadius: '50%',
          background: moodGradient(selected, dark),
          boxShadow: '0 20px 60px rgba(40,30,80,0.2), inset 0 2px 0 rgba(255,255,255,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Fraunces, serif', fontSize: 26, fontStyle: 'italic', color: '#FDFBF7',
          letterSpacing: '-0.01em',
          transition: 'background 480ms cubic-bezier(0.32,0.72,0,1)',
        }}>
          {selected}
        </div>
      </div>

      {/* Mood selector chips */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
        {MOODS.map(m => (
          <MoodChip
            key={m.key} dark={dark} mood={m.key}
            active={selected === m.key}
            onClick={() => setSelected(m.key)}
          />
        ))}
      </div>

      {/* Intensity slider */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: dark ? '#A8A5BE' : '#55526B', marginBottom: 8, fontWeight: 500, letterSpacing: '0.04em' }}>
          <span>Intensity</span>
          <span>{INTENSITY_LABELS[intensity - 1]}</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[1,2,3,4,5].map(n => (
            <div key={n} onClick={() => setIntensity(n)} style={{
              flex: 1, height: 8, borderRadius: 4, cursor: 'pointer',
              background: n <= intensity ? moodGradient(selected, dark) : (dark ? 'rgba(255,255,255,0.08)' : 'rgba(26,24,38,0.08)'),
              transition: 'background 280ms var(--ease)',
            }} />
          ))}
        </div>
      </div>

      <PrimaryBtn dark={dark} accent full onClick={onDone}>Save how I feel</PrimaryBtn>
    </div>
  );
}
