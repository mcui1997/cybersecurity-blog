import React, { useEffect, useState } from 'react';
import { posts, tags } from './posts.js';

const BASE = import.meta.env.BASE_URL; // "/cybersecurity-blog/"
const PORTFOLIO = 'https://mcui1997.github.io/portfolio/';
const GITHUB = 'https://github.com/mcui1997';

function currentSlug() {
  const path = window.location.pathname;
  const rest = path.startsWith(BASE) ? path.slice(BASE.length) : path.replace(/^\//, '');
  return rest.replace(/\/$/, '');
}

function useRoute() {
  const [slug, setSlug] = useState(currentSlug());
  useEffect(() => {
    const onPop = () => setSlug(currentSlug());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const go = (next) => {
    window.history.pushState({}, '', BASE + next);
    setSlug(next);
    window.scrollTo(0, 0);
  };
  return [slug, go];
}

function Link({ to, go, children, ...rest }) {
  return (
    <a
      href={BASE + to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        go(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

function nextMonth() {
  const [y, m] = posts[0].month.split('-').map(Number);
  return m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, '0')}`;
}

function Header({ go }) {
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Link to="" go={go} className="brand">
          <span className="accent">&gt;_</span> michael cui
        </Link>
        <nav aria-label="Site">
          <a href={PORTFOLIO}>./portfolio</a>
          <Link to="" go={go} className="active">./blog</Link>
          <a href={GITHUB}>github ↗</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>© {new Date().getFullYear()} michael cui</span>
        <span>
          next entry: {nextMonth()} <span className="accent cursor">▍</span>
        </span>
      </div>
    </footer>
  );
}

function Index({ go }) {
  const [filter, setFilter] = useState('all');
  const latest = posts[0];
  const shown = filter === 'all' ? posts : posts.filter((p) => p.tag === filter);
  const first = posts[posts.length - 1].month;

  return (
    <main className="wrap index">
      <div className="prompt">$ cat ./blog/README.md</div>
      <h1 className="title">
        patch notes<span className="accent">_</span>
      </h1>
      <p className="intro">
        once a month i pick one security story that actually stuck with me, read past the headline, and write down
        what i think. i'm a software engineer working my way toward security, so the angle is always: what does this
        mean for the people building the stuff?
      </p>
      <div className="chips">
        <span>1 post / month</span>
        <span>since {first}</span>
        <span>{posts.length} entries</span>
      </div>

      <section className="latest" aria-label="Latest post">
        <div className="latest-meta">
          <span className="head">HEAD</span>
          <span>
            {latest.month} · {latest.minutes} min read
          </span>
        </div>
        <h2>
          <Link to={latest.slug} go={go}>{latest.title}</Link>
        </h2>
        <p>{latest.summary}</p>
        <Link to={latest.slug} go={go} className="read">read →</Link>
      </section>

      <section className="log" aria-label="All posts">
        <div className="log-head">
          <h2>$ git log --oneline {posts[0].month.slice(0, 4)}</h2>
          <div className="filters" role="group" aria-label="Filter by topic">
            {['all', ...tags].map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={filter === t}
                className={filter === t ? 'on' : ''}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        {shown.map((p) => (
          <Link key={p.slug} to={p.slug} go={go} className="row">
            <span className="row-date">{p.month}</span>
            <span className="row-main">
              <span className="row-title">{p.title}</span>
              <span className="row-sum">{p.summary}</span>
            </span>
            <span className="row-meta">
              {p.tag} · {p.minutes} min
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}

function Post({ post, go }) {
  const i = posts.indexOf(post);
  const newer = posts[i - 1];
  const older = posts[i + 1];

  useEffect(() => {
    document.title = `${post.title} — patch notes`;
    return () => {
      document.title = 'patch notes — Michael Cui';
    };
  }, [post]);

  return (
    <article className="wrap-narrow post">
      <Link to="" go={go} className="crumb">← blog / {post.month}</Link>
      <h1>{post.title}</h1>
      <div className="post-meta">
        <span>{post.date}</span>
        <span>{post.minutes} min read</span>
        <span className="accent">#{post.tag.replace(/\s+/g, '-')}</span>
      </div>

      {post.source && (
        <div className="source">
          <div className="source-head">source.txt</div>
          <div className="source-body">{post.source}</div>
        </div>
      )}

      {post.tldr.length > 0 && (
        <div className="tldr">
          <div className="tldr-head">TL;DR</div>
          <ul>
            {post.tldr.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="body" dangerouslySetInnerHTML={{ __html: post.html }} />

      <nav className="pager" aria-label="More posts">
        {older ? (
          <Link to={older.slug} go={go}>
            <span className="pager-label">← prev · {older.month}</span>
            {older.title}
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link to={newer.slug} go={go} className="right">
            <span className="pager-label">next · {newer.month} →</span>
            {newer.title}
          </Link>
        ) : (
          <span className="right muted">
            <span className="pager-label">next · {nextMonth()}</span>
            coming soon <span className="accent cursor">▍</span>
          </span>
        )}
      </nav>
    </article>
  );
}

function NotFound({ go }) {
  return (
    <main className="wrap index">
      <div className="prompt">$ cat ./{currentSlug()}</div>
      <h1 className="title">404<span className="accent">_</span></h1>
      <p className="intro">no such file or directory.</p>
      <Link to="" go={go} className="read">← back to the blog</Link>
    </main>
  );
}

export default function App() {
  const [slug, go] = useRoute();
  const post = posts.find((p) => p.slug === slug);
  return (
    <>
      <Header go={go} />
      {slug === '' ? <Index go={go} /> : post ? <Post post={post} go={go} /> : <NotFound go={go} />}
      <Footer />
    </>
  );
}
