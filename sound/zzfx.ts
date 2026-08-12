/**
 * ZzFX — Zuper Zmall Zound Zynth, v1.3.2 by Frank Force. MIT.
 * https://github.com/KilledByAPixel/ZzFX
 *
 * The synthesis loop below is ZzFXMicro verbatim apart from types. Three things
 * around it are ours, because the micro edition is written for size-coding demos
 * rather than for an app:
 *
 * 1. The AudioContext is created on first play, not at module load. ZzFXMicro
 *    does `new AudioContext` at the top level, which browsers create in a
 *    suspended state and warn about when no gesture has happened yet — and which
 *    would throw outright anywhere there is no `window`.
 * 2. Everything routes through a master gain, so mute and volume are real
 *    rather than a `const zzfxV` fixed at build time.
 * 3. Playing while muted returns without synthesising. Generating ~44k samples
 *    to multiply them by zero is work nobody asked for.
 *
 * The licence ships at sound/LICENSE.txt and must travel with any copy.
 */

/** The 21 ZzFX parameters, in order. Every one is optional and falls back. */
export type ZzfxParams = (number | undefined)[];

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = true;
let volume = 0.3; // ZzFX's own default (zzfxV)

type Ctor = typeof AudioContext;

/**
 * Whether a context is still worth keeping.
 *
 * `running` and `suspended` are the two the spec defines and the two that can
 * be played through — a suspended one resumes on the next gesture. `closed` is
 * final. WebKit adds a third, `interrupted`, which is not in the spec or in the
 * DOM types: iOS hands the audio session to whatever wants it more — a call,
 * Siri, another app, or simply the app going to the background — and the
 * context is parked. Read as a plain string so the non-standard state does not
 * have to be lied about in the type.
 */
const usable = (c: AudioContext) => {
  const state: string = c.state;
  return state === 'running' || state === 'suspended';
};

/** Drops the current context so the next call builds a fresh one. */
function discard(): void {
  const old = ctx;
  ctx = null;
  master = null;
  // A context that has already been taken away can throw on close; there is
  // nothing to do about it and nothing that needs doing.
  try { void old?.close(); } catch { /* already gone */ }
}

/**
 * The audio context, built on demand and thrown away when iOS takes it.
 *
 * One context for the life of the page is what ZzFX assumes and what a desktop
 * browser makes true. iOS does not: an interrupted context can come back
 * reporting a state it cannot play in, and — the case this is really for — an
 * app run from the home screen is backgrounded every time the reader leaves it
 * and is never reloaded, so it accumulates interruptions that a browser tab
 * mostly escapes by being reloaded. Holding one context forever means the app
 * goes quiet for good the first time that happens.
 *
 * Rebuilding is cheap and the alternative is silence, so anything not plainly
 * usable is discarded rather than nursed.
 */
function audio(): AudioContext | null {
  if (ctx && usable(ctx)) return ctx;
  if (ctx) discard();
  if (typeof window === 'undefined') return null;
  const Ctx: Ctor | undefined =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: Ctor }).webkitAudioContext;
  if (!Ctx) return null;
  ctx = new Ctx();
  master = ctx.createGain();
  master.gain.value = volume;
  master.connect(ctx.destination);
  return ctx;
}

/** Turns all sound on or off. Off is silent and does no synthesis work. */
export function setSoundEnabled(next: boolean): void {
  enabled = next;
}

export function isSoundEnabled(): boolean {
  return enabled;
}

/** Master volume, 0–1. */
export function setSoundVolume(next: number): void {
  volume = Math.max(0, Math.min(1, next));
  if (master) master.gain.value = volume;
}

/**
 * Readies the audio context, rebuilding it first if iOS has taken it away.
 *
 * Browsers start a context suspended until a real gesture, so call this from a
 * click or keypress — anywhere else it is a no-op that leaves the context
 * suspended and the first sound silent. Safe and cheap to call on every
 * gesture rather than only the first: a running context returns immediately,
 * and a context lost to an interruption can only be replaced from a gesture,
 * so the first tap after coming back is the one chance to do it.
 */
export function unlockSound(): void {
  const c = audio();
  if (c && c.state === 'suspended') void c.resume();
}

