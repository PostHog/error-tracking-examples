# frozen_string_literal: true

require 'posthog'

require_relative 'one'

client = PostHog::Client.new(api_key: ENV.fetch('POSTHOG_KEY'), host: ENV.fetch('POSTHOG_HOST'))

# Nothing here names the release. `./run` resolved the release with `posthog-cli release resolve`
# and launched this app with its id in POSTHOG_RELEASE_ID; the SDK reads that when the client is
# created and reports it as `$release_id` on every event. This just prints what it will report;
# running main.rb directly (not through `./run`) leaves POSTHOG_RELEASE_ID unset, so it reports none.
release = ENV.fetch('POSTHOG_RELEASE_ID', '').strip
if release.empty?
  puts 'starting — no POSTHOG_RELEASE_ID set (run through ./run)'
else
  puts "starting — release #{release} (from POSTHOG_RELEASE_ID)"
end
spec = Gem.loaded_specs['posthog-ruby']
puts "posthog-ruby #{PostHog::VERSION} from #{spec&.full_gem_path}"

one(client)
# A plain event too: the SDK puts $release_id on every event, not only on exceptions.
client.capture(distinct_id: 'ruby-release-env', event: 'ruby-release-env started')

# Events are sent from a background thread; shutdown flushes what is left before exit.
client.shutdown

puts 'stopping'
