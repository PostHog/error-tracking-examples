<?php

use PostHog\PostHog;

function three_adiognrgasdahjienfklafghigkallapppp1(): void
{
    try {
        throw new RuntimeException('boom from php-release-env');
    } catch (RuntimeException $error) {
        PostHog::captureException($error, 'php-release-env');
    }
}
