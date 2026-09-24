# frozen_string_literal: true

def three_adiognrgasdahjienfklafghigkallapppp1(posthog)
  raise 'boom from ruby-release-env'
rescue RuntimeError => e
  posthog.capture_exception(e, 'ruby-release-env')
end
