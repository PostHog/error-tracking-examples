# Keep the entry points Android instantiates by name; everything else — including
# the classes the demo crash walks through — is fair game for R8 to rename, which
# is the point: the uploaded mapping is what makes the stack trace readable again.
-keep class com.posthog.example.legacy.ExampleApp
-keep class com.posthog.example.legacy.MainActivity

# Line numbers survive obfuscation, and the source file is renamed rather than
# stripped, so frames still carry a position for the mapping to resolve.
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
