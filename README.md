# Einblik Vue.js Frontend 

Functionalities:

- Logging in to Auth0 using Redirect Mode
- Accessing profile information that has been provided in the ID token
- Gated content. The `/profile` route is not accessible without having first logged in

## Project setup

1. Add auth_config.json file to the project root with the next content:
```
{
  "domain": "<YOUR AUTH0 DOMAIN>",
  "clientId": "<YOUR AUTH0 CLIENT ID>"
}
```
2. Install the project dependencies, run in the terminal: 

```bash
npm install
```

### Configuration

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.

To do this, first copy `auth_config.json.example` into a new file in the same folder called `auth_config.json`, and replace the values within with your own Auth0 application credentials:

```json
{
  "domain": "<YOUR AUTH0 DOMAIN>",
  "clientId": "<YOUR AUTH0 CLIENT ID>"
}
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

## Deployment

### Compiles and minifies for production

```bash
npm run build
```

### Docker build

To build and run the Docker image, run `exec.sh`, or `exec.ps1` on Windows.

### Run your tests

```bash
npm run test
```

### Lints and fixes files

```bash
npm run lint
```

### Update packages
```
npm outdated
npm update --save/--save-dev
```

### In case when you have problems with npm 

1. If you used to run npm command with sudo or have access denied related problems,
 check this link: https://stackoverflow.com/questions/33725639/npm-install-g-less-does-not-work-eacces-permission-denied
 
2. If you face with error: "npm ERR! Unexpected end of JSON input while parsing near ...",
try to run next command: 
```bash
npm cache clean --force
```
You can also try the following: 

```bash
rm -rf node_modules 
rm package-lock.json 
npm set registry https://registry.npmjs.org/
npm cache clean --force
npm install --force --verbose --no-bin-links
```

### Manage node.js and npm versions

Install nvm from https://github.com/nvm-sh/nvm/blob/master/README.md

# install node.js v12.6.3 LTS and 14.3.0
# see https://nodejs.org/en/
nvm install 12.16.3
nvm install 14.3.0

# use node.js v14.3.0
nvm use 14.3.0

# upgrade npm to the latest version
npm install npm@latest -g

# alternatively, install n to manage node.js versions
npm install -g n

# install stable / latest / node.js version
n stable
n latest 
n [version]

