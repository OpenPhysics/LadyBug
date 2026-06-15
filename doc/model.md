# Model - Lady Bug (Ladybug Motion 2D)

This document describes the model (the underlying physics, math, and behavior) for the simulation, in
terms appropriate for an educator. It is the companion to
[implementation-notes.md](./implementation-notes.md), which targets developers.

## Overview

The simulation teaches **two-dimensional kinematics** through the motion of a ladybug. Students control
the ladybug's position, velocity, or acceleration and observe the other two quantities as vectors,
building intuition for how position, velocity, and acceleration relate. The ladybug can be moved
directly, driven by a chosen velocity or acceleration, or set to preset motions, and its path is traced.

## Quantities and units

| Quantity | Symbol | Units | Notes |
|---|---|---|---|
| Position | r = (x, y) | m | Location of the ladybug in the plane |
| Velocity | v = (vₓ, v_y) | m/s | Rate of change of position; shown as a vector |
| Acceleration | a = (aₓ, a_y) | m/s² | Rate of change of velocity; shown as a vector |
| Speed | \|v\| | m/s | Magnitude of velocity |
| Time | t | s | Advances through the model `step(dt)` chain |

## Governing equations

The ladybug obeys the standard kinematic relationships between the three vector quantities:

```
v = dr/dt        a = dv/dt
```

Integrated over a time step `dt`:

```
v ← v + a · dt
r ← r + v · dt
```

Depending on the control mode the student fixes one quantity (position, velocity, or acceleration) and
the simulation derives the others by differentiation or integration. Velocity and acceleration are
estimated from the recorded position history when the ladybug is dragged.

## Simplifications and assumptions

- Pure kinematics: no forces, mass, or dynamics — motion is prescribed, not caused by interactions.
- Two-dimensional point particle; the ladybug graphic has no size in the model.
- When the ladybug reaches the edge of the region it is returned (no wrap-around physics).
- Record/playback lets students scrub through the recorded motion history.

## References

- Two-dimensional kinematics, any introductory mechanics text (e.g. Halliday, Resnick & Walker, Ch. 4).
- Based on the PhET *Ladybug Motion 2D* simulation.
</content>
