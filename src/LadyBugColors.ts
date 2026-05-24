import { Color, ProfileColorProperty } from "scenerystack";
import ladyBug from "./LadyBugNamespace.js";

const { BLACK, WHITE } = Color;

function profileColor(name: string, def: Color | string, projector: Color | string): ProfileColorProperty {
  return new ProfileColorProperty(ladyBug, name, { default: def, projector });
}

// ── Panel fill colors ─────────────────────────────────────────────────────────
// Near-black / near-white neutral fills so panels contrast with both themes.
const PANEL_FILL_DARK = new Color(40, 40, 40);
const PANEL_FILL_LIGHT = new Color(240, 240, 240);

// Semi-transparent borders (40 % opacity) that stay visible on either fill.
const PANEL_STROKE_DARK = "rgba(255, 255, 255, 0.4)"; // white border on dark background
const PANEL_STROKE_LIGHT = "rgba(0, 0, 0, 0.4)"; // black border on light background

// ── Ladybug head fill ─────────────────────────────────────────────────────────
// In dark mode the head is a very dark gray (not pure black) to maintain a subtle
// gradient between head and spots; in light/projector mode pure black is used.
const HEAD_FILL_DARK = new Color(20, 20, 20);

// ── Remote-control pad fills ──────────────────────────────────────────────────
// White overlays at different opacities so the pad reads clearly on both themes.
const REMOTE_PAD_FILL_DARK = "rgba(255, 255, 255, 0.5)"; // 50 % white on dark background
const REMOTE_PAD_FILL_LIGHT = "rgba(255, 255, 255, 0.65)"; // 65 % white on light background

// Tab background (the selected-mode highlight inside the pad header).
const REMOTE_TAB_FILL_DARK = "rgba(255, 255, 255, 0.2)"; // subtle white highlight (dark theme)
const REMOTE_TAB_FILL_LIGHT = "rgba(0, 0, 0, 0.12)"; // subtle dark tint (light/projector theme)

// ── Seek-bar track colors ─────────────────────────────────────────────────────
// Medium-dark / medium-light grays that contrast with their respective backgrounds.
const SEEK_TRACK_DARK = new Color(70, 70, 70);
const SEEK_TRACK_LIGHT = new Color(200, 200, 200);

// The drag handle uses white in dark mode; a medium gray in projector mode so it
// stays distinguishable on the lighter track.
const SEEK_HANDLE_LIGHT = new Color(80, 80, 80);

const LadyBugColors = {
  backgroundColorProperty: profileColor("background", BLACK, WHITE),
  foregroundColorProperty: profileColor("foreground", WHITE, BLACK),
  panelFillProperty: profileColor("panelFill", PANEL_FILL_DARK, PANEL_FILL_LIGHT),
  panelStrokeProperty: profileColor("panelStroke", PANEL_STROKE_DARK, PANEL_STROKE_LIGHT),

  // Motion vectors — same hue on both themes (matches the original sim).
  positionVectorProperty: profileColor("positionVector", "#2575BA", "#2575BA"),
  velocityVectorProperty: profileColor("velocityVector", "#CD2520", "#CD2520"),
  accelerationVectorProperty: profileColor("accelerationVector", "#349E34", "#349E34"),

  // The ladybug itself.
  ladybugBodyProperty: profileColor("ladybugBody", "#D8262B", "#C81E22"),
  ladybugSpotsProperty: profileColor("ladybugSpots", BLACK, BLACK),
  ladybugHeadProperty: profileColor("ladybugHead", HEAD_FILL_DARK, BLACK),
  ladybugWingSeamProperty: profileColor("ladybugWingSeam", BLACK, BLACK),
  ladybugAntennaeProperty: profileColor("ladybugAntennae", BLACK, BLACK),

  // The motion trace — flips with the theme so it stays visible on the background.
  traceProperty: profileColor("trace", WHITE, BLACK),

  // Remote-control pad.
  remotePadFillProperty: profileColor("remotePadFill", REMOTE_PAD_FILL_DARK, REMOTE_PAD_FILL_LIGHT),
  remoteTabFillProperty: profileColor("remoteTabFill", REMOTE_TAB_FILL_DARK, REMOTE_TAB_FILL_LIGHT),

  // Seek bar / playback timeline.
  seekBarTrackProperty: profileColor("seekBarTrack", SEEK_TRACK_DARK, SEEK_TRACK_LIGHT),
  seekBarProgressProperty: profileColor("seekBarProgress", "#2575BA", "#2575BA"),
  seekBarHandleProperty: profileColor("seekBarHandle", WHITE, SEEK_HANDLE_LIGHT),
};

ladyBug.register("LadyBugColors", LadyBugColors);

export default LadyBugColors;
