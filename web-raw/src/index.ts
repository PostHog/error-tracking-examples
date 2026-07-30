import posthog from 'posthog-js'
import { one } from './one'

posthog.init('e2e_token_1239', {
  api_host: 'http://localhost:8010',
  request_batching: false,
  debug: true,
})

console.log('starting')

one(posthog)

console.log('stopping')
