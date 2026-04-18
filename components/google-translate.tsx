"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    google?: { translate: { TranslateElement: new (opts: object, elementId: string) => void } };
    googleTranslateElementInit?: () => void;
  }
}

export function GoogleTranslate() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "fr,es,it,de,ar",
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };
  }, []);

  return (
    <>
      <div id="google_translate_element" className="font-ui text-meta text-quiet" />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
