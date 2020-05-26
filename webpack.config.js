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
  // config.resolve.alias = {
  //   ...config.resolve.alias,
  //   "react-native-webview": "react-native-web-webview",
  // };

  config.module.rules = [
    ...config.module.rules,
    {
      test: /postMock.html$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    },
  ];
  return config;
};
