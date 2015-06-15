# PostCSS Position [![Build Status][ci-img]][ci]

[PostCSS] plugin that provides shorthand declerations for position attributes.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/seaneking/postcss-position.svg
[ci]:      https://travis-ci.org/seaneking/postcss-position

```css
.foo {
  absolute: 0 0 0 0;
}

.bar {
  fixed: 30px 0; 
}

.baz {
  relative: 50% auto auto auto; 
}
```

```css
.foo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bar {
  position: fixed; 
  top: 30px;
  right: 0;
  bottom: 30px;
  left: 0; 
}

.baz {
  position: relative;
  top: 50%;
  right: auto;
  bottom: auto;
  left: auto; 
}
```

## Usage

```js
postcss([ require('postcss-position') ])
```

See [PostCSS] docs for examples for your environment.
