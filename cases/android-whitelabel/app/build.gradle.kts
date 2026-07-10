import com.posthog.android.PostHogCliExecTask
import com.posthog.android.PostHogUploadProguardMappingsTask

plugins {
    id("com.android.application") version "8.9.1"
    id("org.jetbrains.kotlin.android") version "2.1.10"
    id("com.posthog.android") version "1.2.0"
}

// The brand changes only the applicationId - the code is identical, so every
// brand build produces the same mapping file and map id.
val brand = (findProperty("brand") as String?) ?: "core"

android {
    namespace = "com.posthog.whitelabel"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.posthog.whitelabel.$brand"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
        manifestPlaceholders["brandLabel"] = "Acme " + brand.replaceFirstChar { it.uppercase() }
        buildConfigField("String", "POSTHOG_TOKEN", "\"${findProperty("posthogToken") ?: ""}\"")
        buildConfigField("String", "POSTHOG_HOST", "\"${findProperty("posthogHost") ?: ""}\"")
    }

    buildFeatures {
        buildConfig = true
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
            signingConfig = signingConfigs.getByName("debug")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("com.posthog:posthog-android:3.53.3")
}

// All brands share one release, so the mapping upload must not use the
// plugin's default release name (the applicationId) - that collides across
// brands and causes release_id_mismatch errors. afterEvaluate is required:
// the plugin sets its applicationId default after the script body runs, and
// the last set() wins.
afterEvaluate {
    tasks.withType<PostHogUploadProguardMappingsTask>().configureEach {
        releaseName.set("android-whitelabel-demo")
        releaseVersion.set("1.0")
        build.set(1)
    }
}

// CLI credentials come in as Gradle properties (build.sh passes them from the
// environment); without them the upload task is skipped.
val cliProjectId = (findProperty("posthogCliProjectId") as String?).orEmpty()
val cliApiKey = (findProperty("posthogCliApiKey") as String?).orEmpty()
tasks.withType<PostHogCliExecTask>().configureEach {
    onlyIf { cliProjectId.isNotEmpty() && cliApiKey.isNotEmpty() }
    postHogProjectId.set(cliProjectId)
    postHogApiKey.set(cliApiKey)
    (findProperty("posthogCliHost") as String?)?.let { postHogHost.set(it) }
    (findProperty("posthogCliBin") as String?)?.let { postHogExecutable.set(it) }
}