export function zzfx(...params: ZzfxParams): AudioBufferSourceNode | null {
  if (!enabled) return null;
  const c = audio();
  if (!c || !master) return null;
  // A gesture-driven call may be the first one; resuming here means the sound
  // that triggered the unlock is also the one that plays.
  if (c.state === 'suspended') void c.resume();

  const [
    pVolume = 1, randomness = 0.05, pFrequency = 220, pAttack = 0, pSustain = 0, pRelease = 0.1,
    shape = 0, shapeCurve = 1, pSlide = 0, pDeltaSlide = 0, pPitchJump = 0, pPitchJumpTime = 0,
    pRepeatTime = 0, noise = 0, pModulation = 0, bitCrush = 0, pDelay = 0, sustainVolume = 1,
    pDecay = 0, tremolo = 0, filter = 0,
  ] = params;

  // ─── ZzFXMicro v1.3.2, unchanged ────────────────────────────────────────
  const sampleRate = 44100;
  const PI2 = Math.PI * 2;
  const abs = Math.abs;
  const sign = (v: number) => (v < 0 ? -1 : 1);

  let slide = pSlide * 500 * PI2 / sampleRate / sampleRate;
  const startSlide = slide;
  let frequency = pFrequency * (1 + randomness * 2 * Math.random() - randomness) * PI2 / sampleRate;
  let startFrequency = frequency;
  let modOffset = 0;
  let repeat = 0;
  let crush = 0;
  let jump = 1;
  const b: number[] = [];
  let t = 0;
  let i = 0;
  let s = 0;
  let f: number;

  const quality = 2;
  const w = PI2 * abs(filter) * 2 / sampleRate;
  const cos = Math.cos(w);
  const alpha = Math.sin(w) / 2 / quality;
  const a0 = 1 + alpha;
  const a1 = -2 * cos / a0;
  const a2 = (1 - alpha) / a0;
  const b0 = (1 + sign(filter) * cos) / 2 / a0;
  const b1 = -(sign(filter) + cos) / a0;
  const b2 = b0;
  let x2 = 0; let x1 = 0; let y2 = 0; let y1 = 0;

  const minAttack = 9; // prevents a pop when attack is 0
  const attack = pAttack * sampleRate || minAttack;
  const decay = pDecay * sampleRate;
  const sustain = pSustain * sampleRate;
  const release = pRelease * sampleRate;
  const delay = pDelay * sampleRate;
  const deltaSlide = pDeltaSlide * 500 * PI2 / sampleRate ** 3;
  const modulation = pModulation * PI2 / sampleRate;
  const pitchJump = pPitchJump * PI2 / sampleRate;
  const pitchJumpTime = pPitchJumpTime * sampleRate;
  const repeatTime = pRepeatTime * sampleRate | 0;
  const vol = pVolume; // master gain applies the global level instead of zzfxV

  const length = attack + decay + sustain + release + delay | 0;
  for (; i < length; b[i++] = s * vol) {
    if (!(++crush % (bitCrush * 100 | 0))) {
      s = shape
        ? shape > 1 ? shape > 2 ? shape > 3 ? shape > 4
          ? ((t / PI2 % 1 < shapeCurve / 2) as unknown as number) * 2 - 1 // 5 square duty
          : Math.sin(t ** 3)                                             // 4 noise
          : Math.max(Math.min(Math.tan(t), 1), -1)                       // 3 tan
          : 1 - (2 * t / PI2 % 2 + 2) % 2                                // 2 saw
          : 1 - 4 * abs(Math.round(t / PI2) - t / PI2)                   // 1 triangle
        : Math.sin(t);                                                   // 0 sine

      s = (repeatTime ? 1 - tremolo + tremolo * Math.sin(PI2 * i / repeatTime) : 1)
        * (shape > 4 ? s : sign(s) * abs(s) ** shapeCurve)
        * (i < attack ? i / attack
          : i < attack + decay ? 1 - ((i - attack) / decay) * (1 - sustainVolume)
            : i < attack + decay + sustain ? sustainVolume
              : i < length - delay ? (length - i - delay) / release * sustainVolume
                : 0);

      s = delay
        ? s / 2 + (delay > i ? 0 : (i < length - delay ? 1 : (length - i) / delay) * b[i - delay | 0] / 2 / vol)
        : s;

      if (filter) s = y1 = b2 * x2 + b1 * (x2 = x1) + b0 * (x1 = s) - a2 * y2 - a1 * (y2 = y1);
    }

    f = (frequency += slide += deltaSlide) * Math.cos(modulation * modOffset++);
    t += f + f * noise * Math.sin(i ** 5);

    if (jump && ++jump > pitchJumpTime) {
      frequency += pitchJump;
      startFrequency += pitchJump;
      jump = 0;
    }

    if (repeatTime && !(++repeat % repeatTime)) {
      frequency = startFrequency;
      slide = startSlide;
      jump ||= 1;
    }
  }
  // ─── end ZzFXMicro ──────────────────────────────────────────────────────

  const buffer = c.createBuffer(1, b.length, sampleRate);
  buffer.getChannelData(0).set(b);
  const source = c.createBufferSource();
  source.buffer = buffer;
  source.connect(master);
  source.start();
  return source;
}
