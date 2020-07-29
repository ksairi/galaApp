const editJsonFile = require("edit-json-file");

const DEV_APP_VERSION = "1.0";
const DEV_APP_ANDROID_VERSION_CODE = 1;
const DEV_APP_IOS_BUILD_NUMBER = "2";
const STAGING_APP_VERSION = "1.0";
const STAGING_APP_ANDROID_VERSION_CODE = 4;
const STAGING_APP_IOS_BUILD_NUMBER = "3";
const PROD_APP_VERSION = "1.3";
const PROD_APP_ANDROID_VERSION_CODE = 13;
const PROD_APP_IOS_BUILD_NUMBER = "7";

const devDeployData = {
  name: "Gala Dev",
  slug: "galaAppDev",
  version: DEV_APP_VERSION,
  iosBuildNumber: DEV_APP_IOS_BUILD_NUMBER,
  androidVersionCode: DEV_APP_ANDROID_VERSION_CODE,
  bundleIdentifier: "com.gala.galaapp.dev",
  googleServicesFile: "google-services-dev.json",
};

const stagingDeployData = {
  name: "Gala Staging",
  slug: "galaAppStaging",
  version: STAGING_APP_VERSION,
  iosBuildNumber: STAGING_APP_IOS_BUILD_NUMBER,
  androidVersionCode: STAGING_APP_ANDROID_VERSION_CODE,
  bundleIdentifier: "com.gala.galaapp.staging",
  googleServicesFile: "google-services-staging.json",
};

const prodDeployData = {
  name: "Gala",
  slug: "galaApp",
  version: PROD_APP_VERSION,
  iosBuildNumber: PROD_APP_IOS_BUILD_NUMBER,
  androidVersionCode: PROD_APP_ANDROID_VERSION_CODE,
  bundleIdentifier: "com.gala.galaapp",
  googleServicesFile: "google-services-prod.json",
};

// eslint-disable-next-line no-undef
exports.init = (environment) => {
  let dataToSet;
  switch (environment) {
    case "default":
      dataToSet = prodDeployData;
      break;
    case "staging":
      dataToSet = stagingDeployData;
      break;
    case "dev":
      dataToSet = devDeployData;
      break;
  }

  const file = editJsonFile(`${__dirname}/app.json`);
  file.set("expo.name", dataToSet.name);
  file.set("expo.slug", dataToSet.slug);
  file.set("expo.version", dataToSet.version);
  file.set("expo.ios.buildNumber", dataToSet.iosBuildNumber);
  file.set("expo.ios.bundleIdentifier", dataToSet.bundleIdentifier);
  file.set("expo.android.versionCode", dataToSet.androidVersionCode);
  file.set("expo.android.package", dataToSet.bundleIdentifier);
  file.set("expo.android.googleServicesFile", dataToSet.googleServicesFile);
  file.save();

  // eslint-disable-next-line no-console
  console.log(`app.json modified with ${environment} values`);
};
