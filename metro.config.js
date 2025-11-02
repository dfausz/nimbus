// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Allow importing `.sql` so Babel can transform it
config.resolver.sourceExts.push("sql");

module.exports = config;
