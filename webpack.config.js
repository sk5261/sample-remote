const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const path = require("path");
const webpack = require("webpack");
const packageJson = require("./package.json");
const deps = packageJson.dependencies;
const devDeps = packageJson.devDependencies;

const buildVersion = process.env.REACT_APP_BUILD_VERSION || new Date().toISOString();
const builtAt = new Date().toISOString();

class VersionManifestPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("VersionManifestPlugin", compilation => {
      compilation.hooks.processAssets.tap(
        {
          name: "VersionManifestPlugin",
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        () => {
          compilation.emitAsset(
            "version.json",
            new compiler.webpack.sources.RawSource(
              JSON.stringify({ buildVersion, builtAt }, null, 2)
            )
          );
        }
      );
    });
  }
}

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3002,
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /^\/sample/, to: "/index.html" },
        { from: /./, to: "/index.html" },
      ],
    },
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "auto",
    uniqueName: "sampleRemote",
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[id].[contenthash:8].js",
  },
  optimization: {
    runtimeChunk: false,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
            "@babel/preset-typescript",
          ],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_APP_BUILD_VERSION": JSON.stringify(buildVersion),
    }),
    new VersionManifestPlugin(),
    new ModuleFederationPlugin({
      name: "sampleRemote",
      filename: "remoteEntry.js",
      exposes: {
        "./main": "./src/pages/main",
        "./settings": "./src/pages/settings",
        "./auth": "./src/contexts/AuthContext",
        "./provider": "./src/provider",
        "./styles": "./src/globals.css",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
          eager: true,
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: deps["react-router-dom"],
        },
        tailwindcss: {
          singleton: true,
          requiredVersion: devDeps.tailwindcss,
        },
        clsx: {
          singleton: true,
          requiredVersion: deps.clsx,
        },
        "@radix-ui/react-slot": {
          singleton: true,
          requiredVersion: deps["@radix-ui/react-slot"],
        },
        "@radix-ui/react-dropdown-menu": {
          singleton: true,
          requiredVersion: deps["@radix-ui/react-dropdown-menu"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
