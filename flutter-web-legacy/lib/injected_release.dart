import 'dart:js_interop';
import 'dart:js_interop_unsafe';

@JS('globalThis')
external JSObject get _globalThis;

String? _readString(String key) {
  final value = _globalThis[key];
  if (value == null) {
    return null;
  }
  final text = value.dartify();
  return text is String && text.isNotEmpty ? text : null;
}

/// The release id `posthog-cli sourcemap inject --release-mode=event` wrote into
/// the chunk. posthog-js reads the same global and reports it as `$release_id`.
/// Null in legacy mode, where the release rides on the symbol set instead.
///
/// The app only prints it. Nothing here reports it — reading it is how the page
/// shows which mode built it.
String? injectedReleaseId() => _readString('_posthogReleaseId');

/// The `name@version` the CLI was told to create, set by `run` in index.html.
///
/// It comes from the page and not from a --dart-define on purpose. A dart-define
/// is compiled into main.dart.js, so shipping the same code as a second release
/// would change the bundle, and with it the content-addressed chunk id that the
/// two examples exist to contrast.
String releaseLabel() => _readString('_exampleRelease') ?? '(unset)';
