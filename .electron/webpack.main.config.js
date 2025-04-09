const path = require("path")

module.exports = {
  entry: path.resolve(__dirname, "../src/main/main.ts"),
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../../dist/main"),
    clean: true, // Limpa a pasta antes de gerar novos arquivos
  },
}
