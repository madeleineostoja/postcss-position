# PostCSS Position
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

[PostCSS][PostCSS] plugin that adds shorthand attributes to position declarations.

Part of [Rucksack - CSS Superpowers](http://simplaio.github.io/rucksack).

```css
.foo {
  position: absolute 10px 0;
}

.bar {
  position: fixed 0;
}

.baz {
  position: relative 30% auto 0;
}

.fab {
  position: absolute 10px 0 20px 30px;
}
```

```css
.foo {
  position: absolute;
  top: 10px;
  right: 0;
  bottom: 10px;
  left: 0;
}

.bar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.baz {
  position: relative;
  top: 30%;
  right: auto;
  bottom: 0;
  left: auto;
}

.fab {
  position: absolute;
  top: 10px;
  right: 0;
  bottom: 20px;
  left: 30px;
}
```

--

### Usage

```js
postcss([ require('postcss-position') ])
```

See [PostCSS][PostCSS] docs for examples for your environment.

--

### License

MIT © [Sean King](https://twitter.com/seaneking)

[npm-image]: https://badge.fury.io/js/postcss-position.svg
[npm-url]: https://npmjs.org/package/postcss-position
[travis-image]: https://travis-ci.org/seaneking/postcss-position.svg?branch=master
[travis-url]: https://travis-ci.org/seaneking/postcss-position
[daviddm-image]: https://david-dm.org/seaneking/postcss-position.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/seaneking/postcss-position
[PostCSS]: https://github.com/postcss/postcss
