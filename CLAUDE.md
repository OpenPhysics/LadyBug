# CLAUDE.md — Lady Bug

Sim-specific context for AI assistants. General SceneryStack guidance: [OpenPhysics/.github/CLAUDE.md](https://github.com/OpenPhysics/.github/blob/main/CLAUDE.md).

## Project

SceneryStack port of the PhET *Ladybug Motion 2D* simulation. Single screen: drive a ladybug around a 2D play area by **position, velocity, or acceleration**, or hand control to a **motion preset** (Linear / Circular / Elliptical), and study the resulting kinematics with on-screen velocity/acceleration vectors and a motion trace. Motion is **recorded** and can be scrubbed/played back.

> Not to be confused with *Ladybug Revolution* — there is **no rotatable platform** here. The only rotation is the ladybug's heading (it turns to face its velocity) and the circular-motion preset's path around a ring.

## Key files

| Area | Location |
|---|---|
| Screen | `src/lady-bug/LadyBugScreen.ts` |
| Model | `model/LadyBugModel.ts` (state + record/playback step), `Ladybug.ts`, `LadybugMover.ts` (motion presets), `SamplingMotionModel.ts` (derivative estimation), `LadybugStateRecord.ts`, `LadyBugConstants.ts` |
| Enums | `model/MotionType.ts` (Manual/Linear/Circular/Elliptical), `model/UpdateMode.ts` (position/velocity/acceleration) |
| Numeric helpers | `model/motionMath.ts`, `model/binarySearch.ts` |
| View | `view/LadyBugScreenView.ts`, `LadybugNode.ts`, `LadybugTraceNode.ts`, `LadybugVectorsNode.ts`, `PlaybackControls.ts`, `SeekBar.ts`, `RemoteControlPanel.ts`, `VectorsControlPanel.ts` |
| Colors / strings | `LadyBugColors.ts`, `LadyBugNamespace.ts`, `src/i18n/StringManager.ts` |

## Model

`LadyBugModel` is the single screen model. Two string-union enums drive its behavior: `MotionType` (the automated preset, or `Manual`) and `UpdateMode` (which kinematic quantity the user is dragging in manual mode).

| Property | Type | Meaning |
|---|---|---|
| `motionTypeProperty` | `Property<MotionType>` | Manual / Linear / Circular / Elliptical; `lazyLink` → `mover.setMotionType` |
| `updateModeProperty` | `Property<UpdateMode>` | manual control via position, velocity, or acceleration |
| `recordingProperty` | `BooleanProperty` (default true) | recording vs. playback |
| `isPlayingProperty` | `BooleanProperty` (default false) | play/pause of the step loop |
| `timeProperty` | `NumberProperty` | current time (recording head or playback cursor) |
| `furthestRecordedTimeProperty` | `NumberProperty` | length of the recording (SeekBar extent) |
| `showVelocityProperty` / `showAccelerationProperty` | `BooleanProperty` | vector overlays |
| `traceModeProperty` | `Property<TraceMode>` | path-trace style (`"line"`, …) |

### Stepping, record/playback & numerics

- **Fixed timestep accumulator.** `step(dt)` runs whole `FIXED_DT` slices (capped by `MAX_CATCHUP_STEPS`); `stepOnce()` is the Step button.
- Each slice (`stepInternal`) branches on `recordingProperty`: **recording** advances the `mover`, records a pen point + state, trims sample history, and bumps `furthestRecordedTime`; **playback** applies the recorded state at `timeProperty`. Recording auto-stops at `MAX_RECORDING_TIME`.
- **Velocity & acceleration are not integrated — they are differentiated.** `SamplingMotionModel` (ported from PhET's `Motion2DModel`) keeps a rolling history of sampled positions and derives **smoothed** velocity and acceleration via windowed averaging. It is pure numeric code with no observable state; the smoothing window means the vectors lag sharp manual moves slightly (by design).
- The ladybug heading only rotates when speed exceeds `MIN_HEADING_VELOCITY`, so a near-stationary bug doesn't spin from numerical jitter. Circular preset speed is the calibrated `CIRCULAR_ANGULAR_RATE`.

## Accessibility

Follows the shared [OpenPhysics accessibility convention](https://github.com/OpenPhysics/Baton/blob/main/ACCESSIBILITY.md).
`LadyBugScreenView` registers `LadyBugScreenSummaryContent` (live current-details: ladybug
position, speed, play state) via the `screenSummaryContent` super-option, and orders the PDOM
through a wrapper `Node`. A11y strings live under the top-level `a11y` key in each locale JSON,
via `StringManager.getA11yStrings()`.

## Commands

```bash
npm run lint && npm run check && npm run build
```

No unit-test suite — the build/lint/check gate plus manual run substitute for tests here.

## Development notes

- English and French UI via `StringManager`.
- Vector display and the manual position/velocity/acceleration modes are the core pedagogical features; keep the velocity/acceleration smoothing intact when touching `SamplingMotionModel`.
