(function(){
const AppShell_DS = window.LingoToolboxDesignSystem_898611;
const Logo = AppShell_DS.Logo; const Icon = AppShell_DS.Icon; const RailTile = AppShell_DS.RailTile; const SidebarItem = AppShell_DS.SidebarItem; const Badge = AppShell_DS.Badge; const Avatar = AppShell_DS.Avatar; const StreakPill = AppShell_DS.StreakPill; const IconButton = AppShell_DS.IconButton; const Tooltip = AppShell_DS.Tooltip; const Input = AppShell_DS.Input;

const LINGO_DATA = {
  workspaces: [
    { code: 'ES', name: 'Spanish', flag: '🇪🇸', color: 'var(--coral-500)', unread: 3 },
    { code: 'JA', name: 'Japanese', flag: '🇯🇵', color: 'var(--cyan-500)', unread: 0 },
    { code: 'TR', name: 'Turkish', flag: '🇹🇷', color: 'var(--mint-500)', unread: 0 },
  ],
  tools: [
    { id: 'home', label: 'Home', short: 'Home', icon: 'house' },
    { id: 'review', label: 'Flashcards', short: 'Cards', icon: 'layers', meta: '50' },
    { id: 'etymology', label: 'Etymology Explorer', short: 'Roots', icon: 'git-branch' },
    { id: 'conjugation', label: 'Conjugation Drill', short: 'Verbs', icon: 'spell-check', badge: 'New' },
    { id: 'phrasebook', label: 'Phrasebook', short: 'Phrases', icon: 'message-square-quote' },
    { id: 'grammar', label: 'Grammar Notes', short: 'Grammar', icon: 'scroll-text' },
  ],
  decks: [
    { id: 'kitchen', name: 'Kitchen Spanish', cards: 42, due: 12, accent: 'var(--tool-flashcards)', tags: ['food', 'A2'], mastery: 0.71 },
    { id: 'market', name: 'At the market', cards: 68, due: 4, accent: 'var(--cyan-500)', tags: ['shopping', 'A2'], mastery: 0.52 },
    { id: 'idioms', name: 'Idioms that lie', cards: 31, due: 0, accent: 'var(--coral-500)', tags: ['idiom', 'B2'], mastery: 0.88 },
    { id: 'verbs', name: 'Irregular verbs', cards: 120, due: 26, accent: 'var(--pink-500)', tags: ['verbs', 'B1'], mastery: 0.34 },
    { id: 'travel', name: 'Trains & tickets', cards: 24, due: 0, accent: 'var(--mint-500)', tags: ['travel', 'A1'], mastery: 0.95 },
    { id: 'work', name: 'Office small talk', cards: 55, due: 8, accent: 'var(--amber-500)', tags: ['work', 'B1'], mastery: 0.44 },
  ],
  cards: [
    { front: 'sobremesa', phonetic: '/so.bɾeˈme.sa/', back: 'the long talk after a meal', tags: ['noun', 'B1'] },
    { front: 'madrugar', phonetic: '/ma.ðɾuˈɣaɾ/', back: 'to get up very early', tags: ['verb', 'B1'] },
    { front: 'friolero', phonetic: '/fɾjoˈle.ɾo/', back: 'someone who feels the cold easily', tags: ['adj', 'B2'] },
  ],
};

const shellStyles = {
  frame: { display: 'flex', height: '100%', background: 'var(--surface-app)', fontFamily: 'var(--font-ui)', position: 'relative', overflow: 'hidden' },
  rail: { width: 'var(--rail-width)', flex: 'none', background: 'var(--surface-rail)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)', padding: '10px 0 12px' },
  sidebar: { width: 'var(--sidebar-width)', flex: 'none', background: 'var(--surface-sidebar)', display: 'flex', flexDirection: 'column' },
  sidebarHead: { height: 'var(--topbar-height)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px 0 16px', boxShadow: 'var(--shadow-xs)', flex: 'none', cursor: 'pointer' },
  sectionLabel: { fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', padding: '0 8px', marginBottom: 4 },
  userBar: { height: 56, flex: 'none', background: 'var(--ink-900)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: '0 8px 0 10px' },
  main: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' },
  topbar: { height: 'var(--topbar-height)', flex: 'none', display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: '0 16px', boxShadow: 'var(--shadow-xs)' },
  topTitle: { display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-15)', fontWeight: 'var(--fw-black)', color: 'var(--text-strong)' },
  body: { flex: 1, minHeight: 0, overflowY: 'auto' },
};

function LanguageMenu({ ws, onWorkspace, onAdd }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!open) return undefined;
    const close = () => setOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [open]);
  return (
    <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-label="Switch language"
        style={{ display: 'flex', alignItems: 'center', gap: 8, height: 34, padding: '0 10px 0 8px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)', background: open ? 'var(--surface-card)' : 'transparent', color: 'var(--text-strong)', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-13)', fontWeight: 'var(--fw-bold)' }}>
        <span style={{ fontSize: 18, lineHeight: 1 }}>{ws.flag}</span>
        {ws.name}
        <Icon name="chevron-down" size={14} style={{ color: 'var(--text-muted)' }} />
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 40, right: 0, minWidth: 224, zIndex: 40, padding: 6, borderRadius: 'var(--radius-lg)', background: 'var(--surface-raised)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ ...shellStyles.sectionLabel, marginBottom: 2, padding: '6px 8px 2px' }}>Language track</span>
          {LINGO_DATA.workspaces.map((w) => (
            <button key={w.code} type="button" onClick={() => { onWorkspace(w.code); setOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, height: 38, padding: '0 8px', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer', background: w.code === ws.code ? 'var(--surface-card)' : 'transparent', color: 'var(--text-strong)', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-14)', fontWeight: 'var(--fw-bold)', textAlign: 'left' }}>
              <span style={{ fontSize: 20, lineHeight: 1 }}>{w.flag}</span>
              <span style={{ flex: 1 }}>{w.name}</span>
              {w.unread > 0 && <Badge tone="danger">{w.unread}</Badge>}
              {w.code === ws.code && <Icon name="check" size={16} style={{ color: w.color }} />}
            </button>
          ))}
          <span style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
          <button type="button" onClick={() => { setOpen(false); onAdd && onAdd(); }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, height: 34, padding: '0 8px', borderRadius: 'var(--radius-md)', border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-13)', fontWeight: 'var(--fw-bold)' }}>
            <Icon name="plus" size={15} /> Add a language
          </button>
        </div>
      )}
    </div>
  );
}

function AppShell({ workspace, onWorkspace, tool, onTool, title, titleIcon, topRight, children, onNewDeck }) {
  const ws = LINGO_DATA.workspaces.find((w) => w.code === workspace) || LINGO_DATA.workspaces[0];
  const activeTool = LINGO_DATA.tools.find((t) => t.id === tool);
  return (
    <div style={shellStyles.frame}>
      <nav style={shellStyles.rail}>
        <img src="../../assets/logo/mark-violet.svg" alt="Lingo Toolbox" style={{ height: 43, width: 38 }} />
        <span style={{ width: 32, height: 2, background: 'var(--border)', borderRadius: 2, margin: '4px 0 6px' }} />
        {LINGO_DATA.tools.map((t) => (
          <Tooltip key={t.id} label={t.label} side="right">
            <RailTile label={t.short || t.label} icon={<Icon name={t.icon} size={18} />} color="var(--surface-raised)" size={38} quiet showLabel
              active={tool === t.id} onClick={() => onTool(t.id)} />
          </Tooltip>
        ))}
        <span style={{ flex: 1 }} />
        <IconButton label="Settings" active={tool === 'settings'} onClick={() => onTool('settings')}>
          <Icon name="settings" size={20} />
        </IconButton>
      </nav>

      <aside style={shellStyles.sidebar}>
        <div style={{ ...shellStyles.sidebarHead, cursor: 'default' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-18)', fontWeight: 'var(--fw-black)', color: 'var(--text-strong)' }}>{activeTool ? activeTool.label : 'Lingo Toolbox'}</span>
          <Badge tone="neutral">{ws.flag} {ws.code}</Badge>
        </div>
        <div style={{ padding: '10px 8px 6px' }}>
          <Input placeholder="Search words, decks…" size="sm" iconLeft={<Icon name="search" size={14} />} />
        </div>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '6px 8px 12px' }}>
          <div style={{ ...shellStyles.sectionLabel, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Decks</span>
            <button type="button" onClick={onNewDeck} aria-label="New deck"
              style={{ border: 'none', background: 'transparent', color: 'var(--text-faint)', cursor: 'pointer', padding: 0, display: 'grid' }}>
              <Icon name="plus" size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {LINGO_DATA.decks.map((d) => (
              <SidebarItem key={d.id} label={d.name} meta={d.due ? String(d.due) : ''} muted={!d.due}
                icon={<span style={{ width: 8, height: 8, borderRadius: 3, background: d.accent, display: 'block' }} />}
                onClick={() => onTool('library')} />
            ))}
          </div>
        </div>
        <div style={shellStyles.userBar}>
          <Avatar name="Mara Okafor" status="online" size="md" />
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 'var(--fs-13)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Mara Okafor</span>
            <span style={{ fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-faint)' }}>Level 14 · 4,208 XP</span>
          </div>
          <Tooltip label="Mute audio"><IconButton label="Mute audio" size="sm"><Icon name="volume-2" size={16} /></IconButton></Tooltip>
          <Tooltip label="Settings"><IconButton label="Settings" size="sm" onClick={() => onTool('settings')}><Icon name="settings" size={16} /></IconButton></Tooltip>
        </div>
      </aside>

      <main style={shellStyles.main}>
        <header style={shellStyles.topbar}>
          <span style={shellStyles.topTitle}>
            {titleIcon && <Icon name={titleIcon} size={18} style={{ color: 'var(--text-muted)' }} />}
            {title}
          </span>
          <span style={{ flex: 1 }} />
          {topRight}
          <span style={{ width: 4 }} />
          <LanguageMenu ws={ws} onWorkspace={onWorkspace} onAdd={onNewDeck} />
          <StreakPill days={26} size="sm" />
          <Tooltip label="Notifications"><IconButton label="Notifications"><Icon name="bell" size={18} /></IconButton></Tooltip>
          <Tooltip label="Help"><IconButton label="Help"><Icon name="circle-question-mark" size={18} /></IconButton></Tooltip>
        </header>
        <div style={shellStyles.body}>{children}</div>
      </main>
    </div>
  );
}

Object.assign(window, { AppShell, LINGO_DATA, shellStyles });
})();
