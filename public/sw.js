// const staticCacheName = "site-static-v8";
// const assets = [
//   "/",
//   "/index.html",
//   "/bootstrap.bundle.min.js",
//   "/bootstrap.min.js",
//   "/static/js/main.chunk.js",
//   "/static/js/bundle.js",
//   "/coinImage.ico",
//   "/manifest.json",
//   "/logo192.png",
//   "/static/js/vendors~main.chunk.js",
//   "/static/media/back.dc9121a8.png "
  
// ];

// cache size limit function
// const limitCacheSize = (name, size) => {
//   caches.open(name).then((cache) => {
//     cache.keys().then((keys) => {
//       if (keys.length > size) {
//         cache.delete(keys[0]).then(limitCacheSize(name, size));
//       }
//     });
//   });
// };


// install event
self.addEventListener("install", (evt) => {
  //console.log('service worker installed');
  // evt.waitUntil(
  //   caches.open(staticCacheName).then((cache) => {
  //     console.log("caching shell assets");
  //     cache.addAll(assets);
  //   })
  // );
});

// activate event
self.addEventListener("activate", (evt) => {
  //console.log('service worker activated');
  // evt.waitUntil(
  //   caches.keys().then((keys) => {
  //     //console.log(keys);
  //     return Promise.all(
  //       keys
  //         .filter((key) => key !== staticCacheName)
  //         .map((key) => caches.delete(key))
  //     );
  //   })
  // );
});

// 

// fetch event
self.addEventListener("fetch", (evt) => {
  //console.log('fetch event', evt);
  // if (!(evt.request.url.indexOf("http") === 0)) return;

  // evt.respondWith(
  //   caches
  //     .match(evt.request)
  //     .then((cacheRes) => {
  //       return (
  //         cacheRes ||
  //         fetch(evt.request)
          // .then((fetchRes) => {
          //   return caches.open(dynamicCacheName).then((cache) => {
          //     cache.put(evt.request.url, fetchRes.clone());
          //     // check cached items size
          //     limitCacheSize(dynamicCacheName, 15);
          //     return fetchRes;
          //   });
          // })
        // );
      // })
      // .catch(() => {
      //   if (evt.request.url.indexOf(".html") > -1) {
      //     return caches.match("/pages/fallback.html");
      //   }
      // })
  // );
});
