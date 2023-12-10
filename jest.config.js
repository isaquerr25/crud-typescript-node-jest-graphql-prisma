module.exports = {
  preset: "ts-jest",
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest'
  }
}