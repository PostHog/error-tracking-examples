import PostHog
import SwiftUI

@main
struct IosRawApp: App {
    init() {
        let config = PostHogConfig(projectToken: "e2e_token_1239", host: "http://localhost:8010")
        config.debug = true
        PostHogSDK.shared.setup(config)

        warmUp()
        PostHogSDK.shared.flush()
    }

    var body: some Scene {
        WindowGroup {
            Text("ios-raw — exception captured, check PostHog")
                .padding()
        }
    }
}

@inline(never)
func warmUp() {
    prepareScene()
}

@inline(never)
func prepareScene() {
    triggerFailure()
}

@inline(never)
func triggerFailure() {
    PostHogSDK.shared.captureException(
        NSError(domain: "ios-raw", code: 7, userInfo: [NSLocalizedDescriptionKey: "derive-path check"])
    )
}
