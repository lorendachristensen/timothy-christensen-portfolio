// Portfolio screens — data-driven from /clips.json (produced/updated by scripts/sync-clips.mjs).
// Composes design-system primitives from window[NS]; clip cards are rendered by a local
// ClipCard so each card can open the story in a new tab and fall back to the archived copy.
const NS = window.TimothyChristensenPortfolioDesignSystem_d29e8f;
const { Button, Tag, Kicker, SectionHeading, VideoCard, Byline, StatBlock } = NS;

/* ------------------------------ data ------------------------------ */
function useClips() {
  const [clips, setClips] = React.useState(window.__CLIPS__ || null);
  React.useEffect(() => {
    if (window.__CLIPS__) { setClips(window.__CLIPS__); return; }
    fetch('/clips.json')
      .then((r) => r.json())
      .then((d) => { window.__CLIPS__ = d.clips || []; setClips(window.__CLIPS__); })
      .catch(() => setClips([]));
  }, []);
  return clips;
}
const SECTION_LABEL = { football: 'Football', womens_basketball: "Women's Basketball", mens_basketball: "Men's Basketball", baseball: 'Baseball', equestrian: 'Equestrian', wrestling: 'Wrestling', sports: 'Sports' };
const pretty = (s) => SECTION_LABEL[s] || 'Sports';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmtDate = (iso) => { const p = (iso || '').split('-'); return p.length === 3 ? MONTHS[+p[1] - 1] + ' ' + p[0] : iso; };
// link out to O'Colly while the URL is live; fall back to our archived copy when it 404s.
const clipHref = (c) => (c.live === false ? '/' + c.fulltext : c.url);
const clipImg = (c) => (c.localImage ? '/' + c.localImage : (c.imageUrlRemote || ''));

function Wrap({ children, style }) {
  return <div style={{ maxWidth: 'var(--maxw-page)', margin: '0 auto', padding: '0 var(--space-6)', ...style }}>{children}</div>;
}

function ClipCard({ clip }) {
  const image = clipImg(clip);
  const onEnter = (e) => { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hard)'; };
  const onLeave = (e) => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = 'none'; };
  return (
    <a href={clipHref(clip)} target="_blank" rel="noopener noreferrer" onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface-card)', border: '2px solid var(--ink-950)', borderRadius: 'var(--radius-sm)', textDecoration: 'none', color: 'inherit', transition: 'transform var(--dur-med) var(--ease-out), box-shadow var(--dur-med) var(--ease-out)', overflow: 'hidden' }}>
      <div style={{ aspectRatio: '16/10', background: image ? `#000 center/cover url("${image}")` : 'var(--ink-100)', borderBottom: '2px solid var(--ink-950)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}><Tag kind="article">Article</Tag></div>
      </div>
      <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand)' }}>{pretty(clip.section)}</span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, textTransform: 'uppercase', fontSize: 'var(--fs-h)', lineHeight: 1.05, letterSpacing: 'var(--tracking-tight)', color: 'var(--text-strong)', margin: 0 }}>{clip.headline}</h3>
        <div style={{ marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>The O'Colly · {fmtDate(clip.date)}{clip.live === false ? ' · archived' : ''}</div>
      </div>
    </a>
  );
}

/* ------------------------------ HOME ------------------------------ */
function Home({ onNav }) {
  const clips = useClips();
  const lead = clips && clips[0];
  return (
    <div>
      <div style={{ background: 'var(--ink-950)', color: 'var(--white)', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
        <Wrap>
          <div style={{ marginBottom: 'var(--space-5)' }}><Kicker>Sports Media · Oklahoma State</Kicker></div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', fontSize: 'var(--fs-display-xl)', lineHeight: 0.92, letterSpacing: '-0.02em', margin: 0, maxWidth: '14ch' }}>
            I cover<br/>Cowboy<br/>sports<span style={{ color: 'var(--brand)' }}>.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-lead)', lineHeight: 1.5, color: 'var(--ink-300)', maxWidth: '52ch', marginTop: 'var(--space-5)' }}>
            Student journalist at <strong style={{ color: 'var(--white)' }}>The O'Colly</strong> writing features, game recaps and asking the questions from the front row. This is my published work.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
            <Button variant="primary" onClick={() => onNav('Work')}>See the work</Button>
            <Button variant="ghost" onClick={() => onNav('About')} style={{ color: 'var(--white)', borderColor: 'var(--white)' }}>About me</Button>
          </div>
        </Wrap>
      </div>

      <Wrap style={{ marginTop: 'var(--space-8)' }}>
        <SectionHeading kicker="Featured" title="Latest story" action={<Button variant="ghost" size="sm" onClick={() => onNav('Work')}>All work</Button>} />
        {lead && (
          <a href={clipHref(lead)} target="_blank" rel="noopener noreferrer" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-6)', marginTop: 'var(--space-6)', textDecoration: 'none', color: 'inherit', alignItems: 'stretch' }}>
            <div style={{ aspectRatio: '16/10', background: clipImg(lead) ? `#000 center/cover url("${clipImg(lead)}")` : 'var(--ink-100)', border: '2px solid var(--ink-950)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '14px', left: '14px' }}><Tag kind="article">Article</Tag></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-4)' }}>
              <Kicker rule={false}>{pretty(lead.section)}</Kicker>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', fontSize: 'var(--fs-display-m)', lineHeight: 1.0, letterSpacing: '-0.01em', margin: 0, color: 'var(--text-strong)' }}>{lead.headline}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', lineHeight: 1.6, color: 'var(--text-body)', margin: 0 }}>{lead.excerpt}</p>
              <Byline outlet="The O'Colly" date={fmtDate(lead.date)} />
            </div>
          </a>
        )}
      </Wrap>

      <Wrap style={{ marginTop: 'var(--space-8)' }}>
        <SectionHeading kicker="Recent" title="More clips" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)', marginTop: 'var(--space-6)' }}>
          {(clips || []).slice(1, 4).map((c) => <ClipCard key={c.id} clip={c} />)}
        </div>
      </Wrap>
    </div>
  );
}

