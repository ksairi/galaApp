// eslint-disable-next-line import/no-unresolved
import editJsonFile from "edit-json-file";

const STAGING_APP_VERSION = "1.0";
const STAGING_APP_ANDROID_VERSION_CODE = 1;
const STAGING_APP_IOS_BUILD_NUMBER = "1";
const PROD_APP_VERSION = "1.0";
const PROD_APP_ANDROID_VERSION_CODE = 10;
const PROD_APP_IOS_BUILD_NUMBER = "6";

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
exports.init = (environment) => {
  let dataToSet;
  if (environment === "default") {
    dataToSet = prodDeployData;
  } else {
    dataToSet = stagingDeployData;
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
