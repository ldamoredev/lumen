import { useState, useEffect } from 'react';
import { Serif, LumenIcon } from '../components/primitives';

const KEYS = [1,2,3,4,5,6,7,8,9,'face',0,'del'];

export default function LockScreen({ dark, onUnlock }) {
  const [pin, setPin] = useState([]);

  useEffect(() => {
    if (pin.length === 4) {
      const t = setTimeout(onUnlock, 250);
      return () => clearTimeout(t);
    }
  }, [pin, onUnlock]);

  const handleKey = (n) => {
    if (n === 'del') setPin(p => p.slice(0, -1));
    else if (n === 'face') onUnlock();
    else if (pin.length < 4) setPin(p => [...p, n]);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
      <div style={{
        width: 72, height: 72, borderRadius: 999,
        background: dark ? 'rgba(159,162,255,0.14)' : 'rgba(123,125,232,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
      }}>
        <LumenIcon name="lock" size={28} color={dark ? '#9FA2FF' : '#7B7DE8'} />
      </div>

      <Serif size={24} italic color={dark ? '#ECEAF5' : '#1A1826'}>Only for you.</Serif>
      <div style={{ marginTop: 8, fontSize: 14, color: dark ? '#A8A5BE' : '#55526B' }}>Enter passcode</div>

      {/* PIN dots */}
      <div style={{ display: 'flex', gap: 14, marginTop: 28 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            width: 14, height: 14, borderRadius: 999,
            background: pin.length > i ? (dark ? '#ECEAF5' : '#1A1826') : 'transparent',
            border: `1.5px solid ${dark ? 'rgba(255,255,255,0.25)' : 'rgba(26,24,38,0.25)'}`,
            transition: 'background var(--dur-fast) var(--ease)',
          }} />
        ))}
      </div>

      {/* Numpad */}
      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 64px)', gap: 16 }}>
        {KEYS.map((n, i) => (
          <button key={i} onClick={() => handleKey(n)} style={{
            width: 64, height: 64, borderRadius: 999, border: 'none', cursor: 'pointer',
            background: typeof n === 'number'
              ? (dark ? 'rgba(30,34,48,0.6)' : 'rgba(255,255,255,0.7)')
              : 'transparent',
            backdropFilter: typeof n === 'number' ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: typeof n === 'number' ? 'blur(16px)' : 'none',
            color: dark ? '#ECEAF5' : '#1A1826',
            fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 400,
            boxShadow: typeof n === 'number' ? '0 2px 8px rgba(40,30,80,0.06)' : 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {n === 'face'
              ? <LumenIcon name="scan-face" size={22} color={dark ? '#9FA2FF' : '#7B7DE8'} />
              : n === 'del'
              ? <LumenIcon name="delete" size={20} color={dark ? '#A8A5BE' : '#55526B'} />
              : n}
          </button>
        ))}
      </div>
    </div>
  );
}
