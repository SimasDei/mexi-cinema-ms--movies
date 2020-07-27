module.exports = {
  collectCoverage: true,
  coverageReporters: ['text', 'html', 'cobertura', 'lcov'],
  reporters: ['default', 'jest-junit'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleDirectories: ['node_modules', 'src', 'test'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  testMatch: ['**/__tests__/**/*.test.(ts)'],
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      lines: 80,
      classes: 80,
      modules: 80,
      packages: 80,
    },
  },
};
