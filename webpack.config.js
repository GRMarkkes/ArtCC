module.exports = {
  resolve: {
    fallback: {
      https: require.resolve("https-browserify"),
      url: require.resolve("url/"),
      http: require.resolve("stream-http"),
      util: false,
    },
  },
};
