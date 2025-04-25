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
                  console.log('New content available; reloading...');
                  window.location.reload(); // auto reload jab update aaye
                }
              }
            };
          };
        });
      });
    }
  }
  