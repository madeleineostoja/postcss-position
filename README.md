# PostCSS Position [![Build Status][ci-img]][ci]

[PostCSS] plugin that provides shorthand declerations for position attributes.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/seaneking/postcss-position.svg
[ci]:      https://travis-ci.org/seaneking/postcss-position

```css
.foo {
  absolute: 10px 20px 30px 40px;
}

.bar {
  fixed: 0; 
}

.baz {
  absolute: 30px auto; 
}

.fab {
  relative: 50% 0 20px; 
}
```

```css
.foo {
  position: absolute;
  top: 10px;
  right: 20px;
  bottom: 30px;
  left: 40px;
}

.bar {
  position: fixed; 
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; 
}

.baz {
  position: absolute;
  top: 30px;
  right: auto;
  bottom: 30px;
  left: auto; 
}

.fab {
  position: relative;
  top: 50%;
  right: 0;
  bottom: 20px;
  left: 0; 
}
```

## Usage

```js
postcss([ require('postcss-position') ])
```

See [PostCSS] docs for examples for your environment.
