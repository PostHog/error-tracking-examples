mod one;
mod three;
mod two;

fn main() {
    let key = std::env::var("POSTHOG_KEY").expect("POSTHOG_KEY is not set");
    let host = std::env::var("POSTHOG_HOST").expect("POSTHOG_HOST is not set");
    let client = posthog_rs::client((key.as_str(), host.as_str()));

    // Nothing here names the release. `./run` resolved the release with `posthog-cli release
    // resolve` and launched this binary with its id in POSTHOG_RELEASE_ID; the SDK reads that at
    // runtime and reports it as `$release_id` on the exceptions it captures — the native equivalent
    // of the id a web build injects into its bundle. This just prints what it will report; running
    // the binary directly (not through `./run`) leaves POSTHOG_RELEASE_ID unset, so it reports none.
    match std::env::var("POSTHOG_RELEASE_ID") {
        Ok(release) if !release.trim().is_empty() => {
            println!("starting — release {release} (from POSTHOG_RELEASE_ID)")
        }
        _ => println!("starting — no POSTHOG_RELEASE_ID set (run through ./run)"),
    }

    one::one(&client);

    // Events are batched on a background worker; shutdown flushes what is left before exit.
    client.shutdown();

    println!("stopping");
}
