import { Color, ProfileColorProperty } from "scenerystack/scenery";
import LadyBugNamespace from "./LadyBugNamespace.js";

const { BLACK, WHITE } = Color;

function profileColor(name: string, def: Color | string, projector: Color | string): ProfileColorProperty {
  return new ProfileColorProperty(LadyBugNamespace, name, { default: def, projector });
}

// ── Panel fill colors ─────────────────────────────────────────────────────────
// Near-black / near-white neutral fills so panels contrast with both themes.
const PANEL_FILL_DARK = new Color(40, 40, 40);
const PANEL_FILL_LIGHT = new Color(240, 240, 240);

// Semi-transparent borders (40 % opacity) that stay visible on either fill.
const PANEL_STROKE_DARK = "rgba(255, 255, 255, 0.4)"; // white border on dark background
const PANEL_STROKE_LIGHT = "rgba(0, 0, 0, 0.4)"; // black border on light background

// ── Ladybug dark-mode fills ───────────────────────────────────────────────────
// On a black background pure-black elements (head, antennae, wing seam) are
// invisible. Dark mode uses medium-to-light grays so those parts remain visible.
const HEAD_FILL_DARK = new Color(55, 55, 55); // head / exposed back between open wings
const ANTENNA_FILL_DARK = new Color(190, 190, 190); // antenna lines + tips
const WING_SEAM_FILL_DARK = new Color(60, 60, 60); // centre-line on closed wings

// ── Remote-control pad fills ──────────────────────────────────────────────────
// White overlays at different opacities so the pad reads clearly on both themes.
const REMOTE_PAD_FILL_DARK = "rgba(255, 255, 255, 0.5)"; // 50 % white on dark background
const REMOTE_PAD_FILL_LIGHT = "rgba(255, 255, 255, 0.65)"; // 65 % white on light background

// Tab button base color for the mode-selector radio buttons.
const TAB_BUTTON_FILL_DARK = new Color(58, 58, 58); // dark gray — readable with bright vector labels
const TAB_BUTTON_FILL_LIGHT = new Color(245, 245, 245); // near-white — readable with dark vector labels

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

  // Motion vectors. Dark mode uses lighter/brighter variants for contrast against dark buttons.
  positionVectorProperty: profileColor("positionVector", "#6EB5FF", "#1A5B9E"),
  velocityVectorProperty: profileColor("velocityVector", "#FF7572", "#A51A16"),
  accelerationVectorProperty: profileColor("accelerationVector", "#5CD65C", "#1B6B1B"),

  // The ladybug itself.
  ladybugBodyProperty: profileColor("ladybugBody", "#D8262B", "#C81E22"),
  ladybugSpotsProperty: profileColor("ladybugSpots", BLACK, BLACK),
  ladybugHeadProperty: profileColor("ladybugHead", HEAD_FILL_DARK, BLACK),
  ladybugWingSeamProperty: profileColor("ladybugWingSeam", WING_SEAM_FILL_DARK, BLACK),
  ladybugAntennaeProperty: profileColor("ladybugAntennae", ANTENNA_FILL_DARK, BLACK),

  // The motion trace — flips with the theme so it stays visible on the background.
  traceProperty: profileColor("trace", WHITE, BLACK),

  // Remote-control pad.
  remotePadFillProperty: profileColor("remotePadFill", REMOTE_PAD_FILL_DARK, REMOTE_PAD_FILL_LIGHT),
  tabButtonFillProperty: profileColor("tabButtonFill", TAB_BUTTON_FILL_DARK, TAB_BUTTON_FILL_LIGHT),

  // Seek bar / playback timeline.
  seekBarTrackProperty: profileColor("seekBarTrack", SEEK_TRACK_DARK, SEEK_TRACK_LIGHT),
  seekBarProgressProperty: profileColor("seekBarProgress", "#2575BA", "#2575BA"),
  seekBarHandleProperty: profileColor("seekBarHandle", WHITE, SEEK_HANDLE_LIGHT),
};

export default LadyBugColors;
