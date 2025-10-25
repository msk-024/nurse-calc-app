if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + ".js", i).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[n]) return;
    let t = {};
    const r = (e) => a(e, n),
      o = { module: { uri: n }, exports: t, require: r };
    s[n] = Promise.all(i.map((e) => o[e] || r(e))).then((e) => (c(...e), t));
  };
}
define(["./workbox-4754cb34"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "eebac56cb055314282804bb31dabf463",
        },
        {
          url: "/_next/static/EgKtGma87RGZ7YtunuxpW/_buildManifest.js",
          revision: "603df450ea2d068cf7069d35d578aefc",
        },
        {
          url: "/_next/static/EgKtGma87RGZ7YtunuxpW/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/0-58e1e2c68f253098.js",
          revision: "58e1e2c68f253098",
        },
        {
          url: "/_next/static/chunks/341.716d46e6e5cb6bdc.js",
          revision: "716d46e6e5cb6bdc",
        },
        {
          url: "/_next/static/chunks/472.a3826d29d6854395.js",
          revision: "a3826d29d6854395",
        },
        {
          url: "/_next/static/chunks/4bd1b696-cf72ae8a39fa05aa.js",
          revision: "cf72ae8a39fa05aa",
        },
        {
          url: "/_next/static/chunks/643-1b39637976bd3984.js",
          revision: "1b39637976bd3984",
        },
        {
          url: "/_next/static/chunks/810-39990b6fbdef4a62.js",
          revision: "39990b6fbdef4a62",
        },
        {
          url: "/_next/static/chunks/964-eda38e26c0391a47.js",
          revision: "eda38e26c0391a47",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-12f34c037c7ecbf8.js",
          revision: "12f34c037c7ecbf8",
        },
        {
          url: "/_next/static/chunks/app/bmi/page-79c35f6bb500ae6f.js",
          revision: "79c35f6bb500ae6f",
        },
        {
          url: "/_next/static/chunks/app/bsa/page-771ac5a92ce0f53c.js",
          revision: "771ac5a92ce0f53c",
        },
        {
          url: "/_next/static/chunks/app/drip/page-12c558cf812808c3.js",
          revision: "12c558cf812808c3",
        },
        {
          url: "/_next/static/chunks/app/electrolyte/page-dce6700329f09b30.js",
          revision: "dce6700329f09b30",
        },
        {
          url: "/_next/static/chunks/app/fluid/page-482565969d23cee7.js",
          revision: "482565969d23cee7",
        },
        {
          url: "/_next/static/chunks/app/history/page-74588630e8ff07fe.js",
          revision: "74588630e8ff07fe",
        },
        {
          url: "/_next/static/chunks/app/layout-6f9a66aba05bd94a.js",
          revision: "6f9a66aba05bd94a",
        },
        {
          url: "/_next/static/chunks/app/medication/page-6a3b74a40a73199f.js",
          revision: "6a3b74a40a73199f",
        },
        {
          url: "/_next/static/chunks/app/nutrition/page-feb8d3654605e12e.js",
          revision: "feb8d3654605e12e",
        },
        {
          url: "/_next/static/chunks/app/oxygen/page-06067d171ce66ca7.js",
          revision: "06067d171ce66ca7",
        },
        {
          url: "/_next/static/chunks/app/page-eca0356160f97499.js",
          revision: "eca0356160f97499",
        },
        {
          url: "/_next/static/chunks/app/transfusion/page-6fc5007901a8422a.js",
          revision: "6fc5007901a8422a",
        },
        {
          url: "/_next/static/chunks/framework-7c95b8e5103c9e90.js",
          revision: "7c95b8e5103c9e90",
        },
        {
          url: "/_next/static/chunks/main-403fd0b1a4319cb4.js",
          revision: "403fd0b1a4319cb4",
        },
        {
          url: "/_next/static/chunks/main-app-16afce6a05b3cdc7.js",
          revision: "16afce6a05b3cdc7",
        },
        {
          url: "/_next/static/chunks/pages/_app-663ec5428c344dae.js",
          revision: "663ec5428c344dae",
        },
        {
          url: "/_next/static/chunks/pages/_error-544778206352ce59.js",
          revision: "544778206352ce59",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-d58f4d1f711e9787.js",
          revision: "d58f4d1f711e9787",
        },
        {
          url: "/_next/static/css/926d407b0f30f0e6.css",
          revision: "926d407b0f30f0e6",
        },
        {
          url: "/_next/static/media/4cf2300e9c8272f7-s.p.woff2",
          revision: "18bae71b1e1b2bb25321090a3b563103",
        },
        {
          url: "/_next/static/media/747892c23ea88013-s.woff2",
          revision: "a0761690ccf4441ace5cec893b82d4ab",
        },
        {
          url: "/_next/static/media/8d697b304b401681-s.woff2",
          revision: "cc728f6c0adb04da0dfcb0fc436a8ae5",
        },
        {
          url: "/_next/static/media/93f479601ee12b01-s.p.woff2",
          revision: "da83d5f06d825c5ae65b7cca706cb312",
        },
        {
          url: "/_next/static/media/9610d9e46709d722-s.woff2",
          revision: "7b7c0ef93df188a852344fc272fc096b",
        },
        {
          url: "/_next/static/media/ba015fad6dcf6784-s.woff2",
          revision: "8ea4f719af3312a055caf09f34c89a77",
        },
        { url: "/file.svg", revision: "d09f95206c3fa0bb9bd9fefabfd0ea71" },
        {
          url: "/icons/dark/bowl-food.svg",
          revision: "b220d0fe6dab27f3d949d5dae00e8213",
        },
        {
          url: "/icons/dark/capsules.svg",
          revision: "223e96a7f7615cc22e75ab7367b6ab7b",
        },
        {
          url: "/icons/dark/check.svg",
          revision: "dcae7c14843add89ee82d969cc3bdee2",
        },
        {
          url: "/icons/dark/dark-moon.svg",
          revision: "97cf3c0adc1b48f32f515b59ec1340df",
        },
        {
          url: "/icons/dark/droplet.svg",
          revision: "d3394eb551770f593df115dc5cd9a395",
        },
        {
          url: "/icons/dark/dumbbell.svg",
          revision: "c67b4acbe04e28d547a3ed249d42ec1f",
        },
        {
          url: "/icons/dark/fill-drip.svg",
          revision: "c49e39cddd26f06c99e0279a105bd136",
        },
        {
          url: "/icons/dark/hand-holding-droplet.svg",
          revision: "a2451eb0fc28379923afa506f9492b0c",
        },
        {
          url: "/icons/dark/help-icon.svg",
          revision: "a633c1fa60f9ce20369646b329bd3cdb",
        },
        {
          url: "/icons/dark/history.svg",
          revision: "1aa2f932df65995a18dcd9cc5dc9ee35",
        },
        {
          url: "/icons/dark/home.svg",
          revision: "a7483471fbdbf19dd31ac9a4e74c902e",
        },
        {
          url: "/icons/dark/hospital.svg",
          revision: "eafbbff79844623009fb7fc14da997c7",
        },
        {
          url: "/icons/dark/scale-unbalanced.svg",
          revision: "727eeb43940e9854efa19c14becb6397",
        },
        {
          url: "/icons/dark/sort.svg",
          revision: "06eed581e063076c083e000c9f0be04a",
        },
        {
          url: "/icons/dark/stethoscope.svg",
          revision: "f46f28418d5e6fa314288232a3522fa9",
        },
        {
          url: "/icons/icon-192.png",
          revision: "e95b7ecc5a9e0c00805563e833a190db",
        },
        {
          url: "/icons/icon-512.png",
          revision: "ede7d847f5c417224539f99b783d3591",
        },
        {
          url: "/icons/light/bowl-food.svg",
          revision: "709fd279dea1d75129a590e9e2f3f8cd",
        },
        {
          url: "/icons/light/capsules.svg",
          revision: "a491f5cf9b60ac5252245d5667bbaae3",
        },
        {
          url: "/icons/light/check.svg",
          revision: "53356327f96fa399040571633918879f",
        },
        {
          url: "/icons/light/droplet.svg",
          revision: "12c96ef24d114a197cc80b6948235b9d",
        },
        {
          url: "/icons/light/dumbbell.svg",
          revision: "af21c99a2fd91ab668e3d4647e0ca28f",
        },
        {
          url: "/icons/light/fill-drip.svg",
          revision: "98c2ea44b7b4f247330e08bb0d894cc1",
        },
        {
          url: "/icons/light/hand-holding-droplet.svg",
          revision: "968c19587a318412256401abe10c2927",
        },
        {
          url: "/icons/light/history.svg",
          revision: "b85e84ce6b41b4cf569c29a404682e2f",
        },
        {
          url: "/icons/light/home.svg",
          revision: "a705d516d1bd0606f734e6d7557e8079",
        },
        {
          url: "/icons/light/hospital.svg",
          revision: "e77ef1caafbc51daa93d7a6489980e89",
        },
        {
          url: "/icons/light/light-moon.svg",
          revision: "2477c8a446e8fa21a4e613bde25fb66f",
        },
        {
          url: "/icons/light/nurse.svg",
          revision: "9557c9a4ca59576fbce7568373edeb8a",
        },
        {
          url: "/icons/light/scale-unbalanced.svg",
          revision: "932fedcebc0fda97e28093d2d5b14171",
        },
        {
          url: "/icons/light/sort.svg",
          revision: "94d03251df6a157e9799e65a60f4108b",
        },
        {
          url: "/icons/light/stethoscope.svg",
          revision: "e09c5fd4a51eb1ef2296c08b96966c89",
        },
        {
          url: "/icons/light/syringe.svg",
          revision: "d67e3458dd294ee4bee3d0f869c5775f",
        },
        {
          url: "/icons/light/triangle.svg",
          revision: "92394aeebfeff6a872cff7a6b324e755",
        },
        { url: "/manifest.json", revision: "f484b3cefc0e9abebb631c39d4c5a69f" },
        { url: "/window.svg", revision: "a2760511c65806022ad20adf74370ff3" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: i,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
// =============================
// 💡 Offline fallback for Next.js
// =============================
self.addEventListener("fetch", (event) => {
  // ページ遷移(navigateリクエスト)時のみ処理
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        // ネットワークが切れたら、キャッシュ済みルートを返す
        return caches.match("/").then((response) => {
          if (response) {
            return response;
          } else {
            // 最後の保険（オフライン時に空レス防止）
            return new Response("<h1>オフラインです</h1>", {
              headers: { "Content-Type": "text/html" },
            });
          }
        });
      })
    );
  }
});
