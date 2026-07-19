// Shared top navigation for the portfolio kit.
function Nav({ current, onNav }) {
  const items = ['Home', 'Work', 'Video', 'About'];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: 'var(--ink-950)', color: 'var(--white)',
      borderBottom: '2px solid var(--ink-950)',
    }}>
      <div style={{
        maxWidth: 'var(--maxw-page)', margin: '0 auto',
        padding: '0 var(--space-6)', height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a onClick={() => onNav('Home')} style={{ display: 'flex', alignItems: 'baseline', gap: '2px', cursor: 'pointer', textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'var(--white)' }}>Timothy Christensen</span>
          <span style={{ color: 'var(--brand)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px' }}>.</span>
        </a>
        <nav style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'center' }}>
          {items.map((it) => (
            <a key={it} onClick={() => onNav(it)} style={{
              fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500,
              letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
              color: current === it ? 'var(--brand)' : 'var(--ink-300)',
              paddingBottom: '3px',
              borderBottom: current === it ? '2px solid var(--brand)' : '2px solid transparent',
            }}>{it}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
window.Nav = Nav;
