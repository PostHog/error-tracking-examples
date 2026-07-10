//
//  WhitelabelApp.swift
//
//  Brand name, color, PostHog token and host come from Info.plist,
//  which build.sh stamps per brand. The binary stays brand-agnostic.
//

import PostHog
import SwiftUI

enum BrandConfig {
    static var name: String { plist("WhitelabelBrandName") ?? "core" }
    static var colorHex: String { plist("WhitelabelBrandColor") ?? "#8F8F8F" }
    static var token: String { plist("PostHogProjectToken") ?? "" }
    static var host: String { plist("PostHogHost") ?? "http://localhost:8010" }

    private static func plist(_ key: String) -> String? {
        Bundle.main.object(forInfoDictionaryKey: key) as? String
    }
}

@main
struct WhitelabelApp: App {
    init() {
        guard !BrandConfig.token.isEmpty else {
            print("[Whitelabel] No PostHogProjectToken in Info.plist - run build.sh with a token")
            return
        }
        let config = PostHogConfig(projectToken: BrandConfig.token, host: BrandConfig.host)
        config.errorTrackingConfig.autoCapture = true
        PostHogSDK.shared.setup(config)
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    @State private var status = ""

    var body: some View {
        VStack(spacing: 16) {
            Circle()
                .fill(Color(hex: BrandConfig.colorHex))
                .frame(width: 64, height: 64)
            Text(BrandConfig.name.capitalized)
                .font(.title2.bold())
            Text(Bundle.main.bundleIdentifier ?? "")
                .font(.caption.monospaced())
                .foregroundStyle(.secondary)

            Button("Capture handled exception") {
                do {
                    try CheckoutService.buyPremium()
                } catch {
                    PostHogSDK.shared.captureException(error, properties: [
                        "brand": BrandConfig.name,
                    ])
                    PostHogSDK.shared.flush()
                    status = "Captured CheckoutError.paymentDeclined and flushed."
                }
            }
            .buttonStyle(.borderedProminent)

            Text(status)
                .font(.footnote)
                .foregroundStyle(.secondary)
        }
        .padding()
    }
}

extension Color {
    init(hex: String) {
        var value: UInt64 = 0
        Scanner(string: hex.replacingOccurrences(of: "#", with: "")).scanHexInt64(&value)
        self.init(
            red: Double((value >> 16) & 0xFF) / 255.0,
            green: Double((value >> 8) & 0xFF) / 255.0,
            blue: Double(value & 0xFF) / 255.0
        )
    }
}
