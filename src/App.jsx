import { useState, useEffect } from 'react';
import { PageBg, BottomNav } from './components/primitives';
import HomeScreen from './screens/HomeScreen';
import TimelineScreen from './screens/TimelineScreen';
import InsightsScreen from './screens/InsightsScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditorScreen from './screens/EditorScreen';
import MoodCheckinScreen from './screens/MoodCheckinScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LockScreen from './screens/LockScreen';
import PromptsScreen from './screens/PromptsScreen';
import EntryDetailScreen from './screens/EntryDetailScreen';

function useSystemDark() {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return [dark, setDark];
}

// The phone shell — sizes and positions the screen with notch/home indicator
function PhoneShell({ dark, children }) {
  return (
    <div style={{
      width: 390, height: 844,
      borderRadius: 54,
      padding: 14,
      background: '#1A1A1A',
      boxShadow: `
        0 40px 100px rgba(0,0,0,0.5),
        inset 0 0 0 1.5px rgba(255,255,255,0.08),
        inset 0 0 0 3px #111
      `,
      position: 'relative',
      flexShrink: 0,
    }}>
      {/* Screen */}
      <div style={{
        width: '100%', height: '100%',
        borderRadius: 40, overflow: 'hidden',
        position: 'relative',
        background: dark ? '#0B0D14' : '#F7F4EF',
      }}>
        <PageBg dark={dark}>{children}</PageBg>

        {/* Status bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 50,
          padding: '14px 28px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          zIndex: 25, pointerEvents: 'none',
          fontSize: 13, fontWeight: 600,
          color: dark ? '#ECEAF5' : '#1A1826',
          fontFamily: 'Inter, sans-serif',
        }}>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {/* Signal bars */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
              <rect x="0" y="7" width="3" height="5" rx="1" opacity="0.4"/>
              <rect x="4.5" y="4.5" width="3" height="7.5" rx="1" opacity="0.6"/>
              <rect x="9" y="2" width="3" height="10" rx="1" opacity="0.8"/>
              <rect x="13.5" y="0" width="3" height="12" rx="1"/>
            </svg>
            {/* WiFi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M1 4C3.8 1.3 8 0 8 0s4.2 1.3 7 4"/>
              <path d="M3 7c1.4-1.3 3-2 5-2s3.6.7 5 2"/>
              <circle cx="8" cy="10.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
              <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none"/>
              <rect x="2" y="2" width="17" height="8" rx="1.5"/>
              <path d="M22.5 4v4a1.5 1.5 0 000-4z"/>
            </svg>
          </div>
        </div>

        {/* Dynamic island */}
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 34, borderRadius: 999, background: '#000', zIndex: 30,
        }} />

        {/* Home indicator */}
        <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 134, height: 5, borderRadius: 3,
          background: dark ? 'rgba(255,255,255,0.35)' : 'rgba(26,24,38,0.3)',
          zIndex: 25,
        }} />
      </div>
    </div>
  );
}

