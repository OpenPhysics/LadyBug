/**
 * LadyBugKeyboardHelpContent.ts
 *
 * Content for the keyboard-help dialog (the "?" button in the navigation bar).
 * The screen's interactions are buttons, radio buttons and the vector
 * checkboxes, so a single basic-actions section (with checkbox guidance) covers
 * the available keyboard controls.
 */

import { BasicActionsKeyboardHelpSection, TwoColumnKeyboardHelpContent } from "scenerystack/scenery-phet";

export class LadyBugKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    // Single column: Tab/button navigation plus toggling the vector checkboxes.
    super([new BasicActionsKeyboardHelpSection({ withCheckboxContent: true })], []);
  }
}
