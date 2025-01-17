const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Untuk mendukung react-native-reanimated
config.resolver.assetExts.push('cjs');

module.exports = config;
