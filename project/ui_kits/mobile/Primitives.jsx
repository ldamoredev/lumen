// Lumen mobile — shared UI primitives. All components expose on window.
// Reads CSS tokens from ../../colors_and_type.css via the page-level stylesheet.

const LumenIcon = ({ name, size = 20, color, stroke = 1.6, style = {} }) => (
  <i data-lucide={name} style={{ width: size, height: size, color, strokeWidth: stroke, ...style }} />
);

// A subtle protection gradient at the top of screens
const TopFade = ({ dark }) => (
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0, height: 120, pointerEvents: 'none',
    background: dark
      ? 'linear-gradient(180deg, rgba(11,13,20,0.85), rgba(11,13,20,0))'
      : 'linear-gradient(180deg, rgba(247,244,239,0.85), rgba(247,244,239,0))',
    zIndex: 5,
  }}/>
);

// Page background gradient used inside the phone viewport
const PageBg = ({ dark, children }) => (
  <div style={{
    position: 'absolute', inset: 0, overflow: 'hidden',
    background: dark
      ? 'radial-gradient(700px 500px at 100% -10%, #1E1B3A 0%, transparent 60%), radial-gradient(600px 400px at -10% 110%, #2A1B2E 0%, transparent 55%), linear-gradient(180deg, #0E1016 0%, #0B0D14 100%)'
      : 'radial-gradient(700px 500px at 100% -10%, #EFEAF5 0%, transparent 60%), radial-gradient(600px 400px at -10% 110%, #F0E4E8 0%, transparent 55%), linear-gradient(180deg, #F7F4EF 0%, #F4F0EA 100%)',
    color: dark ? '#ECEAF5' : '#1A1826',
  }}>{children}</div>
);

const GlassCard = ({ dark, style = {}, children, onClick }) => (
  <div onClick={onClick} style={{
    position: 'relative', borderRadius: 20, padding: '16px 18px',
    background: dark ? 'rgba(30,34,48,0.55)' : 'rgba(255,255,255,0.68)',
    backdropFilter: dark ? 'blur(28px) saturate(130%)' : 'blur(24px) saturate(140%)',
    WebkitBackdropFilter: dark ? 'blur(28px) saturate(130%)' : 'blur(24px) saturate(140%)',
    border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)'}`,
    boxShadow: dark
      ? '0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
      : '0 8px 24px rgba(40,30,80,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
    ...style,
  }}>{children}</div>
);

const Eyebrow = ({ dark, children, style = {} }) => (
  <div style={{
    fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
    color: dark ? '#6E6B85' : '#8A8799', ...style,
  }}>{children}</div>
);

const Serif = ({ size = 24, weight = 500, italic, children, style = {}, color }) => (
  <div style={{
    fontFamily: 'Fraunces, serif', fontSize: size, fontWeight: weight,
    fontStyle: italic ? 'italic' : 'normal',
    letterSpacing: size >= 40 ? '-0.025em' : size >= 24 ? '-0.015em' : '-0.01em',
    fontVariationSettings: `'opsz' ${size >= 40 ? 144 : size >= 24 ? 72 : 24}`,
    lineHeight: 1.15, color,
    ...style,
  }}>{children}</div>
);

const MOODS = [
  { key: 'calm',     light: ['#A8C5E8','#C9DDF0'], dark: ['#5A8BC4','#7BA7D9'] },
  { key: 'tender',   light: ['#E8B5C8','#F2D0DC'], dark: ['#C98AA8','#D9A8BF'] },
  { key: 'heavy',    light: ['#6B6F8C','#9598B0'], dark: ['#4A4E6B','#6B6F8C'] },
  { key: 'bright',   light: ['#E8C97B','#F3DDA3'], dark: ['#C9A85C','#D9BF7C'] },
  { key: 'restless', light: ['#D89A8C','#E8B8AB'], dark: ['#B87D6E','#C99A8B'] },
  { key: 'grateful', light: ['#A8D1B5','#C9E2D1'], dark: ['#7DB591','#9CCAAE'] },
];

const moodGradient = (key, dark) => {
  const m = MOODS.find(m => m.key === key) || MOODS[0];
  const [a,b] = dark ? m.dark : m.light;
  return `linear-gradient(145deg, ${a}, ${b})`;
};

const MoodDot = ({ mood, dark, size = 14, style = {} }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: moodGradient(mood, dark),
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
    ...style,
  }}/>
);

