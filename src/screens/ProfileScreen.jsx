import { GlassCard, Eyebrow, Serif, LumenIcon } from '../components/primitives';

const SECTIONS = [
  { header: 'Appearance', rows: [
    { icon: 'moon', label: 'Theme', value: null, isThemeToggle: true },
    { icon: 'bell', label: 'Daily reminder', value: '8:30 PM' },
  ]},
  { header: 'Privacy', rows: [
    { icon: 'lock', label: 'Passcode & Face ID', value: 'On' },
    { icon: 'eye-off', label: 'Hide previews', value: 'On' },
  ]},
  { header: 'Writing', rows: [
    { icon: 'quote', label: 'Daily prompts', value: 'Gentle' },
    { icon: 'cloud-sun', label: 'Auto-capture weather', value: 'On' },
  ]},
  { header: 'Data', rows: [
    { icon: 'upload', label: 'Export entries', value: null },
    { icon: 'refresh-cw', label: 'Backup & sync', value: 'iCloud' },
  ]},
];

export default function ProfileScreen({ dark, onThemeToggle }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 130 }}>
      <div style={{ padding: '70px 20px 20px' }}>
        <Eyebrow dark={dark}>Your journal</Eyebrow>
        <Serif size={32} color={dark ? '#ECEAF5' : '#1A1826'} style={{ marginTop: 6 }}>Settings</Serif>
      </div>

      {/* Avatar + name */}
      <div style={{ padding: '0 20px 14px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 999, flexShrink: 0,
          background: 'linear-gradient(145deg, #E8B5C8, #7B7DE8)',
          boxShadow: '0 8px 24px rgba(123,125,232,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Fraunces, serif', fontSize: 26, color: '#FDFBF7', fontStyle: 'italic',
        }}>A</div>
        <div>
          <Serif size={22} color={dark ? '#ECEAF5' : '#1A1826'}>Ada</Serif>
          <div style={{ fontSize: 13, color: dark ? '#A8A5BE' : '#55526B', marginTop: 2 }}>Writing since January</div>
        </div>
      </div>

      {SECTIONS.map((section, si) => (
        <div key={si} style={{ padding: '0 20px 18px' }}>
          <Eyebrow dark={dark} style={{ marginBottom: 8, paddingLeft: 4 }}>{section.header}</Eyebrow>
          <GlassCard dark={dark} style={{ padding: 0, overflow: 'hidden' }}>
            {section.rows.map((r, ri) => (
              <div
                key={ri}
                onClick={r.isThemeToggle ? onThemeToggle : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px',
                  borderBottom: ri < section.rows.length - 1
                    ? `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(26,24,38,0.05)'}`
                    : 'none',
                  cursor: r.isThemeToggle ? 'pointer' : 'default',
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: dark ? 'rgba(159,162,255,0.14)' : 'rgba(123,125,232,0.1)',
                  color: dark ? '#9FA2FF' : '#7B7DE8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <LumenIcon name={r.icon} size={16} />
                </div>
                <div style={{ flex: 1, fontSize: 15, color: dark ? '#ECEAF5' : '#1A1826', fontFamily: 'Inter, sans-serif' }}>
                  {r.label}
                </div>
                {r.isThemeToggle ? (
                  <div style={{
                    width: 44, height: 26, borderRadius: 999,
                    background: dark ? '#9FA2FF' : 'rgba(26,24,38,0.12)',
                    position: 'relative', cursor: 'pointer',
                    transition: 'background var(--dur) var(--ease)',
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 999, background: '#FDFBF7',
                      position: 'absolute', top: 2, left: dark ? 20 : 2,
                      transition: 'left var(--dur) var(--ease)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }} />
                  </div>
                ) : (
                  <>
                    {r.value && (
                      <div style={{ fontSize: 13, color: dark ? '#A8A5BE' : '#55526B', fontFamily: 'Inter, sans-serif' }}>
                        {r.value}
                      </div>
                    )}
                    <LumenIcon name="chevron-right" size={16} color={dark ? '#6E6B85' : '#8A8799'} />
                  </>
                )}
              </div>
            ))}
          </GlassCard>
        </div>
      ))}
    </div>
  );
}
