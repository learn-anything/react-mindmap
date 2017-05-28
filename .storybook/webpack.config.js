const appConfig = require('../webpack.config');

module.exports = {
  module: {
    loaders: appConfig.module.loaders
      // js loader works without errors
      .filter(item => item.test.toString() === '/\\.s(a|c)ss$/')
      // storybook uses webpack@1 which expects `loader` to be only of the string type
      .reduce((total, item) => {
        if (Array.isArray(item.loader)) {
          item.loaders = item.loader;
          delete item.loader;
        }

        return total.concat(item);
      }, [])
  }
};
