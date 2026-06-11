# Implementation Notes - LadyBug Simulation

## Architecture Overview

The LadyBug simulation is structured using a Model-View pattern for 2D kinematics on a rotatable platform. It is a SceneryStack port of the PhET *Ladybug Motion 2D* simulation.

### High-Level Architecture

The simulation follows a modular architecture:

- **Model Layer (`src/lady-bug/model/`)**: Ladybug state, automated motion paths, record/playback history, and fixed-timestep integration
- **View Layer (`src/lady-bug/view/`)**: Platform, ladybug sprite, vectors, trace, and control panels

Data flows primarily from Model → View. `LadyBugModel` implements `TModel` and exposes a `MoverContext` interface consumed by `LadybugMover`.

### Model-View Transform

The origin is at the platform center (`Vector2.ZERO`) with non-inverted Y. The view computes bounds from the play area and calls `model.setBounds()`.

## Model Components

### Core Model Design

`LadyBugModel` coordinates motion type, update mode, recording/playback, simulation time, trace mode, and state history.

### Component Specialization

Each model component has a single responsibility:

1. **Ladybug**: Position, velocity, acceleration, and heading on the rotatable platform
2. **LadybugMover**: Automated paths — Linear, Circular, and Elliptical
3. **SamplingMotionModel**: Smoothed derivative estimation for acceleration
4. **MotionType**: Manual, Linear, Circular, or Elliptical driving
5. **UpdateMode**: Position, velocity, or acceleration as the driving quantity in manual mode
6. **LadybugStateRecord**: Snapshot for playback scrubbing

### Physics Simulation Approach

Integration uses a fixed timestep with an accumulator. State history is recorded into `LadybugStateRecord[]` with culled history and emitters for history add/remove events.

Constants and keyboard bindings live in `LadyBugConstants.ts`.

## View Components

### LadyBugScreenView as Coordinator

The screen view lays out the play area, right-side panels, and bottom seek/playback controls.

Specialized view classes handle specific visualization aspects:

1. **LadybugNode**: Ladybug sprite on the rotatable platform
2. **LadybugVectorsNode**: Velocity and acceleration vector arrows
3. **LadybugTraceNode**: Motion trace (line, dots, or off)
4. **RemoteControlPanel**: Motion presets, platform rotation, pen trace
5. **VectorsControlPanel**: Vector visibility toggles
6. **PlaybackControls** and **SeekBar**: Timeline scrubbing during playback

### Color Scheme

Colors are defined in `LadyBugColors.ts`. Views should reference `ProfileColorProperty` instances rather than hardcoded values.

### Performance Optimizations

- Trace rendering respects the selected trace mode to limit drawn geometry
- History records are culled to bound memory use during long recordings

Note that no dispose functions have been used, which should be addressed.
