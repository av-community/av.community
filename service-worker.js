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

var precacheConfig = [["404.html","b496f56aa7494c5a15d112caff49cd64"],["assets/images/banner.82ab23cf.jpg","4f9c832b0ed11232f53df8937b02b692"],["assets/images/banner.jpg","4f9c832b0ed11232f53df8937b02b692"],["assets/images/icons/android-chrome-144x144.099d8016.png","90f644d7313a3b94a537219c4507f567"],["assets/images/icons/android-chrome-144x144.png","90f644d7313a3b94a537219c4507f567"],["assets/images/icons/android-chrome-192x192.0f2f4b8d.png","d3672fd66582c52dc5ce50cb2b66baaf"],["assets/images/icons/android-chrome-192x192.png","d3672fd66582c52dc5ce50cb2b66baaf"],["assets/images/icons/android-chrome-256x256.d9c7e6f4.png","8f2ca3b10b3836caa542e360c68a735b"],["assets/images/icons/android-chrome-256x256.png","8f2ca3b10b3836caa542e360c68a735b"],["assets/images/icons/android-chrome-36x36.d2faa904.png","4524d9ebade1f34cc1288c84dbc710f6"],["assets/images/icons/android-chrome-36x36.png","4524d9ebade1f34cc1288c84dbc710f6"],["assets/images/icons/android-chrome-384x384.722d9f07.png","b466728982c3482139d878c5dc5392b7"],["assets/images/icons/android-chrome-384x384.png","b466728982c3482139d878c5dc5392b7"],["assets/images/icons/android-chrome-48x48.295fe9b5.png","61ca14fc23ed447ed0314ed9377def1f"],["assets/images/icons/android-chrome-48x48.png","61ca14fc23ed447ed0314ed9377def1f"],["assets/images/icons/android-chrome-72x72.5a40e751.png","76562408bb8fc3d3934353ef1de08c08"],["assets/images/icons/android-chrome-72x72.png","76562408bb8fc3d3934353ef1de08c08"],["assets/images/icons/android-chrome-96x96.00ab2ef7.png","2eea5bfd0508d5aa16abb5e1f5fc5cae"],["assets/images/icons/android-chrome-96x96.png","2eea5bfd0508d5aa16abb5e1f5fc5cae"],["assets/images/icons/apple-touch-icon-114x114.5af4b47e.png","a101b34d1eeb14434d5a4e8171128efd"],["assets/images/icons/apple-touch-icon-114x114.png","a101b34d1eeb14434d5a4e8171128efd"],["assets/images/icons/apple-touch-icon-120x120.1a3c7dee.png","18121ed58a7ed1764db86bfbae20362c"],["assets/images/icons/apple-touch-icon-120x120.png","18121ed58a7ed1764db86bfbae20362c"],["assets/images/icons/apple-touch-icon-144x144.9f1cf5d3.png","9d1550375dd673dbc110e05929a171fb"],["assets/images/icons/apple-touch-icon-144x144.png","9d1550375dd673dbc110e05929a171fb"],["assets/images/icons/apple-touch-icon-152x152.418b656e.png","7fdf6e22c0616e806323f448a5188767"],["assets/images/icons/apple-touch-icon-152x152.png","7fdf6e22c0616e806323f448a5188767"],["assets/images/icons/apple-touch-icon-180x180.8c12e7e2.png","1c80b6383f545e45220796b9846e060b"],["assets/images/icons/apple-touch-icon-180x180.png","1c80b6383f545e45220796b9846e060b"],["assets/images/icons/apple-touch-icon-57x57.6fd15624.png","c65ad1674b736640807b6951c8b98c8a"],["assets/images/icons/apple-touch-icon-57x57.png","c65ad1674b736640807b6951c8b98c8a"],["assets/images/icons/apple-touch-icon-60x60.219572b0.png","5f95e6a163ba949016114cb1c26e8d7a"],["assets/images/icons/apple-touch-icon-60x60.png","5f95e6a163ba949016114cb1c26e8d7a"],["assets/images/icons/apple-touch-icon-72x72.356b8147.png","048ca4441a1bd50259ea5678bab4a088"],["assets/images/icons/apple-touch-icon-72x72.png","048ca4441a1bd50259ea5678bab4a088"],["assets/images/icons/apple-touch-icon-76x76.0c9962ed.png","4a6c06a03d4e5a0190cdf4f9b04c6090"],["assets/images/icons/apple-touch-icon-76x76.png","4a6c06a03d4e5a0190cdf4f9b04c6090"],["assets/images/icons/apple-touch-icon.8c12e7e2.png","1c80b6383f545e45220796b9846e060b"],["assets/images/icons/apple-touch-icon.png","1c80b6383f545e45220796b9846e060b"],["assets/images/icons/browserconfig.21041efe.xml","37af2949300f9177c50cc9d2bbd042c9"],["assets/images/icons/browserconfig.xml","4fb8f3df072ee3df71067500a0355f37"],["assets/images/icons/favicon-16x16.08453df2.png","bf24f3589bf3aec5272c902b2e337b9d"],["assets/images/icons/favicon-16x16.png","bf24f3589bf3aec5272c902b2e337b9d"],["assets/images/icons/favicon-194x194.cf2fb803.png","6aea68668f34e134200ec615f1d4e9f3"],["assets/images/icons/favicon-194x194.png","6aea68668f34e134200ec615f1d4e9f3"],["assets/images/icons/favicon-32x32.1c10617d.png","151e37bef99ebe49186c79946d63604f"],["assets/images/icons/favicon-32x32.png","151e37bef99ebe49186c79946d63604f"],["assets/images/icons/favicon.d32e4619.ico","3e3d43b8e9f14261a83a14b2cdb04c1c"],["assets/images/icons/favicon.ico","3e3d43b8e9f14261a83a14b2cdb04c1c"],["assets/images/icons/manifest.8913a8f2.json","abdf855825719af604105881d9650123"],["assets/images/icons/manifest.json","ea4f94e67b12287c1386455e06e67b74"],["assets/images/icons/mstile-144x144.c85a9514.png","03c84cbeba1e34ed05338abb9bf3935a"],["assets/images/icons/mstile-144x144.png","03c84cbeba1e34ed05338abb9bf3935a"],["assets/images/icons/mstile-150x150.56f3e261.png","2c5de2a89a5ce39227ad324fb296b70b"],["assets/images/icons/mstile-150x150.png","2c5de2a89a5ce39227ad324fb296b70b"],["assets/images/icons/mstile-310x150.814ed795.png","15ef372137238626bc71fb844d43679d"],["assets/images/icons/mstile-310x150.png","15ef372137238626bc71fb844d43679d"],["assets/images/icons/mstile-310x310.17162c46.png","7a6d0c2711d23806a3a1c8e5978cbdf5"],["assets/images/icons/mstile-310x310.png","7a6d0c2711d23806a3a1c8e5978cbdf5"],["assets/images/icons/mstile-70x70.ddb58c80.png","9f44aff6422a1c659e408dfcc4e21f1a"],["assets/images/icons/mstile-70x70.png","9f44aff6422a1c659e408dfcc4e21f1a"],["assets/images/icons/safari-pinned-tab.d0455661.svg","d04556614c10bb7e5229015ae0bdd04b"],["assets/images/icons/safari-pinned-tab.svg","d04556614c10bb7e5229015ae0bdd04b"],["assets/images/logo.bd4acf77.png","8402bd318ad440d6e3a5afec078e0a99"],["assets/images/logo.png","8402bd318ad440d6e3a5afec078e0a99"],["assets/images/pic01.26c60476.jpg","2da9c9339bfa162a1e52749a5d7605dd"],["assets/images/pic01.jpg","2da9c9339bfa162a1e52749a5d7605dd"],["assets/images/pic02.2e995011.jpg","3475ad0885a94992b1e7a71b15d2fd7b"],["assets/images/pic02.jpg","3475ad0885a94992b1e7a71b15d2fd7b"],["assets/images/pic03.55fe83db.jpg","3ff8e947a11114057ec55cac050cfc73"],["assets/images/pic03.jpg","3ff8e947a11114057ec55cac050cfc73"],["assets/images/pic04.2a0ec705.jpg","da9640cdbb58843dc5c82b12887bfdf1"],["assets/images/pic04.jpg","da9640cdbb58843dc5c82b12887bfdf1"],["assets/images/pic05.fba6874f.jpg","78c40089f8f7d1b52b1cd066f44a8e25"],["assets/images/pic05.jpg","78c40089f8f7d1b52b1cd066f44a8e25"],["assets/images/pic06.c5a01d4e.jpg","29397edc1ffe85247ee8267f9a1e6b9e"],["assets/images/pic06.jpg","29397edc1ffe85247ee8267f9a1e6b9e"],["assets/images/pic07.1fa87922.jpg","a2c89726315b78a7cb166de355c59d63"],["assets/images/pic07.jpg","a2c89726315b78a7cb166de355c59d63"],["assets/images/pic08.6adef7d2.jpg","6b46077ca2345a2bc7b1a90a96c432b7"],["assets/images/pic08.jpg","6b46077ca2345a2bc7b1a90a96c432b7"],["assets/images/pic09.99343c2f.jpg","7302cebf0ea644cb1280698211e70f9d"],["assets/images/pic09.jpg","7302cebf0ea644cb1280698211e70f9d"],["assets/images/pic10.8d21f150.jpg","95c85c6a13625aad34a35a8305c1ffef"],["assets/images/pic10.jpg","95c85c6a13625aad34a35a8305c1ffef"],["assets/images/pic11.e9bfde5c.jpg","9e1720966d2aca18c304ec58e8d4805d"],["assets/images/pic11.jpg","9e1720966d2aca18c304ec58e8d4805d"],["assets/scripts/main.min.b1bc5015.js","b1bc5015d1b8fd50279114ba78a3aaf2"],["assets/scripts/main.min.js","b1bc5015d1b8fd50279114ba78a3aaf2"],["assets/scripts/sw/runtime-caching.js","12c7facd907b0c1845aebf8d4bc73174"],["assets/scripts/sw/sw-toolbox.js","e7e54a466864d42dcccc8c3f80a91d1f"],["assets/styles/main.6329b603.css","fb8ae36e1a49acc2d339a09a7c26c34b"],["assets/styles/main.css","5f8ad1b053a1d37d88faa17951bd76d3"],["index.html","af267c41f7ccddbd4c3beeae9b1067e6"]];
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







importScripts("assets/scripts/sw/sw-toolbox.js","assets/scripts/sw/runtime-caching.js");

