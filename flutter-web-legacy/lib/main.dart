import 'dart:async';

import 'package:flutter/material.dart';
import 'package:posthog_flutter/posthog_flutter.dart';

import 'crash/one.dart';
import 'injected_release.dart';

// posthog-js is initialized in web/index.html — on web the plugin hooks into
// that instance rather than starting its own. The key is passed here as well so
// the Dart config is complete.
const _key = String.fromEnvironment('POSTHOG_KEY');
const _host = String.fromEnvironment('POSTHOG_HOST',
    defaultValue: 'http://localhost:8010');
const _variant = String.fromEnvironment('VARIANT', defaultValue: 'flutter-web');

void main() {
  // Flutter web never calls PlatformDispatcher.onError
  // (flutter/flutter#100277), so a zone is what catches the uncaught throw
  // below. This is the pattern the SDK's own example uses for web.
  runZonedGuarded(_run, (error, stackTrace) {
    Posthog().captureRunZonedGuardedError(error: error, stackTrace: stackTrace);
  });
}

Future<void> _run() async {
  WidgetsFlutterBinding.ensureInitialized();

  final config = PostHogConfig(_key)
    ..host = _host
    ..debug = true
    ..flushAt = 1
    ..sessionReplay = false
    ..surveys = false
    ..captureApplicationLifecycleEvents = false;

  config.errorTrackingConfig.captureFlutterErrors = true;

  await Posthog().setup(config);

  runApp(const ExampleApp());
}

const _ink = Color(0xFF1D1F27);
const _muted = Color(0xFF6B7280);
const _line = Color(0xFFE4E4E0);
const _brand = Color(0xFFF54E00);

class ExampleApp extends StatefulWidget {
  const ExampleApp({super.key});

  @override
  State<ExampleApp> createState() => _ExampleAppState();
}

class _ExampleAppState extends State<ExampleApp> {
  int _thrown = 0;
  Timer? _initial;

  @override
  void initState() {
    super.initState();
    // Throw once shortly after load, so a run needs nobody to click anything.
    _initial = Timer(const Duration(seconds: 2), _throw);
  }

  @override
  void dispose() {
    _initial?.cancel();
    super.dispose();
  }

  void _throw() {
    setState(() => _thrown++);
    // Not awaited and not caught: the zone handler reports it as unhandled.
    Future<void>(() => levelOne(_variant));
  }

  @override
  Widget build(BuildContext context) {
    final injected = injectedReleaseId();
    return MaterialApp(
      title: _variant,
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: const Color(0xFFF3F4EF),
        body: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 620),
            child: Container(
              margin: const EdgeInsets.all(24),
              padding: const EdgeInsets.all(32),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: _line),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _variant,
                    style: const TextStyle(
                      fontSize: 26,
                      fontWeight: FontWeight.w700,
                      color: _ink,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    injected == null
                        ? 'legacy: the release is bound to the uploaded symbol set'
                        : 'event mode: the release id is injected into the chunk',
                    style: const TextStyle(fontSize: 14, color: _muted),
                  ),
                  const SizedBox(height: 24),
                  const Divider(height: 1, color: _line),
                  const SizedBox(height: 20),
                  _Row(label: 'release', value: releaseLabel()),
                  _Row(
                    label: r'injected $release_id',
                    value: injected ?? 'none',
                  ),
                  _Row(label: 'exceptions thrown', value: '$_thrown'),
                  const SizedBox(height: 24),
                  FilledButton(
                    onPressed: _throw,
                    style: FilledButton.styleFrom(
                      backgroundColor: _brand,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(6),
                      ),
                      padding: const EdgeInsets.symmetric(
                          horizontal: 20, vertical: 16),
                    ),
                    child: const Text('Throw another'),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _Row extends StatelessWidget {
  const _Row({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 170,
            child: Text(
              label,
              style: const TextStyle(fontSize: 14, color: _muted),
            ),
          ),
          Expanded(
            child: SelectableText(
              value,
              style: const TextStyle(
                fontSize: 14,
                color: _ink,
                fontFamily: 'monospace',
                fontFamilyFallback: ['Menlo', 'Consolas'],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
