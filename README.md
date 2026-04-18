# Quadratic Video

A Remotion video project that explains quadratic equations in Chinese.

The composition renders a short teaching video about the standard form of a quadratic equation, the discriminant, the quadratic formula, and a worked example.

## Contents

- `src/Composition.tsx`: the animated Remotion composition
- `src/Root.tsx`: composition registration
- `public/voiceover.mp3`: voiceover audio used by the composition
- `public/voiceover.vtt`: caption source
- `voiceover-script.md`: Chinese narration script

## Requirements

- Node.js
- npm

## Install

```console
npm i
```

## Preview

```console
npm run dev
```

## Render

```console
npx remotion render
```

The composition id is `QuadraticExplainer`.

## Check

```console
npm run lint
```

## License

MIT
