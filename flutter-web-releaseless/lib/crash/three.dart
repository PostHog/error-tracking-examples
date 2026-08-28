// The three crash/*.dart files exist to put more than one file in the stack, so
// the symbolicated frames show a call chain and not a single line. dart2js
// inlines a body this small, which would collapse the chain into one frame, so
// each one is pinned with the noInline pragma.

@pragma('dart2js:noInline')
Never levelThree(String label) {
  throw StateError('flutter web error tracking example ($label)');
}
