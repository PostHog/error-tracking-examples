use posthog_rs::Client;

use crate::two::two;

pub fn one(posthog: &Client) {
    two(posthog)
}
