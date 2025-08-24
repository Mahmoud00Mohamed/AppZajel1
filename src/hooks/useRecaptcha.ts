import { useEffect, useState } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

interface UseRecaptchaOptions {
  siteKey: string;
  action: string;
}

export const useRecaptcha = ({ siteKey, action }: UseRecaptchaOptions) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if reCAPTCHA is already loaded
    if (window.grecaptcha) {
      setIsLoaded(true);
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.grecaptcha.ready(() => {
        setIsLoaded(true);
      });
    };

    script.onerror = () => {
      console.error("Failed to load reCAPTCHA script");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector(`script[src*="recaptcha"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [siteKey]);

  const executeRecaptcha = async (): Promise<string> => {
    if (!isLoaded || !window.grecaptcha) {
      console.warn("reCAPTCHA not loaded yet");
      return "dummy-captcha-token"; // Fallback for development
    }

    setIsLoading(true);
    try {
      const token = await window.grecaptcha.execute(siteKey, { action });
      setIsLoading(false);
      return token;
    } catch (error) {
      console.error("reCAPTCHA execution failed:", error);
      setIsLoading(false);
      return "dummy-captcha-token"; // Fallback on error
    }
  };

  return {
    isLoaded,
    isLoading,
    executeRecaptcha,
  };
};
