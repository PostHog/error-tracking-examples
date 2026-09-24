import os

import posthog as posthog_package
from posthog import Posthog

from one import one


def main():
    client = Posthog(os.environ["POSTHOG_KEY"], host=os.environ["POSTHOG_HOST"])

    # Nothing here names the release. `./run` resolved the release with `posthog-cli release
    # resolve` and launched this app with its id in POSTHOG_RELEASE_ID; the SDK reads that at
    # client init and reports it as `$release_id` on the events it captures — the Python
    # equivalent of the id a web build injects into its bundle. This just prints what it will
    # report; running main.py directly (not through `./run`) leaves POSTHOG_RELEASE_ID unset, so
    # it reports none.
    release = os.environ.get("POSTHOG_RELEASE_ID", "").strip()
    if release:
        print(f"starting — release {release} (from POSTHOG_RELEASE_ID)")
    else:
        print("starting — no POSTHOG_RELEASE_ID set (run through ./run)")
    print(f"posthog {posthog_package.VERSION} from {os.path.dirname(posthog_package.__file__)}")

    one(client)
    # A plain event too: the SDK puts $release_id on every event, not only on exceptions.
    client.capture("python-release-env started", distinct_id="python-release-env")

    # Events are batched on a background thread; shutdown flushes what is left before exit.
    client.shutdown()

    print("stopping")


if __name__ == "__main__":
    main()
