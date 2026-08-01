/**
 * TraceMode.ts
 *
 * How the ladybug's recorded path is drawn: a continuous line, a sparse series
 * of dots, or not at all. Backs the trace-mode radio group.
 */

import { Enumeration, EnumerationValue } from "scenerystack/phet-core";

export class TraceMode extends EnumerationValue {
  public static readonly LINE = new TraceMode();
  public static readonly DOTS = new TraceMode();
  public static readonly OFF = new TraceMode();

  public static readonly enumeration = new Enumeration(TraceMode);
}
