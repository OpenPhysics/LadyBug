/**
 * main.ts
 *
 * Entry point for the simulation. Initializes SceneryStack, creates the
 * screen, and starts the main event loop.
 *
 * !! CRITICAL IMPORT ORDER !!
 * brand.js MUST be the first import. It triggers the full bootstrap chain:
 *
 *   brand.ts → splash.ts → assert.ts → init.ts
 *
 * SceneryStack requires this exact load order. Never reorder these imports.
 */

// brand.js MUST be first — triggers: init.ts → assert.ts → splash.ts → brand.ts
import "./brand.js";

import { onReadyToLaunch, PreferencesModel, Sim } from "scenerystack/sim";
import { Tandem } from "scenerystack/tandem";
import { StringManager } from "./i18n/StringManager.js";
import LadyBugColors from "./LadyBugColors.js";
import { LadyBugScreen } from "./lady-bug/LadyBugScreen.js";
import { LadyBugPreferencesModel } from "./preferences/LadyBugPreferencesModel.js";
import { LadyBugPreferencesNode } from "./preferences/LadyBugPreferencesNode.js";

onReadyToLaunch(() => {
  const stringManager = StringManager.getInstance();

  // Simulation-specific preferences; initial values come from ladyBugQueryParameters.
  const ladyBugPreferences = new LadyBugPreferencesModel(Tandem.ROOT.createTandem("preferences"));

  const screens = [
    new LadyBugScreen({
      preferences: ladyBugPreferences,
      // The screen name Property updates automatically when the locale changes
      name: stringManager.getScreenNames().ladyBugStringProperty,
      tandem: Tandem.ROOT.createTandem("ladyBugScreen"),
      backgroundColorProperty: LadyBugColors.backgroundColorProperty,
    }),
  ];

  const sim = new Sim(stringManager.getTitleStringProperty(), screens, {
    preferencesModel: new PreferencesModel({
      visualOptions: {
        // Adds a "Projector Mode" toggle in Preferences → Visual
        supportsProjectorMode: true,
        // Enables keyboard-navigation highlight outlines
        supportsInteractiveHighlights: true,
      },
      simulationOptions: {
        customPreferences: [
          {
            createContent: (tandem: Tandem) => new LadyBugPreferencesNode(ladyBugPreferences, tandem),
          },
        ],
      },
      localizationOptions: {
        // Adds a language picker in Preferences → Language
        supportsDynamicLocale: true,
      },
    }),

    // Optional: fill in credits shown in Help → About
    credits: {
      leadDesign: "",
      softwareDevelopment: "",
      team: "",
      qualityAssurance: "",
    },
  });

  sim.start();
});
