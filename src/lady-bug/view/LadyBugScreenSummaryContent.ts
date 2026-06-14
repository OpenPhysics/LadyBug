/**
 * LadyBugScreenSummaryContent.ts
 *
 * Accessible screen summary (SceneryStack Interactive Description). Describes the
 * play area and controls, gives an interaction hint, and exposes a LIVE
 * "current details" paragraph derived from the model (the ladybug's position,
 * speed, and the play/pause state).
 *
 * Follows the OpenPhysics accessibility convention; see the canonical
 * TemplateSingleSim/SimScreenSummaryContent.ts.
 */
import { DerivedProperty } from "scenerystack/axon";
import { StringUtils } from "scenerystack/phetcommon";
import { ScreenSummaryContent } from "scenerystack/sim";
import { StringManager } from "../../i18n/StringManager.js";
import type { LadyBugModel } from "../model/LadyBugModel.js";

export class LadyBugScreenSummaryContent extends ScreenSummaryContent {
  public constructor(model: LadyBugModel) {
    const a11y = StringManager.getInstance().getA11yStrings();

    const currentDetailsProperty = new DerivedProperty(
      [
        a11y.currentDetailsStringProperty,
        a11y.playingLabelStringProperty,
        a11y.pausedLabelStringProperty,
        model.ladybug.positionProperty,
        model.ladybug.velocityProperty,
        model.isPlayingProperty,
      ],
      (template, playingLabel, pausedLabel, position, velocity, isPlaying) =>
        StringUtils.fillIn(template, {
          x: position.x.toFixed(1),
          y: position.y.toFixed(1),
          speed: velocity.magnitude.toFixed(1),
          state: isPlaying ? playingLabel : pausedLabel,
        }),
    );

    super({
      playAreaContent: a11y.screenSummary.playAreaStringProperty,
      controlAreaContent: a11y.screenSummary.controlAreaStringProperty,
      currentDetailsContent: currentDetailsProperty,
      interactionHintContent: a11y.screenSummary.interactionHintStringProperty,
    });
  }
}
