// Shared footer for the portfolio kit.
function Footer() {
  return (
    <footer style={{ background: 'var(--ink-950)', color: 'var(--white)', marginTop: 'var(--space-9)' }}>
      <div style={{
        maxWidth: 'var(--maxw-page)', margin: '0 auto', padding: 'var(--space-7) var(--space-6)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--space-6)', flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '40px', textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: '-0.01em' }}>
            Let's talk<span style={{ color: 'var(--brand)' }}>.</span>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-400)', marginTop: '12px' }}>
            Sports Media · Oklahoma State University · Class of 2028
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-5)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
          {['Email', 'Twitter/X', 'LinkedIn', 'The O\'Colly'].map((l) => (
            <a key={l} href="#" style={{ color: 'var(--ink-300)', textDecoration: 'none', borderBottom: '1px solid var(--ink-700)', paddingBottom: '2px' }}>{l}</a>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--ink-800)', textAlign: 'center', padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-600)' }}>
        © 2026 Timothy Christensen — Portfolio &amp; work samples
      </div>
    </footer>
  );
}
window.Footer = Footer;
