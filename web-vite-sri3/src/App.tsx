import posthog from 'posthog-js'
import { one } from './one'

export function App() {
  return (
    <>
      <h1>web-vite-sri3</h1>
      <p>
        If you can read this, every script passed its SRI check — which should never happen in
        this example: the browser is supposed to block the scripts and leave the page blank.
      </p>
      <button onClick={() => one(posthog)}>Capture exception</button>
    </>
  )
}
