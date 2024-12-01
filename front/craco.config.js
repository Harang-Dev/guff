const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // source-map-loader 설정 추가
      webpackConfig.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/@antv\/util\//,
          // 추가로 무시할 모듈이 있다면 여기에 추가
        ],
      });
      return webpackConfig;
    },
  },
};