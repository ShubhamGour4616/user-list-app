module.exports = {
    preset: 'ts-jest',  // Use ts-jest to handle TypeScript
    testEnvironment: 'jsdom',  // Set test environment to jsdom for React tests
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',  // Use ts-jest for TypeScript files
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],  // Handle TypeScript and JavaScript files
    transformIgnorePatterns: [
      "/node_modules/(?!your-esm-package|another-esm-package)/"  // If you have any ESM packages in node_modules, add them here
    ],
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy",  // Mock CSS imports
    },
  };
  