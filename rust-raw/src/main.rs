mod one;
mod three;
mod two;

fn main() {
    let key = std::env::var("POSTHOG_KEY").expect("POSTHOG_KEY is not set");
    let host = std::env::var("POSTHOG_HOST").expect("POSTHOG_HOST is not set");
    let client = posthog_rs::client((key.as_str(), host.as_str()));

    println!("starting");

    one::one(&client);

    // Events are batched on a background worker; shutdown flushes what is left before exit.
    client.shutdown();

    println!("stopping");
}
