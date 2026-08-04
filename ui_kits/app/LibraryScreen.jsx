(function(){
const LibraryScreen_DS = window.LingoToolboxDesignSystem_898611;
const Card = LibraryScreen_DS.Card; const Tabs = LibraryScreen_DS.Tabs; const Tag = LibraryScreen_DS.Tag; const Badge = LibraryScreen_DS.Badge; const Button = LibraryScreen_DS.Button; const Icon = LibraryScreen_DS.Icon; const IconButton = LibraryScreen_DS.IconButton; const ProgressBar = LibraryScreen_DS.ProgressBar; const Select = LibraryScreen_DS.Select; const Input = LibraryScreen_DS.Input; const Tooltip = LibraryScreen_DS.Tooltip;

const libraryStyles = {
  page: { padding: '24px 32px 48px', maxWidth: 'var(--content-max)', margin: '0 auto' },
  head: { display: 'flex', alignItems: 'center', gap: 'var(--space-5)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'var(--space-5)', marginTop: 'var(--space-6)' },
  eyebrow: { fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' },
};

function LibraryScreen({ onNewDeck, onOpen }) {
  const [tab, setTab] = React.useState('mine');
  const [selected, setSelected] = React.useState('kitchen');
  return (
    <div style={libraryStyles.page}>
      <div style={libraryStyles.head}>
        <div style={{ flex: 1, minWidth: 260, maxWidth: 340 }}>
          <Input placeholder="Filter decks" size="md" iconLeft={<Icon name="search" size={16} />} />
        </div>
        <div style={{ width: 160 }}><Select options={['Recently studied', 'Most due', 'A–Z']} size="md" /></div>
        <Tooltip label="Grid view"><IconButton label="Grid view" variant="solid" active><Icon name="grid-2x2" size={16} /></IconButton></Tooltip>
        <Tooltip label="List view"><IconButton label="List view"><Icon name="list" size={16} /></IconButton></Tooltip>
        <Button iconLeft={<Icon name="plus" size={16} />} onClick={onNewDeck}>New deck</Button>
      </div>

      <Tabs items={[{ value: 'mine', label: 'My decks', count: 6 }, { value: 'shared', label: 'Shared with me', count: 2 }, { value: 'community', label: 'Community' }]} value={tab} onChange={setTab} />

      <div style={libraryStyles.grid}>
        {LINGO_DATA.decks.map((d) => (
          <Card key={d.id} accent={d.accent} interactive selected={selected === d.id} onClick={() => setSelected(d.id)}
            title={d.name} subtitle={d.cards + ' cards · ' + Math.round(d.mastery * 100) + '% mastered'}
            actions={<IconButton label="Deck options" size="sm"><Icon name="ellipsis" size={16} /></IconButton>}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {d.tags.map((t) => <Tag key={t} color={d.accent}>{t}</Tag>)}
              {d.due > 0 && <Badge tone="warning">{d.due} due</Badge>}
              {d.due === 0 && <Badge tone="success" dot>Clear</Badge>}
            </div>
            <ProgressBar value={d.mastery * 100} height={6} color={d.accent} />
            <div style={{ display: 'flex', gap: 'var(--gap-inline)', marginTop: 4 }}>
              <Button size="sm" block onClick={onOpen} disabled={d.due === 0}>{d.due ? 'Review ' + d.due : 'Nothing due'}</Button>
              <Button size="sm" variant="ghost" iconLeft={<Icon name="pencil" size={14} />}>Edit</Button>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 'var(--space-9)' }}>
        <span style={libraryStyles.eyebrow}>Recently added cards</span>
        <div style={{ marginTop: 'var(--space-4)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--ring-inset)' }}>
          {[['sobremesa', 'the long talk after a meal', 'Kitchen Spanish', 'noun'], ['madrugar', 'to get up very early', 'Irregular verbs', 'verb'], ['friolero', 'someone who feels the cold easily', 'Idioms that lie', 'adj'], ['tertulia', 'a regular social gathering to talk', 'Office small talk', 'noun']].map((r, i) => (
            <div key={r[0]} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', padding: '12px 16px', background: i % 2 ? 'var(--surface-card)' : 'var(--ink-700)' }}>
              <span style={{ width: 150, flex: 'none', fontFamily: 'var(--font-display)', fontSize: 'var(--fs-18)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{r[0]}</span>
              <span style={{ flex: 1, minWidth: 0, fontSize: 'var(--fs-14)', color: 'var(--text-body)' }}>{r[1]}</span>
              <Tag color="var(--cyan-500)">{r[3]}</Tag>
              <span style={{ width: 150, flex: 'none', fontSize: 'var(--fs-13)', color: 'var(--text-faint)', textAlign: 'right' }}>{r[2]}</span>
              <IconButton label="Edit card" size="sm"><Icon name="pencil" size={14} /></IconButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LibraryScreen, libraryStyles });
})();
