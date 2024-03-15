const { createProxyMiddleware } = require('http-proxy-middleware');
//import {backend_netloc} from './utils/constants';

module.exports = function(app) {
  app.use(
    '/simulation',
    createProxyMiddleware({
      pathRewrite: {'^/api' : ''}, //so that the requests in the backend doesn't have /api prefix
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
}