if(!self.define){let e,s={};const i=(i,c)=>(i=new URL(i+".js",c).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let r={};const f=e=>i(e,t),a={module:{uri:t},exports:r,require:f};s[t]=Promise.all(c.map((e=>a[e]||f(e)))).then((e=>(n(...e),r)))}}define(["./workbox-a988f853"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"index.html",revision:"ed3e0a1ca30e44f6098a249fc5eb91f3"},{url:"registerSW.js",revision:"32956e182848683006f51ab0afd30feb"},{url:"static/css/config-D2if7TNr.css",revision:"ade3fdbc9758d922ef59f0c2dee9770c"},{url:"static/css/index-DNOog_kY.css",revision:"54d31da2e92af9e3facd73decaf07d73"},{url:"static/js/config-BYAzhCQO.js",revision:"f8eb7f210a01629e391362b84bf53589"},{url:"static/js/index-BrIguwbu.js",revision:"81cb0ca8c830667939a4ffb11208056a"},{url:"static/js/index-C04esZ9x.js",revision:"17293ea00e4b789b1ffd82dc34e58b5e"},{url:"static/js/index-COcRXUGD.js",revision:"c044a456f2a1073dd075f595d362ff72"},{url:"static/js/useCountry-BtZ_IKvN.js",revision:"7b6277076e76ef2b551186c185fc8fed"},{url:"icon-192x192.png",revision:"43ec03d04b083b5072c8c194756e1235"},{url:"icon-512x512.png",revision:"06c481dc079fb6ded4392e439faf434b"},{url:"manifest.webmanifest",revision:"0d057ae3c39988ae71ef91b931af0db0"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({request:e})=>"document"===e.destination),new e.NetworkFirst({cacheName:"html-cache",plugins:[]}),"GET"),e.registerRoute((({request:e})=>"script"===e.destination||"style"===e.destination),new e.StaleWhileRevalidate({cacheName:"assets-cache",plugins:[]}),"GET"),e.registerRoute((({request:e})=>"image"===e.destination),new e.CacheFirst({cacheName:"image-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:2592e3})]}),"GET")}));