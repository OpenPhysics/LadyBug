/**
 * LadyBugPreferencesNode.ts
 *
 * Custom preferences UI shown in Preferences → Simulation. Controls are bound to
 * LadyBugPreferencesModel Properties (initial values from query parameters).
 */

import { Text, VBox } from "scenerystack/scenery";
import { PhetFont } from "scenerystack/scenery-phet";
import { Checkbox } from "scenerystack/sun";
import type { Tandem } from "scenerystack/tandem";
import { StringManager } from "../i18n/StringManager.js";
import LadyBugNamespace from "../LadyBugNamespace.js";
import type { LadyBugPreferencesModel } from "./LadyBugPreferencesModel.js";

export class LadyBugPreferencesNode extends VBox {
  public constructor(preferencesModel: LadyBugPreferencesModel, tandem?: Tandem) {
    const prefStrings = StringManager.getInstance().getPreferences();

    const header = new Text(prefStrings.titleStringProperty, {
      font: new PhetFont({ size: 18, weight: "bold" }),
    });

    const checkbox = (
      property: LadyBugPreferencesModel["showVelocityProperty"],
      labelProperty: typeof prefStrings.showVelocityStringProperty,
      tandemName: string,
    ): Checkbox =>
      new Checkbox(property, new Text(labelProperty, { font: new PhetFont(14) }), {
        spacing: 8,
        ...(tandem && { tandem: tandem.createTandem(tandemName) }),
      });

    super({
      align: "left",
      spacing: 12,
      children: [
        header,
        checkbox(preferencesModel.showVelocityProperty, prefStrings.showVelocityStringProperty, "showVelocityCheckbox"),
        checkbox(
          preferencesModel.showAccelerationProperty,
          prefStrings.showAccelerationStringProperty,
          "showAccelerationCheckbox",
        ),
      ],
    });
  }
}

LadyBugNamespace.register("LadyBugPreferencesNode", LadyBugPreferencesNode);
