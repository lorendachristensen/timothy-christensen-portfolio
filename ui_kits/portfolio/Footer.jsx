// Shared footer for the portfolio kit.
function Footer() {
  // Email is assembled only at click-time, so the full address never appears as a literal
  // string in the served source or the rendered DOM — basic protection against email-harvesting bots.
  const emailUser = 'timothy.christensen';
  const emailDomain = 'okstate.edu';
  const openEmail = (e) => { e.preventDefault(); window.location.href = 'mailto:' + emailUser + '@' + emailDomain; };

  const linkStyle = { color: 'var(--ink-300)', textDecoration: 'none', borderBottom: '1px solid var(--ink-700)', paddingBottom: '2px', cursor: 'pointer' };

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
        <div style={{ display: 'flex', gap: 'var(--space-5)', fontFamily: 'var(--font-mono)', fontSize: '13px', flexWrap: 'wrap' }}>
          <a href="https://www.instagram.com/the_timstagram388/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Instagram</a>
          <a href="https://www.facebook.com/timthegreat388/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Facebook</a>
          <a href="#" onClick={openEmail} style={linkStyle}>Email</a>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--ink-800)', textAlign: 'center', padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-600)' }}>
        © 2026 Timothy Christensen — Portfolio &amp; work samples
      </div>
    </footer>
  );
}
window.Footer = Footer;
