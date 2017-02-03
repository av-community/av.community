/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["404.html","2b96e3e9f2412169cadedc9420442357"],["images/banner.jpg","4f9c832b0ed11232f53df8937b02b692"],["images/icons/android-chrome-144x144.png","90f644d7313a3b94a537219c4507f567"],["images/icons/android-chrome-192x192.png","d3672fd66582c52dc5ce50cb2b66baaf"],["images/icons/android-chrome-256x256.png","8f2ca3b10b3836caa542e360c68a735b"],["images/icons/android-chrome-36x36.png","4524d9ebade1f34cc1288c84dbc710f6"],["images/icons/android-chrome-384x384.png","b466728982c3482139d878c5dc5392b7"],["images/icons/android-chrome-48x48.png","61ca14fc23ed447ed0314ed9377def1f"],["images/icons/android-chrome-72x72.png","76562408bb8fc3d3934353ef1de08c08"],["images/icons/android-chrome-96x96.png","2eea5bfd0508d5aa16abb5e1f5fc5cae"],["images/icons/apple-touch-icon-114x114.png","a101b34d1eeb14434d5a4e8171128efd"],["images/icons/apple-touch-icon-120x120.png","18121ed58a7ed1764db86bfbae20362c"],["images/icons/apple-touch-icon-144x144.png","9d1550375dd673dbc110e05929a171fb"],["images/icons/apple-touch-icon-152x152.png","7fdf6e22c0616e806323f448a5188767"],["images/icons/apple-touch-icon-180x180.png","1c80b6383f545e45220796b9846e060b"],["images/icons/apple-touch-icon-57x57.png","c65ad1674b736640807b6951c8b98c8a"],["images/icons/apple-touch-icon-60x60.png","5f95e6a163ba949016114cb1c26e8d7a"],["images/icons/apple-touch-icon-72x72.png","048ca4441a1bd50259ea5678bab4a088"],["images/icons/apple-touch-icon-76x76.png","4a6c06a03d4e5a0190cdf4f9b04c6090"],["images/icons/apple-touch-icon.png","1c80b6383f545e45220796b9846e060b"],["images/icons/browserconfig.xml","8e70b7b8a59d52baa2bf081e97963b27"],["images/icons/favicon-16x16.png","bf24f3589bf3aec5272c902b2e337b9d"],["images/icons/favicon-194x194.png","6aea68668f34e134200ec615f1d4e9f3"],["images/icons/favicon-32x32.png","151e37bef99ebe49186c79946d63604f"],["images/icons/favicon.ico","3e3d43b8e9f14261a83a14b2cdb04c1c"],["images/icons/manifest.json","81b477697a13fcb0488963f5e43b4da4"],["images/icons/mstile-144x144.png","03c84cbeba1e34ed05338abb9bf3935a"],["images/icons/mstile-150x150.png","2c5de2a89a5ce39227ad324fb296b70b"],["images/icons/mstile-310x150.png","15ef372137238626bc71fb844d43679d"],["images/icons/mstile-310x310.png","7a6d0c2711d23806a3a1c8e5978cbdf5"],["images/icons/mstile-70x70.png","9f44aff6422a1c659e408dfcc4e21f1a"],["images/icons/safari-pinned-tab.svg","d04556614c10bb7e5229015ae0bdd04b"],["images/logo.png","8402bd318ad440d6e3a5afec078e0a99"],["images/pic01.jpg","2da9c9339bfa162a1e52749a5d7605dd"],["images/pic02.jpg","3475ad0885a94992b1e7a71b15d2fd7b"],["images/pic03.jpg","3ff8e947a11114057ec55cac050cfc73"],["images/pic04.jpg","da9640cdbb58843dc5c82b12887bfdf1"],["images/pic05.jpg","78c40089f8f7d1b52b1cd066f44a8e25"],["images/pic06.jpg","29397edc1ffe85247ee8267f9a1e6b9e"],["images/pic07.jpg","a2c89726315b78a7cb166de355c59d63"],["images/pic08.jpg","6b46077ca2345a2bc7b1a90a96c432b7"],["images/pic09.jpg","7302cebf0ea644cb1280698211e70f9d"],["images/pic10.jpg","95c85c6a13625aad34a35a8305c1ffef"],["images/pic11.jpg","9e1720966d2aca18c304ec58e8d4805d"],["index.html","b5b41a4fa1a19bdb2e0733b1c8fa5b76"],["scripts/main.js","d0f46314c3a7aa3797b6f864db913fec"],["scripts/main.min.js","d41d8cd98f00b204e9800998ecf8427e"],["scripts/sw/runtime-caching.js","12c7facd907b0c1845aebf8d4bc73174"],["scripts/sw/sw-toolbox.js","e7e54a466864d42dcccc8c3f80a91d1f"],["styles/main.css","ab28e1e5916a8c43aa337f318e368c5c"]];
var cacheName = 'sw-precache-v2-av-community-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







importScripts("scripts/sw/sw-toolbox.js","scripts/sw/runtime-caching.js");

