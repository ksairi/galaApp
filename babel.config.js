// eslint-disable-next-line no-undef
module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./app"],
          extensions: [".js", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
