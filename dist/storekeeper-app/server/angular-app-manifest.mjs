
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/items"
  },
  {
    "renderMode": 2,
    "route": "/reports"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23464, hash: 'c5cd3ad2f745401d1137ca2053d0f6188890f97d076ec202e09cc5ba435b5662', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17083, hash: '7f63d088997c188a71f47849087ec4c0e8275f29091bb3c50f4c43455975e120', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reports/index.html': {size: 30438, hash: '404d4af8b7a2b39ebb1551a17b256bf374e6de36aa5d5d54bd9b940d9aef1368', text: () => import('./assets-chunks/reports_index_html.mjs').then(m => m.default)},
    'index.html': {size: 30444, hash: 'b531e45d63673d4afba7ac4066a3f83ce17b4a15185d5b816b570818b70d542a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'items/index.html': {size: 121927, hash: 'f720a0522acd58c16fd2f836c0c717e417db86de3d0a1ae4673906d505a8b378', text: () => import('./assets-chunks/items_index_html.mjs').then(m => m.default)},
    'styles-Z5UYKNDX.css': {size: 6934, hash: 'VxIyzD7LHG8', text: () => import('./assets-chunks/styles-Z5UYKNDX_css.mjs').then(m => m.default)}
  },
};
