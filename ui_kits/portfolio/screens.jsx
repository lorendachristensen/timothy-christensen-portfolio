// Sample portfolio data + the four screens. Composes design-system components
// from window[NS]. Content is representative sample work for a student journalist.
const NS = window.TimothyChristensenPortfolioDesignSystem_d29e8f;
const { Button, Tag, Kicker, SectionHeading, ArticleCard, VideoCard, Byline, StatBlock } = NS;

const ARTICLES = [
  { kind: 'article', category: "Football", title: "Cowboys stun No. 12 Longhorns in Stillwater thriller", outlet: "The O'Colly", date: "Oct 2025" },
  { kind: 'article', category: "Men's Basketball", title: "Freshman guard's career night lifts OSU past K-State", outlet: "The O'Colly", date: "Feb 2026" },
  { kind: 'video',   category: "Press Conference", title: "Asking Gundy about the fourth-quarter QB rotation", outlet: "The O'Colly", date: "Mar 2026" },
  { kind: 'article', category: "Wrestling", title: "Inside the Cowboys' pursuit of another national title", outlet: "The O'Colly", date: "Jan 2026" },
  { kind: 'social',  category: "Gameday", title: "Live thread: Bedlam returns to Boone Pickens Stadium", outlet: "@tchristensen", date: "Nov 2025" },
  { kind: 'article', category: "Feature", title: "The walk-on who became a captain: Marcus Reed's road", outlet: "The O'Colly", date: "Sep 2025" },
];

const VIDEOS = [
  { title: "Asking Gundy about the QB rotation", meta: "Press conference · Mar 2026", duration: "0:47" },
  { title: "Postgame with the freshman guard after 28 points", meta: "Locker room · Feb 2026", duration: "1:12" },
  { title: "Wrestling media day one-on-one", meta: "Media day · Jan 2026", duration: "0:58" },
];

function Wrap({ children, style }) {
  return <div style={{ maxWidth: 'var(--maxw-page)', margin: '0 auto', padding: '0 var(--space-6)', ...style }}>{children}</div>;
}

/* ------------------------------ HOME ------------------------------ */
function Home({ onNav }) {
  const lead = ARTICLES[0];
  return (
    <div>
      {/* Hero */}
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

      {/* Featured */}
      <Wrap style={{ marginTop: 'var(--space-8)' }}>
        <SectionHeading kicker="Featured" title="Latest story" action={<Button variant="ghost" size="sm" onClick={() => onNav('Work')}>All work</Button>} />
        <div onClick={() => onNav('Article')} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-6)', marginTop: 'var(--space-6)', cursor: 'pointer', alignItems: 'stretch' }}>
          <div style={{ aspectRatio: '16/10', background: 'var(--ink-100)', border: '2px solid var(--ink-950)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '14px', left: '14px' }}><Tag kind="article">Article</Tag></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-4)' }}>
            <Kicker rule={false}>{lead.category}</Kicker>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', fontSize: 'var(--fs-display-m)', lineHeight: 1.0, letterSpacing: '-0.01em', margin: 0, color: 'var(--text-strong)' }}>{lead.title}</h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', lineHeight: 1.6, color: 'var(--text-body)', margin: 0 }}>
              A raucous night in Stillwater as the Cowboys knocked off a ranked opponent for the first time in three seasons.
            </p>
            <Byline outlet={lead.outlet} date={lead.date} readTime="4 min read" />
          </div>
        </div>
      </Wrap>

      {/* Recent grid */}
      <Wrap style={{ marginTop: 'var(--space-8)' }}>
        <SectionHeading kicker="Recent" title="More clips" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)', marginTop: 'var(--space-6)' }}>
          {ARTICLES.slice(1, 4).map((a, i) => (
            <ArticleCard key={i} {...a} href="#" />
          ))}
        </div>
      </Wrap>
    </div>
  );
}

