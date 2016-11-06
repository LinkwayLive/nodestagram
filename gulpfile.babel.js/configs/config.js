const config = {
  clean: [
    'docs',
    'node_modules',
    'dist'
  ],
  dest: 'dist',
  test: {
    integration: {
      src: [
        'test/integration/**/*.js'
      ]
    },
    unit: {
      src: [
        'test/unit/**/*.js'
      ]
    }
  },
  eslint: {
    conf: {
      rules: {
        'comma-dangle': [2, 'never'],
        'react/jsx-filename-extension': [0, { extensions: ['.js'] }],
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }]
      }
    }
  },
  server: {
    src: [
      'src/**/*'
    ]
  },
  babel: {
    sourceMaps: 'inline'
  },
  doc: {
    src: 'src'
  }
};

export default config;
