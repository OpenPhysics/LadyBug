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

## Accessibility

Follows the shared [OpenPhysics accessibility convention](https://github.com/OpenPhysics/OpenPhysics/blob/main/ACCESSIBILITY.md).
`LadyBugScreenView` registers `LadyBugScreenSummaryContent` (live current-details: ladybug
position, speed, play state) via the `screenSummaryContent` super-option, and orders the PDOM
through a wrapper `Node`. A11y strings live under the top-level `a11y` key in each locale JSON,
via `StringManager.getA11yStrings()`.

## Notes

- Platform rotation and vector display are core pedagogical features
- English and French UI via `StringManager`
