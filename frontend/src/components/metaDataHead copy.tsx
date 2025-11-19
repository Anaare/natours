// MetadataHead.tsx

import { useEffect } from "react";
import { useMatches } from "react-router-dom";
// Assuming you export RouteHandle from your router file
import type { RouteHandle } from "../router"; // Adjust path as needed

function MetadataHead() {
  const matches = useMatches();

  // 1. Get the handle from the most specific (deepest) active route
  // The 'handle' property holds the data defined in router.ts
  const activeMatch = matches[matches.length - 1];
  const handle = activeMatch?.handle as RouteHandle | undefined;

  useEffect(() => {
    // If no handle is present (e.g., in a development environment or a non-routable component), stop.
    if (!handle) return;

    // -----------------------
    // 1. UPDATE DOCUMENT TITLE
    // -----------------------
    if (handle.title) {
      document.title = handle.title;
    }

    // --------------------------------
    // Clean up old dynamic head links
    // --------------------------------
    // Selectors for elements we injected in previous runs
    const selectorsToRemove = [
      "link[data-dynamic-handle='true']",
      "script[data-dynamic-handle='true']",
    ];

    selectorsToRemove.forEach((selector) => {
      document
        .querySelectorAll(selector)
        .forEach((el) => el.parentNode?.removeChild(el));
    });

    // ------------------------
    // 2. UPDATE FAVICON
    // ------------------------
    if (handle.faviconPath && handle.faviconType) {
      let favicon = document.querySelector("link[rel='shortcut icon']");

      if (!favicon) {
        favicon = document.createElement("link");
        favicon.setAttribute("rel", "shortcut icon");
        document.head.appendChild(favicon);
      }

      favicon.setAttribute("href", handle.faviconPath);
      favicon.setAttribute("type", handle.faviconType);
    }

    // ------------------------
    // 3. ADD GOOGLE FONTS
    // ------------------------
    handle.googleFonts?.forEach((font) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = font.href;
      link.setAttribute("data-dynamic-handle", "true"); // Custom attribute for cleanup
      document.head.appendChild(link);
    });

    // ------------------------
    // 4. ADD STYLESHEETS
    // ------------------------
    handle.stylesheets?.forEach((sheet) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = sheet.href;
      link.setAttribute("data-dynamic-handle", "true"); // Custom attribute for cleanup
      document.head.appendChild(link);
    });

    // ------------------------
    // 5. ADD SCRIPTS
    // ------------------------
    handle.scripts?.forEach((scriptInfo) => {
      const script = document.createElement("script");
      script.src = scriptInfo.src;
      script.setAttribute("data-dynamic-handle", "true"); // Custom attribute for cleanup
      document.head.appendChild(script);
    });
  }, [handle]); // Re-run whenever the route handle changes

  return null;
}

export default MetadataHead;
