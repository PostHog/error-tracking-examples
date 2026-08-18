pluginManagement {
    repositories {
        // The PostHog gradle plugin comes from a local build: `posthog.releaseMode`
        // and `proguard upload --release-mode` are not in a published release yet.
        // ../bin/publish-posthog-local puts it here.
        mavenLocal()
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        // Same story for the SDK — this example runs against the working copy of
        // posthog-android, not the released artifact.
        mavenLocal()
        google()
        mavenCentral()
    }
}

rootProject.name = "android-legacy"
