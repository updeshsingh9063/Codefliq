"use client";

import { useEffect } from "react";

export function ContactForm() {
  useEffect(() => {
    // Cleanly inject the Visme script
    const scriptId = "visme-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Safely add allowtransparency without touching the layout/width
    const container = document.querySelector(".visme_d");
    if (container) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName && node.nodeName.toLowerCase() === "iframe") {
              const iframe = node as HTMLIFrameElement;
              iframe.setAttribute("allowtransparency", "true");
            }
          });
        });
      });
      observer.observe(container, { childList: true, subtree: true });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div 
        className="visme_d" 
        data-title="Simple Subscription Sign Up Form" 
        data-url="wpe6377k-simple-subscription-sign-up-form?fullPage=true" 
        data-domain="forms" 
        data-full-page="true" 
        data-min-height="100vh" 
        data-form-id="182856"
      ></div>
    </div>
  );
}
