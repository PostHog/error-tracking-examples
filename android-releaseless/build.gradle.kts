import com.posthog.android.PostHogCliExecTask
import java.util.Properties

plugins {
    id("com.android.application") version "8.9.1"
    id("org.jetbrains.kotlin.android") version "2.1.21"
    // Local build — see settings.gradle.kts.
    id("com.posthog.android") version "1.4.0"
}

// Credentials live in the repo-root .env and are copied here by bin/copy-env.
// The SDK needs them baked into the APK; posthog-cli reads the same file itself
// via the posthog.dotenvFile gradle property.
val env =
    Properties().apply {
        val file = rootProject.file(".env")
        if (file.exists()) file.inputStream().use { load(it) }
    }

// The emulator reaches the host's PostHog through 10.0.2.2, never localhost.
val posthogHost =
    (env.getProperty("POSTHOG_HOST") ?: "http://localhost:8010")
        .replace("localhost", "10.0.2.2")
        .replace("127.0.0.1", "10.0.2.2")
val posthogKey = env.getProperty("POSTHOG_KEY").orEmpty()

android {
    namespace = "com.posthog.example.releaseless"
    compileSdk = 36

    defaultConfig {
        // Distinct from android-releaseless so both apps can sit on one device,
        // so each gets its own release in PostHog, and — because the package name is
        // in the mapping — so each gets its own symbol set instead of sharing one.
        applicationId = "com.posthog.example.releaseless"
        minSdk = 24
        targetSdk = 36
        versionCode = (findProperty("appVersionCode") as String? ?: "1").toInt()
        versionName = findProperty("appVersionName") as String? ?: "1.0.0"

        buildConfigField("String", "POSTHOG_HOST", "\"$posthogHost\"")
        buildConfigField("String", "POSTHOG_KEY", "\"$posthogKey\"")
    }

    buildFeatures {
        buildConfig = true
    }

    buildTypes {
        release {
            // The PostHog gradle plugin only wires itself into minified variants:
            // without R8 there is no mapping file to upload.
            isMinifyEnabled = true
            // The non-optimizing default keeps the stack trace multi-frame, so the
            // uploaded mapping has something interesting to deobfuscate.
            proguardFiles(getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro")
            // Debug keys, so `gradlew assembleRelease` produces an installable APK.
            signingConfig = signingConfigs.getByName("debug")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlin {
        jvmToolchain(17)
    }
}

dependencies {
    implementation("com.posthog:posthog-android:3.58.3")
}

tasks.withType<PostHogCliExecTask>().configureEach {
    // Local posthog-cli build from the posthog monorepo — `proguard upload
    // --release-mode` has not shipped in a release yet. Built by ../bin/build-cli.
    postHogExecutable.set(rootProject.file("../../posthog/cli/target/release/posthog-cli").absolutePath)
}
