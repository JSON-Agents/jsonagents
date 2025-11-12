// This package only exports TypeScript configuration files
module.exports = {
  base: require.resolve('./base.json'),
  nextjs: require.resolve('./nextjs.json'),
  'react-library': require.resolve('./react-library.json'),
};