const MoodChip = ({ mood, dark, active, onClick }) => (
  <button onClick={onClick} style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '8px 14px 8px 10px', borderRadius: 999,
    fontSize: 13, fontWeight: 500, cursor: 'pointer',
    background: active
      ? (dark ? '#ECEAF5' : '#1A1826')
      : (dark ? 'rgba(30,34,48,0.7)' : 'rgba(255,255,255,0.75)'),
    color: active
      ? (dark ? '#0E1016' : '#FDFBF7')
      : (dark ? '#ECEAF5' : '#1A1826'),
    border: `1px solid ${active ? 'transparent' : (dark ? 'rgba(255,255,255,0.08)' : 'rgba(26,24,38,0.06)')}`,
    boxShadow: active ? 'none' : '0 2px 8px rgba(40,30,80,0.05)',
    fontFamily: 'Inter, sans-serif',
  }}>
    <MoodDot mood={mood} dark={dark} size={12}/>
    {mood}
  </button>
);

const PrimaryBtn = ({ dark, children, onClick, full, accent, style = {} }) => (
  <button onClick={onClick} style={{
    padding: '14px 22px', borderRadius: 12, border: 'none', cursor: 'pointer',
    fontSize: 15, fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.005em',
    background: accent
      ? (dark ? '#9FA2FF' : '#7B7DE8')
      : (dark ? '#ECEAF5' : '#1A1826'),
    color: accent
      ? (dark ? '#0E1016' : '#FDFBF7')
      : (dark ? '#0E1016' : '#FDFBF7'),
    width: full ? '100%' : 'auto',
    ...style,
  }}>{children}</button>
);

const GhostBtn = ({ dark, children, onClick, style = {} }) => (
  <button onClick={onClick} style={{
    padding: '12px 18px', borderRadius: 12, cursor: 'pointer',
    fontSize: 14, fontWeight: 500, fontFamily: 'Inter, sans-serif',
    background: 'transparent',
    color: dark ? '#A8A5BE' : '#55526B',
    border: `1px solid ${dark ? 'rgba(255,255,255,0.14)' : 'rgba(26,24,38,0.12)'}`,
    ...style,
  }}>{children}</button>
);

// Bottom navigation — floating glass pill
const BottomNav = ({ dark, active, onNav }) => {
  const items = [
    { key: 'home', icon: 'home' },
    { key: 'timeline', icon: 'calendar-days' },
    { key: 'write', icon: 'pen-line', primary: true },
    { key: 'insights', icon: 'sparkles' },
    { key: 'profile', icon: 'user-round' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', alignItems: 'center', gap: 2,
      padding: '8px 10px', borderRadius: 999, zIndex: 20,
      background: dark ? 'rgba(30,34,48,0.55)' : 'rgba(255,255,255,0.65)',
      backdropFilter: dark ? 'blur(28px) saturate(130%)' : 'blur(24px) saturate(140%)',
      WebkitBackdropFilter: dark ? 'blur(28px) saturate(130%)' : 'blur(24px) saturate(140%)',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.7)'}`,
      boxShadow: dark
        ? '0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)'
        : '0 12px 40px rgba(40,30,80,0.15), inset 0 1px 0 rgba(255,255,255,0.9)',
    }}>
      {items.map(it => {
        const isPrimary = it.primary;
        const isActive = active === it.key;
        if (isPrimary) {
          return (
            <button key={it.key} onClick={() => onNav(it.key)} style={{
              width: 50, height: 50, borderRadius: 999, border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: dark ? '#9FA2FF' : '#1A1826',
              color: dark ? '#0E1016' : '#FDFBF7',
              margin: '0 4px',
              boxShadow: '0 6px 16px rgba(123,125,232,0.4)',
            }}><LumenIcon name={it.icon} size={22}/></button>
          );
        }
        return (
          <button key={it.key} onClick={() => onNav(it.key)} style={{
            width: 46, height: 46, borderRadius: 999, border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: isActive
              ? (dark ? 'rgba(159,162,255,0.18)' : 'rgba(123,125,232,0.14)')
              : 'transparent',
            color: isActive
              ? (dark ? '#ECEAF5' : '#1A1826')
              : (dark ? '#6E6B85' : '#8A8799'),
          }}><LumenIcon name={it.icon} size={20}/></button>
        );
      })}
    </div>
  );
};

Object.assign(window, {
  LumenIcon, TopFade, PageBg, GlassCard, Eyebrow, Serif,
  MOODS, moodGradient, MoodDot, MoodChip,
  PrimaryBtn, GhostBtn, BottomNav,
});
