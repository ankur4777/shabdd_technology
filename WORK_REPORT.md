# Shabdd Technology Homepage Work Report

**Report date:** 26 October 2026

## Summary

Implemented and integrated new homepage visual sections matching the Shabdd Technology visual direction: dark backgrounds, cyan highlights, red brand accents, compact Manrope-style typography, responsive layouts, and interactive navigation.

## Completed work

### Start Project CTA

- Added reusable `StartProject` component.
- Added red “Start a Project” CTA linking to `/contact`.
- Added responsive sizing and contact links for email and phone.
- Added dark background, accent lines, atmospheric corner glows, and responsive behavior.

### How We Work section

- Added four-step process section:
  - Talk
  - Quote
  - Build
  - Hand over
- Added fixed-price messaging, red accent underline, responsive four-column layout, and mobile stacking.

### MySLS section

- Added MySLS product showcase section with profile and dashboard imagery.
- Added responsive laptop/dashboard layout and spacing.
- Added laptop image cropping to remove excess lower space while preserving the keyboard.
- Added MySLS website link matching the module link styling.
- Added platform badges:
  - Proudly Canadian
  - 100+ modules · one login
  - Compliance, automated
  - Education management + LMS

### Trusted Partners Globe

- Added animated globe visualization using Canvas rendering.
- Added dotted continent visualization and cyan atmospheric glow.
- Added animated connection arcs between office locations.
- Added office markers for India, Winnipeg, and Surrey.
- Added live timezone clocks for each office marker.
- Added hover/click interactions for office markers and partner pills.
- Added continuous 360-degree auto-rotation.
- Added drag interaction for manual globe rotation.
- Added top messaging:
  - `CANADA · INDIA · AUSTRALIA`
  - `Three countries. One team.`

## Dependencies added

- `three`
- `@react-three/fiber`
- `@react-three/drei`

## Commits

- `4bb1912` — Add homepage visual components and global team globe
- `acbffe1` — Wire new homepage sections and globe dependencies

## Validation

- React production compilation completed successfully.
- Existing source-map warning remains from `@mediapipe/tasks-vision`.
- Deployment packaging requires PHP on PATH for the existing Filament asset step.

## Current working-tree note

The latest globe text and rotation changes are currently uncommitted. The legacy `globalTeam` files are staged for deletion, while the active homepage implementation uses `TrustedPartnersGlobe`.
