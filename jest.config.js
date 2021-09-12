const config = {
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testEnvironment: 'jsdom',
    verbose: true,
    collectCoverage: true,
    clearMocks: true,
    setupFilesAfterEnv: ['./setupTests.js'],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
        Base$: '<rootDir>/src/javascript/base',
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleDirectories: ['node_modules', 'src', 'src/javascript'],
};

module.exports = config;
