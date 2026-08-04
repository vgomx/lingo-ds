(function(){
const SettingsScreen_DS = window.LingoToolboxDesignSystem_898611;
const Card = SettingsScreen_DS.Card; const Switch = SettingsScreen_DS.Switch; const Select = SettingsScreen_DS.Select; const Input = SettingsScreen_DS.Input; const Radio = SettingsScreen_DS.Radio; const Checkbox = SettingsScreen_DS.Checkbox; const Button = SettingsScreen_DS.Button; const Icon = SettingsScreen_DS.Icon; const Avatar = SettingsScreen_DS.Avatar; const Tag = SettingsScreen_DS.Tag; const Badge = SettingsScreen_DS.Badge;

const settingsStyles = {
  page: { padding: '24px 32px 48px', maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' },
  eyebrow: { fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)', letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' },
  divider: { height: 1, background: 'var(--divider)', margin: '2px 0' },
};

function SettingsScreen({ onSaved }) {
  const [mode, setMode] = React.useState('srs');
  return (
    <div style={settingsStyles.page}>
      <Card padding="18px">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          <Avatar name="Mara Okafor" size="xl" status="online" />
          <div style={{ flex: 1 }}>
            <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 'var(--fs-24)', fontWeight: 'var(--fw-black)', color: 'var(--text-strong)', lineHeight: 1.1 }}>Mara Okafor</span>
            <span style={{ fontSize: 'var(--fs-13)', color: 'var(--text-muted)' }}>mara@lingo.app · Level 14 · 4,208 XP</span>
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <Tag color="var(--coral-500)">Spanish</Tag><Tag color="var(--cyan-500)">Japanese</Tag><Tag color="var(--mint-500)">Turkish</Tag>
            </div>
          </div>
          <Button variant="secondary" size="sm">Edit profile</Button>
        </div>
      </Card>

      <div>
        <span style={settingsStyles.eyebrow}>Review</span>
        <Card style={{ marginTop: 'var(--space-4)' }} padding="18px">
          <Switch label="Autoplay audio" hint="Plays the native recording when a card flips" defaultChecked />
          <div style={settingsStyles.divider} />
          <Switch label="Show phonetics on the front" defaultChecked />
          <div style={settingsStyles.divider} />
          <Switch label="Reverse cards occasionally" hint="Asks you to produce the target word instead of recognising it" />
          <div style={settingsStyles.divider} />
          <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
            <div style={{ width: 200 }}><Select label="Daily limit" options={['20 cards', '40 cards', '80 cards', 'No limit']} defaultValue="40 cards" /></div>
            <div style={{ width: 200 }}><Select label="Session length" options={['5 minutes', '10 minutes', '20 minutes']} defaultValue="10 minutes" /></div>
          </div>
        </Card>
      </div>

      <div>
        <span style={settingsStyles.eyebrow}>Scheduling</span>
        <Card style={{ marginTop: 'var(--space-4)' }} padding="18px">
          <Radio label="Spaced repetition" hint="Recommended — intervals grow as you get things right" value="srs" checked={mode === 'srs'} onChange={setMode} />
          <Radio label="Cram" hint="Every card, every session, no intervals" value="cram" checked={mode === 'cram'} onChange={setMode} />
          <Radio label="Leeches only" hint="Just the cards you keep forgetting" value="leech" checked={mode === 'leech'} onChange={setMode} />
        </Card>
      </div>

      <div>
        <span style={settingsStyles.eyebrow}>Reminders</span>
        <Card style={{ marginTop: 'var(--space-4)' }} padding="18px">
          <Switch label="Daily reminder" hint="20:00, every day" defaultChecked />
          <div style={settingsStyles.divider} />
          <Checkbox label="Email me a weekly summary" defaultChecked />
          <Checkbox label="Nudge me when a streak is about to break" />
          <div style={{ width: 260, marginTop: 4 }}>
            <Input label="Reminder email" type="email" defaultValue="mara@lingo.app" />
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--gap-inline)' }}>
        <Button variant="ghost">Discard</Button>
        <Button iconLeft={<Icon name="check" size={16} />} onClick={onSaved}>Save changes</Button>
      </div>
    </div>
  );
}

Object.assign(window, { SettingsScreen, settingsStyles });
})();
