### Tasks

## (1) Integrate `npm` and a build management tool into your project.

1.  npm init -y
2.  npm i -D vite
3.  added scripts to package.json
    "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
    }
4.  create a vite.config.ts
    import { defineConfig } from 'vite';

export default defineConfig({
server: { port: 5173, open: true },
build: { outDir: 'dist', sourcemap: true }
}); 5. test it with: - npm run dev - npm run build

## (5) Configure your project to use Typescript as your primary development language and adapt the code and file extensions respectively.

1. npm i -D typescript
2. tsconfig.json
   {
   "compilerOptions": {
   "target": "ES2020",
   "useDefineForClassFields": true,
   "module": "ESNext",
   "lib": ["ES2020", "DOM", "DOM.Iterable"],
   "skipLibCheck": true,
   "moduleResolution": "Bundler",
   "resolveJsonModule": true,
   "isolatedModules": true,
   "noEmit": true,
   "strict": true
   },
   "include": ["src"]
   }
3. setting up src folder with ts files
4. refactoring the js to ts files.
5. testing application after refactoring. Still works.

## (3) Use ESLint and Prettier inside your project - rulesets can be found below.

1. npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-standard-with-typescript eslint-plugin-import eslint-plugin-n eslint-plugin-promise prettier eslint-config-prettier eslint-plugin-prettier
2. created .eslintrc.cjs, tsconfig.eslint.json, .eslintignore, .prettierrc, .prettierignore
3. adjusted package.json
   "scripts": {
   "dev": "vite",
   "build": "tsc && vite build",
   "preview": "vite preview",
   "lint": "eslint \"src/**/\*.{ts,js}\"",
   "lint:fix": "eslint \"src/**/_.{ts,js}\" --fix",
   "format": "prettier --write \"src/\*\*/_.{ts,js}\"",
   "format:check": "prettier --check \"src/\*_/_.{ts,js}\""
   }
4. npm run lint --> npx eslint \"src/\*_/_.{ts,js}\", shows typescript errors
5. npm run format --> npx prettier --check "src/\*_/_.{ts,js}" --> which files are formated

## (2) Keep your builds clear and add dependencies to the right build.

1. tried to do that but dont really knopw what is meant by that.

## (2) Define the following tasks within `npm scripts`:

- `dev`: starts the development server.
- `build`: runs the typescript compiler and bundles your application - bundling depends on your chosen build tool (e.g. Vite, Webpack) but typically bundles multiple files into one, applies optimizations like minification and obfuscation and outputs final results to a `dist` or `build` directory.
- `lint`: runs ESLint on all `.js` and `.ts` files in your projects `/src` directory.
- `lint:fix`: runs and also fixes all issues found by ESLint.
- `format`: formats all `.js` and `.ts` files in your projects `/src` directory.
- `format:check`: checks if the files in the `/src` directory are formatted according to Prettier's rules.

See package.json :
"scripts": {
"dev": "vite",
"build": "tsc && vite build",
"preview": "vite preview",
"lint": "eslint \"src/**/\*.{ts,js}\"",
"lint:fix": "eslint \"src/**/_.{ts,js}\" --fix",
"format": "prettier --write \"src/\*\*/_.{ts,js}\"",
"format:check": "prettier --check \"src/\*_/_.{ts,js}\""
},

## (2) Configure a pre-commit hook that lints and formats your code using [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged). A tutorial can be found [here](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9).

Hook works but triggers error messages from es-lint so no push can happen.

## (5) Configure **2 Workflows** using GitHub Actions, one for development and one for deployment:

- (\*2) Development Workflow should at least lint (optionally test) your code when developers push to a branch named `development`.
- (3) Deployment Workflow is triggered when developers push into `production` branch. It should at least lint and build your source code. Afterwards the build artifacts of your application should be automatically deployed to Github Pages (or another hosting provider of your choice).

YML file are present but not tested.
