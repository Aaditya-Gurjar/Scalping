import * as Config from "./Config";

export function register(config) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${Config.base_url.replace(/\/backend\/?$/, '')}/service-worker.js`;
      navigator.serviceWorker.register(swUrl).then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('New content available; please refresh.');
                // Optional: Notify user about the update
                alert('A new version is available. Please refresh the page.');
              } else {
                console.log('Content cached for offline use.');
              }
            }
          };
        };
      }).catch((error) => {
        console.error('Error during service worker registration:', error);
      });
    });
  }
}
