# Productivity Dashboard (pd-frontend)

This is for Amy Csizmar-Dalal's comps group. This is the frontend, built in Vue.js. [Vue.js](https://vuejs.org/) is a frontend framework which allows for a lot of great modern development features, such as hot reloading (if you make a change to a file, it gets instantly updated without needing to reload the app), as well as a component-based architecture, which allows us to modularize our code and reuse components as we go along.

## Recommended IDE Setup

Definitely use VSCode for this. We're also using the Prettier code formatter, which you should download for VSCode (it auto-formats your code when you click save). Finally, you should download the Volar VSCode extension, which gives syntax highlighting for .vue files. 

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## First steps

Clone the repository.

```sh
git clone https://github.com/evan-lauer/pd-frontend
```

To see if Node is installed, type

```sh
node -v
```
If a version number shows up, then great! Otherwise, [install Node](https://nodejs.org/en/download). Once you install it, run `node -v` again to make sure it's working. If you're having issues, you may need to add `node` as an environment variable. See [this SO thread](https://stackoverflow.com/questions/23412938/node-is-not-recognized-as-an-internal-or-an-external-command-operable-program) for help.

## Project Setup
Now you've installed node. Run this command to install the necessary dependencies (make sure you are in the repository directory):
```sh
npm install
```

### Compile and Hot-Reload for Development
Now you're ready to run the server! Run this command to start a _local development server_. This will run our frontend code on your machine, allowing you to test changes. We're working on setting up actual web hosting, but until then, we're going to just develop locally.
```sh
npm run dev
```

### Compile and Minify for Production
This is for when we want to push to an actual server.
```sh
npm run build
```
### What next?

Take a look in the `/src` folder to check out the components of the app. Vue can take time to understand, so work your way through [this tutorial](https://vuejs.org/tutorial/#step-1) if you're confused.

