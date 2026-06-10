# CLAUDE.md — Lady Bug

Sim-specific context for AI assistants. General SceneryStack guidance: [OpenPhysics/.github/CLAUDE.md](https://github.com/OpenPhysics/.github/blob/main/CLAUDE.md).

## Project

SceneryStack port of the PhET *Ladybug Motion 2D* simulation. Single screen: ladybug on a rotatable platform; explore 2D position, velocity, and acceleration.

## Key files

| Area | Location |
|---|---|
| Screen | `src/lady-bug/LadyBugScreen.ts` |
| Model | `src/lady-bug/model/LadyBugModel.ts` |
| View | `src/lady-bug/view/LadyBugScreenView.ts` |
| Colors | `LadyBugColors.ts`, `LadyBugNamespace.ts` |

## Notes

- Platform rotation and vector display are core pedagogical features
- English and French UI via `StringManager`
