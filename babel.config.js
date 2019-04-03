const isDev = process.env.NODE_ENV === 'development'

module.exports = api => {
  api.cache(true)
  return {
    presets: [
      [
        '@babel/env',
        {
          modules: false,
          debug: !!isDev,
          useBuiltIns: 'usage',
        },
      ],
      '@babel/typescript',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      'macros',
      [
        'react-css-modules',
        {
          filetypes: {
            '.css': {
              syntax: 'postcss-scss',
            },
          },
        },
      ],
    ],
  }
}
