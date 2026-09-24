var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../browser-common/dist/config.mjs
var packageVersion = "0.2.2";
var Config = {
  DEBUG: false,
  LIB_VERSION: packageVersion,
  LIB_NAME: "browser-common",
  JS_SDK_VERSION: packageVersion
};
var config = Config;

// package.json
var package_default = {
  name: "posthog-js",
  version: "1.407.3",
  bugs: {
    url: "https://github.com/PostHog/posthog-js/issues"
  },
  description: "Posthog-js allows you to automatically capture usage and send events to PostHog.",
  repository: "https://github.com/PostHog/posthog-js",
  author: "engineering@posthog.com",
  license: "(Apache-2.0 AND MIT)",
  homepage: "https://posthog.com/docs/libraries/js",
  packageManager: "pnpm@10.12.4",
  scripts: {
    clean: "rimraf lib dist react/dist",
    start: 'pnpm build-react && NODE_OPTIONS="--max-old-space-size=8192" pnpm build-rollup -w',
    dev: 'tsc -b && NODE_OPTIONS="--max-old-space-size=8192" rollup -cw',
    build: "tsc -b && rollup -c",
    "bundle-size:array": "node scripts/compare-array-bundle-size.mjs",
    postbuild: "node scripts/strip-lib-package-json.js && node scripts/check-mangled-property-consistency.js && node scripts/copy-rrweb-worker-maps.js",
    package: "pnpm pack --out $PACKAGE_DEST/%s.tgz",
    lint: "eslint src && eslint playwright",
    "lint:fix": "eslint src --fix && eslint playwright --fix",
    prettier: "prettier --write src/ functional_tests/ playwright/",
    "prettier:check": "prettier --check src/ functional_tests/ playwright/",
    prepublishOnly: "pnpm check-react",
    "check-react": "[ -d 'react/dist' ] || { echo '@posthog/react has not been built'; exit 1; }",
    test: "pnpm test:unit && pnpm test:functional",
    "test:unit": "jest src",
    "test:unit:surveys": "jest '.*survey.*.test.'",
    "test:unit:tours": "jest '.*tours.*.test.'",
    "test:functional": "jest functional_tests",
    "test-watch": "jest --watch src",
    "test:typecheck": "cd src/__tests__ && tsc --noEmit --project tsconfig.json",
    typecheck: "tsc --noEmit --project tsconfig.json",
    playwright: "pnpm exec playwright test --project webkit --project firefox --project chromium",
    "playwright:compat": "pnpm exec playwright test --config playwright.config.compat.ts",
    "playwright:integration": "pnpm exec playwright test --config playwright.config.integration.ts --project webkit --project firefox --project chromium",
    "playwright-ui": "pnpm exec playwright test --ui --project webkit --project firefox --project chromium",
    "playwright-webserver": "npx http-server ./ -p 2345",
    "playwright:surveys": "pnpm exec playwright test packages/browser/playwright/mocked/surveys/* --project webkit --project firefox --project chromium",
    "playwright:surveys:ui": "pnpm exec playwright test packages/browser/playwright/mocked/surveys/* --ui --project webkit --project firefox --project chromium",
    "playwright:tours:ui": "pnpm exec playwright test packages/browser/playwright/mocked/product-tours/* --ui --project webkit --project firefox --project chromium",
    prepare: 'if [ -z "$CI" ] && [ "$HUSKY" != "0" ]; then husky install; fi',
    "deprecate-old-versions": "node scripts/deprecate-old-versions.mjs",
    "check-testcafe-results": "ts-node testcafe/check-testcafe-results.js",
    "run-testcafe-localhost": "node scripts/run-testcafe-localhost.mjs",
    "write-mangled-property-names": "WRITE_MANGLED_PROPERTIES=1 pnpm build",
    "generate-references": "pnpm exec api-extractor run --config ./api-extractor.json --local && node scripts/generate-docs.js"
  },
  main: "dist/main.js",
  module: "dist/module.js",
  types: "dist/module.d.ts",
  files: [
    "lib/*",
    "dist/*",
    "react/dist/**",
    "react/package.json",
    "react/surveys/package.json",
    "react/slim/package.json",
    "customizations/package.json",
    "rrweb/package.json",
    "rrweb-types/package.json",
    "rrweb-plugin-console-record/package.json"
  ],
  dependencies: {
    "@posthog/browser-common": "workspace:^",
    "@posthog/core": "workspace:^",
    "@posthog/types": "workspace:^",
    "core-js": "^3.49.0",
    dompurify: "^3.3.2",
    fflate: "^0.4.8",
    preact: "^10.29.3",
    "query-selector-shadow-dom": "^1.0.1",
    "web-vitals": "^5.3.0"
  },
  devDependencies: {
    "@babel/core": "catalog:",
    "@babel/plugin-syntax-decorators": "catalog:",
    "@babel/plugin-transform-exponentiation-operator": "catalog:",
    "@babel/plugin-transform-nullish-coalescing-operator": "catalog:",
    "@babel/plugin-transform-react-jsx": "catalog:",
    "@babel/preset-env": "catalog:",
    "@babel/preset-typescript": "catalog:",
    "@jest/globals": "^29.7.0",
    "@jridgewell/sourcemap-codec": "^1.5.5",
    "@playwright/test": "^1.52.0",
    "@posthog-tooling/rollup-utils": "workspace:*",
    "@posthog/rrweb": "workspace:*",
    "@posthog/rrweb-plugin-console-record": "workspace:*",
    "@posthog/rrweb-record": "workspace:*",
    "@posthog/rrweb-types": "workspace:*",
    "@rollup/plugin-babel": "^6.0.4",
    "@rollup/plugin-commonjs": "^28.0.6",
    "@rollup/plugin-json": "^6.1.0",
    "@rollup/plugin-node-resolve": "^16.0.3",
    "@rollup/plugin-terser": "^0.4.4",
    "@rollup/plugin-typescript": "^12.1.4",
    "@sentry/types": "8.7.0",
    "@testing-library/dom": "catalog:",
    "@testing-library/jest-dom": "catalog:",
    "@testing-library/preact": "catalog:",
    "@types/dompurify": "^3.2.0",
    "@types/dotenv": "^8.2.3",
    "@types/jest": "catalog:",
    "@types/node": "^22.5.0",
    "@types/query-selector-shadow-dom": "^1.0.4",
    "@types/sinon": "^17.0.1",
    "@types/web": "^0.0.222",
    "babel-jest": "^29.7.0",
    browserslist: "^4.28.4",
    "compare-versions": "^6.1.1",
    cssnano: "^7.0.7",
    "date-fns": "^3.6.0",
    dotenv: "^17.4.2",
    expect: "^29.7.0",
    "fast-check": "^2.17.0",
    "http-server": "14.1.1",
    husky: "^8.0.1",
    "identity-obj-proxy": "^3.0.0",
    jest: "catalog:",
    "jest-environment-jsdom": "catalog:",
    jsdom: "16.7.0",
    "jsdom-global": "3.0.2",
    localStorage: "1.0.4",
    msw: "^1.3.3",
    "node-fetch": "^2.6.11",
    postcss: "^8.5.16",
    "postcss-import": "^16.1.1",
    "postcss-nesting": "^13.0.1",
    "posthog-js": "link:",
    "preact-render-to-string": "^6.3.1",
    rollup: "catalog:",
    "rollup-plugin-dts": "^6.2.3",
    "rollup-plugin-postcss": "^4.0.2",
    "rollup-plugin-visualizer": "^6.0.3",
    sinon: "9.0.2",
    testcafe: "^2.6.2",
    "testcafe-browser-provider-browserstack": "^1.15.2",
    "ts-node": "^10.9.2",
    tslib: "catalog:",
    typescript: "catalog:",
    yargs: "^17.7.2"
  },
  browserslist: [
    "> 0.5%, last 2 versions, Firefox ESR, not dead"
  ]
};

// src/config.ts
config.DEBUG = false;
config.LIB_VERSION = package_default.version;
config.LIB_NAME = "web";
var config_default = config;

// src/constants.ts
var PEOPLE_DISTINCT_ID_KEY = "$people_distinct_id";
var DISTINCT_ID = "distinct_id";
var DEVICE_ID = "$device_id";
var DEVICE_MODEL = "$device_model";
var ALIAS_ID_KEY = "__alias";
var CAMPAIGN_IDS_KEY = "__cmpns";
var EVENT_TIMERS_KEY = "__timers";
var AUTOCAPTURE_DISABLED_SERVER_SIDE = "$autocapture_disabled_server_side";
var HEATMAPS_ENABLED_SERVER_SIDE = "$heatmaps_enabled_server_side";
var EXCEPTION_CAPTURE_ENABLED_SERVER_SIDE = "$exception_capture_enabled_server_side";
var ERROR_TRACKING_SUPPRESSION_RULES = "$error_tracking_suppression_rules";
var ERROR_TRACKING_CAPTURE_EXTENSION_EXCEPTIONS = "$error_tracking_capture_extension_exceptions";
var WEB_VITALS_ENABLED_SERVER_SIDE = "$web_vitals_enabled_server_side";
var DEAD_CLICKS_ENABLED_SERVER_SIDE = "$dead_clicks_enabled_server_side";
var PRODUCT_TOURS_ENABLED_SERVER_SIDE = "$product_tours_enabled_server_side";
var WEB_VITALS_ALLOWED_METRICS = "$web_vitals_allowed_metrics";
var SESSION_RECORDING_REMOTE_CONFIG = "$session_recording_remote_config";
var SESSION_RECORDING_ENABLED_SERVER_SIDE = "$session_recording_enabled_server_side";
var SESSION_RECORDING_SAMPLE_RATE = "$replay_sample_rate";
var SESSION_RECORDING_OVERRIDE_SAMPLING = "$replay_override_sampling";
var SESSION_RECORDING_OVERRIDE_LINKED_FLAG = "$replay_override_linked_flag";
var SESSION_RECORDING_OVERRIDE_URL_TRIGGER = "$replay_override_url_trigger";
var SESSION_RECORDING_OVERRIDE_EVENT_TRIGGER = "$replay_override_event_trigger";
var SESSION_ID = "$sesid";
var SESSION_RECORDING_IS_SAMPLED = "$session_is_sampled";
var SESSION_RECORDING_PAST_MINIMUM_DURATION = "$session_past_minimum_duration";
var SESSION_RECORDING_URL_TRIGGER_ACTIVATED_SESSION = "$session_recording_url_trigger_activated_session";
var SESSION_RECORDING_EVENT_TRIGGER_ACTIVATED_SESSION = "$session_recording_event_trigger_activated_session";
var SESSION_RECORDING_TRIGGER_V2_GROUP_EVENT_PREFIX = "$posthog_sr_group_event_trigger_";
var SESSION_RECORDING_TRIGGER_V2_GROUP_URL_PREFIX = "$posthog_sr_group_url_trigger_";
var SESSION_RECORDING_TRIGGER_V2_GROUP_SAMPLING_PREFIX = "$posthog_sr_group_sampling_";
var SESSION_RECORDING_FIRST_FULL_SNAPSHOT_TIMESTAMP = "$debug_first_full_snapshot_timestamp";
var SESSION_RECORDING_FLUSHED_SIZE = "$sess_rec_flush_size";
var ENABLED_FEATURE_FLAGS = "$enabled_feature_flags";
var PERSISTENCE_ACTIVE_FEATURE_FLAGS = "$active_feature_flags";
var PERSISTENCE_EARLY_ACCESS_FEATURES = "$early_access_features";
var PERSISTENCE_FEATURE_FLAG_DETAILS = "$feature_flag_details";
var PERSISTENCE_FEATURE_FLAG_PAYLOADS = "$feature_flag_payloads";
var PERSISTENCE_FEATURE_FLAG_REQUEST_ID = "$feature_flag_request_id";
var PERSISTENCE_MINIMAL_FLAG_CALLED_EVENTS = "$minimal_flag_called_events";
var PERSISTENCE_OVERRIDE_FEATURE_FLAGS = "$override_feature_flags";
var PERSISTENCE_OVERRIDE_FEATURE_FLAG_PAYLOADS = "$override_feature_flag_payloads";
var STORED_PERSON_PROPERTIES_KEY = "$stored_person_properties";
var STORED_GROUP_PROPERTIES_KEY = "$stored_group_properties";
var SURVEYS = "$surveys";
var SURVEYS_LOADED_AT = "$surveys_loaded_at";
var SURVEYS_ACTIVATED = "$surveys_activated";
var SURVEYS_ACTIVATED_SESSION = "$surveys_activated_session";
var PRODUCT_TOURS = "ph_product_tours";
var PRODUCT_TOURS_ACTIVATED = "$product_tours_activated";
var PRODUCT_TOURS_ACTIVATED_SESSION = "$product_tours_activated_session";
var CONVERSATIONS_LEGACY_WIDGET_SESSION_ID = "$conversations_widget_session_id";
var CONVERSATIONS_LEGACY_TICKET_ID = "$conversations_ticket_id";
var CONVERSATIONS_LEGACY_WIDGET_STATE = "$conversations_widget_state";
var CONVERSATIONS_LEGACY_USER_TRAITS = "$conversations_user_traits";
var FLAG_CALL_REPORTED = "$flag_call_reported";
var FLAG_CALL_REPORTED_SESSION_ID = "$flag_call_reported_session_id";
var PERSISTENCE_FEATURE_FLAG_ERRORS = "$feature_flag_errors";
var PERSISTENCE_FEATURE_FLAG_EVALUATED_AT = "$feature_flag_evaluated_at";
var USER_STATE = "$user_state";
var CLIENT_SESSION_PROPS = "$client_session_props";
var CAPTURE_RATE_LIMIT = "$capture_rate_limit";
var INITIAL_CAMPAIGN_PARAMS = "$initial_campaign_params";
var INITIAL_REFERRER_INFO = "$initial_referrer_info";
var INITIAL_PERSON_INFO = "$initial_person_info";
var ENABLE_PERSON_PROCESSING = "$epp";
var COOKIELESS_SENTINEL_VALUE = "$posthog_cookieless";
var COOKIELESS_MODE_FLAG_PROPERTY = "$cookieless_mode";
var SDK_DEBUG_EXTENSIONS_INIT_METHOD = "$sdk_debug_extensions_init_method";
var SDK_DEBUG_EXTENSIONS_INIT_TIME_MS = "$sdk_debug_extensions_init_time_ms";
var SDK_DEBUG_RECORDING_SCRIPT_NOT_LOADED = "$sdk_debug_recording_script_not_loaded";
var SDK_DEBUG_REPLAY_EVENT_TRIGGER_STATUS = "$sdk_debug_replay_event_trigger_status";
var SDK_DEBUG_REPLAY_LINKED_FLAG_TRIGGER_STATUS = "$sdk_debug_replay_linked_flag_trigger_status";
var SDK_DEBUG_REPLAY_MATCHED_RECORDING_TRIGGER_GROUPS = "$sdk_debug_replay_matched_recording_trigger_groups";
var SDK_DEBUG_REPLAY_REMOTE_TRIGGER_MATCHING_CONFIG = "$sdk_debug_replay_remote_trigger_matching_config";
var SDK_DEBUG_REPLAY_TRIGGER_GROUPS_COUNT = "$sdk_debug_replay_trigger_groups_count";
var SDK_DEBUG_REPLAY_URL_TRIGGER_STATUS = "$sdk_debug_replay_url_trigger_status";
var SESSION_RECORDING_START_REASON = "$session_recording_start_reason";
var SURVEYS_REQUEST_TIMEOUT_MS = 1e4;
var SURVEYS_CACHE_TTL_MS = 5 * 60 * 1e3;
var COOKIELESS_ON_REJECT = "on_reject";
var COOKIELESS_ALWAYS = "always";
var USER_STATE_ANONYMOUS = "anonymous";
var USER_STATE_IDENTIFIED = "identified";
var PERSON_PROFILES_IDENTIFIED_ONLY = "identified_only";
var DOM_EVENT_VISIBILITYCHANGE = "visibilitychange";
var DOM_EVENT_BEFOREUNLOAD = "beforeunload";
var EVENT_PAGEVIEW = "$pageview";
var EVENT_PAGELEAVE = "$pageleave";
var EVENT_IDENTIFY = "$identify";
var EVENT_GROUPIDENTIFY = "$groupidentify";

// ../browser-common/dist/utils/globals.mjs
var win = "undefined" != typeof window ? window : void 0;
var global = "undefined" != typeof globalThis ? globalThis : win;
var globals_navigator = global?.navigator;
var globals_document = global?.document;
var globals_location = global?.location;
var fetch2 = global?.fetch;
var XMLHttpRequest = global?.XMLHttpRequest && "withCredentials" in new global.XMLHttpRequest() ? global.XMLHttpRequest : void 0;
var AbortController2 = global?.AbortController;
var CompressionStream = global?.CompressionStream;
var userAgent = globals_navigator?.userAgent;

// src/utils/globals.ts
var globalObject = typeof globalThis !== "undefined" ? globalThis : win;
if (globalObject && typeof self === "undefined") {
  ;
  globalObject.self = globalObject;
}
if (globalObject && typeof File === "undefined") {
  ;
  globalObject.File = function() {
  };
}
var assignableWindow = win ?? {};

// ../core/dist/featureFlagUtils.mjs
var MINIMAL_FLAG_CALLED_EVENT_PROPERTIES = [
  "$feature_flag",
  "$feature_flag_response",
  "$feature_flag_has_experiment",
  "$feature_flag_id",
  "$feature_flag_version",
  "$feature_flag_reason",
  "$feature_flag_request_id",
  "$feature_flag_evaluated_at",
  "$feature_flag_error",
  "locally_evaluated",
  "$groups",
  "$process_person_profile",
  "$geoip_disable",
  "$current_url",
  "$pathname",
  "$session_id",
  "$window_id",
  "$lib",
  "$lib_version",
  "$device_id",
  "$is_server"
];
var minimizeFlagCalledEventProperties = (properties, transportKeys = []) => {
  const minimal = {};
  const copyKey = (key) => {
    if (void 0 !== properties[key]) minimal[key] = properties[key];
  };
  MINIMAL_FLAG_CALLED_EVENT_PROPERTIES.forEach(copyKey);
  transportKeys.forEach(copyKey);
  return minimal;
};

// ../core/dist/types.mjs
var types_Compression = /* @__PURE__ */ (function(Compression2) {
  Compression2["GZipJS"] = "gzip-js";
  Compression2["Base64"] = "base64";
  return Compression2;
})({});
var knownUnsafeEditableEvent = [
  "$snapshot",
  "$pageview",
  "$pageleave",
  "$set",
  "survey dismissed",
  "survey sent",
  "survey shown",
  "$identify",
  "$groupidentify",
  "$create_alias",
  "$$client_ingestion_warning",
  "$web_experiment_applied",
  "$feature_enrollment_update",
  "$feature_flag_called"
];
var knownUnsafeEditableEventProperty = [
  "token"
];

// ../core/dist/gzip.mjs
var NATIVE_GZIP_VALIDATION_ERROR = "NativeGzipValidationError";
var GZIP_MAGIC_FIRST_BYTE = 31;
var GZIP_MAGIC_SECOND_BYTE = 139;
var GZIP_DEFLATE_METHOD = 8;
var hasGzipMagic = (bytes) => bytes.length >= 2 && bytes[0] === GZIP_MAGIC_FIRST_BYTE && bytes[1] === GZIP_MAGIC_SECOND_BYTE;
var isGzipData = (body) => {
  if (body instanceof ArrayBuffer) return hasGzipMagic(new Uint8Array(body));
  if (ArrayBuffer.isView(body)) return hasGzipMagic(new Uint8Array(body.buffer, body.byteOffset, body.byteLength));
  return false;
};
var isGzipRequest = (compression, urlCompression) => compression === types_Compression.GZipJS || urlCompression === types_Compression.GZipJS || "gzip" === urlCompression;
var isNativeAsyncGzipReadError = (error) => {
  if (!error || "object" != typeof error) return false;
  const name = "name" in error ? String(error.name) : "";
  return "NotReadableError" === name;
};
var isNativeAsyncGzipError = (error) => {
  if (!error || "object" != typeof error) return false;
  const name = "name" in error ? String(error.name) : "";
  return isNativeAsyncGzipReadError(error) || name === NATIVE_GZIP_VALIDATION_ERROR;
};
var crc32Table;
var getCrc32Table = () => {
  if (crc32Table) return crc32Table;
  crc32Table = [];
  for (let i = 0; i < 256; i++) {
    let crc2 = i;
    for (let j = 0; j < 8; j++) crc2 = 1 & crc2 ? 3988292384 ^ crc2 >>> 1 : crc2 >>> 1;
    crc32Table[i] = crc2 >>> 0;
  }
  return crc32Table;
};
var crc32 = (bytes) => {
  const table = getCrc32Table();
  let crc2 = 4294967295;
  for (let i = 0; i < bytes.length; i++) crc2 = table[(crc2 ^ bytes[i]) & 255] ^ crc2 >>> 8;
  return (4294967295 ^ crc2) >>> 0;
};
var throwNativeGzipValidationError = (reason) => {
  const error = new Error(`Native gzip produced invalid output: ${reason}`);
  error.name = NATIVE_GZIP_VALIDATION_ERROR;
  throw error;
};
var validateNativeGzip = async (compressed, inputBytes) => {
  if (compressed.size < 18) throwNativeGzipValidationError("too-short");
  const header = new Uint8Array(await compressed.slice(0, 10).arrayBuffer());
  if (!hasGzipMagic(header) || header[2] !== GZIP_DEFLATE_METHOD) throwNativeGzipValidationError("invalid-header");
  const trailer = new DataView(await compressed.slice(compressed.size - 8).arrayBuffer());
  if (trailer.getUint32(0, true) !== crc32(inputBytes)) throwNativeGzipValidationError("invalid-crc");
  const inputSize = inputBytes.length >>> 0;
  if (trailer.getUint32(4, true) !== inputSize) throwNativeGzipValidationError("invalid-size");
};
async function gzipCompress(input, isDebug = true, options) {
  try {
    const inputBytes = new TextEncoder().encode(input);
    const compressedStream = new globalThis.CompressionStream("gzip");
    const writer = compressedStream.writable.getWriter();
    const writePromise = writer.write(inputBytes).then(() => writer.close()).catch(async (err) => {
      try {
        await writer.abort(err);
      } catch {
      }
      throw err;
    });
    const responsePromise = new Response(compressedStream.readable).blob();
    const [compressed] = await Promise.all([
      responsePromise,
      writePromise
    ]);
    await validateNativeGzip(compressed, inputBytes);
    return compressed;
  } catch (error) {
    if (options?.rethrow) throw error;
    if (isDebug) console.error("Failed to gzip compress data", error);
    return null;
  }
}

// ../core/dist/utils/bot-detection.mjs
var DEFAULT_BLOCKED_UA_STRS = [
  "amazonbot",
  "amazonproductbot",
  "app.hypefactors.com",
  "applebot",
  "archive.org_bot",
  "awariobot",
  "backlinksextendedbot",
  "baiduspider",
  "bingbot",
  "bingpreview",
  "chrome-lighthouse",
  "dataforseobot",
  "deepscan",
  "duckduckbot",
  "facebookexternal",
  "facebookcatalog",
  "http://yandex.com/bots",
  "hubspot",
  "ia_archiver",
  "leikibot",
  "linkedinbot",
  "meta-externalagent",
  "mj12bot",
  "msnbot",
  "nessus",
  "petalbot",
  "pinterest",
  "prerender",
  "rogerbot",
  "screaming frog",
  "sebot-wa",
  "sitebulb",
  "slackbot",
  "slurp",
  "trendictionbot",
  "turnitin",
  "twitterbot",
  "vercel-screenshot",
  "vercelbot",
  "yahoo! slurp",
  "yandexbot",
  "zoombot",
  "bot.htm",
  "bot.php",
  "(bot;",
  "bot/",
  "crawler",
  "ahrefsbot",
  "ahrefssiteaudit",
  "semrushbot",
  "siteauditbot",
  "splitsignalbot",
  "gptbot",
  "oai-searchbot",
  "chatgpt-user",
  "perplexitybot",
  "better uptime bot",
  "sentryuptimebot",
  "uptimerobot",
  "headlesschrome",
  "cypress",
  "google-hoteladsverifier",
  "adsbot-google",
  "apis-google",
  "duplexweb-google",
  "feedfetcher-google",
  "google favicon",
  "google web preview",
  "google-read-aloud",
  "googlebot",
  "googleother",
  "google-cloudvertexbot",
  "googleweblight",
  "mediapartners-google",
  "storebot-google",
  "google-inspectiontool",
  "bytespider"
];
var isBlockedUA = function(ua, customBlockedUserAgents = []) {
  if (!ua) return false;
  const uaLower = ua.toLowerCase();
  return DEFAULT_BLOCKED_UA_STRS.concat(customBlockedUserAgents).some((blockedUA) => {
    const blockedUaLower = blockedUA.toLowerCase();
    return -1 !== uaLower.indexOf(blockedUaLower);
  });
};

// ../core/dist/utils/string-utils.mjs
function includes(str, needle) {
  return -1 !== str.indexOf(needle);
}
var stripLeadingDollar = function(s) {
  return s.replace(/^\$/, "");
};
function isDistinctIdStringLike(value) {
  return [
    "distinct_id",
    "distinctid"
  ].includes(value.toLowerCase());
}
function safeJsonStringify(value) {
  const ancestors = [];
  return JSON.stringify(value, function(_key, replacementValue) {
    if ("bigint" == typeof replacementValue) return replacementValue.toString();
    if ("function" == typeof replacementValue || "symbol" == typeof replacementValue) return;
    if (replacementValue instanceof Error) return {
      name: replacementValue.name,
      message: replacementValue.message,
      stack: replacementValue.stack
    };
    if (replacementValue && "object" == typeof replacementValue) {
      while (ancestors.length > 0 && ancestors[ancestors.length - 1] !== this) ancestors.pop();
      if (ancestors.includes(replacementValue)) return "[Circular]";
      ancestors.push(replacementValue);
    }
    return replacementValue;
  }) ?? "null";
}

// ../core/dist/utils/type-utils.mjs
var nativeIsArray = Array.isArray;
var ObjProto = Object.prototype;
var type_utils_hasOwnProperty = ObjProto.hasOwnProperty;
var type_utils_toString = ObjProto.toString;
var isArray = nativeIsArray || function(obj) {
  return "[object Array]" === type_utils_toString.call(obj);
};
var isFunction = (x) => "function" == typeof x;
var isObject = (x) => x === Object(x) && !isArray(x);
var isEmptyObject = (x) => {
  if (isObject(x)) {
    for (const key in x) if (type_utils_hasOwnProperty.call(x, key)) return false;
    return true;
  }
  return false;
};
var isUndefined = (x) => void 0 === x;
var isString = (x) => "[object String]" == type_utils_toString.call(x);
var isEmptyString = (x) => isString(x) && 0 === x.trim().length;
var isNull = (x) => null === x;
var isNullish = (x) => isUndefined(x) || isNull(x);
var isNumber = (x) => "[object Number]" == type_utils_toString.call(x) && x === x;
var isPositiveNumber = (value) => isNumber(value) && value > 0;
var isBoolean = (x) => "[object Boolean]" === type_utils_toString.call(x);
var isFormData = (x) => x instanceof FormData;
var isFile = (x) => x instanceof File;
var isPlainError = (x) => x instanceof Error;
var isKnownUnsafeEditableEvent = (x) => includes(knownUnsafeEditableEvent, x);
var isKnownUnsafeEditableEventProperty = (x) => includes(knownUnsafeEditableEventProperty, x);
function isPrimitive(value) {
  return null === value || "object" != typeof value;
}
function isBuiltin(candidate, className) {
  return Object.prototype.toString.call(candidate) === `[object ${className}]`;
}
function isErrorEvent(event) {
  return isBuiltin(event, "ErrorEvent");
}
function isEvent(candidate) {
  return "undefined" != typeof Event && isInstanceOf(candidate, Event);
}
function isInstanceOf(candidate, base) {
  try {
    return candidate instanceof base;
  } catch {
    return false;
  }
}
var yesLikeValues = [
  true,
  "true",
  1,
  "1",
  "yes"
];
var isYesLike = (val) => includes(yesLikeValues, val);
var noLikeValues = [
  false,
  "false",
  0,
  "0",
  "no"
];
var isNoLike = (val) => includes(noLikeValues, val);

// ../core/dist/utils/number-utils.mjs
function clampToRange(value, min, max, logger8, fallbackValue) {
  if (min > max) {
    logger8.warn("min cannot be greater than max.");
    min = max;
  }
  if (isNumber(value)) if (value > max) {
    logger8.warn(" cannot be  greater than max: " + max + ". Using max value instead.");
    return max;
  } else {
    if (!(value < min)) return value;
    logger8.warn(" cannot be less than min: " + min + ". Using min value instead.");
    return min;
  }
  logger8.warn(" must be a number. using max or fallback. max: " + max + ", fallback: " + fallbackValue);
  return clampToRange(fallbackValue || max, min, max, logger8);
}

// ../core/dist/utils/user-agent-utils.mjs
var FACEBOOK = "Facebook";
var MOBILE = "Mobile";
var IOS = "iOS";
var ANDROID = "Android";
var TABLET = "Tablet";
var ANDROID_TABLET = ANDROID + " " + TABLET;
var IPAD = "iPad";
var APPLE = "Apple";
var APPLE_WATCH = APPLE + " Watch";
var SAFARI = "Safari";
var BLACKBERRY = "BlackBerry";
var SAMSUNG = "Samsung";
var SAMSUNG_BROWSER = SAMSUNG + "Browser";
var SAMSUNG_INTERNET = SAMSUNG + " Internet";
var CHROME = "Chrome";
var CHROME_OS = CHROME + " OS";
var CHROME_IOS = CHROME + " " + IOS;
var INTERNET_EXPLORER = "Internet Explorer";
var INTERNET_EXPLORER_MOBILE = INTERNET_EXPLORER + " " + MOBILE;
var OPERA = "Opera";
var OPERA_MINI = OPERA + " Mini";
var EDGE = "Edge";
var MICROSOFT_EDGE = "Microsoft " + EDGE;
var FIREFOX = "Firefox";
var FIREFOX_IOS = FIREFOX + " " + IOS;
var NINTENDO = "Nintendo";
var PLAYSTATION = "PlayStation";
var XBOX = "Xbox";
var ANDROID_MOBILE = ANDROID + " " + MOBILE;
var MOBILE_SAFARI = MOBILE + " " + SAFARI;
var WINDOWS = "Windows";
var WINDOWS_PHONE = WINDOWS + " Phone";
var NOKIA = "Nokia";
var OUYA = "Ouya";
var GENERIC = "Generic";
var GENERIC_MOBILE = GENERIC + " " + MOBILE.toLowerCase();
var GENERIC_TABLET = GENERIC + " " + TABLET.toLowerCase();
var KONQUEROR = "Konqueror";
var OCULUS_BROWSER = "Oculus Browser";
var VIVALDI = "Vivaldi";
var YANDEX = "Yandex";
var WHALE = "Whale";
var DUCKDUCKGO = "DuckDuckGo";
var PALE_MOON = "Pale Moon";
var WATERFOX = "Waterfox";
var BRAVE = "Brave";
var GOOGLE_SEARCH_APP = "Google Search App";
var BROWSER_VERSION_REGEX_SUFFIX = "(\\d+(\\.\\d+)?)";
var DEFAULT_BROWSER_VERSION_REGEX = new RegExp("Version/" + BROWSER_VERSION_REGEX_SUFFIX);
function browserFromHints(hints) {
  if (hints?.brave) return BRAVE;
  return null;
}
var XBOX_REGEX = new RegExp(XBOX, "i");
var PLAYSTATION_REGEX = new RegExp(PLAYSTATION + " \\w+", "i");
var NINTENDO_REGEX = new RegExp(NINTENDO + " \\w+", "i");
var BLACKBERRY_REGEX = new RegExp(BLACKBERRY + "|PlayBook|BB10", "i");
var windowsVersionMap = {
  "NT3.51": "NT 3.11",
  "NT4.0": "NT 4.0",
  "5.0": "2000",
  "5.1": "XP",
  "5.2": "XP",
  "6.0": "Vista",
  "6.1": "7",
  "6.2": "8",
  "6.3": "8.1",
  "6.4": "10",
  "10.0": "10"
};
function isSafari(userAgent2) {
  return includes(userAgent2, SAFARI) && !includes(userAgent2, CHROME) && !includes(userAgent2, ANDROID);
}
var safariCheck = (ua, vendor) => vendor && includes(vendor, APPLE) || isSafari(ua);
var detectBrowser = function(user_agent, vendor, hints, options) {
  vendor = vendor || "";
  const fromHints = browserFromHints(hints);
  if (fromHints) return fromHints;
  if (options?.detectGoogleSearchApp && includes(user_agent, "GSA/")) return GOOGLE_SEARCH_APP;
  if (includes(user_agent, " OPR/") && includes(user_agent, "Mini")) return OPERA_MINI;
  if (includes(user_agent, " OPR/")) return OPERA;
  if (BLACKBERRY_REGEX.test(user_agent)) return BLACKBERRY;
  if (includes(user_agent, "IE" + MOBILE) || includes(user_agent, "WPDesktop")) return INTERNET_EXPLORER_MOBILE;
  if (includes(user_agent, "OculusBrowser")) return OCULUS_BROWSER;
  else if (includes(user_agent, SAMSUNG_BROWSER)) return SAMSUNG_INTERNET;
  else if (includes(user_agent, EDGE) || includes(user_agent, "Edg/")) return MICROSOFT_EDGE;
  else if (includes(user_agent, VIVALDI + "/")) return VIVALDI;
  else if (includes(user_agent, "YaBrowser/")) return YANDEX;
  else if (includes(user_agent, WHALE + "/")) return WHALE;
  else if (includes(user_agent, DUCKDUCKGO + "/") || includes(user_agent, "Ddg/")) return DUCKDUCKGO;
  else if (includes(user_agent, "FBIOS")) return FACEBOOK + " " + MOBILE;
  else if (includes(user_agent, "UCWEB") || includes(user_agent, "UCBrowser")) return "UC Browser";
  else if (includes(user_agent, "CriOS")) return CHROME_IOS;
  else if (includes(user_agent, "CrMo")) return CHROME;
  else if (includes(user_agent, CHROME)) return CHROME;
  else if (includes(user_agent, ANDROID) && includes(user_agent, SAFARI)) return ANDROID_MOBILE;
  else if (includes(user_agent, "FxiOS")) return FIREFOX_IOS;
  else if (includes(user_agent.toLowerCase(), KONQUEROR.toLowerCase())) return KONQUEROR;
  else if (includes(user_agent, BRAVE + "/")) return BRAVE;
  else if (safariCheck(user_agent, vendor)) return includes(user_agent, MOBILE) ? MOBILE_SAFARI : SAFARI;
  else if (includes(user_agent, "PaleMoon/")) return PALE_MOON;
  else if (includes(user_agent, WATERFOX + "/")) return WATERFOX;
  else if (includes(user_agent, FIREFOX)) return FIREFOX;
  else if (includes(user_agent, "MSIE") || includes(user_agent, "Trident/")) return INTERNET_EXPLORER;
  else if (includes(user_agent, "Gecko")) return FIREFOX;
  return "";
};
var versionRegexes = {
  [INTERNET_EXPLORER_MOBILE]: [
    new RegExp("rv:" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [MICROSOFT_EDGE]: [
    new RegExp(EDGE + "?\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [CHROME]: [
    new RegExp("(" + CHROME + "|CrMo)\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [CHROME_IOS]: [
    new RegExp("CriOS\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  "UC Browser": [
    new RegExp("(UCBrowser|UCWEB)\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [SAFARI]: [
    DEFAULT_BROWSER_VERSION_REGEX
  ],
  [MOBILE_SAFARI]: [
    DEFAULT_BROWSER_VERSION_REGEX
  ],
  [OPERA]: [
    new RegExp("(" + OPERA + "|OPR)\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [FIREFOX]: [
    new RegExp(FIREFOX + "\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [FIREFOX_IOS]: [
    new RegExp("FxiOS\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [KONQUEROR]: [
    new RegExp("Konqueror[:/]?" + BROWSER_VERSION_REGEX_SUFFIX, "i")
  ],
  [BLACKBERRY]: [
    new RegExp(BLACKBERRY + " " + BROWSER_VERSION_REGEX_SUFFIX),
    DEFAULT_BROWSER_VERSION_REGEX
  ],
  [ANDROID_MOBILE]: [
    new RegExp("android\\s" + BROWSER_VERSION_REGEX_SUFFIX, "i")
  ],
  [SAMSUNG_INTERNET]: [
    new RegExp(SAMSUNG_BROWSER + "\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [OCULUS_BROWSER]: [
    new RegExp("OculusBrowser\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [VIVALDI]: [
    new RegExp(VIVALDI + "\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [YANDEX]: [
    new RegExp("YaBrowser\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [WHALE]: [
    new RegExp(WHALE + "\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [BRAVE]: [
    new RegExp(BRAVE + "\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [DUCKDUCKGO]: [
    new RegExp("(DuckDuckGo|Ddg)\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [PALE_MOON]: [
    new RegExp("PaleMoon\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [WATERFOX]: [
    new RegExp(WATERFOX + "\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [GOOGLE_SEARCH_APP]: [
    new RegExp("GSA\\/" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  [INTERNET_EXPLORER]: [
    new RegExp("(rv:|MSIE )" + BROWSER_VERSION_REGEX_SUFFIX)
  ],
  Mozilla: [
    new RegExp("rv:" + BROWSER_VERSION_REGEX_SUFFIX)
  ]
};
var detectBrowserVersion = function(userAgent2, vendor, hints, options) {
  const browser = detectBrowser(userAgent2, vendor, hints, options);
  const regexes = versionRegexes[browser];
  if (isUndefined(regexes)) return null;
  for (let i = 0; i < regexes.length; i++) {
    const regex = regexes[i];
    const matches = userAgent2.match(regex);
    if (matches) return parseFloat(matches[matches.length - 2]);
  }
  return null;
};
var osMatchers = [
  [
    new RegExp(XBOX + "; " + XBOX + " (.*?)[);]", "i"),
    (match) => [
      XBOX,
      match && match[1] || ""
    ]
  ],
  [
    new RegExp(NINTENDO, "i"),
    [
      NINTENDO,
      ""
    ]
  ],
  [
    new RegExp(PLAYSTATION, "i"),
    [
      PLAYSTATION,
      ""
    ]
  ],
  [
    BLACKBERRY_REGEX,
    [
      BLACKBERRY,
      ""
    ]
  ],
  [
    new RegExp(WINDOWS, "i"),
    (_, user_agent) => {
      if (/Phone/.test(user_agent) || /WPDesktop/.test(user_agent)) return [
        WINDOWS_PHONE,
        ""
      ];
      if (new RegExp(MOBILE).test(user_agent) && !/IEMobile\b/.test(user_agent)) return [
        WINDOWS + " " + MOBILE,
        ""
      ];
      const match = /Windows NT ([0-9.]+)/i.exec(user_agent);
      if (match && match[1]) {
        const version = match[1];
        let osVersion = windowsVersionMap[version] || "";
        if (/arm/i.test(user_agent)) osVersion = "RT";
        return [
          WINDOWS,
          osVersion
        ];
      }
      return [
        WINDOWS,
        ""
      ];
    }
  ],
  [
    /((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/,
    (match) => {
      if (match && match[3]) {
        const versionParts = [
          match[3],
          match[4],
          match[5] || "0"
        ];
        return [
          IOS,
          versionParts.join(".")
        ];
      }
      return [
        IOS,
        ""
      ];
    }
  ],
  [
    /(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i,
    (match) => {
      let version = "";
      if (match && match.length >= 3) version = isUndefined(match[2]) ? match[3] : match[2];
      return [
        "watchOS",
        version
      ];
    }
  ],
  [
    new RegExp("(" + ANDROID + " (\\d+)\\.(\\d+)\\.?(\\d+)?|" + ANDROID + ")", "i"),
    (match) => {
      if (match && match[2]) {
        const versionParts = [
          match[2],
          match[3],
          match[4] || "0"
        ];
        return [
          ANDROID,
          versionParts.join(".")
        ];
      }
      return [
        ANDROID,
        ""
      ];
    }
  ],
  [
    /Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i,
    (match) => {
      const result = [
        "Mac OS X",
        ""
      ];
      if (match && match[1]) {
        const versionParts = [
          match[1],
          match[2],
          match[3] || "0"
        ];
        result[1] = versionParts.join(".");
      }
      return result;
    }
  ],
  [
    /Mac/i,
    [
      "Mac OS X",
      ""
    ]
  ],
  [
    /CrOS/,
    [
      CHROME_OS,
      ""
    ]
  ],
  [
    /Linux|debian/i,
    [
      "Linux",
      ""
    ]
  ]
];
var detectOS = function(user_agent) {
  for (let i = 0; i < osMatchers.length; i++) {
    const [rgex, resultOrFn] = osMatchers[i];
    const match = rgex.exec(user_agent);
    const result = match && (isFunction(resultOrFn) ? resultOrFn(match, user_agent) : resultOrFn);
    if (result) return result;
  }
  return [
    "",
    ""
  ];
};
var detectDevice = function(user_agent) {
  if (NINTENDO_REGEX.test(user_agent)) return NINTENDO;
  if (PLAYSTATION_REGEX.test(user_agent)) return PLAYSTATION;
  if (XBOX_REGEX.test(user_agent)) return XBOX;
  if (new RegExp(OUYA, "i").test(user_agent)) return OUYA;
  if (new RegExp("(" + WINDOWS_PHONE + "|WPDesktop)", "i").test(user_agent)) return WINDOWS_PHONE;
  else if (/iPad/.test(user_agent)) return IPAD;
  else if (/iPod/.test(user_agent)) return "iPod Touch";
  else if (/iPhone/.test(user_agent)) return "iPhone";
  else if (/(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(user_agent)) return APPLE_WATCH;
  else if (BLACKBERRY_REGEX.test(user_agent)) return BLACKBERRY;
  else if (/(kobo)\s(ereader|touch)/i.test(user_agent)) return "Kobo";
  else if (new RegExp(NOKIA, "i").test(user_agent)) return NOKIA;
  else if (/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(user_agent) || /(kf[a-z]+)( bui|\)).+silk\//i.test(user_agent)) return "Kindle Fire";
  else if (/(Android|ZTE)/i.test(user_agent)) if (!(!new RegExp(MOBILE).test(user_agent) || /(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(user_agent))) return ANDROID;
  else {
    if (/pixel[\daxl ]{1,6}/i.test(user_agent) && !/pixel c/i.test(user_agent) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(user_agent) || /lmy47v/i.test(user_agent) && !/QTAQZ3/i.test(user_agent)) return ANDROID;
    return ANDROID_TABLET;
  }
  else if (new RegExp("(pda|" + MOBILE + ")", "i").test(user_agent)) return GENERIC_MOBILE;
  else if (new RegExp(TABLET, "i").test(user_agent) && !new RegExp(TABLET + " pc", "i").test(user_agent)) return GENERIC_TABLET;
  else return "";
};
var detectDeviceType = function(user_agent, options) {
  const device = detectDevice(user_agent);
  if (device === IPAD || device === ANDROID_TABLET || "Kobo" === device || "Kindle Fire" === device || device === GENERIC_TABLET) return TABLET;
  if (device === NINTENDO || device === XBOX || device === PLAYSTATION || device === OUYA) return "Console";
  if (device === APPLE_WATCH) return "Wearable";
  if (device) return MOBILE;
  if (options?.userAgentDataPlatform === "Android" && (options?.maxTouchPoints ?? 0) > 0) {
    const shortSide = Math.min(options?.screenWidth ?? 0, options?.screenHeight ?? 0);
    const shortSideDp = shortSide / (options?.devicePixelRatio ?? 1);
    return shortSideDp >= 600 ? TABLET : MOBILE;
  }
  return "Desktop";
};

// ../core/dist/utils/index.mjs
var UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isValidUUID(value) {
  return "string" == typeof value && UUID_REGEX.test(value);
}
function getEventUuid(uuid, generateUuid) {
  return isValidUUID(uuid) ? uuid : generateUuid();
}
function stripUrlHash(url) {
  if (!url) return url;
  return url.split("#")[0];
}
var isError = (x) => x instanceof Error;

// ../core/dist/logs/logs-utils.mjs
var OTLP_SEVERITY_MAP = {
  trace: {
    text: "TRACE",
    number: 1
  },
  debug: {
    text: "DEBUG",
    number: 5
  },
  info: {
    text: "INFO",
    number: 9
  },
  warn: {
    text: "WARN",
    number: 13
  },
  error: {
    text: "ERROR",
    number: 17
  },
  fatal: {
    text: "FATAL",
    number: 21
  }
};
var DEFAULT_OTLP_SEVERITY = OTLP_SEVERITY_MAP.info;

// ../core/dist/error-tracking/index.mjs
var error_tracking_exports = {};
__export(error_tracking_exports, {
  DEFAULT_EXCEPTION_STEPS_CONFIG: () => DEFAULT_EXCEPTION_STEPS_CONFIG,
  DOMExceptionCoercer: () => DOMExceptionCoercer,
  EXCEPTION_STEP_INTERNAL_FIELDS: () => EXCEPTION_STEP_INTERNAL_FIELDS,
  ErrorCoercer: () => ErrorCoercer,
  ErrorEventCoercer: () => ErrorEventCoercer,
  ErrorPropertiesBuilder: () => ErrorPropertiesBuilder,
  EventCoercer: () => EventCoercer,
  ExceptionStepsBuffer: () => ExceptionStepsBuffer,
  ObjectCoercer: () => ObjectCoercer,
  PrimitiveCoercer: () => PrimitiveCoercer,
  PromiseRejectionEventCoercer: () => PromiseRejectionEventCoercer,
  ReduceableCache: () => ReduceableCache,
  StringCoercer: () => StringCoercer,
  chromeStackLineParser: () => chromeStackLineParser,
  createDefaultStackParser: () => createDefaultStackParser,
  createStackParser: () => createStackParser,
  geckoStackLineParser: () => geckoStackLineParser,
  getInjectedReleaseId: () => getInjectedReleaseId,
  getUtf8ByteLength: () => getUtf8ByteLength,
  nodeStackLineParser: () => nodeStackLineParser,
  opera10StackLineParser: () => opera10StackLineParser,
  opera11StackLineParser: () => opera11StackLineParser,
  resolveExceptionStepsConfig: () => resolveExceptionStepsConfig,
  reverseAndStripFrames: () => reverseAndStripFrames,
  stripReservedExceptionStepFields: () => stripReservedExceptionStepFields,
  winjsStackLineParser: () => winjsStackLineParser
});

// ../core/dist/error-tracking/chunk-ids.mjs
var parsedStackResults;
var lastKeysCount;
var cachedFilenameChunkIds;
function getFilenameToChunkIdMap(stackParser) {
  const chunkIdMap = globalThis._posthogChunkIds;
  if (!chunkIdMap) return;
  const chunkIdKeys = Object.keys(chunkIdMap);
  if (cachedFilenameChunkIds && chunkIdKeys.length === lastKeysCount) return cachedFilenameChunkIds;
  lastKeysCount = chunkIdKeys.length;
  cachedFilenameChunkIds = chunkIdKeys.reduce((acc, stackKey) => {
    if (!parsedStackResults) parsedStackResults = {};
    const result = parsedStackResults[stackKey];
    if (result) acc[result[0]] = result[1];
    else {
      const parsedStack = stackParser(stackKey);
      for (let i = parsedStack.length - 1; i >= 0; i--) {
        const stackFrame = parsedStack[i];
        const filename = stackFrame?.filename;
        const chunkId = chunkIdMap[stackKey];
        if (filename && chunkId) {
          acc[filename] = chunkId;
          parsedStackResults[stackKey] = [
            filename,
            chunkId
          ];
          break;
        }
      }
    }
    return acc;
  }, {});
  return cachedFilenameChunkIds;
}

// ../core/dist/error-tracking/error-properties-builder.mjs
var MAX_CAUSE_RECURSION = 4;
var ErrorPropertiesBuilder = class {
  constructor(coercers, stackParser, modifiers = []) {
    this.coercers = coercers;
    this.stackParser = stackParser;
    this.modifiers = modifiers;
  }
  buildFromUnknown(input, hint = {}) {
    const providedMechanism = hint && hint.mechanism;
    const mechanism = providedMechanism || {
      handled: true,
      type: "generic"
    };
    const coercingContext = this.buildCoercingContext(mechanism, hint, 0);
    const exceptionWithCause = coercingContext.apply(input);
    const parsingContext = this.buildParsingContext(hint);
    const exceptionWithStack = this.parseStacktrace(exceptionWithCause, parsingContext);
    const exceptionList = this.convertToExceptionList(exceptionWithStack, mechanism);
    return {
      $exception_list: exceptionList,
      $exception_level: "error"
    };
  }
  async modifyFrames(exceptionList) {
    for (const exc of exceptionList) if (exc.stacktrace && exc.stacktrace.frames && isArray(exc.stacktrace.frames)) exc.stacktrace.frames = await this.applyModifiers(exc.stacktrace.frames);
    return exceptionList;
  }
  coerceFallback(ctx) {
    return {
      type: "Error",
      value: "Unknown error",
      stack: ctx.syntheticException?.stack,
      synthetic: true
    };
  }
  parseStacktrace(err, ctx) {
    let cause;
    if (null != err.cause) cause = this.parseStacktrace(err.cause, ctx);
    let stack;
    if ("" != err.stack && null != err.stack) stack = this.applyChunkIds(this.stackParser(err.stack, err.synthetic ? ctx.skipFirstLines : 0), ctx.chunkIdMap);
    return {
      ...err,
      cause,
      stack
    };
  }
  applyChunkIds(frames, chunkIdMap) {
    return frames.map((frame) => {
      if (frame.filename && chunkIdMap) frame.chunk_id = chunkIdMap[frame.filename];
      return frame;
    });
  }
  applyCoercers(input, ctx) {
    for (const adapter of this.coercers) if (adapter.match(input)) return adapter.coerce(input, ctx);
    return this.coerceFallback(ctx);
  }
  async applyModifiers(frames) {
    let newFrames = frames;
    for (const modifier of this.modifiers) newFrames = await modifier(newFrames);
    return newFrames;
  }
  convertToExceptionList(exceptionWithStack, mechanism) {
    const currentException = {
      type: exceptionWithStack.type,
      value: exceptionWithStack.value,
      mechanism: {
        type: mechanism.type ?? "generic",
        handled: mechanism.handled ?? true,
        synthetic: exceptionWithStack.synthetic ?? false
      }
    };
    if (exceptionWithStack.stack) currentException.stacktrace = {
      type: "raw",
      frames: exceptionWithStack.stack
    };
    const exceptionList = [
      currentException
    ];
    if (null != exceptionWithStack.cause) exceptionList.push(...this.convertToExceptionList(exceptionWithStack.cause, {
      ...mechanism,
      handled: true
    }));
    return exceptionList;
  }
  buildParsingContext(hint) {
    const context = {
      chunkIdMap: getFilenameToChunkIdMap(this.stackParser),
      skipFirstLines: hint.skipFirstLines ?? 1
    };
    return context;
  }
  buildCoercingContext(mechanism, hint, depth = 0) {
    const coerce = (input, depth2) => {
      if (!(depth2 <= MAX_CAUSE_RECURSION)) return;
      {
        const ctx = this.buildCoercingContext(mechanism, hint, depth2);
        return this.applyCoercers(input, ctx);
      }
    };
    const context = {
      ...hint,
      syntheticException: 0 == depth ? hint.syntheticException : void 0,
      mechanism,
      apply: (input) => coerce(input, depth),
      next: (input) => coerce(input, depth + 1)
    };
    return context;
  }
};

// ../core/dist/error-tracking/parsers/base.mjs
var UNKNOWN_FUNCTION = "?";
function createFrame(platform, filename, func, lineno, colno) {
  const frame = {
    platform,
    filename,
    function: "<anonymous>" === func ? UNKNOWN_FUNCTION : func,
    in_app: true
  };
  if (!isUndefined(lineno)) frame.lineno = lineno;
  if (!isUndefined(colno)) frame.colno = colno;
  return frame;
}

// ../core/dist/error-tracking/parsers/safari.mjs
var extractSafariExtensionDetails = (func, filename) => {
  const isSafariExtension = -1 !== func.indexOf("safari-extension");
  const isSafariWebExtension = -1 !== func.indexOf("safari-web-extension");
  return isSafariExtension || isSafariWebExtension ? [
    -1 !== func.indexOf("@") ? func.split("@")[0] : UNKNOWN_FUNCTION,
    isSafariExtension ? `safari-extension:${filename}` : `safari-web-extension:${filename}`
  ] : [
    func,
    filename
  ];
};

// ../core/dist/error-tracking/parsers/chrome.mjs
var chromeRegexNoFnName = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;
var chromeRegex = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;
var chromeStackLineParser = (line, platform) => {
  const noFnParts = chromeRegexNoFnName.exec(line);
  if (noFnParts) {
    const [, filename, line2, col] = noFnParts;
    return createFrame(platform, filename, UNKNOWN_FUNCTION, +line2, +col);
  }
  const parts = chromeRegex.exec(line);
  if (parts) {
    const isEval = parts[2] && 0 === parts[2].indexOf("eval");
    if (isEval) {
      const subMatch = chromeEvalRegex.exec(parts[2]);
      if (subMatch) {
        parts[2] = subMatch[1];
        parts[3] = subMatch[2];
        parts[4] = subMatch[3];
      }
    }
    const [func, filename] = extractSafariExtensionDetails(parts[1] || UNKNOWN_FUNCTION, parts[2]);
    return createFrame(platform, filename, func, parts[3] ? +parts[3] : void 0, parts[4] ? +parts[4] : void 0);
  }
};

// ../core/dist/error-tracking/parsers/gecko.mjs
var geckoREgex = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
var geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
var geckoStackLineParser = (line, platform) => {
  const parts = geckoREgex.exec(line);
  if (parts) {
    const isEval = parts[3] && parts[3].indexOf(" > eval") > -1;
    if (isEval) {
      const subMatch = geckoEvalRegex.exec(parts[3]);
      if (subMatch) {
        parts[1] = parts[1] || "eval";
        parts[3] = subMatch[1];
        parts[4] = subMatch[2];
        parts[5] = "";
      }
    }
    let filename = parts[3];
    let func = parts[1] || UNKNOWN_FUNCTION;
    [func, filename] = extractSafariExtensionDetails(func, filename);
    return createFrame(platform, filename, func, parts[4] ? +parts[4] : void 0, parts[5] ? +parts[5] : void 0);
  }
};

// ../core/dist/error-tracking/parsers/winjs.mjs
var winjsRegex = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:[-a-z]+):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
var winjsStackLineParser = (line, platform) => {
  const parts = winjsRegex.exec(line);
  return parts ? createFrame(platform, parts[2], parts[1] || UNKNOWN_FUNCTION, +parts[3], parts[4] ? +parts[4] : void 0) : void 0;
};

// ../core/dist/error-tracking/parsers/opera.mjs
var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
var opera10StackLineParser = (line, platform) => {
  const parts = opera10Regex.exec(line);
  return parts ? createFrame(platform, parts[2], parts[3] || UNKNOWN_FUNCTION, +parts[1]) : void 0;
};
var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i;
var opera11StackLineParser = (line, platform) => {
  const parts = opera11Regex.exec(line);
  return parts ? createFrame(platform, parts[5], parts[3] || parts[4] || UNKNOWN_FUNCTION, +parts[1], +parts[2]) : void 0;
};

// ../core/dist/error-tracking/parsers/node.mjs
var FILENAME_MATCH = /^\s*[-]{4,}$/;
var FULL_MATCH = /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;
var PROMISE_COMBINATOR = /^Promise\.(?:all|any)$/;
var PROMISE_INDEX = /^index \d+$/;
var PROMISE_FRAME_FILENAME = "node:internal/promise";
var nodeStackLineParser = (line, platform) => {
  const lineMatch = line.match(FULL_MATCH);
  if (lineMatch) {
    let object;
    let method;
    let functionName;
    let typeName;
    let methodName;
    if (lineMatch[1]) {
      functionName = lineMatch[1];
      let methodStart = functionName.lastIndexOf(".");
      if ("." === functionName[methodStart - 1]) methodStart--;
      if (methodStart > 0) {
        object = functionName.slice(0, methodStart);
        method = functionName.slice(methodStart + 1);
        const objectEnd = object.indexOf(".Module");
        if (objectEnd > 0) {
          functionName = functionName.slice(objectEnd + 1);
          object = object.slice(0, objectEnd);
        }
      }
      typeName = void 0;
    }
    if (method) {
      typeName = object;
      methodName = method;
    }
    if ("<anonymous>" === method) {
      methodName = void 0;
      functionName = void 0;
    }
    if (void 0 === functionName) {
      methodName = methodName || UNKNOWN_FUNCTION;
      functionName = typeName ? `${typeName}.${methodName}` : methodName;
    }
    let filename = lineMatch[2]?.startsWith("file://") ? lineMatch[2].slice(7) : lineMatch[2];
    const isNative = "native" === lineMatch[5];
    if (filename?.match(/\/[A-Z]:/)) filename = filename.slice(1);
    if (!filename && lineMatch[5] && !isNative) filename = lineMatch[5];
    if (PROMISE_COMBINATOR.test(functionName) && PROMISE_INDEX.test(filename || "")) filename = PROMISE_FRAME_FILENAME;
    return {
      filename: filename ? decodeURI(filename) : void 0,
      module: void 0,
      function: functionName,
      lineno: _parseIntOrUndefined(lineMatch[3]),
      colno: _parseIntOrUndefined(lineMatch[4]),
      in_app: filenameIsInApp(filename || "", isNative),
      platform
    };
  }
  if (line.match(FILENAME_MATCH)) return {
    filename: line,
    platform
  };
};
function filenameIsInApp(filename, isNative = false) {
  const isInternal = isNative || filename && !filename.startsWith("/") && !filename.match(/^[A-Z]:/) && !filename.startsWith(".") && !filename.match(/^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//);
  return !isInternal && void 0 !== filename && !filename.includes("node_modules/");
}
function _parseIntOrUndefined(input) {
  return parseInt(input || "", 10) || void 0;
}

// ../core/dist/error-tracking/parsers/index.mjs
var WEBPACK_ERROR_REGEXP = /\(error: (.*)\)/;
var STACKTRACE_FRAME_LIMIT = 50;
function reverseAndStripFrames(stack) {
  if (!stack.length) return [];
  const localStack = Array.from(stack);
  localStack.reverse();
  return localStack.slice(0, STACKTRACE_FRAME_LIMIT).map((frame) => ({
    ...frame,
    filename: frame.filename || getLastStackFrame(localStack).filename,
    function: frame.function || UNKNOWN_FUNCTION
  }));
}
function getLastStackFrame(arr) {
  return arr[arr.length - 1] || {};
}
function createDefaultStackParser() {
  return createStackParser("web:javascript", chromeStackLineParser, geckoStackLineParser);
}
function createStackParser(platform, ...parsers) {
  return (stack, skipFirstLines = 0) => {
    const frames = [];
    const lines = stack.split("\n");
    for (let i = skipFirstLines; i < lines.length; i++) {
      const line = lines[i];
      if (line.length > 1024) continue;
      const cleanedLine = WEBPACK_ERROR_REGEXP.test(line) ? line.replace(WEBPACK_ERROR_REGEXP, "$1") : line;
      if (!cleanedLine.match(/\S*Error: /)) {
        for (const parser of parsers) {
          const frame = parser(cleanedLine, platform);
          if (frame) {
            frames.push(frame);
            break;
          }
        }
        if (frames.length >= STACKTRACE_FRAME_LIMIT) break;
      }
    }
    return reverseAndStripFrames(frames);
  };
}

// ../core/dist/error-tracking/coercers/dom-exception-coercer.mjs
var DOMExceptionCoercer = class {
  match(err) {
    return this.isDOMException(err) || this.isDOMError(err);
  }
  coerce(err, ctx) {
    const hasStack = isString(err.stack);
    return {
      type: this.getType(err),
      value: this.getValue(err),
      stack: hasStack ? err.stack : void 0,
      cause: err.cause ? ctx.next(err.cause) : void 0,
      synthetic: false
    };
  }
  getType(candidate) {
    return this.isDOMError(candidate) ? "DOMError" : "DOMException";
  }
  getValue(err) {
    const name = err.name || (this.isDOMError(err) ? "DOMError" : "DOMException");
    const message = err.message ? `${name}: ${err.message}` : name;
    return message;
  }
  isDOMException(err) {
    return isBuiltin(err, "DOMException");
  }
  isDOMError(err) {
    return isBuiltin(err, "DOMError");
  }
};

// ../core/dist/error-tracking/coercers/error-coercer.mjs
var ErrorCoercer = class {
  match(err) {
    return isPlainError(err);
  }
  coerce(err, ctx) {
    return {
      type: this.getType(err),
      value: this.getMessage(err, ctx),
      stack: this.getStack(err),
      cause: err.cause ? ctx.next(err.cause) : void 0,
      synthetic: false
    };
  }
  getType(err) {
    return err.name || err.constructor.name;
  }
  getMessage(err, _ctx) {
    const message = err.message;
    if (message.error && "string" == typeof message.error.message) return String(message.error.message);
    return String(message);
  }
  getStack(err) {
    return err.stacktrace || err.stack || void 0;
  }
};

// ../core/dist/error-tracking/coercers/error-event-coercer.mjs
var ErrorEventCoercer = class {
  constructor() {
  }
  match(err) {
    return isErrorEvent(err) && void 0 != err.error;
  }
  coerce(err, ctx) {
    const exceptionLike = ctx.apply(err.error);
    if (!exceptionLike) return {
      type: "ErrorEvent",
      value: err.message,
      stack: ctx.syntheticException?.stack,
      synthetic: true
    };
    return exceptionLike;
  }
};

// ../core/dist/error-tracking/coercers/string-coercer.mjs
var ERROR_TYPES_PATTERN = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
var StringCoercer = class {
  match(input) {
    return "string" == typeof input;
  }
  coerce(input, ctx) {
    const [type, value] = this.getInfos(input);
    return {
      type: type ?? "Error",
      value: value ?? input,
      stack: ctx.syntheticException?.stack,
      synthetic: true
    };
  }
  getInfos(candidate) {
    let type = "Error";
    let value = candidate;
    const groups = candidate.match(ERROR_TYPES_PATTERN);
    if (groups) {
      type = groups[1];
      value = groups[2];
    }
    return [
      type,
      value
    ];
  }
};

// ../core/dist/error-tracking/types.mjs
var severityLevels = [
  "fatal",
  "error",
  "warning",
  "log",
  "info",
  "debug"
];

// ../core/dist/error-tracking/coercers/utils.mjs
function extractExceptionKeysForMessage(err, maxLength = 40) {
  const keys = Object.keys(err);
  keys.sort();
  if (!keys.length) return "[object has no keys]";
  for (let i = keys.length; i > 0; i--) {
    const serialized = keys.slice(0, i).join(", ");
    if (!(serialized.length > maxLength)) {
      if (i === keys.length) return serialized;
      return serialized.length <= maxLength ? serialized : `${serialized.slice(0, maxLength)}...`;
    }
  }
  return "";
}

// ../core/dist/error-tracking/coercers/object-coercer.mjs
var ObjectCoercer = class {
  match(candidate) {
    return "object" == typeof candidate && null !== candidate;
  }
  coerce(candidate, ctx) {
    const errorProperty = this.getErrorPropertyFromObject(candidate);
    if (errorProperty) return ctx.apply(errorProperty);
    return {
      type: this.getType(candidate),
      value: this.getValue(candidate),
      stack: ctx.syntheticException?.stack,
      level: this.isSeverityLevel(candidate.level) ? candidate.level : "error",
      synthetic: true
    };
  }
  getType(err) {
    return isEvent(err) ? err.constructor.name : "Error";
  }
  getValue(err) {
    if ("name" in err && "string" == typeof err.name) {
      let message = `'${err.name}' captured as exception`;
      if ("message" in err && "string" == typeof err.message) message += ` with message: '${err.message}'`;
      return message;
    }
    if ("message" in err && "string" == typeof err.message) return err.message;
    const className = this.getObjectClassName(err);
    const keys = extractExceptionKeysForMessage(err);
    return `${className && "Object" !== className ? `'${className}'` : "Object"} captured as exception with keys: ${keys}`;
  }
  isSeverityLevel(x) {
    return isString(x) && !isEmptyString(x) && severityLevels.indexOf(x) >= 0;
  }
  getErrorPropertyFromObject(obj) {
    for (const prop in obj) if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      const value = obj[prop];
      if (isError(value)) return value;
    }
  }
  getObjectClassName(obj) {
    try {
      const prototype = Object.getPrototypeOf(obj);
      return prototype ? prototype.constructor.name : void 0;
    } catch (e) {
      return;
    }
  }
};

// ../core/dist/error-tracking/coercers/event-coercer.mjs
var EventCoercer = class {
  match(err) {
    return isEvent(err);
  }
  coerce(evt, ctx) {
    const constructorName = evt.constructor.name;
    return {
      type: constructorName,
      value: `${constructorName} captured as exception with keys: ${extractExceptionKeysForMessage(evt)}`,
      stack: ctx.syntheticException?.stack,
      synthetic: true
    };
  }
};

// ../core/dist/error-tracking/coercers/primitive-coercer.mjs
var PrimitiveCoercer = class {
  match(candidate) {
    return isPrimitive(candidate);
  }
  coerce(value, ctx) {
    return {
      type: "Error",
      value: `Primitive value captured as exception: ${String(value)}`,
      stack: ctx.syntheticException?.stack,
      synthetic: true
    };
  }
};

// ../core/dist/error-tracking/coercers/promise-rejection-event.mjs
var PromiseRejectionEventCoercer = class {
  match(err) {
    return isBuiltin(err, "PromiseRejectionEvent") || this.isCustomEventWrappingRejection(err);
  }
  isCustomEventWrappingRejection(err) {
    if (!isEvent(err)) return false;
    try {
      const detail = err.detail;
      return null != detail && "object" == typeof detail && "reason" in detail;
    } catch {
      return false;
    }
  }
  coerce(err, ctx) {
    const reason = this.getUnhandledRejectionReason(err);
    if (isPrimitive(reason)) return {
      type: "UnhandledRejection",
      value: `Non-Error promise rejection captured with value: ${String(reason)}`,
      stack: ctx.syntheticException?.stack,
      synthetic: true
    };
    return ctx.apply(reason);
  }
  getUnhandledRejectionReason(error) {
    try {
      if ("reason" in error) return error.reason;
      if ("detail" in error && null != error.detail && "object" == typeof error.detail && "reason" in error.detail) return error.detail.reason;
    } catch {
    }
    return error;
  }
};

// ../core/dist/error-tracking/utils.mjs
var ReduceableCache = class {
  constructor(_maxSize) {
    this._maxSize = _maxSize;
    this._cache = /* @__PURE__ */ new Map();
  }
  get(key) {
    const value = this._cache.get(key);
    if (void 0 === value) return;
    this._cache.delete(key);
    this._cache.set(key, value);
    return value;
  }
  set(key, value) {
    this._cache.set(key, value);
  }
  reduce() {
    while (this._cache.size >= this._maxSize) {
      const value = this._cache.keys().next().value;
      if (value) this._cache.delete(value);
    }
  }
};

// ../core/dist/error-tracking/exception-steps.mjs
var EXCEPTION_STEP_INTERNAL_FIELDS = {
  MESSAGE: "$message",
  TIMESTAMP: "$timestamp"
};
var RESERVED_EXCEPTION_STEP_KEYS = /* @__PURE__ */ new Set([
  EXCEPTION_STEP_INTERNAL_FIELDS.MESSAGE,
  EXCEPTION_STEP_INTERNAL_FIELDS.TIMESTAMP
]);
var DEFAULT_EXCEPTION_STEPS_CONFIG = {
  enabled: true,
  max_bytes: 32768
};
function resolveExceptionStepsConfig(config2) {
  if (!config2) return {
    ...DEFAULT_EXCEPTION_STEPS_CONFIG
  };
  return {
    enabled: config2.enabled ?? DEFAULT_EXCEPTION_STEPS_CONFIG.enabled,
    max_bytes: normalizePositiveInteger(config2.max_bytes, DEFAULT_EXCEPTION_STEPS_CONFIG.max_bytes)
  };
}
function stripReservedExceptionStepFields(properties) {
  if (!properties) return {
    sanitizedProperties: {},
    droppedKeys: []
  };
  const droppedKeys = [];
  const sanitizedProperties = Object.keys(properties).reduce((acc, key) => {
    if (RESERVED_EXCEPTION_STEP_KEYS.has(key)) {
      droppedKeys.push(key);
      return acc;
    }
    acc[key] = properties[key];
    return acc;
  }, {});
  return {
    sanitizedProperties,
    droppedKeys
  };
}
var ExceptionStepsBuffer = class {
  constructor(config2) {
    this._entries = [];
    this._totalBytes = 0;
    this._config = resolveExceptionStepsConfig(config2);
  }
  setConfig(config2) {
    this._config = resolveExceptionStepsConfig(config2);
    this._trimToMaxBytes();
  }
  add(step) {
    const serialized = normalizeAndSerializeStep(step);
    if (!serialized) return;
    const bytes = getUtf8ByteLength(serialized.json);
    if (bytes > this._config.max_bytes) return;
    this._entries.push({
      step: serialized.step,
      bytes
    });
    this._totalBytes += bytes;
    this._trimToMaxBytes();
  }
  getAttachable() {
    return this._entries.map((e) => e.step);
  }
  clear() {
    this._entries = [];
    this._totalBytes = 0;
  }
  size() {
    return this._entries.length;
  }
  _trimToMaxBytes() {
    while (this._totalBytes > this._config.max_bytes && this._entries.length > 0) {
      const evicted = this._entries.shift();
      if (evicted) this._totalBytes -= evicted.bytes;
    }
  }
};
function normalizePositiveInteger(input, fallback) {
  if (!isNumber(input) || input === 1 / 0 || input === -1 / 0) return fallback;
  const normalized = Math.floor(input);
  if (normalized < 0) return fallback;
  return normalized;
}
function normalizeAndSerializeStep(step) {
  let json;
  try {
    json = safeJsonStringify(step);
  } catch {
    return;
  }
  try {
    const parsed = JSON.parse(json);
    if (!isObject(parsed)) return;
    const parsedStep = parsed;
    const message = parsedStep[EXCEPTION_STEP_INTERNAL_FIELDS.MESSAGE];
    const timestamp = parsedStep[EXCEPTION_STEP_INTERNAL_FIELDS.TIMESTAMP];
    if (!isString(message) || 0 === message.trim().length) return;
    if (!isString(timestamp) && !isNumber(timestamp)) return;
    return {
      step: parsedStep,
      json
    };
  } catch {
    return;
  }
}
function getUtf8ByteLength(value) {
  if ("undefined" != typeof TextEncoder) return new TextEncoder().encode(value).length;
  const encoded = encodeURIComponent(value);
  let byteLength = 0;
  for (let i = 0; i < encoded.length; i++) if ("%" === encoded[i]) {
    byteLength += 1;
    i += 2;
  } else byteLength += 1;
  return byteLength;
}

// ../core/dist/error-tracking/release.mjs
function getInjectedReleaseId() {
  const injected = globalThis._posthogRelease;
  return "string" == typeof injected && injected.length > 0 ? injected : void 0;
}

// ../browser-common/dist/utils/logger.mjs
var _createLogger = (prefix, { debugEnabled } = {}) => {
  const logger8 = {
    _log: (level, ...args) => {
      if (win && (config.DEBUG || win.POSTHOG_DEBUG || debugEnabled) && !isUndefined(win.console) && win.console) {
        const consoleLog = "__rrweb_original__" in win.console[level] ? win.console[level]["__rrweb_original__"] : win.console[level];
        consoleLog(prefix, ...args);
      }
    },
    debug: (...args) => {
      logger8._log("debug", ...args);
    },
    info: (...args) => {
      logger8._log("log", ...args);
    },
    warn: (...args) => {
      logger8._log("warn", ...args);
    },
    error: (...args) => {
      logger8._log("error", ...args);
    },
    critical: (...args) => {
      console.error(prefix, ...args);
    },
    uninitializedWarning: (methodName) => {
      logger8.error(`You must initialize PostHog before calling ${methodName}`);
    },
    createLogger: (additionalPrefix, options) => _createLogger(`${prefix} ${additionalPrefix}`, options)
  };
  return logger8;
};
var logger_logger = _createLogger("[PostHog.js]");
var createLogger2 = logger_logger.createLogger;

// ../browser-common/dist/utils/general-utils.mjs
function find(value, predicate) {
  for (let i = 0; i < value.length; i++) if (predicate(value[i])) return value[i];
}
function eachArray(obj, iterator) {
  if (isArray(obj)) obj.forEach(iterator);
}
function each(obj, iterator) {
  if (isNullish(obj)) return;
  if (isArray(obj)) return void obj.forEach(iterator);
  if (isFormData(obj)) return void obj.forEach((val, key) => iterator(val, key));
  for (const key in obj) if (type_utils_hasOwnProperty.call(obj, key)) iterator(obj[key], key);
}
var extend = function(obj, ...args) {
  for (const source of args) for (const prop in source) if (void 0 !== source[prop]) obj[prop] = source[prop];
  return obj;
};
var safewrap = function(f) {
  return function(...args) {
    try {
      return f.apply(this, args);
    } catch (e) {
      logger_logger.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A.");
      logger_logger.critical(e);
    }
  };
};
var safewrapClass = function(klass, functions) {
  for (let i = 0; i < functions.length; i++) klass.prototype[functions[i]] = safewrap(klass.prototype[functions[i]]);
};
var stripEmptyProperties = function(p) {
  const ret = {};
  each(p, function(v, k) {
    if (isString(v) && v.length > 0 || isNumber(v)) ret[k] = v;
  });
  return ret;
};
function deepCircularCopy(value, customizer) {
  const COPY_IN_PROGRESS_SET = /* @__PURE__ */ new Set();
  function internalDeepCircularCopy(value2, key) {
    if (value2 !== Object(value2)) return customizer ? customizer(value2, key) : value2;
    if (COPY_IN_PROGRESS_SET.has(value2)) return;
    COPY_IN_PROGRESS_SET.add(value2);
    let result;
    if (isArray(value2)) {
      result = [];
      eachArray(value2, (it) => {
        result.push(internalDeepCircularCopy(it));
      });
    } else {
      const copy = {};
      each(value2, (val, key2) => {
        if (!COPY_IN_PROGRESS_SET.has(val)) copy[key2] = internalDeepCircularCopy(val, key2);
      });
      result = copy;
    }
    return result;
  }
  return internalDeepCircularCopy(value);
}
function _copyAndTruncateStrings(object, maxStringLength) {
  return deepCircularCopy(object, (value) => {
    if (isString(value)) return value.slice(0, maxStringLength);
    return value;
  });
}
var EXCLUDED_FROM_CROSS_SUBDOMAIN_COOKIE = [
  "herokuapp.com",
  "vercel.app",
  "netlify.app"
];
function isCrossDomainCookie(documentLocation) {
  const hostname = documentLocation?.hostname;
  if (!isString(hostname)) return false;
  const lastTwoParts = hostname.split(".").slice(-2).join(".");
  for (const excluded of EXCLUDED_FROM_CROSS_SUBDOMAIN_COOKIE) if (lastTwoParts === excluded) return false;
  return true;
}
function addEventListener(element, event, callback, options) {
  const { capture = false, passive = true } = options ?? {};
  element?.addEventListener(event, callback, {
    capture,
    passive
  });
}
function migrateConfigField(config2, newField, oldField, defaultValue, loggerInstance) {
  const hasNewField = newField in config2 && !isNullish(config2[newField]);
  const hasOldField = oldField in config2 && !isNullish(config2[oldField]);
  if (hasNewField) return config2[newField];
  if (hasOldField) {
    if (loggerInstance) loggerInstance.warn(`Config field '${oldField}' is deprecated. Please use '${newField}' instead. The old field will be removed in a future major version.`);
    return config2[oldField];
  }
  return defaultValue;
}

// ../browser-common/dist/utils/cookie-utils.mjs
var getCookieValue = (name) => {
  if (!globals_document) return;
  try {
    const nameEQ = name + "=";
    const cookies = globals_document.cookie.split(";").filter((cookie) => cookie.length);
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (" " == cookie.charAt(0)) cookie = cookie.substring(1, cookie.length);
      if (0 === cookie.indexOf(nameEQ)) return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  } catch {
  }
  return null;
};

// ../browser-common/dist/utils/uuidv7.mjs
if (!Math.trunc) Math.trunc = function(v) {
  return v < 0 ? Math.ceil(v) : Math.floor(v);
};
if (!Number.isInteger) Number.isInteger = function(value) {
  return isNumber(value) && isFinite(value) && Math.floor(value) === value;
};
var UUID = class _UUID {
  constructor(bytes) {
    this.bytes = bytes;
    if (16 !== bytes.length) throw new TypeError("not 128-bit length");
  }
  static fromFieldsV7(unixTsMs, randA, randBHi, randBLo) {
    if (!Number.isInteger(unixTsMs) || !Number.isInteger(randA) || !Number.isInteger(randBHi) || !Number.isInteger(randBLo) || unixTsMs < 0 || randA < 0 || randBHi < 0 || randBLo < 0 || unixTsMs > 281474976710655 || randA > 4095 || randBHi > 1073741823 || randBLo > 4294967295) throw new RangeError("invalid field value");
    const bytes = new Uint8Array(16);
    bytes[0] = unixTsMs / 2 ** 40;
    bytes[1] = unixTsMs / 2 ** 32;
    bytes[2] = unixTsMs / 2 ** 24;
    bytes[3] = unixTsMs / 2 ** 16;
    bytes[4] = unixTsMs / 256;
    bytes[5] = unixTsMs;
    bytes[6] = 112 | randA >>> 8;
    bytes[7] = randA;
    bytes[8] = 128 | randBHi >>> 24;
    bytes[9] = randBHi >>> 16;
    bytes[10] = randBHi >>> 8;
    bytes[11] = randBHi;
    bytes[12] = randBLo >>> 24;
    bytes[13] = randBLo >>> 16;
    bytes[14] = randBLo >>> 8;
    bytes[15] = randBLo;
    return new _UUID(bytes);
  }
  toString() {
    let text = "";
    for (let i = 0; i < this.bytes.length; i++) {
      text = text + (this.bytes[i] >>> 4).toString(16) + (15 & this.bytes[i]).toString(16);
      if (3 === i || 5 === i || 7 === i || 9 === i) text += "-";
    }
    if (36 !== text.length) throw new Error("Invalid UUIDv7 was generated");
    return text;
  }
  clone() {
    return new _UUID(this.bytes.slice(0));
  }
  equals(other) {
    return 0 === this.compareTo(other);
  }
  compareTo(other) {
    for (let i = 0; i < 16; i++) {
      const diff = this.bytes[i] - other.bytes[i];
      if (0 !== diff) return Math.sign(diff);
    }
    return 0;
  }
};
var V7Generator = class {
  generate() {
    const value = this.generateOrAbort();
    if (!isUndefined(value)) return value;
    {
      this._timestamp = 0;
      const valueAfterReset = this.generateOrAbort();
      if (isUndefined(valueAfterReset)) throw new Error("Could not generate UUID after timestamp reset");
      return valueAfterReset;
    }
  }
  generateOrAbort() {
    const MAX_COUNTER = 4398046511103;
    const ROLLBACK_ALLOWANCE = 1e4;
    const ts = Date.now();
    if (ts > this._timestamp) {
      this._timestamp = ts;
      this._resetCounter();
    } else {
      if (!(ts + ROLLBACK_ALLOWANCE > this._timestamp)) return;
      this._counter++;
      if (this._counter > MAX_COUNTER) {
        this._timestamp++;
        this._resetCounter();
      }
    }
    return UUID.fromFieldsV7(this._timestamp, Math.trunc(this._counter / 2 ** 30), this._counter & 2 ** 30 - 1, this._random.nextUint32());
  }
  _resetCounter() {
    this._counter = 1024 * this._random.nextUint32() + (1023 & this._random.nextUint32());
  }
  constructor() {
    this._timestamp = 0;
    this._counter = 0;
    this._random = new DefaultRandom();
  }
};
var getRandomValues = (buffer) => {
  if ("undefined" != typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG) throw new Error("no cryptographically strong RNG available");
  for (let i = 0; i < buffer.length; i++) buffer[i] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
  return buffer;
};
if (win && !isUndefined(win.crypto) && crypto.getRandomValues) getRandomValues = (buffer) => crypto.getRandomValues(buffer);
var DefaultRandom = class {
  nextUint32() {
    if (this._cursor >= this._buffer.length) {
      getRandomValues(this._buffer);
      this._cursor = 0;
    }
    return this._buffer[this._cursor++];
  }
  constructor() {
    this._buffer = new Uint32Array(8);
    this._cursor = 1 / 0;
  }
};
var defaultGenerator;
var uuidv72 = () => uuidv7obj().toString();
var uuidv7obj = () => (defaultGenerator || (defaultGenerator = new V7Generator())).generate();
var uuid7ToTimestampMs = (uuid) => {
  const hex = uuid.replace(/-/g, "");
  if (32 !== hex.length) throw new Error("Not a valid UUID");
  if ("7" !== hex[12]) throw new Error("Not a UUIDv7");
  return parseInt(hex.substring(0, 12), 16);
};

// src/storage.ts
var firstNonPublicSubDomain = "";
function seekFirstNonPublicSubDomain(hostname, cookieJar = globals_document) {
  if (firstNonPublicSubDomain) {
    return firstNonPublicSubDomain;
  }
  if (!cookieJar) {
    return "";
  }
  if (["localhost", "127.0.0.1"].includes(hostname)) return "";
  const list = hostname.split(".");
  let len = Math.min(list.length, 8);
  const key = "dmn_chk_" + uuidv72();
  while (!firstNonPublicSubDomain && len--) {
    const candidate = list.slice(len).join(".");
    const candidateCookieValue = key + "=1;domain=." + candidate + ";path=/";
    cookieJar.cookie = candidateCookieValue + ";max-age=3";
    if (cookieJar.cookie.includes(key)) {
      cookieJar.cookie = candidateCookieValue + ";max-age=0";
      firstNonPublicSubDomain = candidate;
    }
  }
  return firstNonPublicSubDomain;
}
var DOMAIN_MATCH_REGEX = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i;
var originalCookieDomainFn = (hostname) => {
  const matches = hostname.match(DOMAIN_MATCH_REGEX);
  return matches ? matches[0] : "";
};
function chooseCookieDomain(hostname, cross_subdomain) {
  if (cross_subdomain) {
    let matchedSubDomain = seekFirstNonPublicSubDomain(hostname);
    if (!matchedSubDomain) {
      const originalMatch = originalCookieDomainFn(hostname);
      if (originalMatch !== matchedSubDomain) {
        logger_logger.info("Warning: cookie subdomain discovery mismatch", originalMatch, matchedSubDomain);
      }
      matchedSubDomain = originalMatch;
    }
    return matchedSubDomain ? "; domain=." + matchedSubDomain : "";
  }
  return "";
}
var cookieStore = {
  _is_supported: () => !!globals_document,
  _error: function(msg) {
    logger_logger.error("cookieStore error: " + msg);
  },
  _get: getCookieValue,
  _parse: function(name) {
    let cookie;
    try {
      cookie = JSON.parse(cookieStore._get(name)) || {};
    } catch {
    }
    return cookie;
  },
  _set: function(name, value, days, cross_subdomain, is_secure) {
    if (!globals_document) {
      return false;
    }
    try {
      let expires = "", secure = "";
      const cdomain = chooseCookieDomain(globals_document.location.hostname, cross_subdomain);
      if (days) {
        const date = /* @__PURE__ */ new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
        expires = "; expires=" + date.toUTCString();
      }
      if (is_secure) {
        secure = "; secure";
      }
      const new_cookie_val = name + "=" + encodeURIComponent(JSON.stringify(value)) + expires + "; SameSite=Lax; path=/" + cdomain + secure;
      if (new_cookie_val.length > 4096 * 0.9) {
        logger_logger.warn("cookieStore warning: large cookie, len=" + new_cookie_val.length);
      }
      globals_document.cookie = new_cookie_val;
      return true;
    } catch {
      return false;
    }
  },
  _remove: function(name, cross_subdomain) {
    if (!globals_document?.cookie) {
      return;
    }
    try {
      cookieStore._set(name, "", -1, cross_subdomain);
    } catch {
      return;
    }
  }
};
var _localStorage_supported = null;
var localStore = {
  _is_supported: function() {
    if (!isNull(_localStorage_supported)) {
      return _localStorage_supported;
    }
    let supported = true;
    if (!isUndefined(win)) {
      try {
        const key = "__mplssupport__", val = "xyz";
        localStore._set(key, val);
        if (localStore._get(key) !== '"xyz"') {
          supported = false;
        }
        localStore._remove(key);
      } catch {
        supported = false;
      }
    } else {
      supported = false;
    }
    if (!supported) {
      logger_logger.error("localStorage unsupported; falling back to cookie store");
    }
    _localStorage_supported = supported;
    return supported;
  },
  _error: function(msg) {
    logger_logger.error("localStorage error: " + msg);
  },
  _get: function(name) {
    try {
      return win?.localStorage.getItem(name);
    } catch (err) {
      localStore._error(err);
    }
    return null;
  },
  _parse: function(name) {
    try {
      return JSON.parse(localStore._get(name)) || {};
    } catch {
    }
    return null;
  },
  _set: function(name, value) {
    try {
      win?.localStorage.setItem(name, JSON.stringify(value));
      return true;
    } catch (err) {
      localStore._error(err);
    }
    return false;
  },
  _remove: function(name) {
    try {
      win?.localStorage.removeItem(name);
    } catch (err) {
      localStore._error(err);
    }
  }
};
var COOKIE_PERSISTED_PROPERTIES = [
  DEVICE_ID,
  DISTINCT_ID,
  SESSION_ID,
  SESSION_RECORDING_IS_SAMPLED,
  ENABLE_PERSON_PROCESSING,
  INITIAL_PERSON_INFO,
  USER_STATE
];
var createLocalPlusCookieStore = (customCookieProperties = [], preferCookieOnConflict = false) => {
  const cookiePropertiesToPersist = [...COOKIE_PERSISTED_PROPERTIES, ...customCookieProperties];
  return {
    ...localStore,
    _parse: function(name) {
      try {
        let cookieProperties = {};
        try {
          cookieProperties = cookieStore._parse(name) || {};
        } catch {
        }
        const localStorageData = JSON.parse(localStore._get(name) || "{}");
        let value;
        if (preferCookieOnConflict) {
          const safeCookieProperties = {};
          for (const key in cookieProperties) {
            const v = cookieProperties[key];
            if (!isNull(v) && v !== "") {
              safeCookieProperties[key] = v;
            }
          }
          value = extend(localStorageData, safeCookieProperties);
        } else {
          value = extend(cookieProperties, localStorageData);
        }
        localStore._set(name, value);
        return value;
      } catch {
      }
      return null;
    },
    _set: function(name, value, days, cross_subdomain, is_secure, debug) {
      const stored = localStore._set(name, value, void 0, void 0, debug);
      try {
        const cookiePersistedProperties = {};
        cookiePropertiesToPersist.forEach((key) => {
          if (value[key]) {
            cookiePersistedProperties[key] = value[key];
          }
        });
        if (Object.keys(cookiePersistedProperties).length) {
          cookieStore._set(name, cookiePersistedProperties, days, cross_subdomain, is_secure, debug);
        }
      } catch (err) {
        localStore._error(err);
      }
      return stored;
    },
    _remove: function(name, cross_subdomain) {
      try {
        win?.localStorage.removeItem(name);
        cookieStore._remove(name, cross_subdomain);
      } catch (err) {
        localStore._error(err);
      }
    }
  };
};
var memoryStorage = {};
var memoryStore = {
  _is_supported: function() {
    return true;
  },
  _error: function(msg) {
    logger_logger.error("memoryStorage error: " + msg);
  },
  _get: function(name) {
    return memoryStorage[name] || null;
  },
  _parse: function(name) {
    return memoryStorage[name] || null;
  },
  _set: function(name, value) {
    memoryStorage[name] = value;
    return true;
  },
  _remove: function(name) {
    delete memoryStorage[name];
  }
};
var sessionStorageSupported = null;
var sessionStore = {
  _is_supported: function() {
    if (!isNull(sessionStorageSupported)) {
      return sessionStorageSupported;
    }
    sessionStorageSupported = true;
    if (!isUndefined(win)) {
      try {
        const key = "__support__", val = "xyz";
        sessionStore._set(key, val);
        if (sessionStore._get(key) !== '"xyz"') {
          sessionStorageSupported = false;
        }
        sessionStore._remove(key);
      } catch {
        sessionStorageSupported = false;
      }
    } else {
      sessionStorageSupported = false;
    }
    return sessionStorageSupported;
  },
  _error: function(msg) {
    logger_logger.error("sessionStorage error: ", msg);
  },
  _get: function(name) {
    try {
      return win?.sessionStorage.getItem(name);
    } catch (err) {
      sessionStore._error(err);
    }
    return null;
  },
  _parse: function(name) {
    try {
      return JSON.parse(sessionStore._get(name)) || null;
    } catch {
    }
    return null;
  },
  _set: function(name, value) {
    try {
      win?.sessionStorage.setItem(name, JSON.stringify(value));
      return true;
    } catch (err) {
      sessionStore._error(err);
    }
    return false;
  },
  _remove: function(name) {
    try {
      win?.sessionStorage.removeItem(name);
    } catch (err) {
      sessionStore._error(err);
    }
  }
};

// src/consent.ts
var OPT_OUT_PREFIX = "__ph_opt_in_out_";
var ConsentStatus = {
  PENDING: -1,
  DENIED: 0,
  GRANTED: 1
};
var ConsentManager = class {
  constructor(_instance) {
    this._instance = _instance;
  }
  get _config() {
    return this._instance.config;
  }
  get consent() {
    if (this._getDnt()) {
      return ConsentStatus.DENIED;
    }
    return this._storedConsent;
  }
  isOptedOut() {
    if (this._config.cookieless_mode === COOKIELESS_ALWAYS) {
      return true;
    }
    return this.isRejected() || this.consent === ConsentStatus.PENDING && this._config.cookieless_mode === COOKIELESS_ON_REJECT;
  }
  isOptedIn() {
    return !this.isOptedOut();
  }
  isExplicitlyOptedOut() {
    return this.consent === ConsentStatus.DENIED;
  }
  isRejected() {
    return this.consent === ConsentStatus.DENIED || this.consent === ConsentStatus.PENDING && this._config.opt_out_capturing_by_default;
  }
  optInOut(isOptedIn) {
    this._storage._set(
      this._storageKey,
      isOptedIn ? 1 : 0,
      this._config.cookie_expiration,
      this._config.cross_subdomain_cookie,
      this._config.secure_cookie
    );
  }
  reset() {
    this._storage._remove(this._storageKey, this._config.cross_subdomain_cookie);
  }
  get _storageKey() {
    const { token, opt_out_capturing_cookie_prefix, consent_persistence_name } = this._instance.config;
    if (consent_persistence_name) {
      return consent_persistence_name;
    } else if (opt_out_capturing_cookie_prefix) {
      return opt_out_capturing_cookie_prefix + token;
    } else {
      return OPT_OUT_PREFIX + token;
    }
  }
  get _storedConsent() {
    const value = this._storage._get(this._storageKey);
    return isYesLike(value) ? ConsentStatus.GRANTED : isNoLike(value) ? ConsentStatus.DENIED : ConsentStatus.PENDING;
  }
  get _storage() {
    const persistenceType = this._config.opt_out_capturing_persistence_type;
    const expectedStore = persistenceType === "localStorage" ? localStore : cookieStore;
    if (!this._persistentStore || this._persistentStore !== expectedStore) {
      this._persistentStore = expectedStore;
      const otherStorage = persistenceType === "localStorage" ? cookieStore : localStore;
      if (otherStorage._get(this._storageKey)) {
        if (!this._persistentStore._get(this._storageKey)) {
          this.optInOut(isYesLike(otherStorage._get(this._storageKey)));
        }
        otherStorage._remove(this._storageKey, this._config.cross_subdomain_cookie);
      }
    }
    return this._persistentStore;
  }
  _getDnt() {
    if (!this._config.respect_dnt) {
      return false;
    }
    return [
      globals_navigator?.doNotTrack,
      // standard
      globals_navigator?.["msDoNotTrack"],
      assignableWindow["doNotTrack"]
    ].some((dntValue) => isYesLike(dntValue));
  }
};

// ../browser-common/dist/constants.mjs
var SDK_DIST_CHANNEL = "$sdk_dist_channel";

// ../browser-common/dist/utils/autocapture-utils.mjs
var DEFAULT_CONTENT_IGNORELIST = [
  "next",
  "previous",
  "prev",
  ">",
  "<"
];
var DEFAULT_CONTENT_IGNORELIST_WITH_STEPPERS = [
  ...DEFAULT_CONTENT_IGNORELIST,
  "+",
  "-",
  "\u2212",
  "\u2013"
];
var coreCCPattern = "(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11})";
var anchoredCCRegex = new RegExp(`^(?:${coreCCPattern})$`);
var unanchoredCCRegex = new RegExp(coreCCPattern);
var coreSSNPattern = "\\d{3}-?\\d{2}-?\\d{4}";
var anchoredSSNRegex = new RegExp(`^(${coreSSNPattern})$`);
var unanchoredSSNRegex = new RegExp(`(${coreSSNPattern})`);

// src/extensions/dead-clicks-autocapture.ts
var logger = createLogger2("[Dead Clicks]");
var isDeadClicksEnabledForAutocapture = (instance) => {
  const isRemoteEnabled = !!instance.instance.persistence?.get_property(DEAD_CLICKS_ENABLED_SERVER_SIDE);
  const clientConfig = instance.instance.config.capture_dead_clicks;
  if (isBoolean(clientConfig)) {
    return clientConfig;
  }
  if (isObject(clientConfig)) {
    return true;
  }
  return isRemoteEnabled;
};

// src/extensions/segment-integration.ts
var logger2 = createLogger2("[SegmentIntegration]");
var createSegmentIntegration = (posthog) => {
  if (typeof Promise === "undefined" || !Promise.resolve) {
    logger2.warn("This browser does not have Promise support, and can not use the segment integration");
  }
  const enrichEvent = (ctx, eventName) => {
    if (!eventName) {
      return ctx;
    }
    if (!ctx.event.userId && ctx.event.anonymousId !== posthog.get_distinct_id()) {
      logger2.info("No userId set, resetting PostHog");
      posthog.reset();
    }
    if (ctx.event.userId && ctx.event.userId !== posthog.get_distinct_id()) {
      logger2.info("UserId set, identifying with PostHog");
      posthog.identify(ctx.event.userId);
    }
    const additionalProperties = posthog.calculateEventProperties(eventName, ctx.event.properties);
    ctx.event.properties = Object.assign({}, additionalProperties, ctx.event.properties);
    return ctx;
  };
  return {
    name: "PostHog JS",
    type: "enrichment",
    version: "1.0.0",
    isLoaded: () => true,
    // check and early return above
    // eslint-disable-next-line compat/compat
    load: () => Promise.resolve(),
    track: (ctx) => enrichEvent(ctx, ctx.event.event),
    page: (ctx) => enrichEvent(ctx, EVENT_PAGEVIEW),
    identify: (ctx) => enrichEvent(ctx, EVENT_IDENTIFY),
    screen: (ctx) => enrichEvent(ctx, "$screen")
  };
};
function setupPostHogFromSegment(posthog, done) {
  const segment = posthog.config.segment;
  if (!segment) {
    return done();
  }
  const bootstrapUser = (user) => {
    const getSegmentAnonymousId = () => user.anonymousId() || uuidv72();
    posthog.config.get_device_id = getSegmentAnonymousId;
    if (user.id()) {
      posthog.register({
        distinct_id: user.id(),
        $device_id: getSegmentAnonymousId()
      });
      posthog.persistence.set_property(USER_STATE, USER_STATE_IDENTIFIED);
    }
    done();
  };
  const segmentUser = segment.user();
  if ("then" in segmentUser && isFunction(segmentUser.then)) {
    segmentUser.then(bootstrapUser);
  } else {
    bootstrapUser(segmentUser);
  }
}
function setupSegmentIntegration(posthog, done) {
  const segment = posthog.config.segment;
  if (!segment) {
    return done();
  }
  setupPostHogFromSegment(posthog, () => {
    segment.register(createSegmentIntegration(posthog)).then(() => {
      done();
    });
  });
}

// src/extensions/sentry-integration.ts
var NAME = "posthog-js";
function createEventProcessor(_posthog, {
  organization,
  projectId,
  prefix,
  severityAllowList = ["error"],
  sendExceptionsToPostHog = true
} = {}) {
  return (event) => {
    const shouldProcessLevel = severityAllowList === "*" || severityAllowList.includes(event.level);
    if (!shouldProcessLevel || !_posthog.__loaded) return event;
    if (!event.tags) event.tags = {};
    const personUrl = _posthog.requestRouter.endpointFor(
      "ui",
      `/project/${_posthog.config.token}/person/${_posthog.get_distinct_id()}`
    );
    event.tags["PostHog Person URL"] = personUrl;
    if (_posthog.sessionRecordingStarted()) {
      event.tags["PostHog Recording URL"] = _posthog.get_session_replay_url({ withTimestamp: true });
    }
    const exceptions = event.exception?.values || [];
    const exceptionList = exceptions.map((exception) => {
      return {
        ...exception,
        stacktrace: exception.stacktrace ? {
          ...exception.stacktrace,
          type: "raw",
          frames: (exception.stacktrace.frames || []).map((frame) => {
            return { ...frame, platform: "web:javascript" };
          })
        } : void 0
      };
    });
    const data = {
      // PostHog Exception Properties,
      $exception_message: exceptions[0]?.value || event.message,
      $exception_type: exceptions[0]?.type,
      $exception_level: event.level,
      $exception_list: exceptionList,
      // Sentry Exception Properties
      $sentry_event_id: event.event_id,
      $sentry_exception: event.exception,
      $sentry_exception_message: exceptions[0]?.value || event.message,
      $sentry_exception_type: exceptions[0]?.type,
      $sentry_tags: event.tags
    };
    if (organization && projectId) {
      data["$sentry_url"] = (prefix || "https://sentry.io/organizations/") + organization + "/issues/?project=" + projectId + "&query=" + event.event_id;
    }
    if (sendExceptionsToPostHog) {
      _posthog.exceptions?.sendExceptionEvent(data);
    }
    return event;
  };
}
function sentryIntegration(_posthog, options) {
  const processor = createEventProcessor(_posthog, options);
  return {
    name: NAME,
    processEvent(event) {
      return processor(event);
    }
  };
}
var SentryIntegration = class {
  constructor(_posthog, organization, projectId, prefix, severityAllowList, sendExceptionsToPostHog) {
    this.name = NAME;
    this.setupOnce = function(addGlobalEventProcessor) {
      addGlobalEventProcessor(
        createEventProcessor(_posthog, {
          organization,
          projectId,
          prefix,
          severityAllowList,
          sendExceptionsToPostHog: sendExceptionsToPostHog ?? true
        })
      );
    };
  }
};

// src/page-view.ts
var PageViewManager = class {
  constructor(instance) {
    this._onSessionIdChange = (sessionId, _windowId, changeReason) => {
      if (!changeReason) {
        return;
      }
      if (changeReason.noSessionId || changeReason.activityTimeout || changeReason.sessionPastMaximumLength || changeReason.crossTabAdoption) {
        logger_logger.info("[PageViewManager] Session rotated, clearing pageview state", {
          sessionId,
          changeReason
        });
        this._currentPageview = void 0;
        this._instance.scrollManager.resetContext();
      }
    };
    this._instance = instance;
    this._setupSessionRotationHandler();
  }
  _setupSessionRotationHandler() {
    this._unsubscribeSessionId = this._instance.sessionManager?.onSessionId(this._onSessionIdChange);
  }
  destroy() {
    this._unsubscribeSessionId?.();
    this._unsubscribeSessionId = void 0;
  }
  doPageView(timestamp, pageViewId) {
    const response = this._previousPageViewProperties(timestamp, pageViewId);
    this._currentPageview = { pathname: win?.location.pathname ?? "", pageViewId, timestamp };
    this._instance.scrollManager.resetContext();
    return response;
  }
  doPageLeave(timestamp) {
    return this._previousPageViewProperties(timestamp, this._currentPageview?.pageViewId);
  }
  doEvent() {
    return { $pageview_id: this._currentPageview?.pageViewId };
  }
  _previousPageViewProperties(timestamp, pageviewId) {
    const previousPageView = this._currentPageview;
    if (!previousPageView) {
      return { $pageview_id: pageviewId };
    }
    let properties = {
      $pageview_id: pageviewId,
      $prev_pageview_id: previousPageView.pageViewId
    };
    const scrollContext = this._instance.scrollManager.getContext();
    if (scrollContext && !this._instance.config.disable_scroll_properties) {
      let { maxScrollHeight, lastScrollY, maxScrollY, maxContentHeight, lastContentY, maxContentY } = scrollContext;
      if (!isUndefined(maxScrollHeight) && !isUndefined(lastScrollY) && !isUndefined(maxScrollY) && !isUndefined(maxContentHeight) && !isUndefined(lastContentY) && !isUndefined(maxContentY)) {
        maxScrollHeight = Math.ceil(maxScrollHeight);
        lastScrollY = Math.ceil(lastScrollY);
        maxScrollY = Math.ceil(maxScrollY);
        maxContentHeight = Math.ceil(maxContentHeight);
        lastContentY = Math.ceil(lastContentY);
        maxContentY = Math.ceil(maxContentY);
        const lastScrollPercentage = maxScrollHeight <= 1 ? 1 : clampToRange(lastScrollY / maxScrollHeight, 0, 1, logger_logger);
        const maxScrollPercentage = maxScrollHeight <= 1 ? 1 : clampToRange(maxScrollY / maxScrollHeight, 0, 1, logger_logger);
        const lastContentPercentage = maxContentHeight <= 1 ? 1 : clampToRange(lastContentY / maxContentHeight, 0, 1, logger_logger);
        const maxContentPercentage = maxContentHeight <= 1 ? 1 : clampToRange(maxContentY / maxContentHeight, 0, 1, logger_logger);
        properties = extend(properties, {
          $prev_pageview_last_scroll: lastScrollY,
          $prev_pageview_last_scroll_percentage: lastScrollPercentage,
          $prev_pageview_max_scroll: maxScrollY,
          $prev_pageview_max_scroll_percentage: maxScrollPercentage,
          $prev_pageview_last_content: lastContentY,
          $prev_pageview_last_content_percentage: lastContentPercentage,
          $prev_pageview_max_content: maxContentY,
          $prev_pageview_max_content_percentage: maxContentPercentage
        });
      }
    }
    if (previousPageView.pathname) {
      properties.$prev_pageview_pathname = previousPageView.pathname;
    }
    if (previousPageView.timestamp) {
      properties.$prev_pageview_duration = (timestamp.getTime() - previousPageView.timestamp.getTime()) / 1e3;
    }
    return properties;
  }
};

// src/persistence-key-transforms.ts
var transformEnabledFeatureFlagsToEventProperties = (value) => {
  if (!isObject(value)) {
    return {};
  }
  const eventProperties = {};
  const keys = Object.keys(value);
  for (let i = 0; i < keys.length; i++) {
    eventProperties[`$feature/${keys[i]}`] = value[keys[i]];
  }
  return eventProperties;
};

// src/persistence-key-policy.ts
var PERSISTENCE_STORAGE_GROUPS = ["flags", "surveys"];
var PERSISTENCE_KEY_POLICY = {
  [PEOPLE_DISTINCT_ID_KEY]: { exposure: "hidden" },
  [ALIAS_ID_KEY]: { exposure: "hidden" },
  [CAMPAIGN_IDS_KEY]: { exposure: "hidden" },
  [EVENT_TIMERS_KEY]: { exposure: "hidden" },
  [AUTOCAPTURE_DISABLED_SERVER_SIDE]: { exposure: "event" },
  [HEATMAPS_ENABLED_SERVER_SIDE]: { exposure: "hidden" },
  [EXCEPTION_CAPTURE_ENABLED_SERVER_SIDE]: { exposure: "event" },
  [ERROR_TRACKING_SUPPRESSION_RULES]: { exposure: "hidden" },
  [ERROR_TRACKING_CAPTURE_EXTENSION_EXCEPTIONS]: { exposure: "event" },
  [WEB_VITALS_ENABLED_SERVER_SIDE]: { exposure: "event" },
  [DEAD_CLICKS_ENABLED_SERVER_SIDE]: { exposure: "event" },
  [PRODUCT_TOURS_ENABLED_SERVER_SIDE]: { exposure: "hidden" },
  [WEB_VITALS_ALLOWED_METRICS]: { exposure: "event" },
  [SESSION_RECORDING_REMOTE_CONFIG]: { exposure: "hidden" },
  [SESSION_RECORDING_ENABLED_SERVER_SIDE]: { exposure: "hidden" },
  [SESSION_ID]: { exposure: "hidden" },
  [SESSION_RECORDING_IS_SAMPLED]: { exposure: "event" },
  [SESSION_RECORDING_SAMPLE_RATE]: {
    exposure: "event",
    shouldSkipFromEventProperties: (value) => isNull(value)
  },
  [SESSION_RECORDING_PAST_MINIMUM_DURATION]: { exposure: "event" },
  [SESSION_RECORDING_URL_TRIGGER_ACTIVATED_SESSION]: { exposure: "event" },
  [SESSION_RECORDING_EVENT_TRIGGER_ACTIVATED_SESSION]: { exposure: "event" },
  [SESSION_RECORDING_FIRST_FULL_SNAPSHOT_TIMESTAMP]: { exposure: "event" },
  [SESSION_RECORDING_FLUSHED_SIZE]: { exposure: "hidden" },
  [ENABLED_FEATURE_FLAGS]: {
    exposure: "derived",
    storageGroup: "flags",
    shouldSkipFromEventProperties: (_, shouldSkip) => shouldSkip(),
    transformToEventProperties: transformEnabledFeatureFlagsToEventProperties
  },
  [PERSISTENCE_ACTIVE_FEATURE_FLAGS]: { exposure: "event", storageGroup: "flags" },
  [PERSISTENCE_EARLY_ACCESS_FEATURES]: { exposure: "hidden" },
  [PERSISTENCE_FEATURE_FLAG_DETAILS]: { exposure: "hidden", storageGroup: "flags" },
  [PERSISTENCE_FEATURE_FLAG_PAYLOADS]: { exposure: "event", storageGroup: "flags" },
  [PERSISTENCE_FEATURE_FLAG_REQUEST_ID]: { exposure: "event", storageGroup: "flags", volatile: true },
  // Server gate for minimal $feature_flag_called events — internal state that must never
  // leak into event properties.
  [PERSISTENCE_MINIMAL_FLAG_CALLED_EVENTS]: { exposure: "hidden", storageGroup: "flags" },
  [PERSISTENCE_OVERRIDE_FEATURE_FLAGS]: { exposure: "event" },
  [PERSISTENCE_OVERRIDE_FEATURE_FLAG_PAYLOADS]: { exposure: "hidden" },
  [STORED_PERSON_PROPERTIES_KEY]: { exposure: "hidden" },
  [STORED_GROUP_PROPERTIES_KEY]: { exposure: "hidden" },
  [SURVEYS]: { exposure: "hidden", storageGroup: "surveys" },
  [SURVEYS_LOADED_AT]: { exposure: "hidden", storageGroup: "surveys", volatile: true },
  [SURVEYS_ACTIVATED]: { exposure: "event" },
  [SURVEYS_ACTIVATED_SESSION]: { exposure: "hidden" },
  [PRODUCT_TOURS]: { exposure: "hidden" },
  [PRODUCT_TOURS_ACTIVATED]: { exposure: "hidden" },
  [PRODUCT_TOURS_ACTIVATED_SESSION]: { exposure: "hidden" },
  [CONVERSATIONS_LEGACY_WIDGET_SESSION_ID]: { exposure: "event" },
  [CONVERSATIONS_LEGACY_TICKET_ID]: { exposure: "event" },
  [CONVERSATIONS_LEGACY_WIDGET_STATE]: { exposure: "event" },
  [CONVERSATIONS_LEGACY_USER_TRAITS]: { exposure: "event" },
  [FLAG_CALL_REPORTED]: { exposure: "hidden" },
  [FLAG_CALL_REPORTED_SESSION_ID]: { exposure: "hidden" },
  [PERSISTENCE_FEATURE_FLAG_ERRORS]: { exposure: "hidden" },
  [PERSISTENCE_FEATURE_FLAG_EVALUATED_AT]: { exposure: "hidden", storageGroup: "flags", volatile: true },
  [USER_STATE]: { exposure: "hidden" },
  [CLIENT_SESSION_PROPS]: { exposure: "hidden" },
  [CAPTURE_RATE_LIMIT]: { exposure: "hidden" },
  [INITIAL_CAMPAIGN_PARAMS]: { exposure: "hidden" },
  [INITIAL_REFERRER_INFO]: { exposure: "hidden" },
  [INITIAL_PERSON_INFO]: { exposure: "hidden" },
  [ENABLE_PERSON_PROCESSING]: { exposure: "hidden" },
  [SESSION_RECORDING_OVERRIDE_SAMPLING]: { exposure: "event" },
  [SESSION_RECORDING_OVERRIDE_LINKED_FLAG]: { exposure: "event" },
  [SESSION_RECORDING_OVERRIDE_URL_TRIGGER]: { exposure: "event" },
  [SESSION_RECORDING_OVERRIDE_EVENT_TRIGGER]: { exposure: "event" },
  [SDK_DEBUG_EXTENSIONS_INIT_METHOD]: { exposure: "event" },
  [SDK_DEBUG_EXTENSIONS_INIT_TIME_MS]: { exposure: "event" },
  [SDK_DEBUG_RECORDING_SCRIPT_NOT_LOADED]: { exposure: "event" },
  [SDK_DEBUG_REPLAY_EVENT_TRIGGER_STATUS]: { exposure: "event" },
  [SDK_DEBUG_REPLAY_LINKED_FLAG_TRIGGER_STATUS]: { exposure: "event" },
  [SDK_DEBUG_REPLAY_MATCHED_RECORDING_TRIGGER_GROUPS]: { exposure: "event" },
  [SDK_DEBUG_REPLAY_REMOTE_TRIGGER_MATCHING_CONFIG]: { exposure: "event" },
  [SDK_DEBUG_REPLAY_TRIGGER_GROUPS_COUNT]: { exposure: "event" },
  [SDK_DEBUG_REPLAY_URL_TRIGGER_STATUS]: { exposure: "event" },
  [SESSION_RECORDING_START_REASON]: { exposure: "event" }
};
var PERSISTENCE_KEY_PREFIX_POLICY = [
  [SESSION_RECORDING_TRIGGER_V2_GROUP_EVENT_PREFIX, { exposure: "hidden" }],
  [SESSION_RECORDING_TRIGGER_V2_GROUP_URL_PREFIX, { exposure: "hidden" }],
  [SESSION_RECORDING_TRIGGER_V2_GROUP_SAMPLING_PREFIX, { exposure: "hidden" }]
];
var getPersistenceKeyPolicy = (key) => {
  const exactMatch = PERSISTENCE_KEY_POLICY[key];
  if (exactMatch) {
    return exactMatch;
  }
  for (const [prefix, policy] of PERSISTENCE_KEY_PREFIX_POLICY) {
    if (key.indexOf(prefix) === 0) {
      return policy;
    }
  }
  return void 0;
};

// ../browser-common/dist/utils/request-utils.mjs
var jsonStringify = (data, space) => {
  try {
    return JSON.stringify(data, (_, value) => "bigint" == typeof value ? value.toString() : value, space);
  } catch {
    return safeJsonStringify(data);
  }
};
var convertToURL = (url) => {
  const location = globals_document?.createElement("a");
  if (isUndefined(location)) return null;
  location.href = url;
  return location;
};
var formDataToQuery = function(formdata, arg_separator = "&") {
  let use_val;
  let use_key;
  const tph_arr = [];
  each(formdata, function(val, key) {
    if (isUndefined(val) || isUndefined(key) || "undefined" === key) return;
    use_val = encodeURIComponent(isFile(val) ? val.name : val.toString());
    use_key = encodeURIComponent(key);
    tph_arr[tph_arr.length] = use_key + "=" + use_val;
  });
  return tph_arr.join(arg_separator);
};
var getQueryParam = function(url, param) {
  const withoutHash = url.split("#")[0] || "";
  const queryParams = withoutHash.split(/\?(.*)/)[1] || "";
  const cleanedQueryParams = queryParams.replace(/^\?+/g, "");
  const queryParts = cleanedQueryParams.split("&");
  let keyValuePair;
  for (let i = 0; i < queryParts.length; i++) {
    const parts = queryParts[i].split("=");
    if (parts[0] === param) {
      keyValuePair = parts;
      break;
    }
  }
  if (!isArray(keyValuePair) || keyValuePair.length < 2) return "";
  {
    let result = keyValuePair[1];
    try {
      result = decodeURIComponent(result);
    } catch {
      logger_logger.error("Skipping decoding for malformed query param: " + result);
    }
    return result.replace(/\+/g, " ");
  }
};
var maskQueryParams = function(url, maskedParams, mask) {
  if (!url || !maskedParams || !maskedParams.length) return url;
  const splitHash = url.split("#");
  const withoutHash = splitHash[0] || "";
  const hash = splitHash[1];
  const splitQuery = withoutHash.split("?");
  const queryString = splitQuery[1];
  const urlWithoutQueryAndHash = splitQuery[0];
  const queryParts = (queryString || "").split("&");
  const paramStrings = [];
  for (let i = 0; i < queryParts.length; i++) {
    const keyValuePair = queryParts[i].split("=");
    if (isArray(keyValuePair)) if (maskedParams.includes(keyValuePair[0])) paramStrings.push(keyValuePair[0] + "=" + mask);
    else paramStrings.push(queryParts[i]);
  }
  let result = urlWithoutQueryAndHash;
  if (null != queryString) result += "?" + paramStrings.join("&");
  if (null != hash) result += "#" + hash;
  return result;
};

// ../browser-common/dist/utils/event-utils.mjs
var URL_REGEX_PREFIX = "https?://(.*)";
var PERSONAL_DATA_CAMPAIGN_PARAMS = [
  "gclid",
  "gclsrc",
  "dclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "twclid",
  "li_fat_id",
  "igshid",
  "ttclid",
  "rdt_cid",
  "epik",
  "qclid",
  "sccid",
  "irclid",
  "_kx"
];
var CAMPAIGN_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gad_source",
  "mc_cid",
  ...PERSONAL_DATA_CAMPAIGN_PARAMS
];
var MASKED = "<masked>";
var COOKIE_CAMPAIGN_PARAMS = [
  "li_fat_id"
];
function getCampaignParams(customTrackedParams, maskPersonalDataProperties, customPersonalDataProperties) {
  if (!globals_document) return {};
  const paramsToMask = maskPersonalDataProperties ? [
    ...PERSONAL_DATA_CAMPAIGN_PARAMS,
    ...customPersonalDataProperties || []
  ] : [];
  const urlCampaignParams = _getCampaignParamsFromUrl(maskQueryParams(globals_document.URL, paramsToMask, MASKED), customTrackedParams);
  const cookieCampaignParams = _getCampaignParamsFromCookie();
  return extend(cookieCampaignParams, urlCampaignParams);
}
function _getCampaignParamsFromUrl(url, customParams) {
  const campaign_keywords = CAMPAIGN_PARAMS.concat(customParams || []);
  const params = {};
  each(campaign_keywords, function(kwkey) {
    const kw = getQueryParam(url, kwkey);
    params[kwkey] = kw ? kw : null;
  });
  return params;
}
function _getCampaignParamsFromCookie() {
  const params = {};
  each(COOKIE_CAMPAIGN_PARAMS, function(kwkey) {
    const kw = getCookieValue(kwkey);
    params[kwkey] = kw ? kw : null;
  });
  return params;
}
function _getSearchEngine(referrer) {
  if (!referrer) return null;
  if (0 === referrer.search(URL_REGEX_PREFIX + "google.([^/?]*)")) return "google";
  if (0 === referrer.search(URL_REGEX_PREFIX + "bing.com")) return "bing";
  if (0 === referrer.search(URL_REGEX_PREFIX + "yahoo.com")) return "yahoo";
  if (0 === referrer.search(URL_REGEX_PREFIX + "duckduckgo.com")) return "duckduckgo";
  else return null;
}
function _getSearchInfoFromReferrer(referrer) {
  const search = _getSearchEngine(referrer);
  const param = "yahoo" != search ? "q" : "p";
  const ret = {};
  if (!isNull(search)) {
    ret["$search_engine"] = search;
    const keyword = globals_document ? getQueryParam(globals_document.referrer, param) : "";
    if (keyword.length) ret["ph_keyword"] = keyword;
  }
  return ret;
}
function getSearchInfo() {
  const referrer = globals_document?.referrer;
  if (!referrer) return {};
  return _getSearchInfoFromReferrer(referrer);
}
function getBrowserLanguage() {
  return navigator.language || navigator.userLanguage;
}
function getBrowserLanguagePrefix() {
  const lang = getBrowserLanguage();
  return "string" == typeof lang ? lang.split("-")[0] : void 0;
}
var DIRECT = "$direct";
function getReferrer() {
  return globals_document?.referrer || DIRECT;
}
function getReferringDomain() {
  if (!globals_document?.referrer) return DIRECT;
  return convertToURL(globals_document.referrer)?.host || DIRECT;
}
function getReferrerInfo() {
  return {
    $referrer: getReferrer(),
    $referring_domain: getReferringDomain()
  };
}
function getPersonInfo(maskPersonalDataProperties, customPersonalDataProperties, disableCaptureUrlHashes = false) {
  const paramsToMask = maskPersonalDataProperties ? [
    ...PERSONAL_DATA_CAMPAIGN_PARAMS,
    ...customPersonalDataProperties || []
  ] : [];
  const href = disableCaptureUrlHashes ? stripUrlHash(globals_location?.href) : globals_location?.href;
  const url = href?.substring(0, 1e3);
  return {
    r: getReferrer().substring(0, 1e3),
    u: url ? maskQueryParams(url, paramsToMask, MASKED) : void 0
  };
}
function getPersonPropsFromInfo(info, disableCaptureUrlHashes = false) {
  const { r: referrer, u } = info;
  const url = disableCaptureUrlHashes ? stripUrlHash(u) : u;
  const referring_domain = null == referrer ? void 0 : referrer == DIRECT ? DIRECT : convertToURL(referrer)?.host;
  const props = {
    $referrer: referrer,
    $referring_domain: referring_domain
  };
  if (url) {
    props["$current_url"] = url;
    const location = convertToURL(url);
    props["$host"] = location?.host;
    props["$pathname"] = location?.pathname;
    const campaignParams = _getCampaignParamsFromUrl(url);
    extend(props, campaignParams);
  }
  if (referrer) {
    const searchInfo = _getSearchInfoFromReferrer(referrer);
    extend(props, searchInfo);
  }
  return props;
}
function getInitialPersonPropsFromInfo(info, disableCaptureUrlHashes = false) {
  const personProps = getPersonPropsFromInfo(info, disableCaptureUrlHashes);
  const props = {};
  each(personProps, function(val, key) {
    props[`$initial_${stripLeadingDollar(key)}`] = val;
  });
  return props;
}
function getTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return;
  }
}
function getTimezoneOffset() {
  try {
    return (/* @__PURE__ */ new Date()).getTimezoneOffset();
  } catch {
    return;
  }
}
function getBrowserDetectionHints() {
  const nav = "undefined" != typeof navigator ? navigator : void 0;
  return nav?.brave ? {
    brave: true
  } : {};
}
function getEventProperties(maskPersonalDataProperties, customPersonalDataProperties, detectGoogleSearchApp, disableCaptureUrlHashes = false) {
  if (!userAgent) return {};
  const paramsToMask = maskPersonalDataProperties ? [
    ...PERSONAL_DATA_CAMPAIGN_PARAMS,
    ...customPersonalDataProperties || []
  ] : [];
  const [os_name, os_version] = detectOS(userAgent);
  const browserHints = getBrowserDetectionHints();
  const browserOptions = {};
  if (!isUndefined(detectGoogleSearchApp)) browserOptions.detectGoogleSearchApp = detectGoogleSearchApp;
  const deviceOptions = {};
  const userAgentDataPlatform = navigator?.userAgentData?.platform;
  const maxTouchPoints = navigator?.maxTouchPoints;
  const screenWidth = win?.screen?.width;
  const screenHeight = win?.screen?.height;
  const devicePixelRatio = win?.devicePixelRatio;
  if (!isUndefined(userAgentDataPlatform)) deviceOptions.userAgentDataPlatform = userAgentDataPlatform;
  if (!isUndefined(maxTouchPoints)) deviceOptions.maxTouchPoints = maxTouchPoints;
  if (!isUndefined(screenWidth)) deviceOptions.screenWidth = screenWidth;
  if (!isUndefined(screenHeight)) deviceOptions.screenHeight = screenHeight;
  if (!isUndefined(devicePixelRatio)) deviceOptions.devicePixelRatio = devicePixelRatio;
  const properties = extend(stripEmptyProperties({
    $os: os_name,
    $os_version: os_version,
    $browser: detectBrowser(userAgent, navigator.vendor, browserHints, browserOptions),
    $device: detectDevice(userAgent),
    $device_type: detectDeviceType(userAgent, deviceOptions),
    $timezone: getTimezone(),
    $timezone_offset: getTimezoneOffset()
  }), {
    $current_url: maskQueryParams(disableCaptureUrlHashes ? stripUrlHash(globals_location?.href) : globals_location?.href, paramsToMask, MASKED),
    $host: globals_location?.host,
    $pathname: globals_location?.pathname,
    $raw_user_agent: userAgent.length > 1e3 ? userAgent.substring(0, 997) + "..." : userAgent,
    $browser_version: detectBrowserVersion(userAgent, navigator.vendor, browserHints, browserOptions),
    $browser_language: getBrowserLanguage(),
    $browser_language_prefix: getBrowserLanguagePrefix(),
    $screen_height: win?.screen.height,
    $screen_width: win?.screen.width,
    $viewport_height: win?.innerHeight,
    $viewport_width: win?.innerWidth,
    $lib: config.LIB_NAME,
    $lib_version: config.LIB_VERSION,
    $insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10),
    $time: Date.now() / 1e3
  });
  if (config.SDK_DIST_CHANNEL) properties[SDK_DIST_CHANNEL] = config.SDK_DIST_CHANNEL;
  return properties;
}

// src/posthog-persistence.ts
var VOLATILE_FINGERPRINT_PLACEHOLDER = "__volatile__";
var GROUP_FRESHNESS_KEY = {
  flags: PERSISTENCE_FEATURE_FLAG_EVALUATED_AT,
  surveys: SURVEYS_LOADED_AT
};
var CASE_INSENSITIVE_PERSISTENCE_TYPES = [
  "cookie",
  "localstorage",
  "localstorage+cookie",
  "sessionstorage",
  "memory"
];
var parseName = (config2) => {
  let token = "";
  if (config2["token"]) {
    token = config2["token"].replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ");
  }
  if (config2["persistence_name"]) {
    return "ph_" + config2["persistence_name"];
  } else {
    return "ph_" + token + "_posthog";
  }
};
var MAIN_STORAGE_SLOT = "main";
var isArrayContentsEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  return sortedArr1.every((item, index) => item === sortedArr2[index]);
};
var PostHogPersistence = class {
  /**
   * @param {PostHogConfig} config initial PostHog configuration
   * @param {boolean=} isDisabled should persistence be disabled (e.g. because of consent management)
   */
  constructor(config2, isDisabled, ownsSplitStorage = true) {
    // Per-storage-entry write bookkeeping, keyed by slot (`main` plus each group
    // name): no-op-rejection fingerprint, per-group dirty flag, and on-disk
    // materialization. Reset wholesale on remove()/clear() so a save after
    // remove always lands. See `SlotWriteState`.
    this._slotState = {};
    // Whether the resolved storage backend can host the split (localStorage /
    // localStorage+cookie). Set by `_buildStorage`.
    this._splitStorageEligible = false;
    // Whether flag config is stored in their own entries this session:
    // backend-eligible AND `split_storage` enabled.
    // Re-resolved on every `update_config` (backend rebuild or a runtime flag flip).
    this._splitStorage = false;
    this._config = config2;
    this._ownsSplitStorage = ownsSplitStorage;
    this.props = {};
    this._campaign_params_saved = false;
    this._name = parseName(config2);
    this._storage = this._buildStorage(config2);
    this._splitStorage = this._resolveSplitStorage(config2);
    this.load();
    if (config2.debug) {
      logger_logger.info("Persistence loaded", config2["persistence"], { ...this.props });
    }
    this.update_config(config2, config2, isDisabled);
    this.save();
    if (win) {
      const flush = () => this.flush();
      addEventListener(win, "beforeunload", flush, { capture: false });
      addEventListener(win, "pagehide", flush, { capture: false });
    }
  }
  _saveDebounceMs() {
    const value = this._config?.persistence_save_debounce_ms;
    return isNumber(value) && value > 0 ? value : 0;
  }
  /**
   * Returns whether persistence is disabled. Only available in SDKs > 1.257.1. Do not use on extensions, otherwise
   * it'll break backwards compatibility for any version before 1.257.1.
   */
  isDisabled() {
    return !!this._disabled;
  }
  _buildStorage(config2) {
    if (CASE_INSENSITIVE_PERSISTENCE_TYPES.indexOf(
      config2["persistence"].toLowerCase()
    ) === -1) {
      logger_logger.critical(
        "Unknown persistence type " + config2["persistence"] + "; falling back to localStorage+cookie"
      );
      config2["persistence"] = "localStorage+cookie";
    }
    const localPlusCookieStore = createLocalPlusCookieStore(
      config2["cookie_persisted_properties"] || [],
      config2["__preview_cookie_wins_on_conflict"] || false
    );
    let store;
    let splitEligible = false;
    const storage_type = config2["persistence"].toLowerCase();
    if (storage_type === "localstorage" && localStore._is_supported()) {
      store = localStore;
      splitEligible = true;
    } else if (storage_type === "localstorage+cookie" && localPlusCookieStore._is_supported()) {
      store = localPlusCookieStore;
      splitEligible = true;
    } else if (storage_type === "sessionstorage" && sessionStore._is_supported()) {
      store = sessionStore;
    } else if (storage_type === "memory") {
      store = memoryStore;
    } else if (storage_type === "cookie") {
      store = cookieStore;
    } else if (localPlusCookieStore._is_supported()) {
      store = localPlusCookieStore;
      splitEligible = true;
    } else {
      store = cookieStore;
    }
    this._splitStorageEligible = splitEligible;
    return store;
  }
  _groupEntryName(group) {
    return `${this._name}__${group}`;
  }
  // The split is on only when the resolved backend can host it (localStorage /
  // localStorage+cookie, set by `_buildStorage` into `_splitStorageEligible`)
  // AND the config opts in. Resolved here so the constructor and the runtime
  // `update_config` toggle can never disagree about whether the split is active.
  _resolveSplitStorage(config2) {
    return this._splitStorageEligible && !!config2["split_storage"];
  }
  /**
   * Check if the feature flag cache is stale based on the configured TTL.
   * @param ttl Optional TTL override (uses config value if not provided)
   * @internal
   */
  _isFeatureFlagCacheStale(ttl) {
    const effectiveTtl = ttl ?? this._config.feature_flag_cache_ttl_ms;
    if (!effectiveTtl || effectiveTtl <= 0) {
      return false;
    }
    const evaluatedAt = this.props[PERSISTENCE_FEATURE_FLAG_EVALUATED_AT];
    if (!evaluatedAt || typeof evaluatedAt !== "number") {
      return true;
    }
    return Date.now() - evaluatedAt > effectiveTtl;
  }
  properties() {
    const p = {};
    each(this.props, (v, k) => {
      const policy = getPersistenceKeyPolicy(k);
      if (policy?.exposure === "derived") {
        const shouldSkip = k === ENABLED_FEATURE_FLAGS ? () => this._isFeatureFlagCacheStale() : () => false;
        if (policy.shouldSkipFromEventProperties?.(v, shouldSkip)) {
          return;
        }
        if (policy.transformToEventProperties) {
          extend(p, policy.transformToEventProperties(v));
        }
      } else if (!policy || policy.exposure === "event") {
        if (policy?.shouldSkipFromEventProperties?.(v, () => false)) {
          return;
        }
        p[k] = v;
      }
    });
    return p;
  }
  load() {
    if (this._disabled) {
      return;
    }
    const entry = this._storage._parse(this._name);
    if (entry) {
      this.props = extend({}, entry);
    }
    if (this._splitStorage) {
      this._loadGroupEntries();
    }
  }
  // Merge each group entry over `props`, which already holds the main blob.
  // On a first upgrade the main blob may still carry the old flag
  // values; a present group entry wins, so we resolve
  // `props[key] = group[key] ?? main[key]` in a single pass (the "check the
  // old key once" migration). The first `save()` then strips the keys from
  // the main blob. Group entries are localStorage-only (read via `localStore`
  // directly, never the cookie or the localPlusCookie re-write-on-parse path).
  _loadGroupEntries() {
    for (const group of PERSISTENCE_STORAGE_GROUPS) {
      const groupEntry = localStore._parse(this._groupEntryName(group));
      if (groupEntry && !isEmptyObject(groupEntry)) {
        const state = this._slotWriteState(group);
        state.persisted = true;
        if (!this._mainCarriesGroupKey(group)) {
          state.fingerprint = this._entryFingerprint(groupEntry, group);
        }
        if (!this._groupEntryIsStale(group, groupEntry)) {
          extend(this.props, groupEntry);
        }
      }
    }
  }
  // True when the already-loaded main blob still holds a key belonging to this
  // group — a migration leftover the next save must fold into the group entry.
  // Checked before the group entry is merged in, so it sees only the main blob's
  // own keys (sibling groups carry a different storageGroup and never match).
  _mainCarriesGroupKey(group) {
    return Object.keys(this.props).some((key) => getPersistenceKeyPolicy(key)?.storageGroup === group);
  }
  _groupEntryIsStale(group, groupEntry) {
    const freshnessKey = GROUP_FRESHNESS_KEY[group];
    if (!freshnessKey) {
      return false;
    }
    const groupLoadedAt = groupEntry[freshnessKey];
    const mainLoadedAt = this.props[freshnessKey];
    return isNumber(groupLoadedAt) && isNumber(mainLoadedAt) && mainLoadedAt > groupLoadedAt;
  }
  /**
   * Refresh a single key from on-disk storage into `this.props` without
   * touching the rest. Used by `SessionIdManager` on the cross-tab idle
   * path so we can pick up a sibling tab's SESSION_ID write without
   * either:
   *  - flushing our own (potentially stale) whole-props blob to storage
   *    via `flush()`, which would clobber the sibling's write, or
   *  - replacing all of `props` via `load()`, which would discard any
   *    in-memory writes that haven't yet been debounced to storage.
   */
  refreshKey(prop) {
    if (this._disabled) {
      return;
    }
    const group = this._splitStorage ? getPersistenceKeyPolicy(prop)?.storageGroup : void 0;
    const entry = group ? localStore._parse(this._groupEntryName(group)) : this._storage._parse(this._name);
    if (entry && prop in entry) {
      this._setProp(prop, entry[prop]);
      return;
    }
    if (group) {
      const mainEntry = this._storage._parse(this._name);
      if (mainEntry && prop in mainEntry) {
        this._setProp(prop, mainEntry[prop]);
        return;
      }
    }
    this._deleteProp(prop);
  }
  /**
   * NOTE: Saving frequently causes issues with Recordings and Consent Management Platform (CMP) tools which
   * observe cookie changes, and modify their UI, often causing infinite loops.
   * As such callers of this should ideally check that the data has changed beforehand
   */
  save() {
    if (this._disabled) {
      return;
    }
    const debounce = this._saveDebounceMs();
    if (debounce <= 0) {
      this._writeNow();
      return;
    }
    if (!isUndefined(this._pendingSaveTimer)) {
      return;
    }
    this._pendingSaveTimer = setTimeout(() => {
      this._pendingSaveTimer = void 0;
      this._writeNow();
    }, debounce);
  }
  /**
   * Force any pending debounced save to land in storage immediately.
   * No-op when there is no pending timer — crucially, this means the
   * `beforeunload` / `pagehide` listeners installed in the constructor
   * cannot accidentally resurrect a storage entry that `remove()` or
   * `clear()` just deleted. Without this guard, the listener would
   * call `_writeNow()` and write the in-memory `props` (now `{}`) back
   * to storage, breaking `posthog.reset()` / opt-out flows.
   */
  flush() {
    if (isUndefined(this._pendingSaveTimer)) {
      return;
    }
    clearTimeout(this._pendingSaveTimer);
    this._pendingSaveTimer = void 0;
    this._writeNow();
  }
  _writeNow() {
    if (this._disabled) {
      return;
    }
    if (this._splitStorage) {
      this._writeNowSplit();
      return;
    }
    this._writeEntry(this._storage, this._name, this.props, MAIN_STORAGE_SLOT);
  }
  // Partition `props` by storage group and write each entry independently:
  // the main blob without the grouped keys (stripping them completes the
  // migration), plus one entry per group holding only its keys. Per-entry
  // fingerprints mean a main-blob change does not rewrite the rarely-changing
  // flag entries, and vice-versa — which is the whole bandwidth win.
  // Group entries go to `localStore` directly so they never hit the 4 KB
  // cookie or the localPlusCookie re-write-on-parse path. INVARIANT: keep group
  // entries on `localStore` — `_entryFingerprint` omits the cookie options from
  // group fingerprints precisely because cookies can never carry a group entry;
  // routing one to a cookie store would make a cookie-option change silently
  // skip a needed rewrite.
  _writeNowSplit() {
    const { main, groups } = this._partitionProps();
    this._writeEntry(this._storage, this._name, main, MAIN_STORAGE_SLOT);
    for (const group of PERSISTENCE_STORAGE_GROUPS) {
      const groupProps = groups[group];
      if (isEmptyObject(groupProps) && !this._slotState[group]?.persisted) {
        continue;
      }
      this._writeEntry(localStore, this._groupEntryName(group), groupProps, group);
    }
  }
  _partitionProps() {
    const main = {};
    const groups = { flags: {}, surveys: {} };
    each(this.props, (value, key) => {
      const group = getPersistenceKeyPolicy(key)?.storageGroup;
      if (group) {
        groups[group][key] = value;
      } else {
        main[key] = value;
      }
    });
    return { main, groups };
  }
  // The no-op-rejection snapshot for an entry. The main entry can live in a
  // cookie, so its fingerprint also covers the cookie options (expire_days,
  // cross_subdomain, secure): a `set_config({ cookie_expiration })` must force
  // a rewrite even when props are unchanged, otherwise the cookie keeps its old
  // `Expires` header until some other prop changes. Group entries are
  // localStorage-only — cookie options never reach them, so excluding those
  // keeps a group fingerprint a pure function of its payload. That lets `load()`
  // seed it before the cookie options are even resolved, and keeps it stable
  // across the cookie-option setters that run during construction, so an
  // unchanged flag entry is neither re-serialized nor re-broadcast.
  _entryFingerprint(props, slot) {
    if (slot === MAIN_STORAGE_SLOT) {
      return JSON.stringify(props) + "|" + this._expire_days + "|" + this._cross_subdomain + "|" + this._secure;
    }
    const stable = {};
    each(props, (value, key) => {
      stable[key] = getPersistenceKeyPolicy(key)?.volatile ? VOLATILE_FINGERPRINT_PLACEHOLDER : value;
    });
    return JSON.stringify(stable);
  }
  // No-op rejection: skip the write when nothing that affects this entry has
  // changed since the last successful write. Callers spam `save()` after every
  // property change, and many of those changes leave the storage payload
  // unchanged. Writing identical bytes to localStorage still fires a cross-tab
  // `storage` event where Chrome allocates the payload buffer in mojo IPC even
  // though no listener reacts.
  //
  // JSON.stringify can throw on BigInt / circular refs. We let the
  // underlying storage layer keep its existing try/catch behaviour
  // (log and drop) by falling through on serialization errors.
  _writeEntry(storage, name, props, slot) {
    const state = this._slotWriteState(slot);
    if (slot !== MAIN_STORAGE_SLOT && !state.dirty && !isUndefined(state.fingerprint)) {
      return;
    }
    let fingerprint;
    try {
      fingerprint = this._entryFingerprint(props, slot);
      if (fingerprint === state.fingerprint) {
        state.dirty = false;
        return;
      }
    } catch {
      fingerprint = void 0;
    }
    if (storage._set(name, props, this._expire_days, this._cross_subdomain, this._secure, this._config.debug)) {
      state.dirty = false;
      if (slot !== MAIN_STORAGE_SLOT) {
        state.persisted = true;
      }
      if (!isUndefined(fingerprint)) {
        state.fingerprint = fingerprint;
      }
    } else if (this._config.debug) {
      logger_logger.warn(`failed to persist storage entry "${name}"; will retry on next save`);
    }
  }
  // `keepGroupEntries` is set by the cookie-option setters (set_secure /
  // set_cross_subdomain). A cookie-scope change has to clear the cookie-backed
  // main entry, but the group entries are localStorage-only and entirely
  // scope-independent, so deleting and rewriting them would be the exact
  // per-page-load flag-blob churn the split exists to remove (these setters fire
  // once each on every construction, transitioning the in-memory option from
  // undefined to its configured value). Opt-out / reset (set_disabled / clear)
  // pass nothing and wipe everything.
  //
  // INVARIANT for `keepGroupEntries: true`: the caller must not also mutate
  // `props`. We keep the on-disk group entries AND their retained fingerprint;
  // that is only safe while `props` still matches what is on disk. The cookie
  // setters satisfy this (they touch only `_secure` / `_cross_subdomain`). A
  // future caller that clears or rewrites `props` while keeping the entries
  // would leave the retained fingerprint describing stale on-disk content and
  // skip the corrective write.
  remove({ keepGroupEntries = false } = {}) {
    if (!isUndefined(this._pendingSaveTimer)) {
      clearTimeout(this._pendingSaveTimer);
      this._pendingSaveTimer = void 0;
    }
    this._storage._remove(this._name, false);
    this._storage._remove(this._name, true);
    if (!keepGroupEntries && this._ownsSplitStorage) {
      for (const group of PERSISTENCE_STORAGE_GROUPS) {
        localStore._remove(this._groupEntryName(group));
      }
    }
    if (keepGroupEntries) {
      delete this._slotState[MAIN_STORAGE_SLOT];
    } else {
      this._slotState = {};
    }
  }
  // removes the storage entry and deletes all loaded data
  // forced name for tests
  clear() {
    this.remove();
    this.props = {};
  }
  /**
   * @param {Object} props
   * @param {*=} default_value
   * @param {number=} days
   */
  register_once(props, default_value, days) {
    if (isObject(props)) {
      if (isUndefined(default_value)) {
        default_value = "None";
      }
      this._expire_days = isUndefined(days) ? this._default_expiry : days;
      let hasChanges = false;
      each(props, (val, prop) => {
        if (!this.props.hasOwnProperty(prop) || this.props[prop] === default_value) {
          this._setProp(prop, val);
          hasChanges = true;
        }
      });
      if (hasChanges) {
        this.save();
        return true;
      }
    }
    return false;
  }
  /**
   * @param {Object} props
   * @param {number=} days
   */
  register(props, days) {
    if (isObject(props)) {
      this._expire_days = isUndefined(days) ? this._default_expiry : days;
      let hasChanges = false;
      each(props, (val, prop) => {
        if (props.hasOwnProperty(prop) && this.props[prop] !== val) {
          this._setProp(prop, val);
          hasChanges = true;
        }
      });
      if (hasChanges) {
        this.save();
        return true;
      }
    }
    return false;
  }
  unregister(prop) {
    if (prop in this.props) {
      this._deleteProp(prop);
      this.save();
    }
  }
  update_campaign_params() {
    if (!this._campaign_params_saved) {
      const campaignParams = getCampaignParams(
        this._config.custom_campaign_params,
        this._config.mask_personal_data_properties,
        this._config.custom_personal_data_properties
      );
      if (!isEmptyObject(stripEmptyProperties(campaignParams))) {
        this.register(campaignParams);
      }
      this._campaign_params_saved = true;
    }
  }
  update_search_keyword() {
    this.register(getSearchInfo());
  }
  update_referrer_info() {
    this.register_once(getReferrerInfo(), void 0);
  }
  set_initial_person_info() {
    if (this.props[INITIAL_CAMPAIGN_PARAMS] || this.props[INITIAL_REFERRER_INFO]) {
      return;
    }
    this.register_once(
      {
        [INITIAL_PERSON_INFO]: getPersonInfo(
          this._config.mask_personal_data_properties,
          this._config.custom_personal_data_properties,
          this._config.disable_capture_url_hashes
        )
      },
      void 0
    );
  }
  get_initial_props() {
    const p = {};
    each([INITIAL_REFERRER_INFO, INITIAL_CAMPAIGN_PARAMS], (key) => {
      const initialReferrerInfo = this.props[key];
      if (initialReferrerInfo) {
        each(initialReferrerInfo, function(v, k) {
          p["$initial_" + stripLeadingDollar(k)] = v;
        });
      }
    });
    const initialPersonInfo = this.props[INITIAL_PERSON_INFO];
    if (initialPersonInfo) {
      const initialPersonProps = getInitialPersonPropsFromInfo(
        initialPersonInfo,
        this._config.disable_capture_url_hashes
      );
      extend(p, initialPersonProps);
    }
    return p;
  }
  // safely fills the passed in object with stored properties,
  // does not override any properties defined in both
  // returns the passed in object
  safe_merge(props) {
    each(this.props, function(val, prop) {
      if (!(prop in props)) {
        props[prop] = val;
      }
    });
    return props;
  }
  update_config(config2, oldConfig, isDisabled) {
    this._default_expiry = this._expire_days = config2["cookie_expiration"];
    this.set_disabled(config2["disable_persistence"] || !!isDisabled);
    this.set_cross_subdomain(config2["cross_subdomain_cookie"]);
    this.set_secure(config2["secure_cookie"]);
    const persistenceChanged = config2.persistence !== oldConfig.persistence || !isArrayContentsEqual(config2.cookie_persisted_properties || [], oldConfig.cookie_persisted_properties || []);
    const newStore = persistenceChanged ? this._buildStorage(config2) : this._storage;
    const wantSplit = this._resolveSplitStorage(config2);
    if (persistenceChanged || wantSplit !== this._splitStorage) {
      const props = this.props;
      this.clear();
      this._storage = newStore;
      this._splitStorage = wantSplit;
      this.props = props;
      this.save();
    }
  }
  set_disabled(disabled) {
    this._disabled = disabled;
    if (this._disabled) {
      this.remove();
    } else {
      this.save();
    }
  }
  set_cross_subdomain(cross_subdomain) {
    if (cross_subdomain !== this._cross_subdomain) {
      this._cross_subdomain = cross_subdomain;
      this.remove({ keepGroupEntries: true });
      this.save();
    }
  }
  set_secure(secure) {
    if (secure !== this._secure) {
      this._secure = secure;
      this.remove({ keepGroupEntries: true });
      this.save();
    }
  }
  set_event_timer(event_name, timestamp) {
    const timers = this.props[EVENT_TIMERS_KEY] || {};
    timers[event_name] = timestamp;
    this._setProp(EVENT_TIMERS_KEY, timers);
    this.save();
  }
  remove_event_timer(event_name) {
    const timers = this.props[EVENT_TIMERS_KEY] || {};
    const timestamp = timers[event_name];
    if (!isUndefined(timestamp)) {
      delete timers[event_name];
      this._setProp(EVENT_TIMERS_KEY, timers);
      this.save();
    }
    return timestamp;
  }
  get_property(prop) {
    return this.props[prop];
  }
  set_property(prop, to) {
    this._setProp(prop, to);
    this.save();
  }
  _setProp(prop, to) {
    this.props[prop] = to;
    if (!getPersistenceKeyPolicy(prop)?.volatile) {
      this._markGroupDirty(prop);
    }
  }
  _deleteProp(prop) {
    delete this.props[prop];
    this._markGroupDirty(prop);
  }
  // Mark the prop's storage group dirty so its entry is re-serialized on the
  // next write. Props with no group live in the main blob, which always writes.
  _markGroupDirty(prop) {
    const group = getPersistenceKeyPolicy(prop)?.storageGroup;
    if (group) {
      this._slotWriteState(group).dirty = true;
    }
  }
  // The write-bookkeeping record for a slot, created on first access.
  _slotWriteState(slot) {
    return this._slotState[slot] || (this._slotState[slot] = {});
  }
};

// ../browser-common/dist/types/compression.mjs
var Compression = {
  GZipJS: "gzip-js",
  Base64: "base64"
};

// ../browser-common/dist/types/surveys.mjs
var SurveyType = {
  Popover: "popover",
  API: "api",
  Widget: "widget",
  ExternalSurvey: "external_survey"
};
var SurveyEventName = {
  SHOWN: "survey shown",
  DISMISSED: "survey dismissed",
  SENT: "survey sent",
  ABANDONED: "survey abandoned"
};
var SurveyEventProperties = {
  SURVEY_ID: "$survey_id",
  SURVEY_NAME: "$survey_name",
  SURVEY_RESPONSE: "$survey_response",
  SURVEY_ITERATION: "$survey_iteration",
  SURVEY_ITERATION_START_DATE: "$survey_iteration_start_date",
  SURVEY_PARTIALLY_COMPLETED: "$survey_partially_completed",
  SURVEY_SUBMISSION_ID: "$survey_submission_id",
  SURVEY_QUESTIONS: "$survey_questions",
  SURVEY_COMPLETED: "$survey_completed",
  PRODUCT_TOUR_ID: "$product_tour_id",
  SURVEY_LAST_SEEN_DATE: "$survey_last_seen_date",
  SURVEY_LANGUAGE: "$survey_language"
};
var DisplaySurveyType = {
  Popover: "popover",
  Inline: "inline"
};

// src/posthog-product-tours-types.ts
var ProductTourEventName = {
  SHOWN: "product tour shown",
  DISMISSED: "product tour dismissed",
  COMPLETED: "product tour completed",
  STEP_SHOWN: "product tour step shown",
  STEP_COMPLETED: "product tour step completed",
  BUTTON_CLICKED: "product tour button clicked",
  STEP_SELECTOR_FAILED: "product tour step selector failed",
  BANNER_CONTAINER_SELECTOR_FAILED: "product tour banner container selector failed",
  BANNER_ACTION_CLICKED: "product tour banner action clicked"
};
var ProductTourEventProperties = {
  TOUR_ID: "$product_tour_id",
  TOUR_NAME: "$product_tour_name",
  TOUR_ITERATION: "$product_tour_iteration",
  TOUR_RENDER_REASON: "$product_tour_render_reason",
  TOUR_STEP_ID: "$product_tour_step_id",
  TOUR_STEP_ORDER: "$product_tour_step_order",
  TOUR_STEP_TYPE: "$product_tour_step_type",
  TOUR_DISMISS_REASON: "$product_tour_dismiss_reason",
  TOUR_BUTTON_TEXT: "$product_tour_button_text",
  TOUR_BUTTON_ACTION: "$product_tour_button_action",
  TOUR_BUTTON_LINK: "$product_tour_button_link",
  TOUR_BUTTON_TOUR_ID: "$product_tour_button_tour_id",
  TOUR_STEPS_COUNT: "$product_tour_steps_count",
  TOUR_STEP_SELECTOR: "$product_tour_step_selector",
  TOUR_STEP_SELECTOR_FOUND: "$product_tour_step_selector_found",
  TOUR_STEP_ELEMENT_TAG: "$product_tour_step_element_tag",
  TOUR_STEP_ELEMENT_ID: "$product_tour_step_element_id",
  TOUR_STEP_ELEMENT_CLASSES: "$product_tour_step_element_classes",
  TOUR_STEP_ELEMENT_TEXT: "$product_tour_step_element_text",
  TOUR_ERROR: "$product_tour_error",
  TOUR_MATCHES_COUNT: "$product_tour_matches_count",
  TOUR_FAILURE_PHASE: "$product_tour_failure_phase",
  TOUR_WAITED_FOR_ELEMENT: "$product_tour_waited_for_element",
  TOUR_WAIT_DURATION_MS: "$product_tour_wait_duration_ms",
  TOUR_BANNER_SELECTOR: "$product_tour_banner_selector",
  TOUR_LINKED_SURVEY_ID: "$product_tour_linked_survey_id",
  USE_MANUAL_SELECTOR: "$use_manual_selector",
  INFERENCE_DATA_PRESENT: "$inference_data_present",
  TOUR_LAST_SEEN_DATE: "$product_tour_last_seen_date",
  TOUR_TYPE: "$product_tour_type"
};

// src/rate-limiter.ts
var logger3 = createLogger2("[RateLimiter]");
var ONE_MINUTE_IN_MILLISECONDS = 60 * 1e3;
var RATE_LIMIT_EVENT = "$$client_ingestion_warning";
var DEFAULT_EVENTS_PER_SECOND = 10;
var BURST_LIMIT_MULTIPLIER = 10;
var RateLimiter = class {
  constructor(instance) {
    this.serverLimits = {};
    this.lastEventRateLimited = false;
    this.checkForLimiting = (httpResponse) => {
      const text = httpResponse.text;
      if (!text || !text.length) {
        return;
      }
      try {
        const response = JSON.parse(text);
        const quotaLimitedProducts = response.quota_limited || [];
        quotaLimitedProducts.forEach((batchKey) => {
          logger3.info(`${batchKey || "events"} is quota limited.`);
          this.serverLimits[batchKey] = (/* @__PURE__ */ new Date()).getTime() + ONE_MINUTE_IN_MILLISECONDS;
        });
      } catch (e) {
        logger3.warn(`could not rate limit - continuing. Error: "${e?.message}"`, { text });
        return;
      }
    };
    this.instance = instance;
    this.lastEventRateLimited = this.clientRateLimitContext(true).isRateLimited;
  }
  get captureEventsPerSecond() {
    return this.instance.config.rate_limiting?.events_per_second || DEFAULT_EVENTS_PER_SECOND;
  }
  get captureEventsBurstLimit() {
    return Math.max(
      this.instance.config.rate_limiting?.events_burst_limit || this.captureEventsPerSecond * BURST_LIMIT_MULTIPLIER,
      this.captureEventsPerSecond
    );
  }
  clientRateLimitContext(checkOnly = false) {
    const { captureEventsBurstLimit, captureEventsPerSecond } = this;
    const now = (/* @__PURE__ */ new Date()).getTime();
    const bucket = this.instance.persistence?.get_property(CAPTURE_RATE_LIMIT) ?? {
      tokens: captureEventsBurstLimit,
      last: now
    };
    bucket.tokens += (now - bucket.last) / 1e3 * captureEventsPerSecond;
    bucket.last = now;
    if (bucket.tokens > captureEventsBurstLimit) {
      bucket.tokens = captureEventsBurstLimit;
    }
    const isRateLimited = bucket.tokens < 1;
    if (!isRateLimited && !checkOnly) {
      bucket.tokens = Math.max(0, bucket.tokens - 1);
    }
    if (isRateLimited && !this.lastEventRateLimited && !checkOnly) {
      this.instance.capture(
        RATE_LIMIT_EVENT,
        {
          $$client_ingestion_warning_message: `posthog-js client rate limited. Config is set to ${captureEventsPerSecond} events per second and ${captureEventsBurstLimit} events burst limit.`
        },
        {
          skip_client_rate_limiting: true
        }
      );
    }
    this.lastEventRateLimited = isRateLimited;
    this.instance.persistence?.set_property(CAPTURE_RATE_LIMIT, bucket);
    return {
      isRateLimited,
      remainingTokens: bucket.tokens
    };
  }
  isServerRateLimited(batchKey) {
    const retryAfter = this.serverLimits[batchKey || "events"] || false;
    if (retryAfter === false) {
      return false;
    }
    return (/* @__PURE__ */ new Date()).getTime() < retryAfter;
  }
};

// src/remote-config.ts
var logger4 = createLogger2("[RemoteConfig]");
var DEFAULT_REFRESH_INTERVAL = 5 * 60 * 1e3;
var RemoteConfigLoader = class {
  constructor(_instance) {
    this._instance = _instance;
  }
  get remoteConfig() {
    return assignableWindow._POSTHOG_REMOTE_CONFIG?.[this._instance.config.token]?.config;
  }
  _loadRemoteConfigJs(cb) {
    if (assignableWindow.__PosthogExtensions__?.loadExternalDependency) {
      assignableWindow.__PosthogExtensions__?.loadExternalDependency?.(this._instance, "remote-config", () => {
        return cb(this.remoteConfig);
      });
    } else {
      cb();
    }
  }
  _loadRemoteConfigJSON(cb) {
    this._instance._send_request({
      method: "GET",
      url: this._instance.requestRouter.endpointFor("assets", `/array/${this._instance.config.token}/config`),
      callback: (response) => {
        cb(response.json);
      }
    });
  }
  load() {
    try {
      if (this.remoteConfig) {
        logger4.info("Using preloaded remote config", this.remoteConfig);
        this._onRemoteConfig(this.remoteConfig);
        this._startRefreshInterval();
        return;
      }
      if (this._instance._shouldDisableFlags()) {
        logger4.warn("Remote config is disabled. Falling back to local config.");
        return;
      }
      this._loadRemoteConfigJs((config2) => {
        if (!config2) {
          logger4.info("No config found after loading remote JS config. Falling back to JSON.");
          this._loadRemoteConfigJSON((config3) => {
            this._onRemoteConfig(config3);
            this._startRefreshInterval();
          });
          return;
        }
        this._onRemoteConfig(config2);
        this._startRefreshInterval();
      });
    } catch (error) {
      logger4.error("Error loading remote config", error);
    }
  }
  stop() {
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
      this._refreshInterval = void 0;
    }
  }
  /**
   * Refresh feature flags for long-running sessions.
   * Calls reloadFeatureFlags() directly rather than re-fetching config — the initial
   * config load already determined whether flags are enabled, and reloadFeatureFlags()
   * is a no-op when flags are disabled. This avoids an unnecessary network round-trip.
   */
  refresh() {
    if (this._instance._shouldDisableFlags() || !globals_document || globals_document.visibilityState === "hidden") {
      return;
    }
    this._instance.reloadFeatureFlags();
  }
  _startRefreshInterval() {
    if (this._refreshInterval) {
      return;
    }
    const intervalMs = this._instance.config.remote_config_refresh_interval_ms ?? DEFAULT_REFRESH_INTERVAL;
    if (intervalMs === 0) {
      return;
    }
    this._refreshInterval = setInterval(() => {
      this.refresh();
    }, intervalMs);
  }
  _onRemoteConfig(config2) {
    if (!config2) {
      logger4.error("Failed to fetch remote config from PostHog.");
    }
    this._instance._onRemoteConfig(config2 ? { ok: true, config: config2 } : { ok: false });
    if (config2?.hasFeatureFlags !== false) {
      if (!this._instance.config.advanced_disable_feature_flags_on_first_load) {
        this._instance.featureFlags?.ensureFlagsLoaded();
      }
    }
  }
};

// ../../../../../Library/pnpm/store/v11/links/@/fflate/0.4.8/3d6bb6f51514b78f73eff8bf58c4fef7e18a9483e0eef595f39f3a49c6c31e1d/node_modules/fflate/esm/browser.js
var u8 = Uint8Array;
var u16 = Uint16Array;
var u32 = Uint32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new u32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return [b, r];
};
var _a = freb(fleb, 2);
var fl = _a[0];
var revfl = _a[1];
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b[0];
var revfd = _b[1];
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >>> 1 | (i & 21845) << 1;
  x = (x & 52428) >>> 2 | (x & 13107) << 2;
  x = (x & 61680) >>> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
}
var x;
var i;
var hMap = (function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i)
    ++l[cd[i] - 1];
  var le = new u16(mb);
  for (i = 0; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >>> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i)
      co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i];
  }
  return co;
});
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flm = /* @__PURE__ */ hMap(flt, 9, 0);
var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
var shft = function(p) {
  return (p / 8 >> 0) + (p & 7 && 1);
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  var n = new (v instanceof u16 ? u16 : v instanceof u32 ? u32 : u8)(e - s);
  n.set(v.subarray(s, e));
  return n;
};
var wbits = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 >> 0;
  d[o] |= v;
  d[o + 1] |= v >>> 8;
};
var wbits16 = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 >> 0;
  d[o] |= v;
  d[o + 1] |= v >>> 8;
  d[o + 2] |= v >>> 16;
};
var hTree = function(d, mb) {
  var t = [];
  for (var i = 0; i < d.length; ++i) {
    if (d[i])
      t.push({ s: i, f: d[i] });
  }
  var s = t.length;
  var t2 = t.slice();
  if (!s)
    return [new u8(0), 0];
  if (s == 1) {
    var v = new u8(t[0].s + 1);
    v[t[0].s] = 1;
    return [v, 1];
  }
  t.sort(function(a, b) {
    return a.f - b.f;
  });
  t.push({ s: -1, f: 25001 });
  var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
  t[0] = { s: -1, f: l.f + r.f, l, r };
  while (i1 != s - 1) {
    l = t[t[i0].f < t[i2].f ? i0++ : i2++];
    r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
    t[i1++] = { s: -1, f: l.f + r.f, l, r };
  }
  var maxSym = t2[0].s;
  for (var i = 1; i < s; ++i) {
    if (t2[i].s > maxSym)
      maxSym = t2[i].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i = 0, dt = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t2.sort(function(a, b) {
      return tr[b.s] - tr[a.s] || a.f - b.f;
    });
    for (; i < s; ++i) {
      var i2_1 = t2[i].s;
      if (tr[i2_1] > mb) {
        dt += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt >>>= lft;
    while (dt > 0) {
      var i2_2 = t2[i].s;
      if (tr[i2_2] < mb)
        dt -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i;
    }
    for (; i >= 0 && dt; --i) {
      var i2_3 = t2[i].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt;
      }
    }
    mbt = mb;
  }
  return [new u8(tr), mbt];
};
var ln = function(n, l, d) {
  return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
var lc = function(c) {
  var s = c.length;
  while (s && !c[--s])
    ;
  var cl = new u16(++s);
  var cli = 0, cln = c[0], cls = 1;
  var w = function(v) {
    cl[cli++] = v;
  };
  for (var i = 1; i <= s; ++i) {
    if (c[i] == cln && i != s)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138)
          w(32754);
        if (cls > 2) {
          w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w(cln), --cls;
        for (; cls > 6; cls -= 6)
          w(8304);
        if (cls > 2)
          w(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w(cln);
      cls = 1;
      cln = c[i];
    }
  }
  return [cl.subarray(0, cli), s];
};
var clen = function(cf, cl) {
  var l = 0;
  for (var i = 0; i < cl.length; ++i)
    l += cf[i] * cl[i];
  return l;
};
var wfblk = function(out, pos, dat) {
  var s = dat.length;
  var o = shft(pos + 2);
  out[o] = s & 255;
  out[o + 1] = s >>> 8;
  out[o + 2] = out[o] ^ 255;
  out[o + 3] = out[o + 1] ^ 255;
  for (var i = 0; i < s; ++i)
    out[o + i + 4] = dat[i];
  return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
  wbits(out, p++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2[0], mlb = _a2[1];
  var _b2 = hTree(df, 15), ddt = _b2[0], mdb = _b2[1];
  var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
  var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
  var lcfreq = new u16(19);
  for (var i = 0; i < lclt.length; ++i)
    lcfreq[lclt[i] & 31]++;
  for (var i = 0; i < lcdt.length; ++i)
    lcfreq[lcdt[i] & 31]++;
  var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
  if (flen <= ftlen && flen <= dtlen)
    return wfblk(out, p, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p, nlc - 257);
    wbits(out, p + 5, ndc - 1);
    wbits(out, p + 10, nlcc - 4);
    p += 14;
    for (var i = 0; i < nlcc; ++i)
      wbits(out, p + 3 * i, lct[clim[i]]);
    p += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it = 0; it < 2; ++it) {
      var clct = lcts[it];
      for (var i = 0; i < clct.length; ++i) {
        var len = clct[i] & 31;
        wbits(out, p, llm[len]), p += lct[len];
        if (len > 15)
          wbits(out, p, clct[i] >>> 5 & 127), p += clct[i] >>> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i = 0; i < li; ++i) {
    if (syms[i] > 255) {
      var len = syms[i] >>> 18 & 31;
      wbits16(out, p, lm[len + 257]), p += ll[len + 257];
      if (len > 7)
        wbits(out, p, syms[i] >>> 23 & 31), p += fleb[len];
      var dst = syms[i] & 31;
      wbits16(out, p, dm[dst]), p += dl[dst];
      if (dst > 3)
        wbits16(out, p, syms[i] >>> 5 & 8191), p += fdeb[dst];
    } else {
      wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
    }
  }
  wbits16(out, p, lm[256]);
  return p + ll[256];
};
var deo = /* @__PURE__ */ new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = /* @__PURE__ */ new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, lst) {
  var s = dat.length;
  var o = new u8(pre + s + 5 * (1 + Math.floor(s / 7e3)) + post);
  var w = o.subarray(pre, o.length - post);
  var pos = 0;
  if (!lvl || s < 8) {
    for (var i = 0; i <= s; i += 65535) {
      var e = i + 65535;
      if (e < s) {
        pos = wfblk(w, pos, dat.subarray(i, e));
      } else {
        w[i] = lst;
        pos = wfblk(w, pos, dat.subarray(i, s));
      }
    }
  } else {
    var opt = deo[lvl - 1];
    var n = opt >>> 13, c = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = new u16(32768), head = new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i2) {
      return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
    };
    var syms = new u32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
    for (; i < s; ++i) {
      var hv = hsh(i);
      var imod = i & 32767;
      var pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i) {
        var rem = s - i;
        if ((lc_1 > 7e3 || li > 24576) && rem > 423) {
          pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
          li = lc_1 = eb = 0, bs = i;
          for (var j = 0; j < 286; ++j)
            lf[j] = 0;
          for (var j = 0; j < 30; ++j)
            df[j] = 0;
        }
        var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i - dif)) {
          var maxn = Math.min(n, rem) - 1;
          var maxd = Math.min(32767, i);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i + l] == dat[i + l - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                ;
              if (nl > l) {
                l = nl, d = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j = 0; j < mmd; ++j) {
                  var ti = i - dif + j + 32768 & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti + 32768 & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod + 32768 & 32767;
          }
        }
        if (d) {
          syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
          var lin = revfl[l] & 31, din = revfd[d] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i + l;
          ++lc_1;
        } else {
          syms[li++] = dat[i];
          ++lf[dat[i]];
        }
      }
    }
    pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
    if (!lst)
      pos = wfblk(w, pos, et);
  }
  return slc(o, 0, pre + shft(pos) + post);
};
var crct = /* @__PURE__ */ (function() {
  var t = new u32(256);
  for (var i = 0; i < 256; ++i) {
    var c = i, k = 9;
    while (--k)
      c = (c & 1 && 3988292384) ^ c >>> 1;
    t[i] = c;
  }
  return t;
})();
var crc = function() {
  var c = 4294967295;
  return {
    p: function(d) {
      var cr = c;
      for (var i = 0; i < d.length; ++i)
        cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
      c = cr;
    },
    d: function() {
      return c ^ 4294967295;
    }
  };
};
var dopt = function(dat, opt, pre, post, st) {
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 12 + opt.mem, pre, post, !st);
};
var wbytes = function(d, b, v) {
  for (; v; ++b)
    d[b] = v, v >>>= 8;
};
var gzh = function(c, o) {
  var fn = o.filename;
  c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3;
  if (o.mtime != 0)
    wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1e3));
  if (fn) {
    c[3] = 8;
    for (var i = 0; i <= fn.length; ++i)
      c[i + 10] = fn.charCodeAt(i);
  }
};
var gzhl = function(o) {
  return 10 + (o.filename && o.filename.length + 1 || 0);
};
function gzipSync(data, opts) {
  if (opts === void 0) {
    opts = {};
  }
  var c = crc(), l = data.length;
  c.p(data);
  var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
  return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
}
function strToU8(str, latin1) {
  var l = str.length;
  if (!latin1 && typeof TextEncoder != "undefined")
    return new TextEncoder().encode(str);
  var ar = new u8(str.length + (str.length >>> 1));
  var ai = 0;
  var w = function(v) {
    ar[ai++] = v;
  };
  for (var i = 0; i < l; ++i) {
    if (ai + 5 > ar.length) {
      var n = new u8(ai + 8 + (l - i << 1));
      n.set(ar);
      ar = n;
    }
    var c = str.charCodeAt(i);
    if (c < 128 || latin1)
      w(c);
    else if (c < 2048)
      w(192 | c >>> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >>> 18), w(128 | c >>> 12 & 63), w(128 | c >>> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >>> 12), w(128 | c >>> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}

// ../browser-common/dist/utils/encode-utils.mjs
function _base64Encode(data) {
  if (!data) return data;
  return btoa(encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
}

// src/request.ts
var SUPPORTS_REQUEST = !!XMLHttpRequest || !!fetch2;
var CONTENT_TYPE_PLAIN = "text/plain";
var CONTENT_TYPE_JSON = "application/json";
var CONTENT_TYPE_FORM = "application/x-www-form-urlencoded";
var SIXTY_FOUR_KILOBYTES = 64 * 1024;
var KEEP_ALIVE_THRESHOLD = SIXTY_FOUR_KILOBYTES * 0.8;
var nativeAsyncGzipDisabled = false;
var removeURLParam = (url, param) => {
  const [urlWithoutHash, hash] = url.split("#");
  const [baseUrl, search] = urlWithoutHash.split("?");
  if (!search) {
    return url;
  }
  const updatedSearch = search.split("&").filter((pair) => pair.split("=")[0] !== param).join("&");
  return `${baseUrl}${updatedSearch ? `?${updatedSearch}` : ""}${hash ? `#${hash}` : ""}`;
};
var extendURLParams = (url, params, replace = true) => {
  const [baseUrl, search] = url.split("?");
  const newParams = { ...params };
  const updatedSearch = search?.split("&").map((pair) => {
    const [key, origValue] = pair.split("=");
    const value = replace ? newParams[key] ?? origValue : origValue;
    delete newParams[key];
    return `${key}=${value}`;
  }) ?? [];
  const remaining = formDataToQuery(newParams);
  if (remaining) {
    updatedSearch.push(remaining);
  }
  return updatedSearch.length > 0 ? `${baseUrl}?${updatedSearch.join("&")}` : baseUrl;
};
var encodeToDataString = (data) => {
  return "data=" + encodeURIComponent(typeof data === "string" ? data : jsonStringify(data));
};
var encodePostData = (options) => {
  if (options._encodedBody) {
    return options._encodedBody;
  }
  const { data, compression } = options;
  if (!data) {
    return;
  }
  if (compression === Compression.GZipJS) {
    const gzipData = gzipSync(strToU8(jsonStringify(data)), { mtime: 0 });
    return {
      contentType: CONTENT_TYPE_PLAIN,
      body: gzipData.buffer.slice(gzipData.byteOffset, gzipData.byteOffset + gzipData.byteLength),
      estimatedSize: gzipData.byteLength
    };
  }
  if (compression === Compression.Base64) {
    const b64data = _base64Encode(jsonStringify(data));
    const encodedBody = encodeToDataString(b64data);
    return {
      contentType: CONTENT_TYPE_FORM,
      body: encodedBody,
      estimatedSize: new Blob([encodedBody]).size
    };
  }
  const jsonBody = jsonStringify(data);
  return {
    contentType: CONTENT_TYPE_JSON,
    body: jsonBody,
    estimatedSize: new Blob([jsonBody]).size
  };
};
var encodePostDataSafely = (options) => {
  const fallbackToUncompressed = () => {
    if (options.transport === "sendBeacon") {
      return {
        url: extendURLParams(options.url, { compression: Compression.Base64 }),
        encodedBody: encodePostData({
          ...options,
          compression: Compression.Base64,
          _encodedBody: void 0
        })
      };
    }
    return {
      url: removeURLParam(options.url, "compression"),
      encodedBody: encodePostData({
        ...options,
        compression: void 0,
        _encodedBody: void 0
      })
    };
  };
  let encodedBody;
  try {
    encodedBody = encodePostData(options);
  } catch (error) {
    if (isGzipRequest(options.compression, getQueryParam(options.url, "compression"))) {
      logger_logger.error("Failed to gzip request body, sending uncompressed payload", error);
      return fallbackToUncompressed();
    }
    throw error;
  }
  if (!encodedBody || !isGzipRequest(options.compression, getQueryParam(options.url, "compression")) || isGzipData(encodedBody.body)) {
    return { url: options.url, encodedBody };
  }
  nativeAsyncGzipDisabled = true;
  return fallbackToUncompressed();
};
var encodeRequest = (options) => {
  try {
    return encodePostDataSafely(options);
  } catch (error) {
    logger_logger.error(error);
    options.callback?.({ statusCode: 0, error });
    return void 0;
  }
};
var preEncodeAsync = async (options) => {
  const jsonData = jsonStringify(options.data);
  const compressed = await gzipCompress(jsonData, config_default.DEBUG, { rethrow: true });
  if (!compressed) {
    return options;
  }
  const body = await compressed.arrayBuffer();
  return {
    ...options,
    _encodedBody: {
      contentType: CONTENT_TYPE_PLAIN,
      body,
      estimatedSize: body.byteLength
    }
  };
};
var timeoutAbortReason = (timeout) => {
  const reason = new Error(`PostHog request timed out${timeout ? ` after ${timeout}ms` : ""}`);
  reason.name = "AbortError";
  return reason;
};
var NETWORK_ERROR_MESSAGES = /Failed to fetch|NetworkError|Load failed/i;
var isExpectedNetworkError = (error) => {
  const err = error;
  return err?.name === "TypeError" && NETWORK_ERROR_MESSAGES.test(err?.message || "");
};
var xhr = (options) => {
  const encodedRequest = encodeRequest(options);
  if (!encodedRequest) {
    return;
  }
  const req = new XMLHttpRequest();
  const { url, encodedBody } = encodedRequest;
  req.open(options.method || "GET", url, true);
  const { contentType, body } = encodedBody ?? {};
  each(options.headers, function(headerValue, headerName) {
    req.setRequestHeader(headerName, headerValue);
  });
  if (contentType) {
    req.setRequestHeader("Content-Type", contentType);
  }
  if (options.timeout) {
    req.timeout = options.timeout;
  }
  req.onreadystatechange = () => {
    if (req.readyState === 4) {
      const response = {
        statusCode: req.status,
        text: req.responseText
      };
      if (req.status === 200) {
        try {
          response.json = JSON.parse(req.responseText);
        } catch {
        }
      }
      options.callback?.(response);
    }
  };
  req.send(body);
};
var _fetch = (options) => {
  const encodedRequest = encodeRequest(options);
  if (!encodedRequest) {
    return;
  }
  const { url, encodedBody } = encodedRequest;
  const { contentType, body, estimatedSize } = encodedBody ?? {};
  const headers = new Headers();
  each(options.headers, function(headerValue, headerName) {
    headers.append(headerName, headerValue);
  });
  if (contentType) {
    headers.append("Content-Type", contentType);
  }
  let aborter = null;
  let timedOut = false;
  if (AbortController2) {
    const controller = new AbortController2();
    aborter = {
      signal: controller.signal,
      timeout: setTimeout(() => {
        timedOut = true;
        controller.abort(timeoutAbortReason(options.timeout));
      }, options.timeout)
    };
  }
  const handleError = (error) => {
    if (timedOut && error?.name === "AbortError" || isExpectedNetworkError(error)) {
      logger_logger.warn(error);
    } else {
      logger_logger.error(error);
    }
    options.callback?.({ statusCode: 0, error });
  };
  try {
    fetch2(url, {
      method: options?.method || "GET",
      headers,
      // if body is greater than 64kb, then fetch with keepalive will error
      // see 8:10:5 at https://fetch.spec.whatwg.org/#http-network-or-cache-fetch,
      // but we do want to set keepalive sometimes as it can  help with success
      // when e.g. a page is being closed
      // so let's get the best of both worlds and only set keepalive for POST requests
      // where the body is less than 64kb
      // NB this is fetch keepalive and not http keepalive
      // _keepaliveDisabled: a beacon-rejected payload would fail a keepalive fetch too (shared quota)
      keepalive: options.method === "POST" && !options._keepaliveDisabled && (estimatedSize || 0) < KEEP_ALIVE_THRESHOLD,
      body,
      signal: aborter?.signal,
      ...options.fetchOptions
    }).then((response) => {
      return response.text().then((responseText) => {
        const res = {
          statusCode: response.status,
          text: responseText
        };
        if (response.status === 200) {
          try {
            res.json = JSON.parse(responseText);
          } catch (e) {
            logger_logger.error(e);
          }
        }
        options.callback?.(res);
      });
    }).catch(handleError).finally(() => aborter ? clearTimeout(aborter.timeout) : null);
  } catch (error) {
    if (aborter) {
      clearTimeout(aborter.timeout);
    }
    handleError(error);
  }
  return;
};
var BEACON_SPLIT_FLOOR_BYTES = 16 * 1024;
var _sendBeacon = (options) => {
  try {
    const { url, encodedBody } = encodePostDataSafely(options);
    const { contentType, body, estimatedSize } = encodedBody ?? {};
    if (!body) {
      return;
    }
    const sendBeaconBody = body instanceof Blob ? body : new Blob([body], { type: contentType });
    if (globals_navigator.sendBeacon(url, sendBeaconBody)) {
      return;
    }
    const batch = isArray(options.data) ? options.data : options.data?.batch;
    if (isArray(batch) && batch.length > 1 && (estimatedSize ?? 0) > BEACON_SPLIT_FLOOR_BYTES) {
      const mid = Math.ceil(batch.length / 2);
      const splitData = (events) => isArray(options.data) ? events : { ...options.data, batch: events };
      _sendBeacon({ ...options, data: splitData(batch.slice(0, mid)) });
      _sendBeacon({ ...options, data: splitData(batch.slice(mid)) });
      return;
    }
    logger_logger.warn(`Beacon of ~${estimatedSize ?? 0} bytes was rejected by the browser, falling back to fetch`);
    _fetch({ ...options, _keepaliveDisabled: true });
  } catch (error) {
    logger_logger.warn("Beacon send failed", error);
  }
};
var buildRequestURL = (url, method, compression, timestampMode) => {
  const timestampParam = timestampMode === "query" ? method === "POST" ? "sent_at" : "_" : void 0;
  return extendURLParams(compression === Compression.GZipJS ? removeURLParam(url, "compression") : url, {
    ...timestampParam ? { [timestampParam]: Date.now().toString() } : {},
    ...compression === Compression.GZipJS ? {} : { compression }
  });
};
var addSentAtToCaptureBody = (data) => {
  const batch = isArray(data) ? data : [data];
  const firstEvent = batch[0];
  return {
    api_key: firstEvent?.properties?.token ?? firstEvent?.token,
    batch,
    sent_at: (/* @__PURE__ */ new Date()).toISOString()
  };
};
var AVAILABLE_TRANSPORTS = [];
if (fetch2) {
  AVAILABLE_TRANSPORTS.push({
    transport: "fetch",
    method: _fetch
  });
}
if (XMLHttpRequest) {
  AVAILABLE_TRANSPORTS.push({
    transport: "XHR",
    method: xhr
  });
}
if (globals_navigator?.sendBeacon) {
  AVAILABLE_TRANSPORTS.push({
    transport: "sendBeacon",
    method: _sendBeacon
  });
}
var request = (_options) => {
  const options = { ..._options };
  options.timeout = options.timeout || 6e4;
  const transport = options.transport ?? "fetch";
  if (transport === "sendBeacon" && isUndefined(options.compression) && options.data) {
    options.compression = Compression.Base64;
  }
  if (options.method === "POST" && options.data) {
    if (options.timestampMode === "capture-body") {
      options.data = addSentAtToCaptureBody(options.data);
    } else if (options.timestampMode === "body" && !isArray(options.data)) {
      options.data = { ...options.data, sent_at: (/* @__PURE__ */ new Date()).toISOString() };
    }
  }
  options.url = buildRequestURL(options.url, options.method, options.compression, options.timestampMode);
  const availableTransports = AVAILABLE_TRANSPORTS.filter(
    (t) => !options.disableTransport || !t.transport || !options.disableTransport.includes(t.transport)
  );
  const transportMethod = find(availableTransports, (t) => t.transport === transport)?.method ?? availableTransports[0].method;
  if (!transportMethod) {
    throw new Error("No available transport method");
  }
  if (transport !== "sendBeacon" && options.data && options.compression === Compression.GZipJS && !!CompressionStream && typeof Promise !== "undefined" && !nativeAsyncGzipDisabled) {
    preEncodeAsync(options).then((encodedOptions) => {
      transportMethod(encodedOptions);
    }).catch((error) => {
      if (isNativeAsyncGzipReadError(error)) {
        nativeAsyncGzipDisabled = true;
        transportMethod({
          ...options,
          compression: void 0,
          url: buildRequestURL(_options.url, _options.method, void 0, _options.timestampMode)
        });
        return;
      }
      if (isNativeAsyncGzipError(error)) {
        nativeAsyncGzipDisabled = true;
      }
      transportMethod(options);
    });
  } else {
    transportMethod(options);
  }
};

// src/request-queue.ts
var DEFAULT_FLUSH_INTERVAL_MS = 3e3;
var RequestQueue = class {
  constructor(sendRequest, config2) {
    // We start in a paused state and only start flushing when enabled by the parent
    this._isPaused = true;
    this._queue = [];
    this._flushTimeoutMs = clampToRange(
      config2?.flush_interval_ms || DEFAULT_FLUSH_INTERVAL_MS,
      250,
      5e3,
      logger_logger.createLogger("flush interval"),
      DEFAULT_FLUSH_INTERVAL_MS
    );
    this._sendRequest = sendRequest;
  }
  enqueue(req) {
    this._queue.push(req);
    if (!this._flushTimeout) {
      this._setFlushTimeout();
    }
  }
  unload() {
    this._clearFlushTimeout();
    const requests = this._queue.length > 0 ? this._formatQueue() : {};
    const requestValues = Object.values(requests);
    const sortedRequests = [
      ...requestValues.filter((r) => r.url.indexOf("/e") === 0),
      ...requestValues.filter((r) => r.url.indexOf("/e") !== 0)
    ];
    sortedRequests.map((req) => {
      this._sendRequestSafely({ ...req, transport: "sendBeacon" });
    });
  }
  enable() {
    this._isPaused = false;
    this._setFlushTimeout();
  }
  _setFlushTimeout() {
    if (this._isPaused) {
      return;
    }
    this._flushTimeout = setTimeout(() => {
      this._clearFlushTimeout();
      if (this._queue.length > 0) {
        const requests = this._formatQueue();
        for (const key in requests) {
          const req = requests[key];
          const now = (/* @__PURE__ */ new Date()).getTime();
          if (req.data && isArray(req.data)) {
            each(req.data, (data) => {
              data["offset"] = Math.abs(data["timestamp"] - now);
              delete data["timestamp"];
            });
          }
          this._sendRequestSafely(req);
        }
      }
    }, this._flushTimeoutMs);
  }
  _sendRequestSafely(req) {
    try {
      this._sendRequest(req);
    } catch (error) {
      logger_logger.error(error);
    }
  }
  _clearFlushTimeout() {
    clearTimeout(this._flushTimeout);
    this._flushTimeout = void 0;
  }
  _formatQueue() {
    const requests = {};
    each(this._queue, (request2) => {
      const req = request2;
      const key = (req ? req.batchKey : null) || req.url;
      if (isUndefined(requests[key])) {
        requests[key] = { ...req, data: [] };
      }
      requests[key].data?.push(req.data);
    });
    this._queue = [];
    return requests;
  }
};

// src/retry-queue.ts
var thirtyMinutes = 30 * 60 * 1e3;
var DEFAULT_MAX_RETRIES = 10;
var STATUS_CODE_ZERO_MAX_RETRIES = 3;
function pickNextRetryDelay(retriesPerformedSoFar) {
  const rawBackoffTime = 3e3 * 2 ** retriesPerformedSoFar;
  const minBackoff = rawBackoffTime / 2;
  const cappedBackoffTime = Math.min(thirtyMinutes, rawBackoffTime);
  const jitterFraction = Math.random() - 0.5;
  const jitter = jitterFraction * (cappedBackoffTime - minBackoff);
  return Math.ceil(cappedBackoffTime + jitter);
}
var RetryQueue = class {
  constructor(_instance) {
    this._instance = _instance;
    this._isPolling = false;
    this._pollIntervalMs = 3e3;
    this._queue = [];
    this._queue = [];
    this._areWeOnline = true;
    if (!isUndefined(win) && "onLine" in win.navigator) {
      this._areWeOnline = win.navigator.onLine;
      this._onlineListener = () => {
        this._areWeOnline = true;
        this._flush();
      };
      this._offlineListener = () => {
        this._areWeOnline = false;
      };
      addEventListener(win, "online", this._onlineListener);
      addEventListener(win, "offline", this._offlineListener);
    }
  }
  get length() {
    return this._queue.length;
  }
  retriableRequest({ retriesPerformedSoFar, ...options }) {
    if (isPositiveNumber(retriesPerformedSoFar)) {
      options.url = extendURLParams(options.url, { retry_count: retriesPerformedSoFar });
    }
    this._instance._send_request({
      ...options,
      callback: (response) => {
        if (response.statusCode !== 200 && (response.statusCode < 400 || response.statusCode >= 500)) {
          const maxRetries = response.statusCode === 0 ? STATUS_CODE_ZERO_MAX_RETRIES : DEFAULT_MAX_RETRIES;
          if ((retriesPerformedSoFar ?? 0) < maxRetries) {
            this._enqueue({
              retriesPerformedSoFar,
              ...options
            });
            return;
          }
          if (response.statusCode === 0) {
            logger_logger.warn(
              `Request failed before receiving an HTTP response; this can happen due to network issues, CORS, browser blocking, or ad blockers. Stopped retrying after ${retriesPerformedSoFar ?? 0} retries.`
            );
          }
        }
        options.callback?.(response);
      }
    });
  }
  _enqueue(requestOptions) {
    const retriesPerformedSoFar = requestOptions.retriesPerformedSoFar || 0;
    requestOptions.retriesPerformedSoFar = retriesPerformedSoFar + 1;
    const msToNextRetry = pickNextRetryDelay(retriesPerformedSoFar);
    const retryAt = Date.now() + msToNextRetry;
    this._queue.push({ retryAt, requestOptions });
    let logMessage = `Enqueued failed request for retry in ${msToNextRetry}`;
    if (!navigator.onLine) {
      logMessage += " (Browser is offline)";
    }
    logger_logger.warn(logMessage);
    if (!this._isPolling) {
      this._isPolling = true;
      this._poll();
    }
  }
  _poll() {
    this._poller && clearTimeout(this._poller);
    if (this._queue.length === 0) {
      this._isPolling = false;
      this._poller = void 0;
      return;
    }
    this._poller = setTimeout(() => {
      if (this._areWeOnline && this._queue.length > 0) {
        this._flush();
      }
      this._poll();
    }, this._pollIntervalMs);
  }
  _flush() {
    const now = Date.now();
    const notToFlush = [];
    const toFlush = this._queue.filter((item) => {
      if (item.retryAt < now) {
        return true;
      }
      notToFlush.push(item);
      return false;
    });
    this._queue = notToFlush;
    if (toFlush.length > 0) {
      for (const { requestOptions } of toFlush) {
        this.retriableRequest(requestOptions);
      }
    }
  }
  unload() {
    if (this._poller) {
      clearTimeout(this._poller);
      this._poller = void 0;
    }
    this._isPolling = false;
    if (!isUndefined(win)) {
      if (this._onlineListener) {
        win.removeEventListener("online", this._onlineListener);
        this._onlineListener = void 0;
      }
      if (this._offlineListener) {
        win.removeEventListener("offline", this._offlineListener);
        this._offlineListener = void 0;
      }
    }
    for (const { requestOptions } of this._queue) {
      try {
        this._instance._send_request({
          ...requestOptions,
          transport: "sendBeacon"
        });
      } catch (e) {
        logger_logger.error(e);
      }
    }
    this._queue = [];
  }
};

// src/scroll-manager.ts
var ScrollManager = class {
  constructor(_instance) {
    this._instance = _instance;
    this._updateScrollData = () => {
      if (!this._context) {
        this._context = {};
      }
      const el = this.scrollElement();
      const scrollY = this.scrollY();
      const scrollHeight = el ? Math.max(0, el.scrollHeight - el.clientHeight) : 0;
      const contentY = scrollY + (el?.clientHeight || 0);
      const contentHeight = el?.scrollHeight || 0;
      this._context.lastScrollY = Math.ceil(scrollY);
      this._context.maxScrollY = Math.max(scrollY, this._context.maxScrollY ?? 0);
      this._context.maxScrollHeight = Math.max(scrollHeight, this._context.maxScrollHeight ?? 0);
      this._context.lastContentY = contentY;
      this._context.maxContentY = Math.max(contentY, this._context.maxContentY ?? 0);
      this._context.maxContentHeight = Math.max(contentHeight, this._context.maxContentHeight ?? 0);
    };
  }
  get _scrollRoot() {
    return this._instance.config.scroll_root_selector;
  }
  getContext() {
    return this._context;
  }
  resetContext() {
    const ctx = this._context;
    setTimeout(this._updateScrollData, 0);
    return ctx;
  }
  // `capture: true` is required to get scroll events for other scrollable elements
  // on the page, not just the window
  // see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#usecapture
  startMeasuringScrollPosition() {
    addEventListener(win, "scroll", this._updateScrollData, { capture: true });
    addEventListener(win, "scrollend", this._updateScrollData, { capture: true });
    addEventListener(win, "resize", this._updateScrollData);
  }
  scrollElement() {
    if (this._scrollRoot) {
      const selectors = isArray(this._scrollRoot) ? this._scrollRoot : [this._scrollRoot];
      for (const selector of selectors) {
        const element = win?.document.querySelector(selector);
        if (element) {
          return element;
        }
      }
      return void 0;
    } else {
      return win?.document.documentElement;
    }
  }
  _scrollPosition(axis) {
    const elementKey = axis === "y" ? "scrollTop" : "scrollLeft";
    if (this._scrollRoot) {
      const element = this.scrollElement();
      return element && element[elementKey] || 0;
    }
    if (!win) {
      return 0;
    }
    return axis === "y" ? win.scrollY || win.pageYOffset || win.document.documentElement.scrollTop || 0 : win.scrollX || win.pageXOffset || win.document.documentElement.scrollLeft || 0;
  }
  scrollY() {
    return this._scrollPosition("y");
  }
  scrollX() {
    return this._scrollPosition("x");
  }
};

// src/session-props.ts
var generateSessionSourceParams = (posthog) => {
  return getPersonInfo(
    posthog?.config.mask_personal_data_properties,
    posthog?.config.custom_personal_data_properties,
    posthog?.config.disable_capture_url_hashes
  );
};
var SessionPropsManager = class {
  constructor(instance, sessionIdManager, persistence, sessionSourceParamGenerator) {
    this._onSessionIdCallback = (sessionId) => {
      const stored = this._getStored();
      if (stored && stored.sessionId === sessionId) {
        return;
      }
      const newProps = {
        sessionId,
        props: this._sessionSourceParamGenerator(this._instance)
      };
      this._persistence.register({ [CLIENT_SESSION_PROPS]: newProps });
    };
    this._instance = instance;
    this._sessionIdManager = sessionIdManager;
    this._persistence = persistence;
    this._sessionSourceParamGenerator = sessionSourceParamGenerator || generateSessionSourceParams;
    this._sessionIdManager.onSessionId(this._onSessionIdCallback);
  }
  _getStored() {
    return this._persistence.props[CLIENT_SESSION_PROPS];
  }
  getSetOnceProps() {
    const p = this._getStored()?.props;
    if (!p) {
      return {};
    }
    if ("r" in p) {
      return getPersonPropsFromInfo(p, this._instance.config.disable_capture_url_hashes);
    } else {
      return {
        $referring_domain: p.referringDomain,
        $pathname: p.initialPathName,
        utm_source: p.utm_source,
        utm_campaign: p.utm_campaign,
        utm_medium: p.utm_medium,
        utm_content: p.utm_content,
        utm_term: p.utm_term
      };
    }
  }
  getSessionProps() {
    const p = {};
    each(stripEmptyProperties(this.getSetOnceProps()), (v, k) => {
      if (k === "$current_url") {
        k = "url";
      }
      p[`$session_entry_${stripLeadingDollar(k)}`] = v;
    });
    return p;
  }
};

// ../browser-common/dist/utils/simple-event-emitter.mjs
var SimpleEventEmitter2 = class {
  on(event, listener) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(listener);
    return () => {
      this._events[event] = this._events[event].filter((x) => x !== listener);
    };
  }
  emit(event, payload) {
    for (const listener of this._events[event] || []) listener(payload);
    for (const listener of this._events["*"] || []) listener(event, payload);
  }
  constructor() {
    this._events = {};
  }
};

// src/sessionid.ts
var logger5 = createLogger2("[SessionId]");
var DEFAULT_SESSION_IDLE_TIMEOUT_SECONDS = 30 * 60;
var MAX_SESSION_IDLE_TIMEOUT_SECONDS = 10 * 60 * 60;
var MIN_SESSION_IDLE_TIMEOUT_SECONDS = 60;
var SESSION_LENGTH_LIMIT_MILLISECONDS = 24 * 3600 * 1e3;
var ACTIVITY_TIMESTAMP_PERSIST_GRANULARITY_MS = 5e3;
var SessionIdManager = class {
  constructor(instance, sessionIdGenerator, windowIdGenerator) {
    this._lastPersistedActivityTimestamp = null;
    this._sessionIdChangedHandlers = [];
    this._beforeUnloadListener = void 0;
    // Flipped to true by `destroy()` so a setTimeout callback that is
    // already queued can't re-arm itself onto a torn-down instance.
    this._destroyed = false;
    this._eventEmitter = new SimpleEventEmitter2();
    this._sessionHasBeenIdleTooLong = (timestamp, lastActivityTimestamp) => {
      if (!isPositiveNumber(timestamp) || !isPositiveNumber(lastActivityTimestamp)) {
        return false;
      }
      return Math.abs(timestamp - lastActivityTimestamp) > this.sessionTimeoutMs;
    };
    if (!instance.persistence) {
      throw new Error("SessionIdManager requires a PostHogPersistence instance");
    }
    if (instance.config.cookieless_mode === COOKIELESS_ALWAYS) {
      throw new Error('SessionIdManager cannot be used with cookieless_mode="always"');
    }
    this._config = instance.config;
    this._persistence = instance.persistence;
    this._windowId = void 0;
    this._sessionId = void 0;
    this._sessionStartTimestamp = null;
    this._sessionActivityTimestamp = null;
    this._sessionIdGenerator = sessionIdGenerator || uuidv72;
    this._windowIdGenerator = windowIdGenerator || uuidv72;
    const persistenceName = this._config["persistence_name"] || this._config["token"];
    const desiredTimeout = this._config["session_idle_timeout_seconds"] || DEFAULT_SESSION_IDLE_TIMEOUT_SECONDS;
    this._sessionTimeoutMs = clampToRange(
      desiredTimeout,
      MIN_SESSION_IDLE_TIMEOUT_SECONDS,
      MAX_SESSION_IDLE_TIMEOUT_SECONDS,
      logger5.createLogger("session_idle_timeout_seconds"),
      DEFAULT_SESSION_IDLE_TIMEOUT_SECONDS
    ) * 1e3;
    instance.register({ $configured_session_timeout_ms: this._sessionTimeoutMs });
    this._resetIdleTimer();
    this._window_id_storage_key = "ph_" + persistenceName + "_window_id";
    this._primary_window_exists_storage_key = "ph_" + persistenceName + "_primary_window_exists";
    if (this._canUseSessionStorage()) {
      const lastWindowId = sessionStore._parse(this._window_id_storage_key);
      const primaryWindowExists = sessionStore._parse(this._primary_window_exists_storage_key);
      if (lastWindowId && !primaryWindowExists) {
        this._windowId = lastWindowId;
      } else {
        sessionStore._remove(this._window_id_storage_key);
      }
      sessionStore._set(this._primary_window_exists_storage_key, true);
    }
    if (this._config.bootstrap?.sessionID) {
      try {
        const sessionStartTimestamp = uuid7ToTimestampMs(this._config.bootstrap.sessionID);
        this._setSessionId(this._config.bootstrap.sessionID, (/* @__PURE__ */ new Date()).getTime(), sessionStartTimestamp);
      } catch (e) {
        logger5.error("Invalid sessionID in bootstrap", e);
      }
    }
    this._listenToReloadWindow();
  }
  on(event, handler) {
    return this._eventEmitter.on(event, handler);
  }
  get sessionTimeoutMs() {
    return this._sessionTimeoutMs;
  }
  onSessionId(callback) {
    if (isUndefined(this._sessionIdChangedHandlers)) {
      this._sessionIdChangedHandlers = [];
    }
    this._sessionIdChangedHandlers.push(callback);
    if (this._sessionId) {
      callback(this._sessionId, this._windowId);
    }
    return () => {
      this._sessionIdChangedHandlers = this._sessionIdChangedHandlers.filter((h) => h !== callback);
    };
  }
  _canUseSessionStorage() {
    return this._config.persistence !== "memory" && !this._persistence._disabled && sessionStore._is_supported();
  }
  // Note: this tries to store the windowId in sessionStorage. SessionStorage is unique to the current window/tab,
  // and persists page loads/reloads. So it's uniquely suited for storing the windowId. This function also respects
  // when persistence is disabled (by user config) and when sessionStorage is not supported (it *should* be supported on all browsers),
  // and in that case, it falls back to memory (which sadly, won't persist page loads)
  _setWindowId(windowId) {
    if (windowId !== this._windowId) {
      this._windowId = windowId;
      if (this._canUseSessionStorage()) {
        sessionStore._set(this._window_id_storage_key, windowId);
      }
    }
  }
  _getWindowId() {
    if (this._windowId) {
      return this._windowId;
    }
    if (this._canUseSessionStorage()) {
      return sessionStore._parse(this._window_id_storage_key);
    }
    return null;
  }
  _isActivityChangeBelowGranularity(newActivityTimestamp) {
    const lastPersisted = this._lastPersistedActivityTimestamp;
    if (isNull(lastPersisted) || isNull(newActivityTimestamp)) {
      return false;
    }
    return Math.abs(newActivityTimestamp - lastPersisted) < ACTIVITY_TIMESTAMP_PERSIST_GRANULARITY_MS;
  }
  // Note: 'this.persistence.register' can be disabled in the config.
  // In that case, this works by storing sessionId and the timestamp in memory.
  _setSessionId(sessionId, sessionActivityTimestamp, sessionStartTimestamp) {
    const idChanged = sessionId !== this._sessionId;
    const startChanged = sessionStartTimestamp !== this._sessionStartTimestamp;
    const activityChanged = sessionActivityTimestamp !== this._sessionActivityTimestamp;
    const isActivityOnlyChange = !idChanged && !startChanged;
    this._sessionStartTimestamp = sessionStartTimestamp;
    this._sessionActivityTimestamp = sessionActivityTimestamp;
    this._sessionId = sessionId;
    if (isActivityOnlyChange && !activityChanged) {
      return;
    }
    if (isActivityOnlyChange && this._isActivityChangeBelowGranularity(sessionActivityTimestamp)) {
      return;
    }
    this._lastPersistedActivityTimestamp = sessionActivityTimestamp;
    this._persistence.register({
      [SESSION_ID]: [sessionActivityTimestamp, sessionId, sessionStartTimestamp]
    });
  }
  // Gates the debounce-specific cross-tab storage mechanics. The cross-tab
  // refresh on the idle path, the idle-timer re-arm, sibling-session
  // adoption, and `onSessionId` emission all run for all callers — only the
  // per-key SESSION_ID refresh (vs the legacy whole-blob flush()+load(),
  // which can only clobber a sibling when there is a pending debounced
  // write) is gated on debounce being enabled. The dated default
  // (>= 2026-05-30) enables debounce, so the per-key path ships with it;
  // debounce-disabled callers keep the safe legacy refresh.
  _useCrossTabRefreshHardening() {
    const debounce = this._config?.persistence_save_debounce_ms;
    return isPositiveNumber(debounce) && debounce > 0;
  }
  // Refresh this tab's SESSION_ID view from storage to pick up a sibling
  // tab's writes. With debounce enabled, pull only the SESSION_ID slot — a
  // whole-blob flush() would clobber the sibling's SESSION_ID write before
  // we read it. With debounce disabled, flush() is a no-op (no pending
  // timer) so the legacy whole-blob load() is safe and picks up sibling
  // writes.
  _refreshSessionIdFromStorage() {
    if (this._useCrossTabRefreshHardening()) {
      this._persistence.refreshKey(SESSION_ID);
    } else {
      this._persistence.flush();
      this._persistence.load();
    }
  }
  // Called from destroy / beforeunload so a tab close inside the throttle
  // window doesn't leave the persisted activity timestamp stale.
  _flushPendingActivityTimestamp() {
    if (isNull(this._sessionActivityTimestamp) || this._sessionActivityTimestamp === this._lastPersistedActivityTimestamp) {
      return;
    }
    this._refreshSessionIdFromStorage();
    const [, persistedSessionId, persistedStart] = this._getSessionId();
    if (persistedSessionId !== this._sessionId || persistedStart !== this._sessionStartTimestamp) {
      return;
    }
    this._lastPersistedActivityTimestamp = this._sessionActivityTimestamp;
    this._persistence.register({
      [SESSION_ID]: [this._sessionActivityTimestamp, this._sessionId ?? null, this._sessionStartTimestamp]
    });
    this._persistence.flush();
  }
  // `max` because either view can be ahead: the throttle holds in-memory
  // ahead of persisted, and a sibling tab can hold persisted ahead of a
  // frozen in-memory.
  _freshestActivityTimestamp() {
    const [persistedActivity] = this._getSessionId();
    const persisted = isPositiveNumber(persistedActivity) ? persistedActivity : 0;
    const inMemory = isPositiveNumber(this._sessionActivityTimestamp) ? this._sessionActivityTimestamp : 0;
    return Math.max(persisted, inMemory);
  }
  // PostHogPersistence does not listen for `storage` events, so this tab's
  // cached props lag sibling tabs' writes. Refresh before deciding idle so a
  // sibling keeping the session alive isn't seen as idle here.
  _isSessionIdleAfterCrossTabRefresh(timestamp) {
    this._refreshSessionIdFromStorage();
    return this._sessionHasBeenIdleTooLong(timestamp, this._freshestActivityTimestamp());
  }
  _getSessionId() {
    const sessionIdInfo = this._persistence.props[SESSION_ID];
    if (isArray(sessionIdInfo) && sessionIdInfo.length === 2) {
      sessionIdInfo.push(sessionIdInfo[0]);
    }
    return sessionIdInfo || [0, null, 0];
  }
  // Resets the session id by setting it to null. On the subsequent call to checkAndGetSessionAndWindowId,
  // new ids will be generated. Also clears the idle timer so a stale fire
  // cannot rotate the freshly-cleared session.
  resetSessionId() {
    this._lastPersistedActivityTimestamp = null;
    clearTimeout(this._enforceIdleTimeout);
    this._enforceIdleTimeout = void 0;
    this._setSessionId(null, null, null);
  }
  /**
   * Cleans up resources used by SessionIdManager.
   * Should be called when the SessionIdManager is no longer needed to prevent memory leaks.
   */
  destroy() {
    this._destroyed = true;
    this._flushPendingActivityTimestamp();
    clearTimeout(this._enforceIdleTimeout);
    this._enforceIdleTimeout = void 0;
    if (this._beforeUnloadListener && win) {
      win.removeEventListener(DOM_EVENT_BEFOREUNLOAD, this._beforeUnloadListener, { capture: false });
      this._beforeUnloadListener = void 0;
    }
    this._sessionIdChangedHandlers = [];
  }
  /*
   * Listens to window unloads and removes the primaryWindowExists key from sessionStorage.
   * Reloaded or fresh tabs created after a DOM unloads (reloading the same tab) WILL NOT have this primaryWindowExists flag in session storage.
   * Cloned sessions (new tab, tab duplication, window.open(), ...) WILL have this primaryWindowExists flag in their copied session storage.
   * We conditionally check the primaryWindowExists value in the constructor to decide if the window id in the last session storage should be carried over.
   */
  _listenToReloadWindow() {
    this._beforeUnloadListener = () => {
      this._flushPendingActivityTimestamp();
      if (this._canUseSessionStorage()) {
        sessionStore._remove(this._primary_window_exists_storage_key);
      }
    };
    addEventListener(win, DOM_EVENT_BEFOREUNLOAD, this._beforeUnloadListener, { capture: false });
  }
  /*
   * This function returns the current sessionId and windowId. It should be used to
   * access these values over directly calling `._sessionId` or `._windowId`.
   * In addition to returning the sessionId and windowId, this function also manages cycling the
   * sessionId and windowId when appropriate by doing the following:
   *
   * 1. If the sessionId or windowId is not set, it will generate a new one and store it.
   * 2. If the readOnly param is set to false, it will:
   *    a. Check if it has been > SESSION_CHANGE_THRESHOLD since the last call with this flag set.
   *       If so, it will generate a new sessionId and store it.
   *    b. Update the timestamp stored with the sessionId to ensure the current session is extended
   *       for the appropriate amount of time.
   *
   * @param {boolean} readOnly (optional) Defaults to False. Should be set to True when the call to the function should not extend or cycle the session (e.g. being called for non-user generated events)
   * @param {Number} timestamp (optional) Defaults to the current time. The timestamp to be stored with the sessionId (used when determining if a new sessionId should be generated)
   */
  checkAndGetSessionAndWindowId(readOnly = false, _timestamp = null) {
    if (this._config.cookieless_mode === COOKIELESS_ALWAYS) {
      throw new Error('checkAndGetSessionAndWindowId should not be called with cookieless_mode="always"');
    }
    const timestamp = _timestamp || (/* @__PURE__ */ new Date()).getTime();
    let [, sessionId, startTimestamp] = this._getSessionId();
    const lastActivityTimestamp = this._freshestActivityTimestamp();
    let windowId = this._getWindowId();
    const sessionPastMaximumLength = isPositiveNumber(startTimestamp) && Math.abs(timestamp - startTimestamp) > SESSION_LENGTH_LIMIT_MILLISECONDS;
    let valuesChanged = false;
    let crossTabAdoption = false;
    const noSessionId = !sessionId;
    const preRefreshSessionId = sessionId;
    let activityTimeout = !noSessionId && !readOnly && this._sessionHasBeenIdleTooLong(timestamp, lastActivityTimestamp);
    if (activityTimeout) {
      activityTimeout = this._isSessionIdleAfterCrossTabRefresh(timestamp);
      if (!activityTimeout) {
        logger5.info("cross-tab refresh kept the session alive", { sessionId });
      }
      ;
      [, sessionId, startTimestamp] = this._getSessionId();
    }
    if (noSessionId || activityTimeout || sessionPastMaximumLength) {
      sessionId = this._sessionIdGenerator();
      windowId = this._windowIdGenerator();
      logger5.info("new session ID generated", {
        sessionId,
        windowId,
        changeReason: { noSessionId, activityTimeout, sessionPastMaximumLength }
      });
      startTimestamp = timestamp;
      valuesChanged = true;
    } else {
      if (!windowId) {
        windowId = this._windowIdGenerator();
        valuesChanged = true;
      }
      crossTabAdoption = sessionId !== preRefreshSessionId;
      if (crossTabAdoption) {
        logger5.info("adopted cross-tab session id", { sessionId, windowId });
        valuesChanged = true;
      }
    }
    const noActivityTimestamp = !isPositiveNumber(lastActivityTimestamp);
    const shouldPreserveActivityTimestamp = !noActivityTimestamp && readOnly && !sessionPastMaximumLength;
    const newActivityTimestamp = shouldPreserveActivityTimestamp ? lastActivityTimestamp : timestamp;
    const noStartTimestamp = !isPositiveNumber(startTimestamp);
    const sessionStartTimestamp = noStartTimestamp ? (/* @__PURE__ */ new Date()).getTime() : startTimestamp;
    this._setWindowId(windowId);
    this._setSessionId(sessionId, newActivityTimestamp, sessionStartTimestamp);
    if (!readOnly) {
      this._resetIdleTimer();
    }
    const changeReason = { noSessionId, activityTimeout, sessionPastMaximumLength, crossTabAdoption };
    if (valuesChanged) {
      this._sessionIdChangedHandlers.forEach((handler) => handler(sessionId, windowId, changeReason));
    }
    return {
      sessionId,
      windowId,
      sessionStartTimestamp,
      changeReason: valuesChanged ? changeReason : void 0,
      lastActivityTimestamp
    };
  }
  _resetIdleTimer() {
    if (this._destroyed) {
      return;
    }
    clearTimeout(this._enforceIdleTimeout);
    this._enforceIdleTimeout = setTimeout(() => {
      if (this._destroyed) {
        return;
      }
      if (this._isSessionIdleAfterCrossTabRefresh((/* @__PURE__ */ new Date()).getTime())) {
        const idleSessionId = this._sessionId;
        this.resetSessionId();
        this._eventEmitter.emit("forcedIdleReset", { idleSessionId });
      } else {
        this._resetIdleTimer();
      }
    }, this.sessionTimeoutMs * 1.1);
  }
};

// ../browser-common/dist/utils/blocked-uas.mjs
var isLikelyBot = function(navigator2, customBlockedUserAgents) {
  if (!navigator2) return false;
  const ua = navigator2.userAgent;
  if (ua) {
    if (isBlockedUA(ua, customBlockedUserAgents)) return true;
  }
  try {
    const uaData = navigator2?.userAgentData;
    if (uaData?.brands && uaData.brands.some((brandObj) => isBlockedUA(brandObj?.brand, customBlockedUserAgents))) return true;
  } catch {
  }
  return !!navigator2.webdriver;
};

// ../browser-common/dist/utils/device-model-utils.mjs
async function getDeviceModel() {
  const uaData = globals_navigator?.userAgentData;
  if (!uaData?.getHighEntropyValues) return;
  try {
    const hints = await uaData.getHighEntropyValues([
      "model"
    ]);
    const model = hints?.model;
    return isString(model) && model.length > 0 ? model : void 0;
  } catch (e) {
    logger_logger.info("Unable to resolve $device_model from userAgentData.getHighEntropyValues", e);
    return;
  }
}

// ../browser-common/dist/utils/regex-utils.mjs
var isValidRegex = function(str) {
  try {
    new RegExp(str);
  } catch {
    return false;
  }
  return true;
};
var isMatchingRegex = function(value, pattern) {
  if (!isValidRegex(pattern)) return false;
  try {
    return new RegExp(pattern).test(value);
  } catch {
    return false;
  }
};

// ../browser-common/dist/utils/property-utils.mjs
function getPersonPropertiesHash2(distinct_id, userPropertiesToSet, userPropertiesToSetOnce) {
  return jsonStringify({
    distinct_id,
    userPropertiesToSet,
    userPropertiesToSetOnce
  });
}
var propertyComparisons = {
  exact: (targets, values) => values.some((value) => targets.some((target) => value === target)),
  is_not: (targets, values) => values.every((value) => targets.every((target) => value !== target)),
  regex: (targets, values) => values.some((value) => targets.some((target) => isMatchingRegex(value, target))),
  not_regex: (targets, values) => values.every((value) => targets.every((target) => !isMatchingRegex(value, target))),
  icontains: (targets, values) => values.map(toLowerCase).some((value) => targets.map(toLowerCase).some((target) => value.includes(target))),
  not_icontains: (targets, values) => values.map(toLowerCase).every((value) => targets.map(toLowerCase).every((target) => !value.includes(target))),
  gt: (targets, values) => values.some((value) => {
    const numValue = parseFloat(value);
    return !isNaN(numValue) && targets.some((t) => numValue > parseFloat(t));
  }),
  lt: (targets, values) => values.some((value) => {
    const numValue = parseFloat(value);
    return !isNaN(numValue) && targets.some((t) => numValue < parseFloat(t));
  })
};
var toLowerCase = (v) => v.toLowerCase();

// src/utils/request-router.ts
var RequestRouterRegion = {
  US: "us",
  EU: "eu",
  CUSTOM: "custom"
};
var ingestionDomain = "i.posthog.com";
var staticAssetPath = /^\/static\//;
var RequestRouter = class {
  constructor(instance) {
    this._regionCache = {};
    this.instance = instance;
  }
  get apiHost() {
    const host = this.instance.config.api_host.trim().replace(/\/$/, "");
    if (host === "https://app.posthog.com") {
      return "https://us.i.posthog.com";
    }
    return host;
  }
  get flagsApiHost() {
    const customHost = this.instance.config.flags_api_host;
    if (customHost) {
      return customHost.trim().replace(/\/$/, "");
    }
    return this.apiHost;
  }
  get uiHost() {
    let host = this.instance.config.ui_host?.replace(/\/$/, "");
    if (!host) {
      host = this.apiHost.replace(`.${ingestionDomain}`, ".posthog.com");
    }
    if (host === "https://app.posthog.com") {
      return "https://us.posthog.com";
    }
    return host;
  }
  get region() {
    if (!this._regionCache[this.apiHost]) {
      if (/https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost)) {
        this._regionCache[this.apiHost] = RequestRouterRegion.US;
      } else if (/https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost)) {
        this._regionCache[this.apiHost] = RequestRouterRegion.EU;
      } else {
        this._regionCache[this.apiHost] = RequestRouterRegion.CUSTOM;
      }
    }
    return this._regionCache[this.apiHost];
  }
  _staticAssetHostOverride(path) {
    if (!staticAssetPath.test(path)) {
      return void 0;
    }
    const override = this.instance.config.asset_host;
    if (typeof override !== "string") {
      return void 0;
    }
    const normalizedOverride = override.trim().replace(/\/$/, "");
    return normalizedOverride || void 0;
  }
  endpointFor(target, path = "") {
    if (path) {
      path = path[0] === "/" ? path : `/${path}`;
    }
    if (target === "ui") {
      return this.uiHost + path;
    }
    if (target === "flags") {
      return this.flagsApiHost + path;
    }
    if (target === "assets") {
      const assetHostOverride = this._staticAssetHostOverride(path);
      if (assetHostOverride) {
        return `${assetHostOverride}${path}`;
      }
    }
    if (this.region === RequestRouterRegion.CUSTOM) {
      return this.apiHost + path;
    }
    const suffix = ingestionDomain + path;
    switch (target) {
      case "assets":
        return `https://${this.region}-assets.${suffix}`;
      case "api":
        return `https://${this.region}.${suffix}`;
    }
  }
};

// ../core/dist/surveys/events.mjs
function getSurveyInteractionProperty(survey, action) {
  let surveyProperty = `$survey_${action}/${survey.id}`;
  if (survey.current_iteration && survey.current_iteration > 0) surveyProperty = `$survey_${action}/${survey.id}/${survey.current_iteration}`;
  return surveyProperty;
}

// ../core/dist/surveys/keys.mjs
function getSurveyIterationKey(survey) {
  if (survey.current_iteration && survey.current_iteration > 0) return `${survey.id}_${survey.current_iteration}`;
  return survey.id;
}

// src/utils/survey-utils.ts
var SURVEY_LOGGER = createLogger2("[Surveys]");
var SURVEY_SEEN_PREFIX = "seenSurvey_";
var getSurveyStorageKey = (prefix, survey) => {
  return `${prefix}${getSurveyIterationKey(survey)}`;
};
var getSurveySeenKey = (survey) => {
  return getSurveyStorageKey(SURVEY_SEEN_PREFIX, survey);
};
var setSurveySeenOnLocalStorage = (survey) => {
  try {
    const surveySeenKey = getSurveySeenKey(survey);
    const isSurveySeen = localStorage.getItem(surveySeenKey);
    if (isSurveySeen) {
      return;
    }
    localStorage.setItem(surveySeenKey, "true");
  } catch (error) {
    SURVEY_LOGGER.error("Failed to persist survey seen state", error);
  }
};
var IN_APP_SURVEY_TYPES = [SurveyType.Popover, SurveyType.Widget, SurveyType.API];
var DEFAULT_DISPLAY_SURVEY_OPTIONS = {
  ignoreConditions: false,
  ignoreDelay: false,
  displayType: DisplaySurveyType.Popover
};

// src/extensions/external-integration.ts
var logger6 = createLogger2("[PostHog ExternalIntegrations]");
var MAPPED_INTEGRATIONS = {
  intercom: "intercom-integration",
  crispChat: "crisp-chat-integration"
};
var ExternalIntegrations = class {
  constructor(_instance) {
    this._instance = _instance;
  }
  _loadScript(name, cb) {
    assignableWindow.__PosthogExtensions__?.loadExternalDependency?.(this._instance, name, (err) => {
      if (err) {
        return logger6.error("failed to load script", err);
      }
      cb();
    });
  }
  startIfEnabledOrStop() {
    for (const [key, value] of Object.entries(this._instance.config.integrations ?? {})) {
      if (value && !assignableWindow.__PosthogExtensions__?.integrations?.[key]) {
        this._loadScript(MAPPED_INTEGRATIONS[key], () => {
          assignableWindow.__PosthogExtensions__?.integrations?.[key]?.start(
            this._instance
          );
        });
      }
      if (!value && assignableWindow.__PosthogExtensions__?.integrations?.[key]) {
        assignableWindow.__PosthogExtensions__?.integrations?.[key]?.stop();
      }
    }
  }
};

// src/posthog-core.ts
var instances = {};
var _executeArrayDepth = 0;
var __NOOP = () => {
};
var CONSENT_COOKIELESS_WARN = 'Consent opt in/out is not valid with cookieless_mode="always" and will be ignored';
var SURVEYS_NOT_AVAILABLE = "Surveys module not available";
var SANITIZE_DEPRECATED = "sanitize_properties is deprecated. Use before_send instead";
var DENYLIST_INVALID = "Invalid value for property_denylist config: ";
var FLAG_CALLED_TRANSPORT_PROPERTY_KEYS = ["token", "distinct_id", COOKIELESS_MODE_FLAG_PROPERTY];
var PRIMARY_INSTANCE_NAME = "posthog";
var ENQUEUE_REQUESTS = !SUPPORTS_REQUEST && userAgent?.indexOf("MSIE") === -1 && userAgent?.indexOf("Mozilla") === -1;
var defaultsThatVaryByConfig = (defaults) => ({
  rageclick: defaults && defaults >= "2026-05-30" ? { content_ignorelist: DEFAULT_CONTENT_IGNORELIST_WITH_STEPPERS, ignore_text_selection: true } : defaults && defaults >= "2025-11-30" ? { content_ignorelist: true } : true,
  capture_pageview: defaults && defaults >= "2025-05-24" ? "history_change" : true,
  session_recording: defaults && defaults >= "2026-06-25" ? { strictMinimumDuration: true, canvasCapture: { resolutionScale: 0.6 }, streamNetworkBody: true } : defaults && defaults >= "2026-05-30" ? { strictMinimumDuration: true, canvasCapture: { resolutionScale: 0.6 } } : defaults && defaults >= "2025-11-30" ? { strictMinimumDuration: true } : {},
  external_scripts_inject_target: defaults && defaults >= "2026-01-30" ? "head" : "body",
  internal_or_test_user_hostname: defaults && defaults >= "2026-01-30" ? /^(localhost|127\.0\.0\.1)$/ : void 0,
  persistence_save_debounce_ms: defaults && defaults >= "2026-05-30" ? 250 : 0,
  split_storage: !!(defaults && defaults >= "2026-05-30"),
  detect_google_search_app: !!(defaults && defaults >= "2026-05-30"),
  disable_capture_url_hashes: !!(defaults && defaults >= "2026-06-25")
});
var defaultConfig = (defaults) => ({
  api_host: "https://us.i.posthog.com",
  flags_api_host: null,
  ui_host: null,
  asset_host: null,
  token: "",
  autocapture: true,
  cross_subdomain_cookie: isCrossDomainCookie(globals_document?.location),
  persistence: "localStorage+cookie",
  // up to 1.92.0 this was 'cookie'. It's easy to migrate as 'localStorage+cookie' will migrate data from cookie storage
  persistence_name: "",
  cookie_persisted_properties: [],
  loaded: __NOOP,
  save_campaign_params: true,
  custom_campaign_params: [],
  custom_blocked_useragents: [],
  save_referrer: true,
  capture_pageleave: "if_capture_pageview",
  // We'll only capture pageleave events if capture_pageview is also true
  defaults: defaults ?? "unset",
  __preview_deferred_init_extensions: false,
  // Opt-in only for now
  __preview_external_dependency_versioned_paths: false,
  __preview_cookie_wins_on_conflict: false,
  // Opt-in: fixes cross-subdomain stale-localStorage bug
  debug: globals_location && isString(globals_location?.search) && globals_location.search.indexOf("__posthog_debug=true") !== -1 || false,
  cookie_expiration: 365,
  upgrade: false,
  disable_session_recording: false,
  disable_persistence: false,
  disable_web_experiments: true,
  // disabled in beta.
  disable_surveys: false,
  disable_surveys_automatic_display: false,
  disable_conversations: false,
  disable_product_tours: false,
  disableDeviceModel: false,
  disable_external_dependency_loading: false,
  strict_script_versioning: false,
  enable_recording_console_log: void 0,
  // When undefined, it falls back to the server-side setting
  secure_cookie: win?.location?.protocol === "https:",
  ip: false,
  opt_out_capturing_by_default: false,
  opt_out_persistence_by_default: false,
  opt_out_useragent_filter: false,
  opt_out_capturing_persistence_type: "localStorage",
  consent_persistence_name: null,
  opt_out_capturing_cookie_prefix: null,
  opt_in_site_apps: false,
  property_denylist: [],
  respect_dnt: false,
  sanitize_properties: null,
  request_headers: {},
  // { header: value, header2: value }
  request_batching: true,
  properties_string_max_length: 65535,
  mask_all_element_attributes: false,
  mask_all_text: false,
  mask_personal_data_properties: false,
  custom_personal_data_properties: [],
  advanced_disable_flags: false,
  advanced_disable_decide: false,
  advanced_disable_feature_flags: false,
  advanced_disable_feature_flags_on_first_load: false,
  advanced_only_evaluate_survey_feature_flags: false,
  advanced_feature_flags_dedup_per_session: false,
  advanced_enable_surveys: false,
  advanced_disable_toolbar_metrics: false,
  feature_flag_request_timeout_ms: 3e3,
  surveys_request_timeout_ms: SURVEYS_REQUEST_TIMEOUT_MS,
  on_request_error: (res) => {
    const error = "Bad HTTP status: " + res.statusCode + " " + res.text;
    logger_logger.error(error);
  },
  get_device_id: (uuid) => uuid,
  capture_performance: void 0,
  name: "posthog",
  bootstrap: {},
  disable_compression: false,
  session_idle_timeout_seconds: 30 * 60,
  // 30 minutes
  person_profiles: PERSON_PROFILES_IDENTIFIED_ONLY,
  before_send: void 0,
  get_current_url: void 0,
  request_queue_config: { flush_interval_ms: DEFAULT_FLUSH_INTERVAL_MS },
  error_tracking: {},
  // Used for internal testing
  _onCapture: __NOOP,
  ...defaultsThatVaryByConfig(defaults)
});
var CONFIG_RENAMES = [
  ["process_person", "person_profiles"],
  ["xhr_headers", "request_headers"],
  ["cookie_name", "persistence_name"],
  ["disable_cookie", "disable_persistence"],
  ["__preview_disable_beacon", "disable_beacon"],
  ["store_google", "save_campaign_params"],
  ["verbose", "debug"]
];
var configRenames = (origConfig) => {
  const renames = {};
  for (const [oldKey, newKey] of CONFIG_RENAMES) {
    if (!isUndefined(origConfig[oldKey])) {
      ;
      renames[newKey] = origConfig[oldKey];
    }
  }
  const newConfig = extend({}, renames, origConfig);
  const previewExternalDependencyVersionedPaths = origConfig.__preview_external_dependency_versioned_paths;
  if (!isUndefined(previewExternalDependencyVersionedPaths)) {
    if (isUndefined(origConfig.strict_script_versioning)) {
      newConfig.strict_script_versioning = !!previewExternalDependencyVersionedPaths;
    }
    if (isString(previewExternalDependencyVersionedPaths) && isUndefined(origConfig.asset_host)) {
      newConfig.asset_host = previewExternalDependencyVersionedPaths;
    }
  }
  if (isArray(origConfig.property_blacklist)) {
    if (isUndefined(origConfig.property_denylist)) {
      newConfig.property_denylist = origConfig.property_blacklist;
    } else if (isArray(origConfig.property_denylist)) {
      newConfig.property_denylist = [...origConfig.property_blacklist, ...origConfig.property_denylist];
    } else {
      logger_logger.error(DENYLIST_INVALID + origConfig.property_denylist);
    }
  }
  return newConfig;
};
var DeprecatedWebPerformanceObserver = class {
  constructor() {
    this.__forceAllowLocalhost = false;
  }
  get _forceAllowLocalhost() {
    return this.__forceAllowLocalhost;
  }
  set _forceAllowLocalhost(value) {
    logger_logger.error(
      "WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"
    );
    this.__forceAllowLocalhost = value;
  }
};
var PostHog = class _PostHog {
  /**
   * Creates an uninitialized PostHog instance.
   *
   * @remarks
   * Most browser applications should use the default exported singleton and call `posthog.init()`.
   * Construct a new instance only when you need to manage a separate SDK instance manually.
   *
   * @example
   * ```js
   * const instance = new PostHog()
   * instance.init('<ph_project_api_key>', { api_host: 'https://us.i.posthog.com' })
   * ```
   */
  constructor() {
    this.webPerformance = new DeprecatedWebPerformanceObserver();
    this._personProcessingSetOncePropertiesSent = false;
    this.version = config_default.LIB_VERSION;
    this._internalEventEmitter = new SimpleEventEmitter2();
    this._extensions = [];
    /** @deprecated - deprecated in 1.241.0, use `calculateEventProperties` instead  */
    this._calculate_event_properties = this.calculateEventProperties.bind(this);
    this.config = defaultConfig();
    this.SentryIntegration = SentryIntegration;
    this.sentryIntegration = (options) => sentryIntegration(this, options);
    this.__request_queue = [];
    this.__loaded = false;
    this.analyticsDefaultEndpoint = "/e/";
    this._initialPageviewCaptured = false;
    this._visibilityStateListener = null;
    this._initialPersonProfilesConfig = null;
    this._cachedPersonProperties = null;
    this.scrollManager = new ScrollManager(this);
    this.pageViewManager = new PageViewManager(this);
    this.rateLimiter = new RateLimiter(this);
    this.requestRouter = new RequestRouter(this);
    this.consent = new ConsentManager(this);
    this.externalIntegrations = new ExternalIntegrations(this);
    const ext = _PostHog.__defaultExtensionClasses ?? {};
    this.featureFlags = ext.featureFlags && new ext.featureFlags(this);
    this.toolbar = ext.toolbar && new ext.toolbar(this);
    this.surveys = ext.surveys && new ext.surveys(this);
    this.conversations = ext.conversations && new ext.conversations(this);
    this.logs = ext.logs && new ext.logs(this);
    this.metrics = ext.metrics && new ext.metrics(this);
    this.experiments = ext.experiments && new ext.experiments(this);
    this.exceptions = ext.exceptions && new ext.exceptions(this);
    this.people = {
      set: (prop, to, callback) => {
        const setProps = isString(prop) ? { [prop]: to } : prop;
        this.setPersonProperties(setProps);
        callback?.({});
      },
      set_once: (prop, to, callback) => {
        const setProps = isString(prop) ? { [prop]: to } : prop;
        this.setPersonProperties(void 0, setProps);
        callback?.({});
      }
    };
    this.on("eventCaptured", (data) => logger_logger.info(`send "${data?.event}"`, data));
  }
  static {
    this.__defaultExtensionClasses = {};
  }
  _replaceExtension(oldExt, newExt) {
    if (oldExt) {
      const idx = this._extensions.indexOf(oldExt);
      if (idx !== -1) {
        this._extensions.splice(idx, 1);
      }
    }
    this._extensions.push(newExt);
    newExt.initialize?.();
    return newExt;
  }
  _inCookielessMode() {
    return this.config.cookieless_mode === COOKIELESS_ALWAYS || this.config.cookieless_mode === COOKIELESS_ON_REJECT && this.consent.isRejected();
  }
  // Legacy property to support existing usage - this isn't technically correct but it's what it has always been - a proxy for flags being loaded
  /** @deprecated Use `flagsEndpointWasHit` instead.  We migrated to using a new feature flag endpoint and the new method is more semantically accurate */
  get decideEndpointWasHit() {
    return this.featureFlags?.hasLoadedFlags ?? false;
  }
  /**
   * Whether feature flags have been initialized for this instance.
   *
   * @remarks
   * Despite the name, this is a proxy for processed feature flag values. It may be true for
   * bootstrapped flags before a network request completes.
   *
   * @returns True once the SDK has processed feature flag values.
   */
  get flagsEndpointWasHit() {
    return this.featureFlags?.hasLoadedFlags ?? false;
  }
  // Initialization methods
  /**
   * Initializes a new instance of the PostHog capturing object.
   *
   * @remarks
   * All new instances are added to the main posthog object as sub properties (such as
   * `posthog.library_name`) and also returned by this function. [Learn more about configuration options](https://posthog.com/docs/libraries/js/config)
   *
   * @example
   * ```js
   * // basic initialization
   * posthog.init('<ph_project_api_key>', {
   *     api_host: '<ph_client_api_host>'
   * })
   * ```
   *
   * @example
   * ```js
   * // multiple instances
   * posthog.init('<ph_project_api_key>', {}, 'project1')
   * posthog.init('<ph_project_api_key>', {}, 'project2')
   * ```
   *
   * @public
   *
   * @param token - Your PostHog API token
   * @param config - A dictionary of config options to override
   * @param name - The name for the new posthog instance that you want created
   *
   * {@label Initialization}
   *
   * @returns The newly initialized PostHog instance
   */
  init(token, config2, name) {
    if (!name || name === PRIMARY_INSTANCE_NAME) {
      return this._init(token, config2, name);
    } else {
      const namedPosthog = instances[name] ?? new _PostHog();
      namedPosthog._init(token, config2, name);
      instances[name] = namedPosthog;
      instances[PRIMARY_INSTANCE_NAME][name] = namedPosthog;
      return namedPosthog;
    }
  }
  // posthog._init(token:string, config:object, name:string)
  //
  // This function sets up the current instance of the posthog
  // library.  The difference between this method and the init(...)
  // method is this one initializes the actual instance, whereas the
  // init(...) method sets up a new library and calls _init on it.
  //
  // Note that there are operations that can be asynchronous, so we
  // accept a callback that is called when all the asynchronous work
  // is done. Note that we do not use promises because we want to be
  // IE11 compatible. We could use polyfills, which would make the
  // code a bit cleaner, but will add some overhead.
  //
  _init(token, config2 = {}, name) {
    const normalizedToken = isString(token) ? token.trim() : "";
    if (!normalizedToken) {
      logger_logger.critical(
        "PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"
      );
      return this;
    }
    if (this.__loaded) {
      console.warn("[PostHog.js]", "You have already initialized PostHog! Re-initializing is a no-op");
      return this;
    }
    this.__loaded = true;
    this.config = defaultConfig(config2.defaults);
    config2.debug = this._checkLocalStorageForDebug(config2.debug);
    this._originalUserConfig = config2;
    this._triggered_notifs = [];
    if (config2.person_profiles) {
      this._initialPersonProfilesConfig = config2.person_profiles;
    } else if (config2.process_person) {
      this._initialPersonProfilesConfig = config2.process_person;
    }
    const baseConfig = defaultConfig(config2.defaults);
    const userConfig = configRenames(config2);
    const mergedConfig = extend({}, baseConfig, userConfig, {
      name,
      token: normalizedToken
    });
    if (isObject(baseConfig.rageclick) && isObject(userConfig.rageclick)) {
      mergedConfig.rageclick = extend({}, baseConfig.rageclick, userConfig.rageclick);
    }
    if (isObject(baseConfig.session_recording) && isObject(userConfig.session_recording)) {
      mergedConfig.session_recording = extend({}, baseConfig.session_recording, userConfig.session_recording);
    }
    this.set_config(mergedConfig);
    if (this.config.on_xhr_error) {
      logger_logger.error("on_xhr_error is deprecated. Use on_request_error instead");
    }
    this.compression = config2.disable_compression ? void 0 : Compression.GZipJS;
    const persistenceDisabled = this._is_persistence_disabled();
    this.persistence = new PostHogPersistence(this.config, persistenceDisabled);
    this.sessionPersistence = this.config.persistence === "sessionStorage" || this.config.persistence === "memory" ? this.persistence : (
      // sessionStorage sibling shares the primary's storage name; it must not own/clean the split group entries
      new PostHogPersistence({ ...this.config, persistence: "sessionStorage" }, persistenceDisabled, false)
    );
    const initialPersistenceProps = { ...this.persistence.props };
    const initialSessionProps = { ...this.sessionPersistence.props };
    this.register({ $initialization_time: (/* @__PURE__ */ new Date()).toISOString() });
    this._requestQueue = new RequestQueue(
      (req) => this._send_retriable_request(req),
      this.config.request_queue_config
    );
    this._retryQueue = new RetryQueue(this);
    this.__request_queue = [];
    const startInCookielessMode = this._inCookielessMode();
    if (!startInCookielessMode) {
      this.sessionManager = new SessionIdManager(this);
      this.sessionPropsManager = new SessionPropsManager(this, this.sessionManager, this.persistence);
    }
    if (this.config.__preview_deferred_init_extensions) {
      logger_logger.info("Deferring extension initialization to improve startup performance");
      setTimeout(() => {
        this._initExtensions(startInCookielessMode);
      }, 0);
    } else {
      logger_logger.info("Initializing extensions synchronously");
      this._initExtensions(startInCookielessMode);
    }
    config_default.DEBUG = config_default.DEBUG || this.config.debug;
    if (config_default.DEBUG) {
      logger_logger.info("Starting in debug mode", {
        this: this,
        config: config2,
        thisC: { ...this.config },
        p: initialPersistenceProps,
        s: initialSessionProps
      });
    }
    if (this.config.identity_distinct_id && !config2.bootstrap?.distinctID) {
      config2.bootstrap = {
        ...config2.bootstrap,
        distinctID: this.config.identity_distinct_id,
        isIdentifiedID: true
      };
    }
    if (config2.bootstrap?.distinctID !== void 0) {
      const bootstrapDistinctId = config2.bootstrap.distinctID;
      const existingDistinctId = this.get_distinct_id();
      const existingUserState = this.persistence.get_property(USER_STATE);
      if (config2.bootstrap.isIdentifiedID && existingDistinctId != null && existingDistinctId !== bootstrapDistinctId && existingUserState === USER_STATE_ANONYMOUS) {
        this.identify(bootstrapDistinctId);
      } else if (config2.bootstrap.isIdentifiedID && existingDistinctId != null && existingDistinctId !== bootstrapDistinctId && existingUserState === USER_STATE_IDENTIFIED) {
        logger_logger.warn(
          "Bootstrap distinctID differs from an already-identified user. The existing identity is preserved. Call reset() before reinitializing if you intend to switch users."
        );
      } else {
        const uuid = this.config.get_device_id(uuidv72());
        const deviceID = config2.bootstrap.isIdentifiedID ? uuid : bootstrapDistinctId;
        this.persistence.set_property(
          USER_STATE,
          config2.bootstrap.isIdentifiedID ? USER_STATE_IDENTIFIED : USER_STATE_ANONYMOUS
        );
        this.register({
          distinct_id: bootstrapDistinctId,
          $device_id: deviceID
        });
      }
    }
    if (startInCookielessMode) {
      this.register_once(
        {
          distinct_id: COOKIELESS_SENTINEL_VALUE,
          $device_id: null
        },
        ""
      );
    } else if (!this.get_distinct_id()) {
      const uuid = this.config.get_device_id(uuidv72());
      this.register_once(
        {
          distinct_id: uuid,
          $device_id: uuid
        },
        ""
      );
      this.persistence.set_property(USER_STATE, USER_STATE_ANONYMOUS);
    }
    addEventListener(win, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this), {
      passive: false
    });
    if (config2.segment) {
      setupSegmentIntegration(this, () => this._loaded());
    } else {
      this._loaded();
    }
    if (isFunction(this.config._onCapture) && this.config._onCapture !== __NOOP) {
      logger_logger.warn("onCapture is deprecated. Please use `before_send` instead");
      this.on("eventCaptured", (data) => this.config._onCapture(data.event, data));
    }
    if (this.config.ip) {
      logger_logger.warn(
        'The `ip` config option has NO EFFECT AT ALL and has been deprecated. Use a custom transformation or "Discard IP data" project setting instead. See https://posthog.com/tutorials/web-redact-properties#hiding-customer-ip-address for more information.'
      );
    }
    if (!this.config.disableDeviceModel) {
      getDeviceModel().then((model) => {
        if (model) {
          this.register({ [DEVICE_MODEL]: model });
        }
      }).catch(__NOOP);
    }
    return this;
  }
  _initExtensions(startInCookielessMode) {
    const initStartTime = performance.now();
    const ext = { ..._PostHog.__defaultExtensionClasses, ...this.config.__extensionClasses };
    const initTasks = [];
    if (ext.featureFlags) {
      this._extensions.push(this.featureFlags = this.featureFlags ?? new ext.featureFlags(this));
    }
    if (ext.exceptions) {
      this._extensions.push(this.exceptions = this.exceptions ?? new ext.exceptions(this));
    }
    if (ext.historyAutocapture) {
      this._extensions.push(this.historyAutocapture = new ext.historyAutocapture(this));
    }
    if (ext.tracingHeaders) {
      this._extensions.push(this.tracingHeaders = new ext.tracingHeaders(this));
    }
    if (ext.siteApps) {
      this._extensions.push(this.siteApps = new ext.siteApps(this));
    }
    if (ext.sessionRecording && !startInCookielessMode) {
      this._extensions.push(this.sessionRecording = new ext.sessionRecording(this));
    }
    if (!this.config.disable_scroll_properties) {
      initTasks.push(() => {
        this.scrollManager.startMeasuringScrollPosition();
      });
    }
    if (ext.autocapture) {
      this._extensions.push(this.autocapture = new ext.autocapture(this));
    }
    if (ext.surveys) {
      this._extensions.push(this.surveys = this.surveys ?? new ext.surveys(this));
    }
    if (ext.logs) {
      this._extensions.push(this.logs = this.logs ?? new ext.logs(this));
    }
    if (ext.metrics) {
      this._extensions.push(this.metrics = this.metrics ?? new ext.metrics(this));
    }
    if (ext.conversations) {
      this._extensions.push(this.conversations = this.conversations ?? new ext.conversations(this));
    }
    if (ext.productTours) {
      this._extensions.push(this.productTours = new ext.productTours(this));
    }
    if (ext.heatmaps) {
      this._extensions.push(this.heatmaps = new ext.heatmaps(this));
    }
    if (ext.webVitalsAutocapture) {
      this._extensions.push(this.webVitalsAutocapture = new ext.webVitalsAutocapture(this));
    }
    if (ext.exceptionObserver) {
      this._extensions.push(this.exceptionObserver = new ext.exceptionObserver(this));
    }
    if (ext.deadClicksAutocapture) {
      this._extensions.push(
        this.deadClicksAutocapture = new ext.deadClicksAutocapture(this, isDeadClicksEnabledForAutocapture)
      );
    }
    if (ext.toolbar) {
      this._extensions.push(this.toolbar = this.toolbar ?? new ext.toolbar(this));
    }
    if (ext.experiments) {
      this._extensions.push(this.experiments = this.experiments ?? new ext.experiments(this));
    }
    this._extensions.forEach((extension) => {
      if (!extension.initialize) return;
      initTasks.push(() => {
        extension.initialize?.();
      });
    });
    initTasks.push(() => {
      if (this._pendingRemoteConfig) {
        const result = this._pendingRemoteConfig;
        this._pendingRemoteConfig = void 0;
        this._onRemoteConfig(result);
      }
    });
    this._processInitTaskQueue(initTasks, initStartTime);
  }
  _processInitTaskQueue(queue, initStartTime) {
    const TIME_BUDGET_MS = 30;
    while (queue.length > 0) {
      if (this.config.__preview_deferred_init_extensions) {
        const elapsed = performance.now() - initStartTime;
        if (elapsed >= TIME_BUDGET_MS && queue.length > 0) {
          setTimeout(() => {
            this._processInitTaskQueue(queue, initStartTime);
          }, 0);
          return;
        }
      }
      const task = queue.shift();
      if (task) {
        try {
          task();
        } catch (error) {
          logger_logger.error("Error initializing extension:", error);
        }
      }
    }
    const taskInitTiming = Math.round(performance.now() - initStartTime);
    this.register_for_session({
      [SDK_DEBUG_EXTENSIONS_INIT_METHOD]: this.config.__preview_deferred_init_extensions ? "deferred" : "synchronous",
      [SDK_DEBUG_EXTENSIONS_INIT_TIME_MS]: taskInitTiming
    });
    if (this.config.__preview_deferred_init_extensions) {
      logger_logger.info(`PostHog extensions initialized (${taskInitTiming}ms)`);
    }
  }
  _onRemoteConfig(result) {
    if (!(globals_document && globals_document.body)) {
      logger_logger.info("document not ready yet, trying again in 500 milliseconds...");
      setTimeout(() => {
        this._onRemoteConfig(result);
      }, 500);
      return;
    }
    if (this.config.__preview_deferred_init_extensions) {
      this._pendingRemoteConfig = result;
    }
    this._lastRemoteConfig = result;
    this.compression = void 0;
    if (result.ok) {
      const config2 = result.config;
      if (config2.supportedCompression && !this.config.disable_compression) {
        this.compression = includes(config2["supportedCompression"], Compression.GZipJS) ? Compression.GZipJS : includes(config2["supportedCompression"], Compression.Base64) ? Compression.Base64 : void 0;
      }
      if (config2.analytics?.endpoint) {
        this.analyticsDefaultEndpoint = config2.analytics.endpoint;
      }
    }
    this.set_config({
      person_profiles: this._initialPersonProfilesConfig ? this._initialPersonProfilesConfig : PERSON_PROFILES_IDENTIFIED_ONLY
    });
    this._extensions.forEach((ext) => ext.onRemoteConfig?.(result));
  }
  _loaded() {
    try {
      this.config.loaded(this);
    } catch (err) {
      logger_logger.critical("`loaded` function failed", err);
    }
    this._start_queue_if_opted_in();
    if (this.config.internal_or_test_user_hostname && globals_location?.hostname) {
      const hostname = globals_location.hostname;
      const pattern = this.config.internal_or_test_user_hostname;
      const matches = typeof pattern === "string" ? hostname === pattern : pattern.test(hostname);
      if (matches) {
        this.setInternalOrTestUser();
      }
    }
    if (this.config.capture_pageview) {
      setTimeout(() => {
        if (this.consent.isOptedIn() || this._inCookielessMode()) {
          this._captureInitialPageview();
        }
      }, 1);
    }
    this._remoteConfigLoader = new RemoteConfigLoader(this);
    this._remoteConfigLoader.load();
  }
  _start_queue_if_opted_in() {
    if (this.is_capturing()) {
      if (this.config.request_batching) {
        this._requestQueue?.enable();
      }
    }
  }
  _dom_loaded() {
    if (this.is_capturing()) {
      eachArray(this.__request_queue, (item) => this._send_retriable_request(item));
    }
    this.__request_queue = [];
    this._start_queue_if_opted_in();
  }
  _handle_unload() {
    this.surveys?.handlePageUnload?.();
    void this.metrics?.flush("sendBeacon");
    if (!this.config.request_batching) {
      if (this._shouldCapturePageleave()) {
        this.capture(EVENT_PAGELEAVE, null, { transport: "sendBeacon" });
      }
      return;
    }
    if (this._shouldCapturePageleave()) {
      this.capture(EVENT_PAGELEAVE);
    }
    this.logs?.flushLogs("sendBeacon");
    this._requestQueue?.unload();
    this._retryQueue?.unload();
  }
  _send_request(options) {
    if (!this.__loaded) {
      if (options.fireCallbackOnDrop) {
        options.callback?.({ statusCode: 0 });
      }
      return;
    }
    if (ENQUEUE_REQUESTS) {
      this.__request_queue.push(options);
      return;
    }
    if (this.rateLimiter.isServerRateLimited(options.batchKey)) {
      if (options.fireCallbackOnDrop) {
        options.callback?.({ statusCode: 429 });
      }
      return;
    }
    options.transport = options.transport || this.config.api_transport;
    options.headers = {
      ...this.config.request_headers,
      ...options.headers
    };
    options.compression = options.compression === "best-available" ? this.compression : options.compression;
    const disableBeacon = isUndefined(this.config.disable_beacon) ? this.config.__preview_disable_beacon : this.config.disable_beacon;
    if (disableBeacon) {
      options.disableTransport = ["sendBeacon"];
    }
    options.fetchOptions = options.fetchOptions || this.config.fetch_options;
    request({
      ...options,
      callback: (response) => {
        this.rateLimiter.checkForLimiting(response);
        if (response.statusCode >= 400) {
          this.config.on_request_error?.(response);
        }
        options.callback?.(response);
      }
    });
  }
  _send_retriable_request(options) {
    if (this._retryQueue) {
      this._retryQueue.retriableRequest(options);
    } else {
      this._send_request(options);
    }
  }
  /**
   * _execute_array() deals with processing any posthog function
   * calls that were called before the PostHog library were loaded
   * (and are thus stored in an array so they can be called later)
   *
   * Note: we fire off all the posthog function calls && user defined
   * functions BEFORE we fire off posthog capturing calls. This is so
   * identify/register/set_config calls can properly modify early
   * capturing calls.
   *
   * @param {Array} array
   */
  _execute_array(array) {
    _executeArrayDepth++;
    try {
      let fn_name;
      const alias_calls = [];
      const other_calls = [];
      const capturing_calls = [];
      eachArray(array, (item) => {
        if (item) {
          fn_name = item[0];
          if (isArray(fn_name)) {
            capturing_calls.push(item);
          } else if (isFunction(item)) {
            try {
              ;
              item.call(this);
            } catch (e) {
              logger_logger.error("Error executing queued PostHog call", item, e);
            }
          } else if (isArray(item) && fn_name === "alias") {
            alias_calls.push(item);
          } else if (isArray(item) && fn_name.indexOf("capture") !== -1 && isFunction(this[fn_name])) {
            capturing_calls.push(item);
          } else {
            other_calls.push(item);
          }
        }
      });
      const execute = function(calls, thisArg) {
        eachArray(calls, function(item) {
          try {
            if (isArray(item[0])) {
              let caller = thisArg;
              each(item, function(call) {
                caller = caller[call[0]].apply(caller, call.slice(1));
              });
            } else {
              thisArg[item[0]].apply(thisArg, item.slice(1));
            }
          } catch (e) {
            logger_logger.error("Error executing queued PostHog call", item, e);
          }
        });
      };
      execute(alias_calls, this);
      execute(other_calls, this);
      execute(capturing_calls, this);
    } finally {
      _executeArrayDepth--;
    }
  }
  /**
   * push() keeps the standard async-array-push
   * behavior around after the lib is loaded.
   * This is only useful for external integrations that
   * do not wish to rely on our convenience methods
   * (created in the snippet).
   *
   * @example
   * ```js
   * posthog.push(['register', { a: 'b' }]);
   * ```
   *
   * @param {SnippetArrayItem} item A `[function_name, ...args]` array to be executed.
   */
  push(item) {
    if (_executeArrayDepth > 0 && isArray(item) && isString(item[0])) {
      const fn = _PostHog.prototype[item[0]];
      if (isFunction(fn)) {
        fn.apply(this, item.slice(1));
      }
      return;
    }
    this._execute_array([item]);
  }
  /**
   * Captures an event with optional properties and configuration.
   *
   * @remarks
   * You can capture arbitrary object-like values as events. [Learn about capture best practices](/docs/product-analytics/capture-events)
   *
   * @example
   * ```js
   * // basic event capture
   * posthog.capture('cta-button-clicked', {
   *     button_name: 'Get Started',
   *     page: 'homepage'
   * })
   * ```
   *
   * {@label Capture}
   *
   * @public
   *
   * @param event_name - The name of the event (e.g., 'Sign Up', 'Button Click', 'Purchase')
   * @param properties - Properties to include with the event describing the user or event details
   * @param options - Optional configuration for the capture request
   *
   * @returns The capture result containing event data, or undefined if capture failed
   */
  capture(event_name, properties, options) {
    if (!this.__loaded || !this.persistence || !this.sessionPersistence || !this._requestQueue) {
      logger_logger.uninitializedWarning("posthog.capture");
      return;
    }
    if (!this.is_capturing()) {
      return;
    }
    if (isUndefined(event_name) || !isString(event_name)) {
      logger_logger.error("No event name provided to posthog.capture");
      return;
    }
    const isBot = !this.config.opt_out_useragent_filter && this._is_bot();
    const shouldDropBotEvent = isBot && !this.config.__preview_capture_bot_pageviews;
    if (shouldDropBotEvent) {
      return;
    }
    const clientRateLimitContext = !options?.skip_client_rate_limiting ? this.rateLimiter.clientRateLimitContext() : void 0;
    if (clientRateLimitContext?.isRateLimited) {
      logger_logger.critical("This capture call is ignored due to client rate limiting.");
      return;
    }
    if (properties?.$current_url && !isString(properties?.$current_url)) {
      logger_logger.error(
        "Invalid `$current_url` property provided to `posthog.capture`. Input must be a string. Ignoring provided value."
      );
      delete properties?.$current_url;
    }
    if (event_name === "$exception" && !options?._originatedFromCaptureException) {
      logger_logger.warn(
        "Using `posthog.capture('$exception')` is unreliable because it does not attach required metadata. Use `posthog.captureException(error)` instead, which attaches required metadata automatically."
      );
    }
    this.sessionPersistence.update_search_keyword();
    if (this.config.save_campaign_params) {
      this.sessionPersistence.update_campaign_params();
    }
    if (this.config.save_referrer) {
      this.sessionPersistence.update_referrer_info();
    }
    if (this.config.save_campaign_params || this.config.save_referrer) {
      this.persistence.set_initial_person_info();
    }
    const systemTime = /* @__PURE__ */ new Date();
    const timestamp = options?.timestamp || systemTime;
    const uuid = getEventUuid(options?.uuid, uuidv72);
    let data = {
      uuid,
      event: event_name,
      properties: this.calculateEventProperties(event_name, properties || {}, timestamp, uuid)
    };
    if (event_name === EVENT_PAGEVIEW && this.config.__preview_capture_bot_pageviews && isBot) {
      data.event = "$bot_pageview";
      data.properties.$browser_type = "bot";
    }
    if (clientRateLimitContext) {
      data.properties["$lib_rate_limit_remaining_tokens"] = clientRateLimitContext.remainingTokens;
    }
    const shouldSendMinimalFlagCalledEvent = event_name === "$feature_flag_called" && data.properties["$feature_flag_has_experiment"] === false && this.get_property(PERSISTENCE_MINIMAL_FLAG_CALLED_EVENTS) === true;
    const setProperties = options?.$set;
    if (setProperties && !shouldSendMinimalFlagCalledEvent) {
      data.$set = options?.$set;
    }
    const unsetProperties = options?.$unset;
    if (unsetProperties) {
      data.$unset = unsetProperties;
    }
    const markSetOnceAsSent = event_name !== EVENT_GROUPIDENTIFY;
    const forceIncludeInitialProps = event_name === EVENT_IDENTIFY;
    const setOnceProperties = shouldSendMinimalFlagCalledEvent ? void 0 : this._calculate_set_once_properties(options?.$set_once, markSetOnceAsSent, forceIncludeInitialProps);
    if (setOnceProperties) {
      data.$set_once = setOnceProperties;
    }
    if (!options?._noTruncate) {
      data = _copyAndTruncateStrings(data, this.config.properties_string_max_length);
    }
    data.timestamp = timestamp;
    if (!isUndefined(options?.timestamp)) {
      data.properties["$event_time_override_provided"] = true;
      data.properties["$event_time_override_system_time"] = systemTime;
    }
    if (shouldSendMinimalFlagCalledEvent) {
      data.properties = minimizeFlagCalledEventProperties(data.properties, FLAG_CALLED_TRANSPORT_PROPERTY_KEYS);
    }
    if (event_name === SurveyEventName.DISMISSED || event_name === SurveyEventName.SENT) {
      const surveyId = properties?.[SurveyEventProperties.SURVEY_ID];
      const surveyIteration = properties?.[SurveyEventProperties.SURVEY_ITERATION];
      setSurveySeenOnLocalStorage({ id: surveyId, current_iteration: surveyIteration });
      data.$set = {
        ...data.$set,
        [getSurveyInteractionProperty(
          { id: surveyId, current_iteration: surveyIteration },
          event_name === SurveyEventName.SENT ? "responded" : "dismissed"
        )]: true
      };
    } else if (event_name === SurveyEventName.SHOWN) {
      data.$set = {
        ...data.$set,
        [SurveyEventProperties.SURVEY_LAST_SEEN_DATE]: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    if (event_name === ProductTourEventName.SHOWN) {
      const tourType = properties?.[ProductTourEventProperties.TOUR_TYPE];
      if (tourType) {
        data.$set = {
          ...data.$set,
          [`${ProductTourEventProperties.TOUR_LAST_SEEN_DATE}/${tourType}`]: (/* @__PURE__ */ new Date()).toISOString()
        };
      }
    }
    const finalSet = { ...data.properties["$set"], ...data["$set"] };
    if (!isEmptyObject(finalSet)) {
      this.setPersonPropertiesForFlags(finalSet);
    }
    if (!isNullish(this.config.before_send)) {
      const beforeSendResult = this._runBeforeSend(data);
      if (!beforeSendResult) {
        return;
      } else {
        data = beforeSendResult;
        data.uuid = getEventUuid(data.uuid, uuidv72);
      }
    }
    this._internalEventEmitter.emit("eventCaptured", data);
    const url = options?._url ?? this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint);
    const isSessionRecording = options?._batchKey === "recordings" || /\/s\/(?:\?|$)/.test(url);
    const requestOptions = {
      method: "POST",
      url,
      data,
      compression: "best-available",
      timestampMode: isSessionRecording ? "query" : "capture-body",
      batchKey: options?._batchKey,
      transport: options?.transport
    };
    if (this.config.request_batching && (!options || options?._batchKey) && !options?.send_instantly) {
      this._requestQueue.enqueue(requestOptions);
    } else {
      this._send_retriable_request(requestOptions);
    }
    return data;
  }
  _addCaptureHook(callback) {
    return this.on("eventCaptured", (data) => callback(data.event, data));
  }
  /**
   * This method is used internally to calculate the event properties before sending it to PostHog. It can also be
   * used by integrations (e.g. Segment) to enrich events with PostHog properties before sending them to Segment,
   * which is required for some PostHog products to work correctly. (e.g. to have a correct $session_id property).
   *
   * @param {String} eventName The name of the event. This can be anything the user does - 'Button Click', 'Sign Up', '$pageview', etc.
   * @param {Object} eventProperties The properties to include with the event.
   * @param {Date} [timestamp] The timestamp of the event, e.g. for calculating time on page. If not set, it'll automatically be set to the current time.
   * @param {String} [uuid] The uuid of the event, e.g. for storing the $pageview ID.
   * @param {Boolean} [readOnly] Set this if you do not intend to actually send the event, and therefore do not want to update internal state e.g. session timeout
   *
   * @internal
   */
  calculateEventProperties(eventName, eventProperties, timestamp, uuid, readOnly) {
    timestamp = timestamp || /* @__PURE__ */ new Date();
    if (!this.persistence || !this.sessionPersistence) {
      return eventProperties;
    }
    const startTimestamp = readOnly ? void 0 : this.persistence.remove_event_timer(eventName);
    let properties = { ...eventProperties };
    properties["token"] = this.config.token;
    properties["$config_defaults"] = this.config.defaults;
    const releaseId = error_tracking_exports.getInjectedReleaseId();
    if (releaseId) {
      properties["$release_id"] = releaseId;
    }
    if (this._inCookielessMode()) {
      properties[COOKIELESS_MODE_FLAG_PROPERTY] = true;
    }
    if (eventName === "$snapshot") {
      const persistenceProps = { ...this.persistence.properties(), ...this.sessionPersistence.properties() };
      properties["distinct_id"] = persistenceProps.distinct_id;
      if (
        // we spotted one customer that was managing to send `false` for ~9k events a day
        !(isString(properties["distinct_id"]) || isNumber(properties["distinct_id"])) || isEmptyString(properties["distinct_id"])
      ) {
        logger_logger.error("Invalid distinct_id for replay event. This indicates a bug in your implementation");
      }
      return properties;
    }
    const infoProperties = getEventProperties(
      this.config.mask_personal_data_properties,
      this.config.custom_personal_data_properties,
      this.config.detect_google_search_app,
      this.config.disable_capture_url_hashes
    );
    if (this.sessionManager) {
      const { sessionId, windowId } = this.sessionManager.checkAndGetSessionAndWindowId(
        readOnly,
        timestamp.getTime()
      );
      properties["$session_id"] = sessionId;
      properties["$window_id"] = windowId;
    }
    if (this.sessionPropsManager) {
      extend(properties, this.sessionPropsManager.getSessionProps());
    }
    try {
      if (this.sessionRecording) {
        extend(properties, this.sessionRecording.sdkDebugProperties);
      }
      properties["$sdk_debug_retry_queue_size"] = this._retryQueue?.length;
    } catch (e) {
      properties["$sdk_debug_error_capturing_properties"] = String(e);
    }
    if (this.requestRouter.region === RequestRouterRegion.CUSTOM) {
      properties["$lib_custom_api_host"] = this.config.api_host;
    }
    let pageviewProperties;
    if (eventName === EVENT_PAGEVIEW && !readOnly) {
      pageviewProperties = this.pageViewManager.doPageView(timestamp, uuid);
    } else if (eventName === EVENT_PAGELEAVE && !readOnly) {
      pageviewProperties = this.pageViewManager.doPageLeave(timestamp);
    } else {
      pageviewProperties = this.pageViewManager.doEvent();
    }
    properties = extend(properties, pageviewProperties);
    if (eventName === EVENT_PAGEVIEW && globals_document) {
      properties["title"] = globals_document.title;
    }
    if (!isUndefined(startTimestamp)) {
      const duration_in_ms = timestamp.getTime() - startTimestamp;
      properties["$duration"] = parseFloat((duration_in_ms / 1e3).toFixed(3));
    }
    if (userAgent && this.config.opt_out_useragent_filter) {
      properties["$browser_type"] = this._is_bot() ? "bot" : "browser";
    }
    const persistenceProperties = this.persistence.properties();
    const sessionPersistenceProperties = this.sessionPersistence.properties();
    each(["$referrer", "$referring_domain"], (referrerKey) => {
      if (referrerKey in persistenceProperties) {
        delete sessionPersistenceProperties[referrerKey];
      }
    });
    properties = extend({}, infoProperties, persistenceProperties, sessionPersistenceProperties, properties);
    properties["$is_identified"] = this._isIdentified();
    if (isArray(this.config.property_denylist)) {
      each(this.config.property_denylist, function(denylisted_prop) {
        delete properties[denylisted_prop];
      });
    } else {
      logger_logger.error(
        DENYLIST_INVALID + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist
      );
    }
    const sanitize_properties = this.config.sanitize_properties;
    if (sanitize_properties) {
      logger_logger.error(SANITIZE_DEPRECATED);
      properties = sanitize_properties(properties, eventName);
    }
    const hasPersonProcessing = this._hasPersonProcessing();
    properties["$process_person_profile"] = hasPersonProcessing;
    if (hasPersonProcessing && !readOnly) {
      this._requirePersonProcessing("_calculate_event_properties");
    }
    return properties;
  }
  /**
   * Add additional set_once properties to the event when creating a person profile. This allows us to create the
   * profile with mostly-accurate properties, despite earlier events not setting them. We do this by storing them in
   * persistence.
   * @param dataSetOnce
   * @param markAsSent - if true, marks the properties as sent so they won't be included in future events.
   *                     Set to false for events like $groupidentify where the server doesn't process person props.
   * @param forceIncludeInitialProps - if true, include initial person props even if they've already been sent.
   *                                   Used for $identify which creates/merges persons and may be processed out of order.
   */
  _calculate_set_once_properties(dataSetOnce, markAsSent = true, forceIncludeInitialProps = false) {
    if (!this.persistence || !this._hasPersonProcessing()) {
      return dataSetOnce;
    }
    if (this._personProcessingSetOncePropertiesSent && !forceIncludeInitialProps) {
      return dataSetOnce;
    }
    const initialProps = this.persistence.get_initial_props();
    const sessionProps = this.sessionPropsManager?.getSetOnceProps();
    let setOnceProperties = extend({}, initialProps, sessionProps || {}, dataSetOnce || {});
    const sanitize_properties = this.config.sanitize_properties;
    if (sanitize_properties) {
      logger_logger.error(SANITIZE_DEPRECATED);
      setOnceProperties = sanitize_properties(setOnceProperties, "$set_once");
    }
    if (markAsSent) {
      this._personProcessingSetOncePropertiesSent = true;
    }
    if (isEmptyObject(setOnceProperties)) {
      return void 0;
    }
    return setOnceProperties;
  }
  /**
   * Registers super properties that are included with all events.
   *
   * @remarks
   * Super properties are stored in persistence and automatically added to every event you capture.
   * These values will overwrite any existing super properties with the same keys.
   *
   * @example
   * ```js
   * // register a single property
   * posthog.register({ plan: 'premium' })
   * ```
   *
   * {@label Capture}
   *
   * @example
   * ```js
   * // register multiple properties
   * posthog.register({
   *     email: 'user@example.com',
   *     account_type: 'business',
   *     signup_date: '2023-01-15'
   * })
   * ```
   *
   * @example
   * ```js
   * // register with custom expiration
   * posthog.register({ campaign: 'summer_sale' }, 7) // expires in 7 days
   * ```
   *
   * @public
   *
   * @param {Object} properties properties to store about the user
   * @param {Number} [days] How many days since the user's last visit to store the super properties
   */
  register(properties, days) {
    this.persistence?.register(properties, days);
  }
  /**
   * Registers super properties only if they haven't been set before.
   *
   * @remarks
   * Unlike `register()`, this method will not overwrite existing super properties.
   * Use this for properties that should only be set once, like signup date or initial referrer.
   *
   * {@label Capture}
   *
   * @example
   * ```js
   * // register once-only properties
   * posthog.register_once({
   *     first_login_date: new Date().toISOString(),
   *     initial_referrer: document.referrer
   * })
   * ```
   *
   * @example
   * ```js
   * // override existing value if it matches default
   * posthog.register_once(
   *     { user_type: 'premium' },
   *     'unknown'  // overwrite if current value is 'unknown'
   * )
   * ```
   *
   * @public
   *
   * @param {Object} properties An associative array of properties to store about the user
   * @param {*} [default_value] Value to override if already set in super properties (ex: 'False') Default: 'None'
   * @param {Number} [days] How many days since the users last visit to store the super properties
   */
  register_once(properties, default_value, days) {
    this.persistence?.register_once(properties, default_value, days);
  }
  /**
   * Registers super properties for the current session only.
   *
   * @remarks
   * Session super properties are automatically added to all events during the current browser session.
   * Unlike regular super properties, these are cleared when the session ends and are stored in sessionStorage.
   *
   * {@label Capture}
   *
   * @example
   * ```js
   * // register session-specific properties
   * posthog.register_for_session({
   *     current_page_type: 'checkout',
   *     ab_test_variant: 'control'
   * })
   * ```
   *
   * @example
   * ```js
   * // register properties for user flow tracking
   * posthog.register_for_session({
   *     selected_plan: 'pro',
   *     completed_steps: 3,
   *     flow_id: 'signup_flow_v2'
   * })
   * ```
   *
   * @public
   *
   * @param {Object} properties An associative array of properties to store about the user
   */
  register_for_session(properties) {
    this.sessionPersistence?.register(properties);
  }
  /**
   * Removes a super property from persistent storage.
   *
   * @remarks
   * This will stop the property from being automatically included in future events.
   * The property will be permanently removed from the user's profile.
   *
   * {@label Capture}
   *
   * @example
   * ```js
   * // remove a super property
   * posthog.unregister('plan_type')
   * ```
   *
   * @public
   *
   * @param {String} property The name of the super property to remove
   */
  unregister(property) {
    this.persistence?.unregister(property);
  }
  /**
   * Removes a session super property from the current session.
   *
   * @remarks
   * This will stop the property from being automatically included in future events for this session.
   * The property is removed from sessionStorage.
   *
   * {@label Capture}
   *
   * @example
   * ```js
   * // remove a session property
   * posthog.unregister_for_session('current_flow')
   * ```
   *
   * @public
   *
   * @param {String} property The name of the session super property to remove
   */
  unregister_for_session(property) {
    this.sessionPersistence?.unregister(property);
  }
  _register_single(prop, value) {
    this.register({ [prop]: value });
  }
  /**
   * Gets the value of a feature flag for the current user.
   *
   * @remarks
   * Returns the feature flag value which can be a boolean, string, or undefined.
   * Supports multivariate flags that can return custom string values.
   *
   * {@label Feature flags}
   *
   * @example
   * ```js
   * // check boolean flag
   * if (posthog.getFeatureFlag('new-feature')) {
   *     // show new feature
   * }
   * ```
   *
   * @example
   * ```js
   * // check multivariate flag
   * const variant = posthog.getFeatureFlag('button-color')
   * if (variant === 'red') {
   *     // show red button
   * }
   * ```
   *
   * @public
   *
   * @param {string} key Key of the feature flag.
   * @param {FeatureFlagOptions} [options] Optional lookup settings. If `{ send_event: false }`, we won't send a `$feature_flag_called` event to PostHog. If `{ fresh: true }`, we won't return cached values from localStorage - only values loaded from the server.
   * @returns {boolean | string | undefined} The feature flag value, or undefined if the flag is unavailable.
   */
  getFeatureFlag(key, options) {
    return this.featureFlags?.getFeatureFlag(key, options);
  }
  /**
   * Get feature flag payload value matching key for user (supports multivariate flags).
   *
   * {@label Feature flags}
   *
   * @example
   * ```js
   * const betaFeature = posthog.getFeatureFlagResult('beta-feature')
   * if (betaFeature?.variant === 'some-value') {
   *      const someValue = betaFeature?.payload
   *      // do something
   * }
   * ```
   *
   * @public
   *
   * @deprecated Use `getFeatureFlagResult()` instead
   *
   * @param {string} key Key of the feature flag.
   * @returns {JsonType} The feature flag payload.
   */
  getFeatureFlagPayload(key) {
    return this.featureFlags?.getFeatureFlagPayload(key);
  }
  /**
   * Get a feature flag evaluation result including both the flag value and payload.
   *
   * By default, this method emits the `$feature_flag_called` event.
   *
   * {@label Feature flags}
   *
   * @example
   * ```js
   * const result = posthog.getFeatureFlagResult('my-flag')
   * if (result?.enabled) {
   *     console.log('Flag is enabled with payload:', result.payload)
   * }
   * ```
   *
   * @example
   * ```js
   * // multivariate flag
   * const result = posthog.getFeatureFlagResult('button-color')
   * if (result?.variant === 'red') {
   *     showRedButton(result.payload)
   * }
   * ```
   *
   * @public
   *
   * @param {string} key Key of the feature flag.
   * @param {Object} [options] Options for the feature flag lookup.
   * @param {boolean} [options.send_event=true] If false, won't send the $feature_flag_called event.
   * @param {boolean} [options.fresh=false] If true, won't return cached values from localStorage - only values loaded from the server.
   * @returns {FeatureFlagResult | undefined} The feature flag result including key, enabled, variant, and payload.
   */
  getFeatureFlagResult(key, options) {
    return this.featureFlags?.getFeatureFlagResult(key, options);
  }
  /**
   * Returns all currently cached feature flags as `FeatureFlagResult`s. This is a synchronous read of
   * the flags from the last load (no network request); call `reloadFeatureFlags()` first to refresh.
   * Unlike `getFeatureFlag()`, it does not send a `$feature_flag_called` event.
   *
   * @returns {FeatureFlagResult[]} All loaded flags, or an empty array if none are loaded.
   */
  getAllFeatureFlags() {
    return this.featureFlags?.getAllFeatureFlags() ?? [];
  }
  isFeatureEnabled(key, options) {
    return this.featureFlags?.isFeatureEnabled(key, options) ?? options?.defaultValue;
  }
  /**
   * Feature flag values are cached. If something has changed with your user and you'd like to refetch their flag values, call this method.
   *
   * {@label Feature flags}
   *
   * @example
   * ```js
   * posthog.reloadFeatureFlags()
   * ```
   *
   * @public
   */
  reloadFeatureFlags() {
    this.featureFlags?.reloadFeatureFlags();
  }
  /**
   * Manually update feature flag values without making a network request.
   *
   * This is useful when you have feature flag values from an external source
   * (e.g., server-side evaluation, edge middleware) and want to inject them
   * into the client SDK.
   *
   * {@label Feature flags}
   *
   * @example
   * ```js
   * // Replace all flags with server-evaluated values
   * posthog.updateFlags({
   *   'my-flag': true,
   *   'my-experiment': 'variant-a'
   * })
   *
   * // Merge with existing flags (update only specified flags)
   * posthog.updateFlags(
   *   { 'my-flag': true },
   *   undefined,
   *   { merge: true }
   * )
   *
   * // With payloads
   * posthog.updateFlags(
   *   { 'my-flag': true },
   *   { 'my-flag': { some: 'data' } }
   * )
   * ```
   *
   * @param flags - An object mapping flag keys to their values (boolean or string variant)
   * @param payloads - Optional object mapping flag keys to their JSON payloads
   * @param options - Optional settings. Use `{ merge: true }` to merge with existing flags instead of replacing.
   * @public
   */
  updateFlags(flags, payloads, options) {
    this.featureFlags?.updateFlags(flags, payloads, options);
  }
  /**
   * Opt the user in or out of an early access feature. [Learn more in the docs](/docs/feature-flags/early-access-feature-management#option-2-custom-implementation)
   *
   * {@label Feature flags}
   *
   * @example
   * ```js
   * const toggleBeta = (betaKey) => {
   *   if (activeBetas.some(
   *     beta => beta.flagKey === betaKey
   *   )) {
   *     posthog.updateEarlyAccessFeatureEnrollment(
   *       betaKey,
   *       false
   *     )
   *     setActiveBetas(
   *       prevActiveBetas => prevActiveBetas.filter(
   *         item => item.flagKey !== betaKey
   *       )
   *     );
   *     return
   *   }
   *
   *   posthog.updateEarlyAccessFeatureEnrollment(
   *     betaKey,
   *     true
   *   )
   *   setInactiveBetas(
   *     prevInactiveBetas => prevInactiveBetas.filter(
   *       item => item.flagKey !== betaKey
   *     )
   *   );
   * }
   *
   * const registerInterest = (featureKey) => {
   *   posthog.updateEarlyAccessFeatureEnrollment(
   *     featureKey,
   *     true
   *   )
   *   // Update UI to show user has registered
   * }
   * ```
   *
   * @public
   *
   * @param {String} key The key of the feature flag to update.
   * @param {Boolean} isEnrolled Whether the user is enrolled in the feature.
   * @param {String} [stage] The stage of the feature flag to update.
   */
  updateEarlyAccessFeatureEnrollment(key, isEnrolled, stage) {
    this.featureFlags?.updateEarlyAccessFeatureEnrollment(key, isEnrolled, stage);
  }
  /**
   * Get the list of early access features. To check enrollment status, use `isFeatureEnabled`. [Learn more in the docs](/docs/feature-flags/early-access-feature-management#option-2-custom-implementation)
   *
   * {@label Feature flags}
   *
   * @example
   * ```js
   * const posthog = usePostHog()
   * const activeFlags = useActiveFeatureFlags()
   *
   * const [activeBetas, setActiveBetas] = useState([])
   * const [inactiveBetas, setInactiveBetas] = useState([])
   * const [comingSoonFeatures, setComingSoonFeatures] = useState([])
   *
   * useEffect(() => {
   *   posthog.getEarlyAccessFeatures((features) => {
   *     // Filter features by stage
   *     const betaFeatures = features.filter(feature => feature.stage === 'beta')
   *     const conceptFeatures = features.filter(feature => feature.stage === 'concept')
   *
   *     setComingSoonFeatures(conceptFeatures)
   *
   *     if (!activeFlags || activeFlags.length === 0) {
   *       setInactiveBetas(betaFeatures)
   *       return
   *     }
   *
   *     const activeBetas = betaFeatures.filter(
   *             beta => activeFlags.includes(beta.flagKey)
   *         );
   *     const inactiveBetas = betaFeatures.filter(
   *             beta => !activeFlags.includes(beta.flagKey)
   *         );
   *     setActiveBetas(activeBetas)
   *     setInactiveBetas(inactiveBetas)
   *   }, true, ['concept', 'beta'])
   * }, [activeFlags])
   * ```
   *
   * @public
   *
   * @param {Function} callback The callback function will be called when the early access features are loaded.
   * @param {Boolean} [force_reload] Whether to force a reload of the early access features.
   * @param {String[]} [stages] The stages of the early access features to load.
   */
  getEarlyAccessFeatures(callback, force_reload = false, stages) {
    return this.featureFlags?.getEarlyAccessFeatures(callback, force_reload, stages);
  }
  /**
   * Exposes a set of events that PostHog will emit.
   * e.g. `eventCaptured` is emitted immediately before trying to send an event
   *
   * Unlike  `onFeatureFlags` and `onSessionId` these are not called when the
   * listener is registered, the first callback will be the next event
   * _after_ registering a listener
   *
   * Available events:
   * - `eventCaptured`: Emitted immediately before trying to send an event
   * - `featureFlagsReloading`: Emitted when feature flags are being reloaded (e.g. after `identify()`, `group()`, or `reloadFeatureFlags()`)
   *
   * {@label Capture}
   *
   * @example
   * ```js
   * posthog.on('eventCaptured', (event) => {
   *   console.log(event)
   * })
   * ```
   *
   * @example
   * ```js
   * // Track when feature flags are reloading to show a loading state
   * posthog.on('featureFlagsReloading', () => {
   *   console.log('Feature flags are being reloaded...')
   * })
   * ```
   *
   * @public
   *
   * @param {String} event The event to listen for.
   * @param {Function} cb The callback function to call when the event is emitted.
   * @returns {Function} A function that can be called to unsubscribe the listener.
   */
  on(event, cb) {
    return this._internalEventEmitter.on(event, cb);
  }
  /**
   * Register an event listener that runs when feature flags become available or when they change.
   * If there are flags, the listener is called immediately in addition to being called on future changes.
   * Note that this is not called only when we fetch feature flags from the server, but also when they change in the browser.
   *
   * {@label Feature flags}
   *
   * @public
   *
   * @example
   * ```js
   * posthog.onFeatureFlags(function(featureFlags, featureFlagsVariants, { errorsLoading }) {
   *     // do something
   * })
   * ```
   *
   * @param callback - The callback function will be called once the feature flags are ready or when they are updated.
   *                   It'll return a list of feature flags enabled for the user, the variants,
   *                   and also a context object indicating whether we succeeded to fetch the flags or not.
   * @returns A function that can be called to unsubscribe the listener. Used by `useEffect` when the component unmounts.
   */
  onFeatureFlags(callback) {
    if (!this.featureFlags) {
      callback([], {}, { errorsLoading: true });
      return () => {
      };
    }
    return this.featureFlags.onFeatureFlags(callback);
  }
  /**
   * Register an event listener that runs when surveys are loaded.
   *
   * Callback parameters:
   * - surveys: Survey[]: An array containing all survey objects fetched from PostHog using the getSurveys method
   * - context: { isLoaded: boolean, error?: string }: An object indicating if the surveys were loaded successfully
   *
   * {@label Surveys}
   *
   * @example
   * ```js
   * posthog.onSurveysLoaded((surveys, context) => { // do something })
   * ```
   *
   * @param {SurveyCallback} callback The callback function will be called when surveys are loaded or updated.
   * @returns A function that can be called to unsubscribe the listener.
   */
  onSurveysLoaded(callback) {
    if (!this.surveys) {
      callback([], { isLoaded: false, error: SURVEYS_NOT_AVAILABLE });
      return () => {
      };
    }
    return this.surveys.onSurveysLoaded(callback);
  }
  /**
   * Register an event listener that runs whenever the session id or window id change.
   * If there is already a session id, the listener is called immediately in addition to being called on future changes.
   *
   * Can be used, for example, to sync the PostHog session id with a backend session.
   *
   * {@label Identification}
   *
   * @public
   *
   * @example
   * ```js
   * posthog.onSessionId(function(sessionId, windowId) { // do something })
   * ```
   *
   * @param {Function} [callback] The callback function will be called once a session id is present or when it or the window id are updated.
   * @returns {Function} A function that can be called to unsubscribe the listener. E.g. Used by `useEffect` when the component unmounts.
   */
  onSessionId(callback) {
    return this.sessionManager?.onSessionId(callback) ?? (() => {
    });
  }
  /**
   * Get list of all surveys.
   *
   * {@label Surveys}
   *
   * @example
   * ```js
   * function callback(surveys, context) {
   *   // do something
   * }
   *
   * posthog.getSurveys(callback, false)
   * ```
   *
   * @public
   *
   * @param {SurveyCallback} callback Function that receives the array of surveys.
   * @param {boolean} [forceReload] Optional boolean to force an API call for updated surveys.
   */
  getSurveys(callback, forceReload = false) {
    this.surveys ? this.surveys.getSurveys(callback, forceReload) : callback([], { isLoaded: false, error: SURVEYS_NOT_AVAILABLE });
  }
  /**
   * Get surveys that should be enabled for the current user. See [fetching surveys documentation](/docs/surveys/implementing-custom-surveys#fetching-surveys-manually) for more details.
   *
   * {@label Surveys}
   *
   * @example
   * ```js
   * posthog.getActiveMatchingSurveys((surveys) => {
   *      // do something
   * })
   * ```
   *
   * @public
   *
   * @param {SurveyCallback} callback The callback function will be called when the surveys are loaded or updated.
   * @param {boolean} [forceReload] Whether to force a reload of the surveys.
   */
  getActiveMatchingSurveys(callback, forceReload = false) {
    this.surveys ? this.surveys.getActiveMatchingSurveys(callback, forceReload) : callback([], { isLoaded: false, error: SURVEYS_NOT_AVAILABLE });
  }
  /**
   * Although we recommend using popover surveys and display conditions,
   * if you want to show surveys programmatically without setting up all
   * the extra logic needed for API surveys, you can render surveys
   * programmatically with the renderSurvey method.
   *
   * This takes a survey ID and an HTML selector to render an unstyled survey.
   *
   * {@label Surveys}
   *
   * @example
   * ```js
   * posthog.renderSurvey(coolSurveyID, '#survey-container')
   * ```
   *
   * @deprecated Use displaySurvey instead - it's more complete and also supports popover surveys.
   *
   * @public
   *
   * @param {String} surveyId The ID of the survey to render.
   * @param {String} selector The selector of the HTML element to render the survey on.
   */
  renderSurvey(surveyId, selector) {
    this.surveys?.renderSurvey(surveyId, selector);
  }
  /**
   * Display a survey programmatically as either a popover or inline element.
   *
   * @param {string} surveyId The survey ID to display.
   * @param {DisplaySurveyOptions} [options] Display configuration. Defaults to a popover that respects dashboard conditions and delays.
   *
   * @example
   * ```js
   * // Display as popover (respects all conditions defined in the dashboard)
   * posthog.displaySurvey('survey-id-123')
   * ```
   *
   * @example
   * ```js
   * // Display inline in a specific element
   * posthog.displaySurvey('survey-id-123', {
   *   displayType: DisplaySurveyType.Inline,
   *   ignoreConditions: false,
   *   ignoreDelay: false,
   *   selector: '#survey-container'
   * })
   * ```
   *
   * @example
   * ```js
   * // Force display ignoring conditions and delays
   * posthog.displaySurvey('survey-id-123', {
   *   displayType: DisplaySurveyType.Popover,
   *   ignoreConditions: true,
   *   ignoreDelay: true
   * })
   * ```
   *
   * {@label Surveys}
   */
  displaySurvey(surveyId, options = DEFAULT_DISPLAY_SURVEY_OPTIONS) {
    this.surveys?.displaySurvey(surveyId, options);
  }
  /**
   * Cancels a pending survey that is waiting to be displayed (e.g., due to a popup delay).
   *
   * {@label Surveys}
   *
   * @param {string} surveyId The survey ID whose pending display should be cancelled.
   */
  cancelPendingSurvey(surveyId) {
    this.surveys?.cancelPendingSurvey(surveyId);
  }
  /**
   * Checks the feature flags associated with this Survey to see if the survey can be rendered.
   * This method is deprecated because it's synchronous and won't return the correct result if surveys are not loaded.
   * Use `canRenderSurveyAsync` instead.
   *
   * {@label Surveys}
   *
   * @public
   * @deprecated
   *
   * @param surveyId The ID of the survey to check.
   * @returns A SurveyRenderReason object indicating if the survey can be rendered.
   */
  canRenderSurvey(surveyId) {
    return this.surveys?.canRenderSurvey(surveyId) ?? {
      visible: false,
      disabledReason: SURVEYS_NOT_AVAILABLE
    };
  }
  /**
   * Checks the feature flags associated with this Survey to see if the survey can be rendered.
   *
   * {@label Surveys}
   *
   * @example
   * ```js
   * posthog.canRenderSurveyAsync(surveyId).then((result) => {
   *     if (result.visible) {
   *         // Survey can be rendered
   *         console.log('Survey can be rendered')
   *     } else {
   *         // Survey cannot be rendered
   *         console.log('Survey cannot be rendered:', result.disabledReason)
   *     }
   * })
   * ```
   *
   * @public
   *
   * @param surveyId The ID of the survey to check.
   * @param forceReload If true, the survey will be reloaded from the server, Default: false
   * @returns A SurveyRenderReason object indicating if the survey can be rendered.
   */
  canRenderSurveyAsync(surveyId, forceReload = false) {
    return this.surveys?.canRenderSurveyAsync(surveyId, forceReload) ?? // eslint-disable-next-line compat/compat
    Promise.resolve({ visible: false, disabledReason: SURVEYS_NOT_AVAILABLE });
  }
  _validateIdentifyId(id) {
    if (!id || isEmptyString(id)) {
      logger_logger.critical("Unique user id has not been set in posthog.identify");
      return false;
    }
    if (id === COOKIELESS_SENTINEL_VALUE) {
      logger_logger.critical(
        `The string "${id}" was set in posthog.identify which indicates an error. This ID is only used as a sentinel value.`
      );
      return false;
    }
    if (isDistinctIdStringLike(id) || ["undefined", "null"].includes(id.toLowerCase())) {
      logger_logger.critical(
        `The string "${id}" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.`
      );
      return false;
    }
    return true;
  }
  /**
   * Associates a user with a unique identifier instead of an auto-generated ID.
   * Learn more about [identifying users](/docs/product-analytics/identify)
   *
   * {@label Identification}
   *
   * @remarks
   * By default, PostHog assigns each user a randomly generated `distinct_id`. Use this method to
   * replace that ID with your own unique identifier (like a user ID from your database).
   *
   * @example
   * ```js
   * // basic identification
   * posthog.identify('user_12345')
   * ```
   *
   * @example
   * ```js
   * // identify with user properties
   * posthog.identify('user_12345', {
   *     email: 'user@example.com',
   *     plan: 'premium'
   * })
   * ```
   *
   * @example
   * ```js
   * // identify with set and set_once properties
   * posthog.identify('user_12345',
   *     { last_login: new Date() },  // updates every time
   *     { signup_date: new Date() }  // sets only once
   * )
   * ```
   *
   * @public
   *
   * @param {String} [new_distinct_id] A string that uniquely identifies a user. If not provided, the distinct_id currently in the persistent store (cookie or localStorage) will be used.
   * @param {Object} [userPropertiesToSet] Optional: An associative array of properties to store about the user. Note: For feature flag evaluations, if the same key is present in the userPropertiesToSetOnce,
   *  it will be overwritten by the value in userPropertiesToSet.
   * @param {Object} [userPropertiesToSetOnce] Optional: An associative array of properties to store about the user. If property is previously set, this does not override that value.
   */
  identify(new_distinct_id, userPropertiesToSet, userPropertiesToSetOnce) {
    if (!this.__loaded || !this.persistence) {
      return logger_logger.uninitializedWarning("posthog.identify");
    }
    if (isNumber(new_distinct_id)) {
      new_distinct_id = new_distinct_id.toString();
      logger_logger.warn(
        "The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string."
      );
    }
    if (!this._validateIdentifyId(new_distinct_id)) {
      return;
    }
    if (!this._requirePersonProcessing("posthog.identify")) {
      return;
    }
    const previous_distinct_id = this.get_distinct_id();
    this.register({ $user_id: new_distinct_id });
    if (!this.get_property(DEVICE_ID)) {
      const device_id = previous_distinct_id;
      this.register_once(
        {
          $had_persisted_distinct_id: true,
          $device_id: device_id
        },
        ""
      );
    }
    if (new_distinct_id !== previous_distinct_id && new_distinct_id !== this.get_property(ALIAS_ID_KEY)) {
      this.unregister(ALIAS_ID_KEY);
      this.register({ distinct_id: new_distinct_id });
    }
    const isKnownAnonymous = (this.persistence.get_property(USER_STATE) || USER_STATE_ANONYMOUS) === USER_STATE_ANONYMOUS;
    if (new_distinct_id !== previous_distinct_id && isKnownAnonymous) {
      this.persistence.set_property(USER_STATE, USER_STATE_IDENTIFIED);
      this.setPersonPropertiesForFlags(
        { $set: userPropertiesToSet || {}, $set_once: userPropertiesToSetOnce || {} },
        false
      );
      this.capture(
        EVENT_IDENTIFY,
        {
          distinct_id: new_distinct_id,
          $anon_distinct_id: previous_distinct_id
        },
        { $set: userPropertiesToSet || {}, $set_once: userPropertiesToSetOnce || {} }
      );
      this._cachedPersonProperties = getPersonPropertiesHash2(
        new_distinct_id,
        userPropertiesToSet,
        userPropertiesToSetOnce
      );
      this.featureFlags?.setAnonymousDistinctId(previous_distinct_id);
    } else if (userPropertiesToSet || userPropertiesToSetOnce) {
      this.setPersonProperties(userPropertiesToSet, userPropertiesToSetOnce);
    }
    if (new_distinct_id !== previous_distinct_id) {
      this.reloadFeatureFlags();
      this.unregister(FLAG_CALL_REPORTED);
    }
  }
  /**
   * Sets properties on the person profile associated with the current `distinct_id`.
   * Learn more about [identifying users](/docs/product-analytics/identify)
   *
   * {@label Identification}
   *
   * @remarks
   * Updates user properties that are stored with the person profile in PostHog.
   * If `person_profiles` is set to `identified_only` and no profile exists, this will create one.
   *
   * @example
   * ```js
   * // set user properties
   * posthog.setPersonProperties({
   *     email: 'user@example.com',
   *     plan: 'premium'
   * })
   * ```
   *
   * @example
   * ```js
   * // set properties
   * posthog.setPersonProperties(
   *     { name: 'Max Hedgehog' },  // $set properties
   *     { initial_url: '/blog' }   // $set_once properties
   * )
   * ```
   *
   * @public
   *
   * @param {Object} [userPropertiesToSet] Optional: An associative array of properties to store about the user. Note: For feature flag evaluations, if the same key is present in the userPropertiesToSetOnce,
   *  it will be overwritten by the value in userPropertiesToSet.
   * @param {Object} [userPropertiesToSetOnce] Optional: An associative array of properties to store about the user. If property is previously set, this does not override that value.
   */
  setPersonProperties(userPropertiesToSet, userPropertiesToSetOnce) {
    if (!userPropertiesToSet && !userPropertiesToSetOnce) {
      return;
    }
    if (!this._requirePersonProcessing("posthog.setPersonProperties")) {
      return;
    }
    const hash = getPersonPropertiesHash2(this.get_distinct_id(), userPropertiesToSet, userPropertiesToSetOnce);
    if (this._cachedPersonProperties === hash) {
      logger_logger.info("A duplicate setPersonProperties call was made with the same properties. It has been ignored.");
      return;
    }
    this.setPersonPropertiesForFlags(
      { $set: userPropertiesToSet || {}, $set_once: userPropertiesToSetOnce || {} },
      true
    );
    this.capture("$set", { $set: userPropertiesToSet || {}, $set_once: userPropertiesToSetOnce || {} });
    this._cachedPersonProperties = hash;
  }
  /**
   * Removes properties from the person profile associated with the current `distinct_id`.
   * Learn more about [identifying users](/docs/product-analytics/identify)
   *
   * {@label Identification}
   *
   * @remarks
   * Deletes the given person properties from the person profile in PostHog. This is the
   * counterpart to {@link setPersonProperties} — instead of hand-passing `$unset` inside a
   * `capture()` call, you can remove properties with a dedicated method.
   * If `person_profiles` is set to `never`, this call is ignored.
   *
   * @example
   * ```js
   * // remove a single property
   * posthog.unsetPersonProperties('plan')
   * ```
   *
   * @example
   * ```js
   * // remove multiple properties
   * posthog.unsetPersonProperties(['plan', 'email'])
   * ```
   *
   * @public
   *
   * @param {String|String[]} propertyNames The name (or names) of the person properties to remove.
   */
  unsetPersonProperties(propertyNames) {
    const names = (isArray(propertyNames) ? propertyNames : [propertyNames]).filter(
      (name) => isString(name) && name.length > 0
    );
    if (names.length === 0) {
      return;
    }
    if (!this._requirePersonProcessing("posthog.unsetPersonProperties")) {
      return;
    }
    this.featureFlags?.unsetPersonPropertiesForFlags(names, true);
    this.capture("$set", { $unset: names });
    this._cachedPersonProperties = null;
  }
  /**
   * Associates the user with a group for group-based analytics.
   * Learn more about [groups](/docs/product-analytics/group-analytics)
   *
   * {@label Identification}
   *
   * @remarks
   * Groups allow you to analyze users collectively (e.g., by organization, team, or account).
   * This sets the group association for all subsequent events and reloads feature flags.
   *
   * @example
   * ```js
   * // associate user with an organization
   * posthog.group('organization', 'org_12345', {
   *     name: 'Acme Corp',
   *     plan: 'enterprise'
   * })
   * ```
   *
   * @example
   * ```js
   * // associate with multiple group types
   * posthog.group('organization', 'org_12345')
   * posthog.group('team', 'team_67890')
   * ```
   *
   * @public
   *
   * @param {String} groupType Group type (example: 'organization')
   * @param {String} groupKey Group key (example: 'org::5')
   * @param {Object} groupPropertiesToSet Optional properties to set for group
   */
  group(groupType, groupKey, groupPropertiesToSet) {
    if (!groupType || !groupKey) {
      logger_logger.error("posthog.group requires a group type and group key");
      return;
    }
    const existingGroups = this.getGroups();
    const isNewGroup = existingGroups[groupType] !== groupKey;
    if (isNewGroup) {
      this.resetGroupPropertiesForFlags(groupType);
    }
    this.register({ $groups: { ...existingGroups, [groupType]: groupKey } });
    if (isNewGroup || groupPropertiesToSet) {
      const groupIdentifyProperties = {
        $group_type: groupType,
        $group_key: groupKey
      };
      if (groupPropertiesToSet) {
        groupIdentifyProperties.$group_set = groupPropertiesToSet;
      }
      this.capture(EVENT_GROUPIDENTIFY, groupIdentifyProperties);
    }
    if (groupPropertiesToSet) {
      this.setGroupPropertiesForFlags({ [groupType]: groupPropertiesToSet });
    }
    if (isNewGroup && !groupPropertiesToSet) {
      this.reloadFeatureFlags();
    }
  }
  /**
   * Resets only the group properties of the user currently logged in.
   * Learn more about [groups](/docs/product-analytics/group-analytics)
   *
   * {@label Identification}
   *
   * @example
   * ```js
   * posthog.resetGroups()
   * ```
   *
   * @public
   */
  resetGroups() {
    this.register({ $groups: {} });
    this.resetGroupPropertiesForFlags();
    this.reloadFeatureFlags();
  }
  /**
   * Sometimes, you might want to evaluate feature flags using properties that haven't been ingested yet,
   * or were set incorrectly earlier. You can do so by setting properties the flag depends on with these calls:
   *
   * {@label Feature flags}
   *
   * @example
   * ```js
   * // Set properties
   * posthog.setPersonPropertiesForFlags({'property1': 'value', property2: 'value2'})
   * ```
   *
   * @example
   * ```js
   * // Set properties without reloading
   * posthog.setPersonPropertiesForFlags({'property1': 'value', property2: 'value2'}, false)
   * ```
   *
   * @public
   *
   * @param {Object} properties The properties to override.
   * @param {Boolean} [reloadFeatureFlags] Whether to reload feature flags.
   */
  setPersonPropertiesForFlags(properties, reloadFeatureFlags = true) {
    this.featureFlags?.setPersonPropertiesForFlags(properties, reloadFeatureFlags);
  }
  /**
   * Resets the person properties for feature flags.
   *
   * {@label Feature flags}
   *
   * @public
   *
   * @example
   * ```js
   * posthog.resetPersonPropertiesForFlags()
   * ```
   *
   * @example
   * ```js
   * // Reset properties without reloading
   * posthog.resetPersonPropertiesForFlags(false)
   * ```
   *
   * @param {Boolean} [reloadFeatureFlags=true] Whether to reload feature flags.
   */
  resetPersonPropertiesForFlags(reloadFeatureFlags = true) {
    this.featureFlags?.resetPersonPropertiesForFlags(reloadFeatureFlags);
  }
  /**
   * Set override group properties for feature flags.
   * This is used when dealing with new groups / where you don't want to wait for ingestion
   * to update properties.
   * Takes in an object, the key of which is the group type.
   *
   * {@label Feature flags}
   *
   * @public
   *
   * @example
   * ```js
   * // Set properties with reload
   * posthog.setGroupPropertiesForFlags({'organization': { name: 'CYZ', employees: '11' } })
   * ```
   *
   * @example
   * ```js
   * // Set properties without reload
   * posthog.setGroupPropertiesForFlags({'organization': { name: 'CYZ', employees: '11' } }, false)
   * ```
   *
   * @param {Object} properties The properties to override, the key of which is the group type.
   * @param {Boolean} [reloadFeatureFlags] Whether to reload feature flags.
   */
  setGroupPropertiesForFlags(properties, reloadFeatureFlags = true) {
    if (!this._requirePersonProcessing("posthog.setGroupPropertiesForFlags")) {
      return;
    }
    this.featureFlags?.setGroupPropertiesForFlags(properties, reloadFeatureFlags);
  }
  /**
   * Resets the group properties for feature flags.
   *
   * {@label Feature flags}
   *
   * @public
   *
   * @example
   * ```js
   * posthog.resetGroupPropertiesForFlags()
   * ```
   *
   * @param {string} [group_type] Optional group type to reset. If omitted, all group properties are reset.
   */
  resetGroupPropertiesForFlags(group_type) {
    this.featureFlags?.resetGroupPropertiesForFlags(group_type);
  }
  /**
   * Resets all user data and starts a fresh session.
   *
   * ⚠️ **Warning**: Only call this when a user logs out. Calling at the wrong time can cause split sessions.
   *
   * This clears:
   * - Session ID and super properties
   * - User identification (sets new random distinct_id)
   * - Cached data and consent settings
   *
   * {@label Identification}
   * @example
   * ```js
   * // reset on user logout
   * function logout() {
   *     posthog.reset()
   *     // redirect to login page
   * }
   * ```
   *
   * @example
   * ```js
   * // reset and generate new device ID
   * posthog.reset(true)  // also resets device_id
   * ```
   *
   * @public
   *
   * @param {boolean} [reset_device_id] Whether to generate a new device ID as well as a new distinct ID.
   */
  reset(reset_device_id) {
    logger_logger.info("reset");
    if (!this.__loaded) {
      return logger_logger.uninitializedWarning("posthog.reset");
    }
    const device_id = this.get_property(DEVICE_ID);
    const device_model = this.get_property(DEVICE_MODEL);
    const recordingRemoteConfig = this.get_property(SESSION_RECORDING_REMOTE_CONFIG);
    this.consent.reset();
    this.persistence?.clear();
    this.sessionPersistence?.clear();
    if (!isUndefined(recordingRemoteConfig)) {
      this.persistence?.register({ [SESSION_RECORDING_REMOTE_CONFIG]: recordingRemoteConfig });
    }
    this.surveys?.reset();
    this._remoteConfigLoader?.stop();
    this.featureFlags?.reset();
    this.conversations?.reset();
    this.logs?.reset();
    this.metrics?.reset();
    this.persistence?.set_property(USER_STATE, USER_STATE_ANONYMOUS);
    this.sessionManager?.resetSessionId();
    this._cachedPersonProperties = null;
    if (this.config.cookieless_mode === COOKIELESS_ALWAYS) {
      this.register_once(
        {
          distinct_id: COOKIELESS_SENTINEL_VALUE,
          $device_id: null
        },
        ""
      );
    } else {
      const uuid = this.config.get_device_id(uuidv72());
      this.register_once(
        {
          distinct_id: uuid,
          $device_id: reset_device_id ? uuid : device_id
        },
        ""
      );
      if (!reset_device_id && !isUndefined(device_model)) {
        this.register({ [DEVICE_MODEL]: device_model });
      }
    }
    this.register(
      {
        $last_posthog_reset: (/* @__PURE__ */ new Date()).toISOString()
      },
      1
    );
    delete this.config.identity_distinct_id;
    delete this.config.identity_hash;
    this.reloadFeatureFlags();
  }
  /**
   * Flushes any queued events and resolves once teardown is complete.
   *
   * @remarks
   * This exists primarily for parity with the server-side
   * [Node.js SDK](/docs/libraries/node), whose `shutdown()` you call once before a
   * process exits. In the browser there is no process to exit — the SDK already
   * flushes pending events on `pagehide`/`unload` — so this method is mostly a
   * graceful no-op that best-effort flushes the request queues and always resolves.
   *
   * It is safe to call in isomorphic teardown code (for example a Nuxt/Next module
   * that calls `shutdown()` on both the server and the client) so the same
   * symmetric cleanup works in either environment without throwing.
   *
   * {@label Lifecycle}
   * @example
   * ```js
   * // symmetric teardown that runs on both server and client
   * await posthog.shutdown()
   * ```
   *
   * @public
   *
   * @param {number} [_shutdownTimeoutMs] Accepted for call-site parity with the Node.js SDK. The browser flush is synchronous, so this is ignored.
   * @returns {Promise<void>} A promise that resolves once the queues have been flushed.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async shutdown(_shutdownTimeoutMs) {
    if (!this.__loaded) {
      logger_logger.uninitializedWarning("posthog.shutdown");
      return;
    }
    this.logs?.flushLogs("sendBeacon");
    void this.metrics?.flush("sendBeacon");
    this._requestQueue?.unload();
    this._retryQueue?.unload();
    this.featureFlags?.destroy();
  }
  /**
   * Set HMAC-based identity verification.
   *
   * @remarks
   * When set, products like conversations use server-verified identity
   * (distinct_id + HMAC hash) instead of anonymous session identifiers.
   * The hash should be computed server-side as HMAC-SHA256 of the
   * distinct_id using the project's API secret.
   *
   * @param distinctId - The verified user distinct_id
   * @param hash - HMAC-SHA256 of distinctId using the project API secret
   *
   * @example
   * ```js
   * posthog.setIdentity('user_123', 'a1b2c3d4e5f6...')
   * ```
   *
   * @public
   */
  setIdentity(distinctId, hash) {
    this.config.identity_distinct_id = distinctId;
    this.config.identity_hash = hash;
    this.alias(distinctId);
    this.conversations?._onIdentityChanged();
  }
  /**
   * Clear HMAC-based identity verification, reverting to anonymous mode.
   *
   * @example
   * ```js
   * posthog.clearIdentity()
   * ```
   *
   * @public
   */
  clearIdentity() {
    delete this.config.identity_distinct_id;
    delete this.config.identity_hash;
    this.conversations?._onIdentityCleared();
  }
  /**
   * Returns the current distinct ID for the user.
   *
   * @remarks
   * This is either the auto-generated ID or the ID set via `identify()`.
   * The distinct ID is used to associate events with users in PostHog.
   *
   * {@label Identification}
   *
   * @example
   * ```js
   * // get the current user ID
   * const userId = posthog.get_distinct_id()
   * console.log('Current user:', userId)
   * ```
   *
   * @example
   * ```js
   * // use in loaded callback
   * posthog.init('token', {
   *     loaded: (posthog) => {
   *         const id = posthog.get_distinct_id()
   *         // use the ID
   *     }
   * })
   * ```
   *
   * @public
   *
   * @returns The current distinct ID
   */
  get_distinct_id() {
    return this.get_property("distinct_id");
  }
  /**
   * Returns the current groups.
   *
   * {@label Identification}
   *
   * @public
   *
   * @returns The current groups
   */
  getGroups() {
    return this.get_property("$groups") || {};
  }
  /**
   * Returns the current session_id.
   *
   * @remarks
   * This should only be used for informative purposes.
   * Any actual internal use case for the session_id should be handled by the sessionManager.
   *
   * @public
   *
   * @returns The stored session ID for the current session. This may be an empty string if the client is not yet fully initialized.
   */
  get_session_id() {
    return this.sessionManager?.checkAndGetSessionAndWindowId(true).sessionId ?? "";
  }
  /**
   * Returns the Replay url for the current session.
   *
   * {@label Session replay}
   *
   * @public
   *
   * @example
   * ```js
   * // basic usage
   * posthog.get_session_replay_url()
   * ```
   *
   * @example
   * ```js
   * // timestamp
   * posthog.get_session_replay_url({ withTimestamp: true })
   * ```
   *
   * @example
   * ```js
   * // timestamp and lookback
   * posthog.get_session_replay_url({
   *   withTimestamp: true,
   *   timestampLookBack: 30 // look back 30 seconds
   * })
   * ```
   *
   * @param {Object} [options] Options for the URL.
   * @param {boolean} [options.withTimestamp] Whether to include the timestamp in the URL.
   * @param {number} [options.timestampLookBack] How many seconds to look back for the timestamp.
   * @returns The URL for the current session replay, or an empty string if sessions are unavailable.
   */
  get_session_replay_url(options) {
    if (!this.sessionManager) {
      return "";
    }
    const { sessionId, sessionStartTimestamp } = this.sessionManager.checkAndGetSessionAndWindowId(true);
    let url = this.requestRouter.endpointFor("ui", `/project/${this.config.token}/replay/${sessionId}`);
    if (options?.withTimestamp && sessionStartTimestamp) {
      const LOOK_BACK = options.timestampLookBack ?? 10;
      if (!sessionStartTimestamp) {
        return url;
      }
      const recordingStartTime = Math.max(
        Math.floor(((/* @__PURE__ */ new Date()).getTime() - sessionStartTimestamp) / 1e3) - LOOK_BACK,
        0
      );
      url += `?t=${recordingStartTime}`;
    }
    return url;
  }
  /**
   * Creates an alias linking two distinct user identifiers. Learn more about [identifying users](/docs/product-analytics/identify)
   *
   * {@label Identification}
   *
   * @remarks
   * PostHog will use this to link two distinct_ids going forward (not retroactively).
   * Call this when a user signs up to connect their anonymous session with their account.
   *
   *
   * @example
   * ```js
   * // link anonymous user to account on signup
   * posthog.alias('user_12345')
   * ```
   *
   * @example
   * ```js
   * // explicit alias with original ID
   * posthog.alias('user_12345', 'anonymous_abc123')
   * ```
   *
   * @public
   *
   * @param {String} alias A unique identifier that you want to use for this user in the future.
   * @param {String} [original] The current identifier being used for this user.
   * @returns The `$create_alias` capture result, `-1` if alias matches the current distinct ID, `-2` if aliasing would duplicate a People user, or void if person processing is disabled.
   */
  alias(alias, original) {
    if (alias === this.get_property(PEOPLE_DISTINCT_ID_KEY)) {
      logger_logger.critical("Attempting to create alias for existing People user - aborting.");
      return -2;
    }
    if (!this._requirePersonProcessing("posthog.alias")) {
      return;
    }
    if (isUndefined(original)) {
      original = this.get_distinct_id();
    }
    if (alias !== original) {
      this._register_single(ALIAS_ID_KEY, alias);
      return this.capture("$create_alias", { alias, distinct_id: original });
    } else {
      logger_logger.warn("alias matches current distinct_id - skipping api call.");
      this.identify(alias);
      return -1;
    }
  }
  /**
   * Updates the configuration of the PostHog instance.
   *
   * {@label Initialization}
   *
   * @public
   *
   * @param {Partial<PostHogConfig>} config A dictionary of new configuration values to update
   */
  set_config(config2) {
    const oldConfig = { ...this.config };
    if (isObject(config2)) {
      extend(this.config, configRenames(config2));
      const isPersistenceDisabled = this._is_persistence_disabled();
      this.persistence?.update_config(this.config, oldConfig, isPersistenceDisabled);
      this.sessionPersistence = this.config.persistence === "sessionStorage" || this.config.persistence === "memory" ? this.persistence : (
        // sessionStorage sibling shares the primary's storage name; it must not own/clean the split group entries
        new PostHogPersistence(
          { ...this.config, persistence: "sessionStorage" },
          isPersistenceDisabled,
          false
        )
      );
      const debugConfigFromLocalStorage = this._checkLocalStorageForDebug(this.config.debug);
      if (isBoolean(debugConfigFromLocalStorage)) {
        this.config.debug = debugConfigFromLocalStorage;
      }
      if (isBoolean(this.config.debug)) {
        if (this.config.debug) {
          config_default.DEBUG = true;
          localStore._is_supported() && localStore._set("ph_debug", true);
          logger_logger.info("set_config", {
            config: config2,
            oldConfig,
            newConfig: { ...this.config }
          });
        } else {
          config_default.DEBUG = false;
          localStore._is_supported() && localStore._remove("ph_debug");
        }
      }
      this.exceptionObserver?.onConfigChange();
      this.exceptions?.onConfigChange();
      this.sessionRecording?.startIfEnabledOrStop();
      this.tracingHeaders?.startIfEnabledOrStop();
      this.autocapture?.startIfEnabled();
      this.heatmaps?.startIfEnabled();
      this.exceptionObserver?.startIfEnabledOrStop();
      this.deadClicksAutocapture?.startIfEnabledOrStop();
      this.surveys?.loadIfEnabled();
      this._sync_opt_out_with_persistence();
      this.externalIntegrations?.startIfEnabledOrStop();
    }
  }
  /**
   * @internal
   * Allows wrapper SDKs (e.g. posthog-flutter, posthog-react-native) to override the
   * `$lib` and `$lib_version` properties sent with every event.
   *
   * This is not a public API and may change without notice.
   */
  _overrideSDKInfo(sdkName, sdkVersion) {
    config_default.LIB_NAME = sdkName;
    config_default.LIB_VERSION = sdkVersion;
  }
  /**
   * turns session recording on, and updates the config option `disable_session_recording` to false
   *
   * {@label Session replay}
   *
   * @public
   *
   * @example
   * ```js
   * // Start and ignore controls
   * posthog.startSessionRecording(true)
   * ```
   *
   * @example
   * ```js
   * // Start and override controls
   * posthog.startSessionRecording({
   *   // you don't have to send all of these
   *   sampling: true || false,
   *   linked_flag: true || false,
   *   url_trigger: true || false,
   *   event_trigger: true || false
   * })
   * ```
   *
   * @param override.sampling - optional boolean to override the default sampling behavior - ensures the next session recording to start will not be skipped by sampling config.
   * @param override.linked_flag - optional boolean to override the default linked_flag behavior - ensures the next session recording to start will not be skipped by linked_flag config.
   * @param override.url_trigger - optional boolean to override the default url_trigger behavior - ensures the next session recording to start will not be skipped by url_trigger config.
   * @param override.event_trigger - optional boolean to override the default event_trigger behavior - ensures the next session recording to start will not be skipped by event_trigger config.
   * @param override - optional boolean to override the default sampling behavior - ensures the next session recording to start will not be skipped by sampling or linked_flag config. `true` is shorthand for { sampling: true, linked_flag: true }
   */
  startSessionRecording(override) {
    const overrideAll = override === true;
    const overrideConfig = {
      sampling: overrideAll || !!override?.sampling,
      linked_flag: overrideAll || !!override?.linked_flag,
      url_trigger: overrideAll || !!override?.url_trigger,
      event_trigger: overrideAll || !!override?.event_trigger
    };
    if (Object.values(overrideConfig).some(Boolean)) {
      this.sessionManager?.checkAndGetSessionAndWindowId();
      if (overrideConfig.sampling) {
        this.sessionRecording?.overrideSampling();
      }
      if (overrideConfig.linked_flag) {
        this.sessionRecording?.overrideLinkedFlag();
      }
      if (overrideConfig.url_trigger) {
        this.sessionRecording?.overrideTrigger("url");
      }
      if (overrideConfig.event_trigger) {
        this.sessionRecording?.overrideTrigger("event");
      }
    }
    this.set_config({ disable_session_recording: false });
  }
  /**
   * turns session recording off, and updates the config option
   * disable_session_recording to true
   *
   * {@label Session replay}
   *
   * @public
   *
   * @example
   * ```js
   * // Stop session recording
   * posthog.stopSessionRecording()
   * ```
   */
  stopSessionRecording() {
    this.set_config({ disable_session_recording: true });
  }
  /**
   * returns a boolean indicating whether session recording
   * is currently running
   *
   * {@label Session replay}
   *
   * @public
   *
   * @example
   * ```js
   * // Stop session recording if it's running
   * if (posthog.sessionRecordingStarted()) {
   *   posthog.stopSessionRecording()
   * }
   * ```
   *
   * @returns Whether session recording is currently running.
   */
  sessionRecordingStarted() {
    return !!this.sessionRecording?.started;
  }
  /**
   * Capture a caught exception manually
   *
   * {@label Error tracking}
   *
   * @public
   *
   * @example
   * ```js
   * // Capture a caught exception
   * try {
   *   // something that might throw
   * } catch (error) {
   *   posthog.captureException(error)
   * }
   * ```
   *
   * @example
   * ```js
   * // With additional properties
   * posthog.captureException(error, {
   *   customProperty: 'value',
   *   anotherProperty: ['I', 'can be a list'],
   *   ...
   * })
   * ```
   *
   * @param {unknown} error The error or exception-like value to capture.
   * @param {Properties} [additionalProperties] Any additional properties to add to the error event.
   * @returns The result of the capture, or undefined if exception capture is unavailable.
   */
  captureException(error, additionalProperties) {
    if (!this.exceptions) return;
    const syntheticException = new Error("PostHog syntheticException");
    const errorToProperties = this.exceptions.buildProperties(error, {
      handled: true,
      syntheticException
    });
    return this.exceptions.sendExceptionEvent({
      ...errorToProperties,
      ...additionalProperties
    });
  }
  /**
   * Add a breadcrumb-like step that will be attached to the next captured exception.
   *
   * {@label Error tracking}
   *
   * @public
   *
   * @example
   * ```js
   * posthog.addExceptionStep('Checkout button clicked', {
   *   checkout_id: 'ch_123',
   * })
   * ```
   *
   * @param {string} message The step message.
   * @param {Properties} [properties] Additional context for this step.
   */
  addExceptionStep(message, properties) {
    this.exceptions?.addExceptionStep(message, properties);
  }
  /**
   * Capture a log entry and send it to the PostHog logs endpoint.
   *
   * {@label Logs}
   *
   * @public
   *
   * @example
   * ```js
   * posthog.captureLog({
   *   body: 'checkout completed',
   *   level: 'info',
   *   attributes: { order_id: 'ord_789', amount_cents: 4999 },
   * })
   * ```
   *
   * @param {CaptureLogOptions} options The log entry options
   */
  captureLog(options) {
    this.logs?.captureLog(options);
  }
  static {
    this._noopLogger = /* @__PURE__ */ (() => {
      const noop = () => {
      };
      return { trace: noop, debug: noop, info: noop, warn: noop, error: noop, fatal: noop };
    })();
  }
  /**
   * Logger with convenience methods for each severity level.
   *
   * @example
   * ```js
   * posthog.logger.info('checkout completed', { order_id: 'ord_789' })
   * posthog.logger.error('payment failed', { error_code: 'E001' })
   * ```
   */
  get logger() {
    return this.logs?.logger ?? _PostHog._noopLogger;
  }
  /**
   * turns exception autocapture on, and updates the config option `capture_exceptions` to the provided config (or `true`)
   *
   * {@label Error tracking}
   *
   * @public
   *
   * @example
   * ```js
   * // Start with default exception autocapture rules. No-op if already enabled
   * posthog.startExceptionAutocapture()
   * ```
   *
   * @example
   * ```js
   * // Start and override controls
   * posthog.startExceptionAutocapture({
   *   // you don't have to send all of these (unincluded values will use the default)
   *   capture_unhandled_errors: true || false,
   *   capture_unhandled_rejections: true || false,
   *   capture_console_errors: true || false
   * })
   * ```
   *
   * @param config - optional configuration option to control the exception autocapture behavior
   */
  startExceptionAutocapture(config2) {
    this.set_config({ capture_exceptions: config2 ?? true });
  }
  /**
   * turns exception autocapture off by updating the config option `capture_exceptions` to `false`
   *
   * {@label Error tracking}
   *
   * @public
   *
   * @example
   * ```js
   * // Stop capturing exceptions automatically
   * posthog.stopExceptionAutocapture()
   * ```
   */
  stopExceptionAutocapture() {
    this.set_config({ capture_exceptions: false });
  }
  /**
   * returns a boolean indicating whether the [toolbar](/docs/toolbar) loaded
   *
   * {@label Toolbar}
   *
   * @public
   *
   * @param {ToolbarParams} params Toolbar parameters.
   * @returns Whether the toolbar loaded.
   */
  loadToolbar(params) {
    return this.toolbar?.loadToolbar(params) ?? false;
  }
  /**
   * Returns the value of a super property. Returns undefined if the property doesn't exist.
   *
   * {@label Identification}
   *
   * @remarks
   * get_property() can only be called after the PostHog library has finished loading.
   * init() has a loaded function available to handle this automatically.
   *
   * @example
   * ```js
   * // grab value for '$user_id' after the posthog library has loaded
   * posthog.init('<YOUR PROJECT TOKEN>', {
   *     loaded: function(posthog) {
   *         user_id = posthog.get_property('$user_id');
   *     }
   * });
   * ```
   * @public
   *
   * @param {String} property_name The name of the super property you want to retrieve
   * @returns The stored property value, or undefined if it is not set.
   */
  get_property(property_name) {
    return this.persistence?.props[property_name];
  }
  /**
   * Returns the value of the session super property named property_name. If no such
   * property is set, getSessionProperty() will return the undefined value.
   *
   * {@label Identification}
   *
   * @public
   *
   * @remarks
   * This is based on browser-level `sessionStorage`, NOT the PostHog session.
   * getSessionProperty() can only be called after the PostHog library has finished loading.
   * init() has a loaded function available to handle this automatically.
   *
   * @example
   * ```js
   * // grab value for 'user_id' after the posthog library has loaded
   * posthog.init('YOUR PROJECT TOKEN', {
   *     loaded: function(posthog) {
   *         user_id = posthog.getSessionProperty('user_id');
   *     }
   * });
   * ```
   *
   * @param {String} property_name The name of the session super property you want to retrieve
   * @returns The stored session property value, or undefined if it is not set.
   */
  getSessionProperty(property_name) {
    return this.sessionPersistence?.props[property_name];
  }
  /**
   * Returns a string representation of the PostHog instance.
   *
   * {@label Initialization}
   *
   * @internal
   */
  toString() {
    let name = this.config.name ?? PRIMARY_INSTANCE_NAME;
    if (name !== PRIMARY_INSTANCE_NAME) {
      name = PRIMARY_INSTANCE_NAME + "." + name;
    }
    return name;
  }
  _isIdentified() {
    return this.persistence?.get_property(USER_STATE) === USER_STATE_IDENTIFIED || this.sessionPersistence?.get_property(USER_STATE) === USER_STATE_IDENTIFIED;
  }
  _hasPersonProcessing() {
    return !(this.config.person_profiles === "never" || this.config.person_profiles === PERSON_PROFILES_IDENTIFIED_ONLY && !this._isIdentified() && isEmptyObject(this.getGroups()) && !this.persistence?.props?.[ALIAS_ID_KEY] && !this.persistence?.props?.[ENABLE_PERSON_PROCESSING]);
  }
  _shouldCapturePageleave() {
    return this.config.capture_pageleave === true || this.config.capture_pageleave === "if_capture_pageview" && (this.config.capture_pageview === true || this.config.capture_pageview === "history_change");
  }
  /**
   *  Creates a person profile for the current user, if they don't already have one and config.person_profiles is set
   *  to 'identified_only'. Produces a warning and does not create a profile if config.person_profiles is set to
   *  'never'. Learn more about [person profiles](/docs/product-analytics/identify)
   *
   * {@label Identification}
   *
   * @public
   *
   * @example
   * ```js
   * posthog.createPersonProfile()
   * ```
   */
  createPersonProfile() {
    if (this._hasPersonProcessing()) {
      return;
    }
    if (!this._requirePersonProcessing("posthog.createPersonProfile")) {
      return;
    }
    this.setPersonProperties({}, {});
  }
  /**
   * Marks the current user as a test user by setting the `$internal_or_test_user` person property to `true`.
   * This also enables person processing for the current user.
   *
   * This is useful for using in a cohort your internal/test filters for your posthog org.
   * @see https://posthog.com/tutorials/filter-internal-users
   * Create a cohort with `$internal_or_test_user` IS SET, and set your internal test filters to be NOT IN that cohort.
   *
   * {@label Identification}
   *
   * @example
   * ```js
   * // Manually mark as test user
   * posthog.setInternalOrTestUser()
   *
   * // Or use internal_or_test_user_hostname config for automatic detection
   * posthog.init('token', { internal_or_test_user_hostname: 'localhost' })
   * ```
   *
   * @public
   */
  setInternalOrTestUser() {
    if (!this._requirePersonProcessing("posthog.setInternalOrTestUser")) {
      return;
    }
    this.setPersonProperties({ $internal_or_test_user: true });
  }
  /**
   * Enables person processing if possible, returns true if it does so or already enabled, false otherwise
   *
   * @param function_name
   */
  _requirePersonProcessing(function_name) {
    if (this.config.person_profiles === "never") {
      logger_logger.error(
        function_name + ' was called, but process_person is set to "never". This call will be ignored.'
      );
      return false;
    }
    this._register_single(ENABLE_PERSON_PROCESSING, true);
    return true;
  }
  _is_persistence_disabled() {
    if (this.config.cookieless_mode === "always") {
      return true;
    }
    const isOptedOut = this.consent.isOptedOut();
    const defaultPersistenceDisabled = this.config.opt_out_persistence_by_default || this.config.cookieless_mode === COOKIELESS_ON_REJECT;
    return this.config.disable_persistence || isOptedOut && !!defaultPersistenceDisabled;
  }
  _sync_opt_out_with_persistence() {
    const persistenceDisabled = this._is_persistence_disabled();
    if (this.persistence?._disabled !== persistenceDisabled) {
      this.persistence?.set_disabled(persistenceDisabled);
    }
    if (this.sessionPersistence?._disabled !== persistenceDisabled) {
      this.sessionPersistence?.set_disabled(persistenceDisabled);
    }
    return persistenceDisabled;
  }
  /**
   * Opts the user into data capturing and persistence.
   *
   * {@label Privacy}
   *
   * @remarks
   * Enables event tracking and data persistence (cookies/localStorage) for this PostHog instance.
   * By default, captures an `$opt_in` event unless disabled.
   *
   * @example
   * ```js
   * // simple opt-in
   * posthog.opt_in_capturing()
   * ```
   *
   * @example
   * ```js
   * // opt-in with custom event and properties
   * posthog.opt_in_capturing({
   *     captureEventName: 'Privacy Accepted',
   *     captureProperties: { source: 'banner' }
   * })
   * ```
   *
   * @example
   * ```js
   * // opt-in without capturing event
   * posthog.opt_in_capturing({
   *     captureEventName: false
   * })
   * ```
   *
   * @public
   *
   * @param {Object} [options] A dictionary of opt-in options.
   * @param {EventName | null | false} [options.captureEventName] Event name to use for capturing the opt-in action. Set to `null` or `false` to skip capturing the opt-in event. Defaults to `$opt_in`.
   * @param {Properties} [options.captureProperties] Set of properties to capture along with the opt-in action.
   */
  opt_in_capturing(options) {
    if (this.config.cookieless_mode === COOKIELESS_ALWAYS) {
      logger_logger.warn(CONSENT_COOKIELESS_WARN);
      return;
    }
    if (this._inCookielessMode()) {
      this.reset(true);
      this.sessionManager?.destroy();
      this.pageViewManager?.destroy();
      this.sessionManager = new SessionIdManager(this);
      this.pageViewManager = new PageViewManager(this);
      if (this.persistence) {
        this.sessionPropsManager = new SessionPropsManager(this, this.sessionManager, this.persistence);
      }
      const SessionRecordingClass = this.config.__extensionClasses?.sessionRecording ?? _PostHog.__defaultExtensionClasses?.sessionRecording;
      if (SessionRecordingClass) {
        this.sessionRecording = this._replaceExtension(
          this.sessionRecording,
          new SessionRecordingClass(this)
        );
        if (this._lastRemoteConfig) {
          this.sessionRecording?.onRemoteConfig?.(this._lastRemoteConfig);
        }
      }
    }
    this.consent.optInOut(true);
    this._sync_opt_out_with_persistence();
    this._start_queue_if_opted_in();
    this.sessionRecording?.startIfEnabledOrStop();
    if (this.config.cookieless_mode == COOKIELESS_ON_REJECT) {
      this.surveys?.loadIfEnabled();
    }
    if (isUndefined(options?.captureEventName) || options?.captureEventName) {
      this.capture(options?.captureEventName ?? "$opt_in", options?.captureProperties, { send_instantly: true });
    }
    if (this.config.capture_pageview) {
      this._captureInitialPageview();
    }
  }
  /**
   * Opts the user out of data capturing and persistence.
   *
   * {@label Privacy}
   *
   * @remarks
   * Disables event tracking and data persistence (cookies/localStorage) for this PostHog instance.
   * If `opt_out_persistence_by_default` is true, SDK persistence will also be disabled.
   *
   * @example
   * ```js
   * // opt user out (e.g., on privacy settings page)
   * posthog.opt_out_capturing()
   * ```
   *
   * @public
   */
  opt_out_capturing() {
    if (this.config.cookieless_mode === COOKIELESS_ALWAYS) {
      logger_logger.warn(CONSENT_COOKIELESS_WARN);
      return;
    }
    if (this.config.cookieless_mode === COOKIELESS_ON_REJECT && this.consent.isOptedIn()) {
      this.reset(true);
    }
    this.consent.optInOut(false);
    this._sync_opt_out_with_persistence();
    if (this.config.cookieless_mode === COOKIELESS_ON_REJECT) {
      this.register({
        distinct_id: COOKIELESS_SENTINEL_VALUE,
        $device_id: null
      });
      this.sessionRecording?.stopRecording();
      this.sessionRecording = void 0;
      this.sessionManager?.destroy();
      this.pageViewManager?.destroy();
      this.sessionManager = void 0;
      this.sessionPropsManager = void 0;
      if (this.config.capture_pageview) {
        this._captureInitialPageview();
      }
      this._start_queue_if_opted_in();
    }
  }
  /**
   * Checks if the user has opted into data capturing.
   *
   * {@label Privacy}
   *
   * @remarks
   * Returns the current consent status for event tracking and data persistence.
   *
   * @example
   * ```js
   * if (posthog.has_opted_in_capturing()) {
   *     // show analytics features
   * }
   * ```
   *
   * @public
   *
   * @returns {boolean} current opt-in status
   */
  has_opted_in_capturing() {
    return this.consent.isOptedIn();
  }
  /**
   * Checks if the user has opted out of data capturing.
   *
   * {@label Privacy}
   *
   * @remarks
   * Returns the current consent status for event tracking and data persistence.
   *
   * @example
   * ```js
   * if (posthog.has_opted_out_capturing()) {
   *     // disable analytics features
   * }
   * ```
   *
   * @public
   *
   * @returns {boolean} current opt-out status
   */
  has_opted_out_capturing() {
    return this.consent.isOptedOut();
  }
  /**
   * Returns the explicit consent status of the user.
   *
   * @remarks
   * This can be used to check if the user has explicitly opted in or out of data capturing, or neither. This does not
   * take the default config options into account, only whether the user has made an explicit choice, so this can be
   * used to determine whether to show an initial cookie banner or not.
   *
   * @example
   * ```js
   * const consentStatus = posthog.get_explicit_consent_status()
   * if (consentStatus === "granted") {
   *     // user has explicitly opted in
   * } else if (consentStatus === "denied") {
   *     // user has explicitly opted out
   * } else if (consentStatus === "pending"){
   *     // user has not made a choice, show consent banner
   * }
   * ```
   *
   * @public
   *
   * @returns The current explicit consent status.
   */
  get_explicit_consent_status() {
    const consent = this.consent.consent;
    return consent === ConsentStatus.GRANTED ? "granted" : consent === ConsentStatus.DENIED ? "denied" : "pending";
  }
  /**
   * Checks whether the PostHog library is currently capturing events.
   *
   * Usually this means that the user has not opted out of capturing, but the exact behaviour can be controlled by
   * some config options.
   *
   * Additionally, if the cookieless_mode is set to `'on_reject'`, we will capture events in cookieless mode if the
   * user has opted out or been defaulted to opt-out.
   *
   * {@label Privacy}
   *
   * @see {PostHogConfig.cookieless_mode}
   * @see {PostHogConfig.opt_out_persistence_by_default}
   * @see {PostHogConfig.respect_dnt}
   *
   * @returns {boolean} whether the posthog library is capturing events
   */
  is_capturing() {
    if (this.config.cookieless_mode === COOKIELESS_ALWAYS) {
      return true;
    }
    if (this.config.cookieless_mode === COOKIELESS_ON_REJECT) {
      return this.consent.isRejected() || this.consent.isOptedIn();
    } else {
      return !this.has_opted_out_capturing();
    }
  }
  /**
   * Clear the user's opt in/out status of data capturing and cookies/localstorage for this PostHog instance
   *
   * {@label Privacy}
   *
   * @public
   *
   */
  clear_opt_in_out_capturing() {
    this.consent.reset();
    this._sync_opt_out_with_persistence();
  }
  _is_bot() {
    if (globals_navigator) {
      return isLikelyBot(globals_navigator, this.config.custom_blocked_useragents);
    } else {
      return void 0;
    }
  }
  _captureInitialPageview() {
    if (!globals_document) {
      return;
    }
    if (globals_document.visibilityState !== "visible") {
      if (!this._visibilityStateListener) {
        this._visibilityStateListener = this._captureInitialPageview.bind(this);
        addEventListener(globals_document, DOM_EVENT_VISIBILITYCHANGE, this._visibilityStateListener);
      }
      return;
    }
    if (!this._initialPageviewCaptured) {
      this._initialPageviewCaptured = true;
      this.capture(EVENT_PAGEVIEW, { title: globals_document.title }, { send_instantly: true });
      if (this._visibilityStateListener) {
        globals_document.removeEventListener(DOM_EVENT_VISIBILITYCHANGE, this._visibilityStateListener);
        this._visibilityStateListener = null;
      }
    }
  }
  /**
   * Enables or disables debug mode for detailed logging.
   *
   * @remarks
   * Debug mode logs all PostHog calls to the browser console for troubleshooting.
   * Can also be enabled by adding `?__posthog_debug=true` to the URL.
   *
   * {@label Initialization}
   *
   * @example
   * ```js
   * // enable debug mode
   * posthog.debug(true)
   * ```
   *
   * @example
   * ```js
   * // disable debug mode
   * posthog.debug(false)
   * ```
   *
   * @public
   *
   * @param {boolean} [debug] If true, will enable debug mode.
   */
  debug(debug) {
    if (debug === false) {
      win?.console.log("You've disabled debug mode.");
      this.set_config({ debug: false });
    } else {
      win?.console.log(
        "You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."
      );
      this.set_config({ debug: true });
    }
  }
  /**
   * Helper method to check if external API calls (flags/decide) should be disabled
   * Handles migration from old `advanced_disable_decide` to new `advanced_disable_flags`
   */
  _shouldDisableFlags() {
    const originalConfig = this._originalUserConfig || {};
    if ("advanced_disable_flags" in originalConfig) {
      return !!originalConfig.advanced_disable_flags;
    }
    if (this.config.advanced_disable_flags !== false) {
      return !!this.config.advanced_disable_flags;
    }
    if (this.config.advanced_disable_decide === true) {
      logger_logger.warn(
        "Config field 'advanced_disable_decide' is deprecated. Please use 'advanced_disable_flags' instead. The old field will be removed in a future major version."
      );
      return true;
    }
    return migrateConfigField(originalConfig, "advanced_disable_flags", "advanced_disable_decide", false, logger_logger);
  }
  _runBeforeSend(data) {
    if (isNullish(this.config.before_send)) {
      return data;
    }
    const requiredProperties = Object.keys(data.properties ?? {}).filter(isKnownUnsafeEditableEventProperty);
    const fns = isArray(this.config.before_send) ? this.config.before_send : [this.config.before_send];
    let beforeSendResult = data;
    for (const fn of fns) {
      beforeSendResult = fn(beforeSendResult);
      if (isNullish(beforeSendResult)) {
        const logMessage = `Event '${data.event}' was rejected in beforeSend function`;
        if (isKnownUnsafeEditableEvent(data.event)) {
          logger_logger.warn(`${logMessage}. This can cause unexpected behavior.`);
        } else {
          logger_logger.info(logMessage);
        }
        return null;
      }
      if (!beforeSendResult.properties || isEmptyObject(beforeSendResult.properties)) {
        logger_logger.warn(
          `Event '${data.event}' has no properties after beforeSend function, this is likely an error.`
        );
      }
    }
    for (const property of requiredProperties) {
      if (beforeSendResult.properties && isNullish(beforeSendResult.properties[property])) {
        logger_logger.warn(
          `Event '${data.event}' had its '${property}' property removed in a beforeSend function. This property is required for ingestion, so the event will be dropped.`
        );
        return null;
      }
    }
    return beforeSendResult;
  }
  /**
   * Returns the current page view ID.
   *
   * {@label Initialization}
   *
   * @public
   *
   * @returns The current page view ID, or undefined if no page view has been captured.
   */
  getPageViewId() {
    return this.pageViewManager._currentPageview?.pageViewId;
  }
  /**
   * Capture written user feedback for a LLM trace. Numeric values are converted to strings.
   *
   * {@label LLM analytics}
   *
   * @public
   *
   * @param traceId The trace ID to capture feedback for.
   * @param userFeedback The feedback to capture.
   */
  captureTraceFeedback(traceId, userFeedback) {
    this.capture("$ai_feedback", {
      $ai_trace_id: String(traceId),
      $ai_feedback_text: userFeedback
    });
  }
  /**
   * Capture a metric for a LLM trace. Numeric values are converted to strings.
   *
   * {@label LLM analytics}
   *
   * @public
   *
   * @param traceId The trace ID to capture the metric for.
   * @param metricName The name of the metric to capture.
   * @param metricValue The value of the metric to capture.
   */
  captureTraceMetric(traceId, metricName, metricValue) {
    this.capture("$ai_metric", {
      $ai_trace_id: String(traceId),
      $ai_metric_name: metricName,
      $ai_metric_value: String(metricValue)
    });
  }
  _checkLocalStorageForDebug(debugConfig) {
    const explicitlyFalse = isBoolean(debugConfig) && !debugConfig;
    const isTrueInLocalStorage = localStore._is_supported() && localStore._get("ph_debug") === "true";
    return explicitlyFalse ? false : isTrueInLocalStorage ? true : debugConfig;
  }
};
safewrapClass(PostHog, ["identify"]);
var add_dom_loaded_handler = function() {
  function dom_loaded_handler() {
    if (dom_loaded_handler.done) {
      return;
    }
    ;
    dom_loaded_handler.done = true;
    ENQUEUE_REQUESTS = false;
    each(instances, function(inst) {
      inst._dom_loaded();
    });
  }
  if (globals_document?.addEventListener) {
    if (globals_document.readyState === "complete") {
      dom_loaded_handler();
    } else {
      addEventListener(globals_document, "DOMContentLoaded", dom_loaded_handler, { capture: false });
    }
    return;
  }
  if (win) {
    logger_logger.error("Browser doesn't support `document.addEventListener` so PostHog couldn't be initialized");
  }
};
function init_as_module() {
  config_default.SDK_DIST_CHANNEL = "npm";
  const posthogMain = instances[PRIMARY_INSTANCE_NAME] = new PostHog();
  add_dom_loaded_handler();
  return posthogMain;
}

// src/posthog-exceptions.ts
var logger7 = createLogger2("[Error tracking]");
function buildErrorPropertiesBuilder() {
  return new error_tracking_exports.ErrorPropertiesBuilder(
    [
      new error_tracking_exports.DOMExceptionCoercer(),
      new error_tracking_exports.PromiseRejectionEventCoercer(),
      new error_tracking_exports.ErrorEventCoercer(),
      new error_tracking_exports.ErrorCoercer(),
      new error_tracking_exports.EventCoercer(),
      new error_tracking_exports.ObjectCoercer(),
      new error_tracking_exports.StringCoercer(),
      new error_tracking_exports.PrimitiveCoercer()
    ],
    error_tracking_exports.createDefaultStackParser()
  );
}
var PostHogExceptions = class {
  constructor(instance) {
    this._suppressionRules = [];
    this._errorPropertiesBuilder = buildErrorPropertiesBuilder();
    this._instance = instance;
    this._suppressionRules = this._instance.persistence?.get_property(ERROR_TRACKING_SUPPRESSION_RULES) ?? [];
    this._exceptionStepsConfig = error_tracking_exports.resolveExceptionStepsConfig(this._getExceptionStepsConfig());
    this._exceptionStepsBuffer = new error_tracking_exports.ExceptionStepsBuffer(this._exceptionStepsConfig);
  }
  onConfigChange() {
    this._exceptionStepsConfig = error_tracking_exports.resolveExceptionStepsConfig(this._getExceptionStepsConfig());
    this._exceptionStepsBuffer.setConfig(this._exceptionStepsConfig);
  }
  onRemoteConfig(result) {
    if (!result.ok) {
      return;
    }
    const response = result.config;
    if (!("errorTracking" in response)) {
      return;
    }
    const suppressionRules = response.errorTracking?.suppressionRules ?? [];
    const captureExtensionExceptions = response.errorTracking?.captureExtensionExceptions;
    this._suppressionRules = suppressionRules;
    if (this._instance.persistence) {
      this._instance.persistence.register({
        [ERROR_TRACKING_SUPPRESSION_RULES]: this._suppressionRules,
        [ERROR_TRACKING_CAPTURE_EXTENSION_EXCEPTIONS]: captureExtensionExceptions
      });
    }
  }
  get _captureExtensionExceptions() {
    const enabled_server_side = !!this._instance.get_property(ERROR_TRACKING_CAPTURE_EXTENSION_EXCEPTIONS);
    const enabled_client_side = this._instance.config.error_tracking.captureExtensionExceptions;
    return enabled_client_side ?? enabled_server_side ?? false;
  }
  buildProperties(input, metadata) {
    return this._errorPropertiesBuilder.buildFromUnknown(input, {
      syntheticException: metadata?.syntheticException,
      mechanism: {
        handled: metadata?.handled
      }
    });
  }
  addExceptionStep(message, properties) {
    if (!this._exceptionStepsConfig.enabled) {
      return;
    }
    try {
      if (!isString(message) || message.trim().length === 0) {
        logger7.warn("Ignoring exception step because message must be a non-empty string");
        return;
      }
      const userProperties = this._coerceExceptionStepProperties(properties);
      const { sanitizedProperties, droppedKeys } = error_tracking_exports.stripReservedExceptionStepFields(userProperties);
      if (droppedKeys.length > 0) {
        logger7.warn("Ignoring reserved exception step fields", { droppedKeys });
      }
      this._exceptionStepsBuffer.add({
        [error_tracking_exports.EXCEPTION_STEP_INTERNAL_FIELDS.MESSAGE]: message,
        [error_tracking_exports.EXCEPTION_STEP_INTERNAL_FIELDS.TIMESTAMP]: (/* @__PURE__ */ new Date()).toISOString(),
        ...sanitizedProperties
      });
    } catch (error) {
      logger7.error("Failed to add exception step. Ignoring breadcrumb.", error);
    }
  }
  sendExceptionEvent(properties) {
    try {
      const exceptionList = properties.$exception_list;
      if (this._isExceptionList(exceptionList)) {
        if (this._matchesSuppressionRule(exceptionList)) {
          this._addDroppedExceptionStep("Exception dropped: matched a suppression rule");
          logger7.info("Skipping exception capture because a suppression rule matched");
          return;
        }
        if (!this._captureExtensionExceptions && this._isExtensionException(exceptionList)) {
          this._addDroppedExceptionStep("Exception dropped: thrown by a browser extension");
          logger7.info("Skipping exception capture because it was thrown by an extension");
          return;
        }
        if (!this._instance.config.error_tracking.__capturePostHogExceptions && this._isPostHogException(exceptionList)) {
          this._addDroppedExceptionStep("Exception dropped: thrown by the PostHog SDK");
          logger7.info("Skipping exception capture because it was thrown by the PostHog SDK");
          return;
        }
      }
      const propertiesForExceptionCapture = this._exceptionStepsConfig.enabled && isNullish(properties.$exception_steps) ? this._addBufferedExceptionSteps(properties) : properties;
      try {
        const result = this._instance.capture("$exception", propertiesForExceptionCapture, {
          _noTruncate: true,
          _batchKey: "exceptionEvent",
          _originatedFromCaptureException: true
        });
        if (result) {
          this._exceptionStepsBuffer.clear();
        }
        return result;
      } catch (error) {
        logger7.error("Failed to capture exception event. Dropping this exception.", error);
        this._exceptionStepsBuffer.clear();
        return;
      }
    } catch (error) {
      logger7.error("Failed to process exception event. Ignoring this exception.", error);
      return;
    }
  }
  _addBufferedExceptionSteps(properties) {
    try {
      const exceptionSteps = this._exceptionStepsBuffer.getAttachable();
      if (exceptionSteps.length === 0) {
        return properties;
      }
      return {
        ...properties,
        $exception_steps: exceptionSteps
      };
    } catch (error) {
      logger7.error("Failed to read buffered exception steps. Capturing exception without steps.", error);
      return properties;
    }
  }
  _addDroppedExceptionStep(message) {
    if (this._exceptionStepsConfig.enabled) {
      this._exceptionStepsBuffer.add({
        [error_tracking_exports.EXCEPTION_STEP_INTERNAL_FIELDS.MESSAGE]: message,
        [error_tracking_exports.EXCEPTION_STEP_INTERNAL_FIELDS.TIMESTAMP]: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  }
  _coerceExceptionStepProperties(properties) {
    if (!isObject(properties)) {
      return {};
    }
    return { ...properties };
  }
  _getExceptionStepsConfig() {
    return this._instance.config.error_tracking?.exception_steps ?? {};
  }
  _matchesSuppressionRule(exceptionList) {
    if (exceptionList.length === 0) {
      return false;
    }
    const exceptionValues = exceptionList.reduce(
      (acc, { type, value }) => {
        if (isString(type) && type.length > 0) {
          acc["$exception_types"].push(type);
        }
        if (isString(value) && value.length > 0) {
          acc["$exception_values"].push(value);
        }
        return acc;
      },
      {
        $exception_types: [],
        $exception_values: []
      }
    );
    return this._suppressionRules.some((rule) => {
      const results = rule.values.map((v) => {
        const compare = propertyComparisons[v.operator];
        const targets = isArray(v.value) ? v.value : [v.value];
        const values = exceptionValues[v.key] ?? [];
        return targets.length > 0 ? compare(targets, values) : false;
      });
      return rule.type === "OR" ? results.some(Boolean) : results.every(Boolean);
    });
  }
  _isExtensionException(exceptionList) {
    const frames = exceptionList.flatMap((e) => e.stacktrace?.frames ?? []);
    return frames.some((f) => f.filename && f.filename.startsWith("chrome-extension://"));
  }
  _isPostHogException(exceptionList) {
    if (exceptionList.length > 0) {
      const exception = exceptionList[0];
      const frames = exception.stacktrace?.frames ?? [];
      const lastFrame = frames[frames.length - 1];
      return lastFrame?.filename?.includes("posthog.com/static") ?? false;
    }
    return false;
  }
  _isExceptionList(candidate) {
    return !isNullish(candidate) && isArray(candidate);
  }
};

// src/entrypoints/__min.es.ts
PostHog.__defaultExtensionClasses = { exceptions: PostHogExceptions };
var min_es_default = init_as_module();
export {
  min_es_default as default
};
/*! For license information please see uuidv7.mjs.LICENSE.txt */
/**
 * uuidv7: An experimental implementation of the proposed UUID Version 7
 *
 * @license Apache-2.0
 * @copyright 2021-2023 LiosK
 * @packageDocumentation
 */
/**
 * uuidv7: An experimental implementation of the proposed UUID Version 7
 *
 * @license Apache-2.0
 * @copyright 2021-2023 LiosK
 * @packageDocumentation
 *
 * from https://github.com/LiosK/uuidv7/blob/e501462ea3d23241de13192ceae726956f9b3b7d/src/index.ts
 */
