import { useState } from "react"

import type { WebWrapperDetection } from "@/lib/web-wrapper"

function buildAndroidIntentUrl() {
  const url = new URL(window.location.href.split("#")[0])
  const scheme = url.protocol.replace(":", "")

  return `intent://${url.host}${url.pathname}${url.search}#Intent;scheme=${scheme};action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`
}

export function WebWrapperGate({
  detection,
}: {
  detection: WebWrapperDetection
}) {
  const [copied, setCopied] = useState(false)
  const isAndroid = detection.platform === "android"
  const appLabel = detection.appName
    ? `${detection.appName}'s in-app browser`
    : "an in-app browser"

  async function copyLink() {
    const value = window.location.href

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        const field = document.createElement("textarea")
        field.value = value
        field.setAttribute("readonly", "")
        field.style.position = "fixed"
        field.style.opacity = "0"
        document.body.appendChild(field)
        field.select()
        document.execCommand("copy")
        field.remove()
      }

      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-6 py-12 text-foreground">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)] sm:p-8">
        <p className="text-sm font-medium text-muted-foreground">
          Browser required
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight">
          Open this page in a browser
        </h1>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          This page opened inside {appLabel}. Open it in Chrome, Safari, Brave,
          Firefox, Edge, or Opera for the full experience.
        </p>

        {isAndroid ? (
          <a
            href={buildAndroidIntentUrl()}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Open in browser
          </a>
        ) : (
          <ol className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>1. Tap the menu button in the top corner.</li>
            <li>2. Choose Open in browser.</li>
          </ol>
        )}

        <button
          type="button"
          onClick={copyLink}
          className="mt-3 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-live="polite"
        >
          {copied ? "Link copied" : "Copy link"}
        </button>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          If nothing happens, copy the link and paste it into your browser.
        </p>
      </div>
    </main>
  )
}