/* ------------------------------ WORK ------------------------------ */
function Work() {
  const [filter, setFilter] = React.useState('All');
  const filters = ['All', 'Article', 'Video', 'Social'];
  const shown = ARTICLES.filter((a) => filter === 'All' || a.kind === filter.toLowerCase());
  return (
    <Wrap style={{ paddingTop: 'var(--space-8)' }}>
      <SectionHeading kicker="Portfolio" title="Published work" />
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-5)' }}>
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '7px 14px', cursor: 'pointer', borderRadius: 'var(--radius-sm)',
            border: '2px solid var(--ink-950)',
            background: filter === f ? 'var(--ink-950)' : 'transparent',
            color: filter === f ? 'var(--white)' : 'var(--ink-950)',
          }}>{f}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)', marginTop: 'var(--space-6)' }}>
        {shown.map((a, i) => <ArticleCard key={i} {...a} href="#" />)}
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
        Clips of me on the beat — asking questions at press conferences and postgame availabilities.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-6)', maxWidth: '760px' }}>
        {VIDEOS.map((v, i) => <VideoCard key={i} {...v} href="#" />)}
      </div>
    </Wrap>
  );
}

/* ------------------------------ ARTICLE ------------------------------ */
function Article({ onNav }) {
  return (
    <article>
      <div style={{ background: 'var(--ink-950)', color: 'var(--white)', paddingTop: 'var(--space-7)', paddingBottom: 'var(--space-7)' }}>
        <div style={{ maxWidth: 'var(--maxw-read)', margin: '0 auto', padding: '0 var(--space-5)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}><Kicker>Football · Game Recap</Kicker></div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', fontSize: 'var(--fs-display-l)', lineHeight: 0.98, letterSpacing: '-0.01em', margin: 0 }}>
            Cowboys stun No. 12 Longhorns in Stillwater thriller
          </h1>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <Byline outlet="The O'Colly" date="Oct 12, 2025" readTime="4 min read" style={{ color: 'var(--ink-300)' }} />
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 'var(--maxw-read)', margin: '0 auto', padding: '0 var(--space-5)' }}>
        <div style={{ aspectRatio: '16/9', background: 'var(--ink-100)', border: '2px solid var(--ink-950)', margin: 'var(--space-6) 0' }}></div>
        {[
          "STILLWATER — The final whistle hadn't yet echoed off the Boone Pickens rafters when the student section began its slow roll toward the field.",
          "Oklahoma State's 27-24 upset of No. 12 Texas on Saturday was the program's first win over a ranked opponent in three seasons, and it came the way the Cowboys have promised all year: with a defense that refused to break and a freshman quarterback who refused to blink.",
          "\"We talked all week about earning the moment,\" head coach Mike Gundy said afterward. \"These kids earned it.\"",
          "The go-ahead drive covered 71 yards in nine plays, capped by a 12-yard strike with 1:04 remaining that sent the crowd of 55,000 into a frenzy that lasted well past midnight.",
        ].map((p, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', lineHeight: 'var(--lh-read)', color: 'var(--text-body)', margin: '0 0 var(--space-5)' }}>{p}</p>
        ))}
        <blockquote style={{ borderLeft: '3px solid var(--brand)', paddingLeft: 'var(--space-4)', margin: 'var(--space-6) 0', fontFamily: 'var(--font-display)', fontWeight: 500, textTransform: 'uppercase', fontSize: '1.75rem', lineHeight: 1.1, color: 'var(--text-strong)' }}>
          "Some nights the story writes itself."
        </blockquote>
        <div style={{ borderTop: '2px solid var(--border-strong)', marginTop: 'var(--space-7)', paddingTop: 'var(--space-5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <Byline outlet="The O'Colly" date="Oct 12, 2025" />
          <Button variant="ghost" size="sm" onClick={() => onNav('Work')}>← Back to work</Button>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------ ABOUT ------------------------------ */
function About() {
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
                I'm a Sports Media major at Oklahoma State University and a staff writer for The O'Colly, OSU's independent student newspaper. I cover football, basketball and wrestling — on the page and on camera.
              </p>
              <div style={{ marginTop: 'var(--space-6)' }}><Button variant="primary">Download résumé</Button></div>
            </div>
            <div style={{ aspectRatio: '4/5', background: 'var(--ink-800)', border: '2px solid var(--ink-700)' }}></div>
          </div>
        </Wrap>
      </div>
      <Wrap style={{ marginTop: 'var(--space-8)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap', paddingBottom: 'var(--space-7)', borderBottom: '2px solid var(--border-strong)' }}>
          <StatBlock value="40+" label="Published bylines" />
          <StatBlock value="12" label="Video clips" />
          <StatBlock value="3" label="Sports covered" />
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
