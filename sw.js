(function() {
  'use strict';
/*
 Copyright 2014 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/


// While overkill for this specific sample in which there is only one cache,
// this is one best practice that can be followed in general to keep track of
// multiple caches used by a given service worker, and keep them all versioned.
// It maps a shorthand identifier for a cache to a specific, versioned cache name.

// Note that since global state is discarded in between service worker restarts, these
// variables will be reinitialized each time the service worker handles an event, and you
// should not attempt to change their values inside an event handler. (Treat them as constants.)

// If at any point you want to force pages that use this service worker to start using a fresh
// cache, then increment the CACHE_VERSION value. It will kick off the service worker update
// flow and the old cache(s) will be purged as part of the activate event handler when the
// updated service worker is activated.
var CACHE_VERSION = 6;
var CURRENT_CACHES = {
  prefetch: 'prefetch-lina-v' + CACHE_VERSION
};

  var urlsToPrefetch = [
'.',
'./beaches',
'./restaurants',
'index.html',
'beaches.html',
'restaurants.html',
'manifest.json',
'css/addtohomescreen.css',
'css/bootstrap.min.css',
'css/stylish-portfolio.css',
'css/slick.min.css',
'css/normalize.min.css',
'js/slick.min.js',
'js/bootstrap.min.js',
'js/addtohomescreen.min.js',
'js/addtohomescreen.js',
'js/custom.js',
'js/jquery.lazy.min.js',
'js/jquery.min.js',
'js/TweenMax.min.js',
'fonts/font-awesome-css.min.css',
'fonts/fontawesome-webfont.ttf',
'fonts/GreatVibes-Regular.ttf',
'fonts/Raleway-Regular.ttf',
'fonts/fontawesome-webfont.woff',
'fonts/fontawesome-webfont.woff2',
'fonts/greatvibes-regular-webfont.woff',
'fonts/raleway-regular-webfont.woff',
'fonts/greatvibes-regular-webfont.woff2',
'fonts/raleway-regular-webfont.woff2',
'img/bg.jpg',
'img/callout.jpg',
'img/places-beach.jpg',
'img/places-culture.jpg',
'img/places-fun.jpg',
'img/places-restaurant.jpg',
'img/places-shopping.jpg',
'img/airbnb.png',
'img/booking.png',
'img/google.png',
'img/google-maps.png',
'img/google-street-view.png',
'img/icon.png',
'img/my_istria.png',
'img/user-female-alt-icon.png',
'img/user-male-alt-icon.png',
'img/beaches/angiolina.jpg',
'img/beaches/angiolina-1.jpg',
'img/beaches/angiolina-2.jpg',
'img/beaches/angiolina-3.jpg',
'img/beaches/angiolina-4.jpg',
'img/beaches/angiolina-5.jpg',
'img/beaches/angiolina-6.jpg',
'img/beaches/dog_lovran.jpg',
'img/beaches/dog_lovran-1.jpg',
'img/beaches/dog_lovran-2.jpg',
'img/beaches/dog_lovran-3.jpg',
'img/beaches/dog_lovran-4.jpg',
'img/beaches/dog_lovran-5.jpg',
'img/beaches/icici.jpg',
'img/beaches/icici-1.jpg',
'img/beaches/icici-2.jpg',
'img/beaches/icici-3.jpg',
'img/beaches/icici-4.jpg',
'img/beaches/icici-5.jpg',
'img/beaches/icici-6.jpg',
'img/beaches/klancac.jpg',
'img/beaches/klancac-1.jpg',
'img/beaches/klancac-2.jpg',
'img/beaches/klancac-3.jpg',
'img/beaches/kvarner.jpg',
'img/beaches/kvarner-1.jpg',
'img/beaches/kvarner-2.jpg',
'img/beaches/kvarner-3.jpg',
'img/beaches/kvarner-4.jpg',
'img/beaches/kvarner-5.jpg',
'img/beaches/kvarner-6.jpg',
'img/beaches/lido.jpg',
'img/beaches/lido-1.jpg',
'img/beaches/lido-2.jpg',
'img/beaches/lido-3.jpg',
'img/beaches/lido-4.jpg',
'img/beaches/lido-5.jpg',
'img/beaches/lido-6.jpg',
'img/beaches/medveja.jpg',
'img/beaches/medveja-1.jpg',
'img/beaches/medveja-2.jpg',
'img/beaches/medveja-3.jpg',
'img/beaches/medveja-4.jpg',
'img/beaches/medveja-5.jpg',
'img/beaches/medveja-6.jpg',
'img/beaches/peharovo.jpg',
'img/beaches/peharovo-1.jpg',
'img/beaches/peharovo-2.jpg',
'img/beaches/peharovo-3.jpg',
'img/beaches/sipar.jpg',
'img/beaches/sipar-1.jpg',
'img/beaches/sipar-2.jpg',
'img/beaches/sipar-3.jpg',
'img/beaches/sipar-4.jpg',
'img/beaches/sipar-5.jpg',
'img/beaches/sipar-6.jpg',
'img/beaches/slatina.jpg',
'img/beaches/slatina-1.jpg',
'img/beaches/slatina-2.jpg',
'img/beaches/slatina-3.jpg',
'img/beaches/slatina-4.jpg',
'img/restaurants/beer_garden.jpg',
'img/restaurants/beer_garden-1.jpg',
'img/restaurants/beer_garden-2.jpg',
'img/restaurants/beer_garden-3.jpg',
'img/restaurants/beer_garden-4.jpg',
'img/restaurants/beer_garden-5.jpg',
'img/restaurants/beer_garden-6.jpg',
'img/restaurants/delfino.jpg',
'img/restaurants/delfino-1.jpg',
'img/restaurants/delfino-2.jpg',
'img/restaurants/delfino-3.jpg',
'img/restaurants/delfino-4.jpg',
'img/restaurants/delfino-5.jpg',
'img/restaurants/delfino-6.jpg',
'img/restaurants/draga_di_lovrana.jpg',
'img/restaurants/draga_di_lovrana-1.jpg',
'img/restaurants/draga_di_lovrana-2.jpg',
'img/restaurants/draga_di_lovrana-3.jpg',
'img/restaurants/draga_di_lovrana-4.jpg',
'img/restaurants/draga_di_lovrana-5.jpg',
'img/restaurants/draga_di_lovrana-6.jpg',
'img/restaurants/knezgrad.jpg',
'img/restaurants/knezgrad-1.jpg',
'img/restaurants/knezgrad-2.jpg',
'img/restaurants/knezgrad-3.jpg',
'img/restaurants/knezgrad-4.jpg',
'img/restaurants/knezgrad-5.jpg',
'img/restaurants/knezgrad-6.jpg',
'img/restaurants/kvarner.jpg',
'img/restaurants/kvarner-1.jpg',
'img/restaurants/kvarner-2.jpg',
'img/restaurants/kvarner-3.jpg',
'img/restaurants/kvarner-4.jpg',
'img/restaurants/kvarner-5.jpg',
'img/restaurants/kvarner-6.jpg',
'img/restaurants/lovranski_pub.jpg',
'img/restaurants/lovranski_pub-1.jpg',
'img/restaurants/lovranski_pub-2.jpg',
'img/restaurants/lovranski_pub-3.jpg',
'img/restaurants/lovranski_pub-4.jpg',
'img/restaurants/lovranski_pub-5.jpg',
'img/restaurants/lovranski_pub-6.jpg',
'img/restaurants/najade.jpg',
'img/restaurants/najade-1.jpg',
'img/restaurants/najade-2.jpg',
'img/restaurants/najade-3.jpg',
'img/restaurants/najade-4.jpg',
'img/restaurants/najade-5.jpg',
'img/restaurants/najade-6.jpg',
'img/restaurants/roko.jpg',
'img/restaurants/roko-1.jpg',
'img/restaurants/roko-2.jpg',
'img/restaurants/roko-3.jpg',
'img/restaurants/roko-4.jpg',
'img/restaurants/roko-5.jpg',
'img/restaurants/roko-6.jpg',
'img/restaurants/roko-7.jpg',
'img/restaurants/ruzmarin.jpg',
'img/restaurants/ruzmarin-1.jpg',
'img/restaurants/ruzmarin-2.jpg',
'img/restaurants/ruzmarin-3.jpg',
'img/restaurants/ruzmarin-4.jpg',
'img/restaurants/ruzmarin-5.jpg',
'img/restaurants/ruzmarin-6.jpg',
'img/restaurants/ruzmarin-7.jpg',
'img/restaurants/ruzmarin-8.jpg',
'img/restaurants/stancija_kovacici.jpg',
'img/restaurants/stancija_kovacici-1.jpg',
'img/restaurants/stancija_kovacici-2.jpg',
'img/restaurants/stancija_kovacici-3.jpg',
'img/restaurants/stancija_kovacici-4.jpg',
'img/restaurants/stancija_kovacici-5.jpg',
'img/restaurants/stancija_kovacici-6.jpg',
'img/restaurants/stancija_kovacici-7.jpg',
'img/restaurants/stancija_kovacici-8.jpg',
'img/restaurants/submarine.jpg',
'img/restaurants/submarine-1.jpg',
'img/restaurants/submarine-2.jpg',
'img/restaurants/submarine-3.jpg',
'img/restaurants/submarine-4.jpg',
'img/restaurants/submarine-5.jpg',
'img/restaurants/submarine-6.jpg',
'img/restaurants/valle_losca_tavern.jpg',
'img/restaurants/valle_losca_tavern-1.jpg',
'img/restaurants/valle_losca_tavern-2.jpg',
'img/restaurants/valle_losca_tavern-3.jpg',
'img/restaurants/valle_losca_tavern-4.jpg',
'img/restaurants/valle_losca_tavern-5.jpg',
'img/restaurants/valle_losca_tavern-6.jpg'
  ];

self.addEventListener('install', function(event) {
  var now = Date.now();



  // All of these logging statements should be visible via the "Inspect" interface
  // for the relevant SW accessed via chrome://serviceworker-internals
  console.log('Handling install event. Resources to prefetch:', urlsToPrefetch);

  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then(function(cache) {
      var cachePromises = urlsToPrefetch.map(function(urlToPrefetch) {
        // This constructs a new URL object using the service worker's script location as the base
        // for relative URLs.
        var url = new URL(urlToPrefetch, location.href);
        // Append a cache-bust=TIMESTAMP URL parameter to each URL's query string.
        // This is particularly important when precaching resources that are later used in the
        // fetch handler as responses directly, without consulting the network (i.e. cache-first).
        // If we were to get back a response from the HTTP browser cache for this precaching request
        // then that stale response would be used indefinitely, or at least until the next time
        // the service worker script changes triggering the install flow.
        url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;

        // It's very important to use {mode: 'no-cors'} if there is any chance that
        // the resources being fetched are served off of a server that doesn't support
        // CORS (http://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
        // In this example, www.chromium.org doesn't support CORS, and the fetch()
        // would fail if the default mode of 'cors' was used for the fetch() request.
        // The drawback of hardcoding {mode: 'no-cors'} is that the response from all
        // cross-origin hosts will always be opaque
        // (https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#cross-origin-resources)
        // and it is not possible to determine whether an opaque response represents a success or failure
        // (https://github.com/whatwg/fetch/issues/14).
        var request = new Request(url, {mode: 'no-cors'});
        return fetch(request).then(function(response) {
          if (response.status >= 400) {
            throw new Error('request for ' + urlToPrefetch +
              ' failed with status ' + response.statusText);
          }

          // Use the original URL without the cache-busting parameter as the key for cache.put().
          return cache.put(urlToPrefetch, response);
        }).catch(function(error) {
          console.error('Not caching ' + urlToPrefetch + ' due to ' + error);
        });
      });

      return Promise.all(cachePromises).then(function() {
        console.log('Pre-fetching complete.');
      });
    }).catch(function(error) {
      console.error('Pre-fetching failed:', error);
    })
  );
});

self.addEventListener('activate', function(event) {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic will handle the case where
  // there are multiple versioned caches.
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCacheNames.indexOf(cacheName) === -1) {
            // If this cache name isn't present in the array of "expected" cache names, then delete it.
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);

  event.respondWith(
    // caches.match() will look for a cache entry in all of the caches available to the service worker.
    // It's an alternative to first opening a specific named cache and then matching on that.
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found response in cache:', response);

        return response;
      }

      console.log('No response found in cache. About to fetch from network...');

      // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
      // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
      return fetch(event.request).then(function(response) {
        console.log('Response from network is:', response);

        return response;
      }).catch(function(error) {
        // This catch() will handle exceptions thrown from the fetch() operation.
        // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
        // It will return a normal response object that has the appropriate error code set.
        console.error('Fetching failed:', error);

        throw error;
      });
    })
  );
});

})();