## RoundProgress Component
[![Build Status](https://travis-ci.org/atmajs/compo-RoundProgress.png?branch=master)](https://travis-ci.org/tenbits/compo-RoundProgress)
[![Bower version](https://badge.fury.io/bo/compo-RoundProgress.svg)](http://badge.fury.io/bo/compo-RoundProgress)



```mask
RoundProgress;
```

A `div` control with `display: table` flow. Show canvas-drawed round progress with optional `@title` placeholder in the center.

## Attributes

| Attribute   | Default | Description |
|-------------|---------|-------------|
|`width`      | 200     | Size of the panel, same value is also used for the `height` |
|`percent`    | 50      | |
|`line-width` | 15      | Size of the line |
|`line-cap`   | round   | [LineCap](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap) |
|`line-color` | cyan | Foreground line color, which represents the percentage  |
|`bg-line-color`| #efefef | Background line color |


## Animation

Refer to [Mask Component Attribute Animation](https://github.com/atmajs/mask-compo#animation)

Sample:
```mask
RoundProgress percent-transition='200ms easeInSine';
```

## Examples

- [/examples](/examples)

```bash
# install atma toolkit
npm install atma -g
# run examples static server
npm run examples

# navigate `http://localhost:5777/examples/index.html`
```

### Test
```bash
npm test
```

:copyright: MIT