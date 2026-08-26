mod one;
mod three;
mod two;

fn main() {
    let key = std::env::var("POSTHOG_KEY").expect("POSTHOG_KEY is not set");
    let host = std::env::var("POSTHOG_HOST").expect("POSTHOG_HOST is not set");
    let client = posthog_rs::client((key.as_str(), host.as_str()));

    // Nothing here names the release. `posthog-cli symbol-sets upload --release-mode=event` injected
    // the created release's id into this binary after the build, the SDK reads it, and every event
    // carries it as `$release_id` — the native equivalent of the id a web build injects into its
    // bundle. `injected_release_id()` exposes it, only so the example can print what it will report;
    // running the binary directly (not through `./run`) leaves the placeholder, so it reports none.
    match posthog_rs::injected_release_id() {
        Some(release) => println!("starting — injected release {release}"),
        None => println!("starting — no release injected (run through ./run)"),
    }

    one::one(&client);

    // Events are batched on a background worker; shutdown flushes what is left before exit.
    client.shutdown();

    println!("stopping");
}
