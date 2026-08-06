import { zzfx, type ZzfxParams } from './zzfx';

/**
 * The sound palette.
 *
 * Named for the moment, not the waveform — callers ask for `flip`, not for a
 * filtered noise burst, the same way they ask for `--space-5` rather than 16px.
 * Everything is synthesised, so the whole set costs no bytes beyond this file.
 *
 * Two rules the voice guide already sets, applied to sound:
 *
 * - **Nothing scolds.** `gradeAgain` is the softest and lowest thing here, not a
 *   buzzer. Forgetting a word is the normal case in spaced repetition — it is
 *   what the algorithm is *for* — and a failure noise four times a session
 *   teaches people to dread the button.
 * - **Celebration is rationed.** Only `sessionComplete` rises. If every grade
 *   sounded triumphant, none of them would.
 *
 * Kept short on purpose. Measured: `tap` 34ms, `toggle` 50, the card ticks 90–100, `flip`
 * 140, the grades 200–250, and `sessionComplete` 580 — the only one allowed to
 * outlast the interaction that caused it. A reviewer hammering the grade keys
 * hears them queue, never pile up.
 */
export const SOUNDS = {
  /** The card turning over. Papery and dry, no pitch — it is a movement, not an event. */
  flip: [0.6, 0.08, 420, 0.01, 0.02, 0.08, 4, 2.2, -18, 0, 0, 0, 0, 1.2, 0, 0, 0, 0.5, 0.03],

  /** Grades, low to high. The interval carries the meaning; only `easy` sparkles. */
  gradeAgain: [0.5, 0.05, 220, 0.01, 0.05, 0.14, 0, 1, -3, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 0.05],
  gradeHard: [0.5, 0.05, 300, 0.01, 0.05, 0.12, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7, 0.04],
  gradeGood: [0.5, 0.05, 440, 0.01, 0.04, 0.12, 1, 1.4, 0, 0, 180, 0.04, 0, 0, 0, 0, 0, 0.8, 0.03],
  gradeEasy: [0.5, 0.05, 587, 0.01, 0.04, 0.14, 1, 1.5, 0, 0, 300, 0.05, 0, 0, 0, 0, 0, 0.8, 0.03],

  /** The one celebration. Longer than everything else because it happens once. */
  sessionComplete: [0.6, 0.05, 523, 0.02, 0.12, 0.3, 1, 1.6, 0, 0, 262, 0.08, 0.1, 0, 0, 0, 0.08, 0.7, 0.06],

  /** Card written and card gone — the same gesture, up and down. */
  cardAdded: [0.4, 0.05, 800, 0.01, 0.02, 0.06, 1, 1.2, 0, 0, 220, 0.02],
  cardRemoved: [0.4, 0.05, 520, 0.01, 0.02, 0.07, 1, 1.2, -12],

  /**
   * A press on ordinary chrome — the default for Button and IconButton, and so
   * by far the most-repeated sound here. Which is exactly why it is the smallest:
   * a click you hear a hundred times a session has to be something you stop
   * noticing, or it becomes the sound of the app.
   */
  tap: [0.28, 0.02, 620, 0, 0.006, 0.022, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0.006],

  /** A switch or a panel. Slightly rounder than `tap`, and rarer. */
  toggle: [0.35, 0.02, 700, 0, 0.01, 0.03, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.6, 0.01],
} satisfies Record<string, ZzfxParams>;

export type SoundName = keyof typeof SOUNDS;

export const SOUND_NAMES = Object.keys(SOUNDS) as SoundName[];

/**
 * Plays a named sound. Silent when sound is off, and a no-op anywhere without an
 * AudioContext, so callers never have to guard.
 */
export function playSound(name: SoundName): void {
  const params = SOUNDS[name];
  if (params) zzfx(...params);
}
