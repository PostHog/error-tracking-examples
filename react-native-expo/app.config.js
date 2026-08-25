// Layers the variant and the PostHog plugin config over app.json, so one project can build both
// release modes. bin/run-ios sets these; running expo directly without them gives the legacy
// variant on the default release mode, which is what a plain `expo prebuild` should do.
//
//   APP_VARIANT        legacy | releaseless — picks the bundle identifier, so both builds can sit
//                      on one simulator and each gets its own release lineage in PostHog
//   APP_ID_SUFFIX      appended to the bundle identifier. A value PostHog has never seen makes the
//                      run start from nothing: no release rows, and no symbol sets to collide with
//   POSTHOG_RELEASE_MODE  symbol-set | event — passed straight to the plugin
//   APP_VERSION        CFBundleShortVersionString, reported as $app_version
//   APP_BUILD          CFBundleVersion, reported as $app_build
//
// The release the build uploads is keyed on the bundle identifier, version and build number that
// Xcode passes to posthog-cli. Event mode resolves each exception's release from the same three
// values off the event, so these must be the values the app actually ships with.
const variant = process.env.APP_VARIANT === 'releaseless' ? 'releaseless' : 'legacy'
const idSuffix = process.env.APP_ID_SUFFIX || ''
const releaseMode = process.env.POSTHOG_RELEASE_MODE
const version = process.env.APP_VERSION || '1.0.0'
const buildNumber = process.env.APP_BUILD || '1'

const variants = {
  legacy: { suffix: '', name: 'ET legacy' },
  releaseless: { suffix: '.releaseless', name: 'ET releaseless' },
}

module.exports = ({ config }) => {
  const { suffix, name } = variants[variant]

  return {
    ...config,
    name,
    version,
    ios: {
      ...config.ios,
      bundleIdentifier: `${config.ios.bundleIdentifier}${suffix}${idSuffix}`,
      buildNumber,
    },
    android: {
      ...config.android,
      package: `${config.android.package}${suffix}${idSuffix}`,
      versionCode: Number(buildNumber),
    },
    plugins: [
      [
        'posthog-react-native/expo',
        {
          dotenvFile: '.env',
          // Uploads dSYMs and the native source alongside them, so a native frame reads back with
          // context the same way a JavaScript frame does. In event mode the plugin also sets
          // POSTHOG_NO_RELEASE_BIND, so the dSYMs stay release-independent like the source maps.
          uploadNativeSymbols: { includeSource: true },
          ...(releaseMode ? { releaseMode } : {}),
        },
      ],
    ],
  }
}
