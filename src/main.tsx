import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { WebWrapperGate } from './components/web-wrapper-gate'
import { detectWebWrapper } from './lib/web-wrapper'

document.addEventListener('contextmenu', (event) => {
  event.preventDefault()
})

try {
  const redirect = sessionStorage.getItem('spa-redirect')
  if (redirect) {
    sessionStorage.removeItem('spa-redirect')
    window.history.replaceState(null, '', redirect)
  }
} catch {}

const root = createRoot(document.getElementById('root')!)
const wrapper = detectWebWrapper()

if (wrapper.blocked) {
  document.documentElement.dataset.webWrapper = wrapper.appName ?? 'generic'
  root.render(<WebWrapperGate detection={wrapper} />)
} else {
  void import('./App.tsx').then(({ default: App }) => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
}
