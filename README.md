# GalaApp

**React Native app for Gala Fitness Centre**

## Files comments

### app/config/apiAccessToken.js

**File to be created to export the identification token for server (including prefix 'Bearer')**

### app/assets/icons/icomoonConfig.json

**Icons hosted in [Icomoon](https://icomoon.io/app)**

### app/config/devHosts.js

**Export constants DEV_SERVER_HOSTNAME_1 and DEV_SERVER_HOSTNAME_2 to valid local addresses**

### google-services-{platform}.json
**Go [here](https://console.firebase.google.com/project/_/settings/general) to get the specific json file to deploy new version to the store**

### Instructions to get private key needed to deploy to google play

- **[Go to Google Play Console](https://play.google.com/apps/publish)**

- **Click the Settings menu entry, followed by API access**

- **Click in 'View in Google Developers Console'**

- **Edit the service account**

- **Create Key and save it as .json extension**

- **Save it and provide the path when asked during deployment**

### web app

- **To start web app for dev, define where dev server is running with env variable DEV_HOST. e.g** `DEV_HOST="http://galaweb:3001" yarn web`