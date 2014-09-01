# gulp-rebase

Rebase gulp file paths

## Installation

```
npm install gulp-rebase
```

## Usage

#### Beginning of path

```js
  gulp.src('some/path/**/*.js')
  .pipe(rebase('^2'));
  // Would convert /this/path/here => /this/path
```

#### End of path

```js
  gulp.src('some/path/**/*.js')
  .pipe(rebase('2$'));
  // Would convert /this/path/here => /path/here
```

#### Explicit overwrite

```js
  gulp.src('some/path/**/*.js')
  .pipe(rebase('/some/new/path'));
  // Would convert /this/path/here => /some/new/path
```
