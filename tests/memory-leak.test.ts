/**
 * Fleet-standard memory-leak regression suite.
 * SamplingMotionModel is pure numeric state (no axon links) — the dispose unit for this sim.
 */

import { Vector2 } from "scenerystack/dot";
import { describe, expect, it } from "vitest";
import LadyBugConstants from "../src/LadyBugConstants.js";
import SamplingMotionModel from "../src/lady-bug/model/SamplingMotionModel.js";

const SAMPLING_HALF_WINDOW: number = LadyBugConstants.SAMPLING_HALF_WINDOW;
const SAMPLING_NUM_AVERAGED: number = LadyBugConstants.SAMPLING_NUM_AVERAGED;

/**
 * Force garbage collection with multiple passes. When `earlyExitRefs` is supplied
 * the loop bails as soon as every referenced object is confirmed collected. The
 * setTimeout(0) yield after a live deref() avoids the WeakRef macrotask-liveness pin.
 * Without early-exit refs the loop always runs all passes, which on a slow `gc()`
 * can exceed the Vitest testTimeout — always pass refs when you have them.
 */
async function forceGC(earlyExitRefs?: WeakRef<object> | readonly WeakRef<object>[]): Promise<void> {
  const refs = earlyExitRefs === undefined ? [] : Array.isArray(earlyExitRefs) ? earlyExitRefs : [earlyExitRefs];
  for (let i = 0; i < 15; i++) {
    globalThis.gc?.();
    await new Promise<void>((r) => setTimeout(r, 50));
    if (refs.length > 0 && refs.every((ref) => ref.deref() === undefined)) {
      return;
    }
    if (refs.length > 0) {
      await new Promise<void>((r) => setTimeout(r, 0));
    }
  }
}

function createAndDropSamplingModel(): WeakRef<object> {
  const model = new SamplingMotionModel(SAMPLING_HALF_WINDOW, SAMPLING_NUM_AVERAGED, 0, 0);
  for (let i = 0; i < 20; i++) {
    model.addPointAndUpdate(new Vector2(i, 0));
  }
  return new WeakRef<object>(model);
}

describe("Memory leak regression", () => {
  it("global.gc is available (--expose-gc)", () => {
    expect(globalThis.gc).toBeDefined();
  });

  it("sanity: plain object is collected", async () => {
    const ref = (() => new WeakRef({ hello: "world" }))();
    await forceGC(ref);
    expect(ref.deref()).toBeUndefined();
  });

  it("SamplingMotionModel is collected after drop", async () => {
    const ref = createAndDropSamplingModel();
    await forceGC(ref);
    expect(ref.deref()).toBeUndefined();
  });

  it("repeated create/drop cycles leave no survivors", async () => {
    const refs: WeakRef<object>[] = [];
    for (let i = 0; i < 10; i++) {
      refs.push(createAndDropSamplingModel());
    }
    await forceGC(refs);
    expect(refs.filter((r) => r.deref() !== undefined).length).toBe(0);
  });
});
