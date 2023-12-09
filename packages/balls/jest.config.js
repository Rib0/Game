const config = {
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testEnvironment: 'jsdom',
    verbose: true,
    clearMocks: true,
    setupFilesAfterEnv: ['./setupTests.js'],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleDirectories: ['node_modules', 'src'],
};

module.exports = config;
