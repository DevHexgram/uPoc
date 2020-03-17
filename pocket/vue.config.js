// module.exports = {
//   publicPath: './',
//
//   css: {
//     extract: false
//   }
// }
const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir)
};

module.exports = {
    publicPath: './',
    css: {
        loaderOptions: {
            postcss: {
                config: {
                    path: '.'
                }
            },
            less: {
                sourceMap: true,
                javascriptEnabled: true,
                modifyVars: {
                    'hack': `true; @import "${resolve('src')}/assets/vant.less";`
                    // 'hack': `true; @import "./src/assets/vant.less";`
                }
            }
        }
    },
};
