// Per https://posthog.com/docs/error-tracking/upload-source-maps/react-native: on Expo 50+
// the serializer plugin reuses Expo's built-in debug id, injects the `_posthogChunkIds`
// module into the bundle, and stamps the id into the source map.
const { getPostHogExpoConfig } = require('posthog-react-native/metro')

const config = getPostHogExpoConfig(__dirname)

module.exports = config
