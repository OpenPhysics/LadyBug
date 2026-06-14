/**
 * ladyBugQueryParameters.ts
 *
 * Sim-specific startup query parameters for Ladybug Motion. All entries are
 * public and provide the initial values for the sim-specific preferences in
 * LadyBugPreferencesModel.
 *
 * Usage: append e.g. `?showVelocity=false&showAcceleration=false` to the URL.
 */

import { logGlobal } from "scenerystack/phet-core";
import { QueryStringMachine } from "scenerystack/query-string-machine";
import LadyBugNamespace from "../LadyBugNamespace.js";

const ladyBugQueryParameters = QueryStringMachine.getAll({
  /** Whether the velocity vector is shown by default. */
  showVelocity: {
    type: "boolean",
    defaultValue: true,
    public: true,
  },

  /** Whether the acceleration vector is shown by default. */
  showAcceleration: {
    type: "boolean",
    defaultValue: true,
    public: true,
  },
});

LadyBugNamespace.register("ladyBugQueryParameters", ladyBugQueryParameters);

// Log query parameters (for the console / PhET-iO).
logGlobal("phet.chipper.queryParameters");

export default ladyBugQueryParameters;