// Mobile-only shell for when the viewport is narrow
function MobileWrapper({ dark, children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: dark ? '#0B0D14' : '#F7F4EF',
      overflow: 'hidden',
    }}>
      <PageBg dark={dark}>
        {children}
      </PageBg>
      {/* Status bar placeholder */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 44,
        background: 'transparent',
        zIndex: 25, pointerEvents: 'none',
      }} />
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useSystemDark();
  const [screen, setScreen] = useState('onboarding');
  const [tab, setTab] = useState('home');
  const [openedEntry, setOpenedEntry] = useState(null);
  const [locked, setLocked] = useState(false);

  // Sync theme token on <html>
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : '';
  }, [dark]);

  const nav = (key) => {
    if (key === 'write') { setScreen('editor'); return; }
    setTab(key);
    setScreen(key);
  };

  const openEntry = (e) => { setOpenedEntry(e); setScreen('entry'); };
  const backToTab = () => setScreen(tab);

  let body;
  if (screen === 'onboarding') {
    body = <OnboardingScreen dark={dark} onDone={() => setScreen('home')} />;
  } else if (locked) {
    body = <LockScreen dark={dark} onUnlock={() => setLocked(false)} />;
  } else if (screen === 'home') {
    body = <HomeScreen dark={dark} onWrite={() => setScreen('editor')} onOpenEntry={openEntry} />;
  } else if (screen === 'timeline') {
    body = <TimelineScreen dark={dark} onOpenEntry={openEntry} />;
  } else if (screen === 'insights') {
    body = <InsightsScreen dark={dark} />;
  } else if (screen === 'profile') {
    body = <ProfileScreen dark={dark} onThemeToggle={() => setDark(d => !d)} />;
  } else if (screen === 'editor') {
    body = <EditorScreen dark={dark} onDone={backToTab} />;
  } else if (screen === 'entry') {
    body = <EntryDetailScreen dark={dark} entry={openedEntry} onBack={backToTab} />;
  } else if (screen === 'checkin') {
    body = <MoodCheckinScreen dark={dark} onDone={() => setScreen('home')} />;
  } else if (screen === 'prompts') {
    body = <PromptsScreen dark={dark} onBack={backToTab} />;
  }

  const showNav = !locked && screen !== 'onboarding' && !['editor','entry','checkin','prompts'].includes(screen);

  // Decide whether to show the phone-in-a-browser layout or full-screen mobile
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 600);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const screenContent = (
    <>
      {body}
      {showNav && <BottomNav dark={dark} active={tab} onNav={nav} />}

      {/* Floating quick actions visible on home */}
      {screen === 'home' && !locked && (
        <div style={{ position: 'absolute', top: 60, right: 20, display: 'flex', gap: 8, zIndex: 11 }}>
          {[
            { icon: 'lock', title: 'Lock', onClick: () => setLocked(true) },
            { icon: 'heart', title: 'Mood check-in', onClick: () => setScreen('checkin') },
            { icon: 'quote', title: 'Prompts', onClick: () => setScreen('prompts') },
          ].map(({ icon, title, onClick }) => (
            <button key={icon} title={title} onClick={onClick} style={{
              width: 36, height: 36, borderRadius: 999, border: 'none', cursor: 'pointer',
              background: dark ? 'rgba(30,34,48,0.7)' : 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(16px) saturate(140%)',
              WebkitBackdropFilter: 'blur(16px) saturate(140%)',
              color: dark ? '#ECEAF5' : '#1A1826',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(40,30,80,0.08)',
            }}>
              {/* Inline icon */}
              {icon === 'lock' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>}
              {icon === 'heart' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>}
              {icon === 'quote' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>}
            </button>
          ))}
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <MobileWrapper dark={dark}>
        {screenContent}
      </MobileWrapper>
    );
  }

  // Desktop: centered phone shell on a muted background
  return (
    <div style={{
      minHeight: '100vh',
      background: dark ? '#06070D' : '#DDD9D0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <div style={{
          fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 400, fontStyle: 'italic',
          letterSpacing: '-0.02em', color: dark ? '#ECEAF5' : '#1A1826',
        }}>Lumen</div>
        <div style={{ fontSize: 13, color: dark ? '#6E6B85' : '#8A8799', marginTop: 4, fontFamily: 'Inter, sans-serif' }}>
          A private journal
        </div>

        {/* Theme toggle */}
        <button onClick={() => setDark(d => !d)} style={{
          marginTop: 14, padding: '8px 16px', borderRadius: 999, border: 'none', cursor: 'pointer',
          background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
          color: dark ? '#A8A5BE' : '#55526B',
          fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em',
        }}>
          {dark ? '☀ Light mode' : '☾ Dark mode'}
        </button>
      </div>

      <PhoneShell dark={dark}>
        {screenContent}
      </PhoneShell>
    </div>
  );
}
