import { Screen, type ScreenOptions } from "scenerystack/sim";
import type { Tandem } from "scenerystack/tandem";
import type { LadyBugPreferencesModel } from "../preferences/LadyBugPreferencesModel.js";
import { LadyBugModel } from "./model/LadyBugModel.js";
import { LadyBugKeyboardHelpContent } from "./view/LadyBugKeyboardHelpContent.js";
import { LadyBugScreenView } from "./view/LadyBugScreenView.js";

type LadyBugScreenOptions = ScreenOptions & { tandem: Tandem; preferences: LadyBugPreferencesModel };

export class LadyBugScreen extends Screen<LadyBugModel, LadyBugScreenView> {
  public constructor(options: LadyBugScreenOptions) {
    super(
      () => new LadyBugModel(options.preferences),
      (model) => new LadyBugScreenView(model, { tandem: options.tandem.createTandem("view") }),
      {
        createKeyboardHelpNode: () => new LadyBugKeyboardHelpContent(),
        ...options,
      },
    );
  }
}
