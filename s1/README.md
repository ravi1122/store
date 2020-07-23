# C1: Basic setup (React, Bootstrap, webpack)

## Initialize Node project

- ##### `$yarn init -y`

## Install dependencies

1. Main dependenices

- ##### `$yarn add react react-dom bootstrap webpack webpack-cli webpack-dev-server`

2. Webpack plugins

- ##### `$yarn add html-webpack-plugin mini-css-extract-plugin node-sass`

3. Webpack loaders

- ##### `$yarn add babel-loader html-loader sass-loader css-loader url-loader file-loader`

4. Babel core, plugins and presets

- ##### `$yarn add @babel/core @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-react`

5. Helper modules

- ##### `$yarn add classnames cross-env lodash rimraf`

6. FontAwesome for icons

- ##### `$yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome`

## Create `src` dir and entry files

- Creating `index.js`, `index.html`, `styles.scss` and `App.jsx`

## Create `webpack.config.js`

- Create `webpack.config.js` and add webpack configuration to it.

## Verify

- Your app should start without any error
- Check bootstrap is working by using `jumbotron` theme.
- Check FontAwesome icons setup is working by using icon from it.
