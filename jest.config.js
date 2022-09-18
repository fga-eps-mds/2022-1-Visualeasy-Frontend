// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'jest-environment-jsdom',
    collectCoverage: true,
    collectCoverageFrom: ["./src/pages/**"],
    coveragePathIgnorePatterns: [
        './src/pages/_app.tsx', './src/pages/_document.tsx',
    ],
    testFailureExitCode: 0,
    reporters: [
        'default', [
            'jest-sonar',
            {
                outputDirectory: 'coverage/',
                outputName: 'jest-report.xml',
                reportedFilePath: 'relative',
                relativeRootDir: '<rootDir>/../',
            },
        ],
    ],
    testMatch: [
        '**/*.test.jsx',
    ],
}

module.exports = createJestConfig(customJestConfig)