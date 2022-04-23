# express-clusterize

[![Build Status](https://drone.aricodes.net/api/badges/aricodes-oss/express-clusterize/status.svg)](https://drone.aricodes.net/aricodes-oss/express-clusterize)

A no-nonsense clustering solution for your nodeJS apps. Designed for a painless out of the box experience.

## Installation

With `npm`:

```sh
$ npm install --save express-clusterize
```

With `yarn`:

```sh
$ yarn add express-clusterize
```

## Usage

### `clusterize(entrypoint[,options])`

For most applications it's as simple as wrapping your `app.listen` call in a function and passing it to `clusterize`. Let's take a look at an example.

### Before

```js
const express = require('express');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Application started on port ${port}!`);
});
```

### After

```js
const express = require('express');
const clusterize = require('express-clusterize');

const app = express();
const port = 3000;

clusterize(() => {
  app.listen(port, () => {
    console.log(`Application started on port ${port}!`);
  });
});
```

That's it! There are three configuration options you can pass in the second argument to customize your experience:

#### `children`

Controls the number of worker processes spawned. Defaults to `require('os').cpus().length`.

#### `prodOnly`

If set, we only fork worker processes when `NODE_ENV === 'production'`. Defaults to `false`.

#### `respawn`

If set, respawns child processes if they die. Defaults to `true`.
