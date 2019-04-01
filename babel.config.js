const isDev = process.env.NODE_ENV === 'development'

module.exports = function(api) {
  api.cache(true)
  return {
    presets: [
      [
        '@babel/env',
        {
          debug: !!isDev,
          useBuiltIns: 'usage',
        },
      ],
      '@babel/typescript',
    ],
    plugins: ['@babel/plugin-syntax-dynamic-import'],
  }
}
