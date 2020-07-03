const createExpoWebpackConfigAsync = require("@expo/webpack-config");

// eslint-disable-next-line no-undef
module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync(env, argv);
  if (env.mode === "development") {
    config.devServer.proxy = {
      "/api2": {
        target: "http://galaweb:3000",
        pathRewrite: {"/api2": ""},
      },
      "/api": {
        target: "http://galaweb:3001",
      },
    };
  }
  return config;
};
