{
    "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
  }

  
  module.exports = {
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest", // or "ts-jest" if you're using TypeScript
    },
    testEnvironment: "jsdom", // Required for frontend testing
  };