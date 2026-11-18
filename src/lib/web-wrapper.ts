export type WrapperPlatform = "android" | "ios" | "other"

export type WebWrapperDetection = {
  blocked: boolean
  appName: string | null
  platform: WrapperPlatform
  source: "user-agent" | "referrer" | null
}

const APP_PATTERNS: Array<{ name: string; pattern: RegExp }> = [
  { name: "Instagram", pattern: /\bInstagram\b/i },
  { name: "Facebook", pattern: /\b(?:FBAN|FBAV|FB_IAB|FB4A|FBSV)\b/i },
  { name: "TikTok", pattern: /\b(?:TikTok|BytedanceWebview|musical_ly)\b/i },
  { name: "LINE", pattern: /\bLine\/\d/i },
  { name: "Snapchat", pattern: /\bSnapchat\b/i },
  { name: "Pinterest", pattern: /\bPinterest\b/i },
  { name: "LinkedIn", pattern: /\bLinkedInApp\b/i },
  { name: "X", pattern: /\bTwitter\b/i },
  { name: "WeChat", pattern: /\bMicroMessenger\b/i },
  { name: "WhatsApp", pattern: /\bWhatsApp\b/i },
  { name: "Google", pattern: /\bGSA\/\d/i },
]

const APP_SCHEME_PATTERNS: Array<{ name: string; pattern: RegExp }> = [
  { name: "Instagram", pattern: /^(?:android|ios)-app:\/\/com\.instagram/i },
  { name: "Facebook", pattern: /^(?:android|ios)-app:\/\/com\.facebook/i },
  { name: "TikTok", pattern: /^(?:android|ios)-app:\/\/com\.(?:zhiliaoapp|ss\.android\.ugc\.trill)/i },
  { name: "LINE", pattern: /^(?:android|ios)-app:\/\/jp\.naver\.line/i },
  { name: "Snapchat", pattern: /^(?:android|ios)-app:\/\/com\.snapchat/i },
  { name: "Pinterest", pattern: /^(?:android|ios)-app:\/\/com\.pinterest/i },
  { name: "LinkedIn", pattern: /^(?:android|ios)-app:\/\/com\.linkedin/i },
  { name: "X", pattern: /^(?:android|ios)-app:\/\/com\.twitter/i },
  { name: "WhatsApp", pattern: /^(?:android|ios)-app:\/\/com\.whatsapp/i },
]

function detectPlatform(userAgent: string): WrapperPlatform {
  if (/android/i.test(userAgent)) {
    return "android"
  }

  if (/iphone|ipad|ipod/i.test(userAgent)) {
    return "ios"
  }

  if (/macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1) {
    return "ios"
  }

  return "other"
}

function isGenericWebView(userAgent: string) {
  if (/;\s*wv\)/i.test(userAgent) || /\bWebView\b/i.test(userAgent)) {
    return true
  }

  const looksLikeAndroidWebView =
    /Version\/[\d.]+ Chrome\/[\d.]+ Mobile Safari\//i.test(userAgent)

  const isKnownAndroidBrowser =
    /SamsungBrowser|CriOS|FxiOS|EdgiOS|OPiOS|OPR\/|EdgA\//i.test(userAgent)

  return looksLikeAndroidWebView && !isKnownAndroidBrowser
}

export function detectWebWrapper(): WebWrapperDetection {
  if (typeof window === "undefined") {
    return {
      blocked: false,
      appName: null,
      platform: "other",
      source: null,
    }
  }

  const userAgent = navigator.userAgent
  const platform = detectPlatform(userAgent)

  for (const app of APP_PATTERNS) {
    if (app.pattern.test(userAgent)) {
      return {
        blocked: true,
        appName: app.name,
        platform,
        source: "user-agent",
      }
    }
  }

  for (const app of APP_SCHEME_PATTERNS) {
    if (app.pattern.test(document.referrer)) {
      return {
        blocked: true,
        appName: app.name,
        platform,
        source: "referrer",
      }
    }
  }

  if (isGenericWebView(userAgent)) {
    return {
      blocked: true,
      appName: null,
      platform,
      source: "user-agent",
    }
  }

  return {
    blocked: false,
    appName: null,
    platform,
    source: null,
  }
}
