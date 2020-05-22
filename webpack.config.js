const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync(env, argv);
  if (env.mode === "development") {
    const {DEV_HOST} = process.env;
    config.devServer.proxy = {
      "/api": {
        target: DEV_HOST || "http://localhost:8081",
        secure: "false",
      },
    };
  } else {
    config.output.publicPath = "/app/";
  }
  return config;
};
