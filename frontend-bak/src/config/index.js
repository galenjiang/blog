import developmentConfig from './development-config';
import productionConfig from './production-config';
// eslint-disable-next-line
let config = {};
if (process.env.NODE_RUNTIME_ENV === 'development') {
    config = developmentConfig;
}
else if (process.env.NODE_RUNTIME_ENV === 'production') {
    config = productionConfig;
}
export default config;
//# sourceMappingURL=index.js.map