/* ------------------------------ WORK ------------------------------ */
function Work() {
  const clips = useClips();
  const [filter, setFilter] = React.useState('All');
  if (!clips) return <Wrap style={{ paddingTop: 'var(--space-8)' }}><SectionHeading kicker="Portfolio" title="Published work" /><p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: 'var(--space-5)' }}>Loading clips…</p></Wrap>;
  const cats = ['All', ...Array.from(new Set(clips.map((c) => pretty(c.section))))];
  const shown = filter === 'All' ? clips : clips.filter((c) => pretty(c.section) === filter);
  return (
    <Wrap style={{ paddingTop: 'var(--space-8)' }}>
      <SectionHeading kicker="Portfolio" title="Published work" />
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-5)', flexWrap: 'wrap' }}>
        {cats.map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '7px 14px', cursor: 'pointer', borderRadius: 'var(--radius-sm)', border: '2px solid var(--ink-950)',
            background: filter === f ? 'var(--ink-950)' : 'transparent', color: filter === f ? 'var(--white)' : 'var(--ink-950)',
          }}>{f}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)', marginTop: 'var(--space-6)' }}>
        {shown.map((c) => <ClipCard key={c.id} clip={c} />)}
      </div>
    </Wrap>
  );
}

/* ------------------------------ VIDEO ------------------------------ */
function VideoPage() {
  return (
    <Wrap style={{ paddingTop: 'var(--space-8)' }}>
      <SectionHeading kicker="On camera" title="Press &amp; video" />
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-lead)', color: 'var(--text-muted)', maxWidth: '54ch', marginTop: 'var(--space-4)' }}>
        Clips of Timothy on the beat — asking questions at press conferences and postgame availabilities. Coming soon.
      </p>
    </Wrap>
  );
}

/* ------------------------------ ARTICLE (unused; clips link out) ------------------------------ */
function Article({ onNav }) {
  return (
    <Wrap style={{ paddingTop: 'var(--space-8)' }}>
      <SectionHeading kicker="Portfolio" title="Published work" action={<Button variant="ghost" size="sm" onClick={() => onNav('Work')}>All work</Button>} />
    </Wrap>
  );
}

/* ------------------------------ ABOUT ------------------------------ */
function About() {
  const clips = useClips();
  const count = clips ? clips.length : 40;
  const sports = clips ? new Set(clips.map((c) => pretty(c.section))).size : 5;
  return (
    <div>
      <div style={{ background: 'var(--ink-950)', color: 'var(--white)', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
        <Wrap>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }}>
            <div>
              <div style={{ marginBottom: 'var(--space-4)' }}><Kicker>About</Kicker></div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', fontSize: 'var(--fs-display-l)', lineHeight: 0.96, letterSpacing: '-0.01em', margin: 0 }}>
                Timothy<br/>Christensen
              </h1>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-lead)', lineHeight: 1.55, color: 'var(--ink-300)', marginTop: 'var(--space-5)' }}>
                I'm a Sports Media major at Oklahoma State University and a staff writer for The O'Colly, OSU's independent student newspaper. I cover football, basketball, baseball and more — on the page and on camera.
              </p>
              <div style={{ marginTop: 'var(--space-6)' }}><Button variant="primary">Download résumé</Button></div>
            </div>
            <div style={{ aspectRatio: '4/5', background: 'var(--ink-800)', border: '2px solid var(--ink-700)' }}></div>
          </div>
        </Wrap>
      </div>
      <Wrap style={{ marginTop: 'var(--space-8)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap', paddingBottom: 'var(--space-7)', borderBottom: '2px solid var(--border-strong)' }}>
          <StatBlock value={count + '+'} label="Published bylines" />
          <StatBlock value={sports + ''} label="Sports covered" />
          <StatBlock value="2024" label="First byline" />
          <StatBlock value="2028" label="Expected grad" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', marginTop: 'var(--space-7)' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', fontSize: 'var(--fs-display-s)', margin: '0 0 var(--space-4)' }}>Experience</h3>
            {[['Staff Writer', "The O'Colly", '2024 — Present'], ['Contributor', 'OSU Athletics Media', '2025'], ['Sports Desk Intern', 'Stillwater News Press', 'Summer 2025']].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--text-strong)' }}>{r[0]}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-muted)' }}>{r[1]}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{r[2]}</div>
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', fontSize: 'var(--fs-display-s)', margin: '0 0 var(--space-4)' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {['Reporting', 'Feature writing', 'AP Style', 'Interviewing', 'On-camera', 'Video editing', 'Social/short-form', 'Game recaps', 'Deadline filing'].map((s) => (
                <Tag key={s} kind="topic">{s}</Tag>
              ))}
            </div>
          </div>
        </div>
      </Wrap>
    </div>
  );
}

Object.assign(window, { Home, Work, VideoPage, Article, About });
