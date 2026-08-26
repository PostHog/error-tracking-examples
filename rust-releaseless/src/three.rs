use posthog_rs::Client;

pub fn three_adiognrgasdahjienfklafghigkallapppp1(posthog: &Client) {
    let error = std::io::Error::other("boom");
    posthog.capture_exception(&error).unwrap();
}
