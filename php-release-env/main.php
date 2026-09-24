<?php

require __DIR__ . '/vendor/autoload.php';

use Composer\InstalledVersions;
use PostHog\PostHog;

PostHog::init(getenv('POSTHOG_KEY'), ['host' => getenv('POSTHOG_HOST')]);

// Nothing here names the release. `./run` resolved the release with `posthog-cli release resolve`
// and launched this app with its id in POSTHOG_RELEASE_ID; the SDK reads that when the client is
// created and reports it as `$release_id` on every event. This just prints what it will report;
// running main.php directly (not through `./run`) leaves POSTHOG_RELEASE_ID unset, so it reports none.
$release = trim((string) getenv('POSTHOG_RELEASE_ID'));
if ($release === '') {
    echo "starting — no POSTHOG_RELEASE_ID set (run through ./run)\n";
} else {
    echo "starting — release {$release} (from POSTHOG_RELEASE_ID)\n";
}
echo 'posthog-php ' . InstalledVersions::getPrettyVersion('posthog/posthog-php')
    . ' from ' . realpath(InstalledVersions::getInstallPath('posthog/posthog-php')) . "\n";

one();
// A plain event too: the SDK puts $release_id on every event, not only on exceptions.
PostHog::capture(['distinctId' => 'php-release-env', 'event' => 'php-release-env started']);

// The default consumer batches events in memory; flush sends what is left before exit.
PostHog::flush();

echo "stopping\n";
