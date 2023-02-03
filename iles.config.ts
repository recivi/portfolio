import { defineConfig } from 'iles'

import excerpt from '@islands/excerpt'
import feed from '@islands/feed'
import headings from '@islands/headings'
import icons from '@islands/icons'

// eslint-disable-next-line import/no-extraneous-dependencies
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
  siteUrl: 'https://dhruvkb.dev',
  turbo: true,
  modules: [
    excerpt({ separator: 'blockquote' }),
    feed(),
    headings(),
    // https://github.com/ElMassimo/iles/blob/main/packages/icons/src/icons.ts
    icons({
      scale: 1,
      compiler: 'vue3',
      resolver: {
        customCollections: ['icons', 'logos'],
      },
      customCollections: {
        logos: FileSystemIconLoader('./src/assets/logos'),
      },
    }),
  ],
  extendRoute(modRoute) {
    if (modRoute.path.includes('/posts/'))
      // Remove post index.
      modRoute.path = modRoute.path.replace(/\d{4}_/, '')
  },
  extendFrontmatter(modFrontmatter, filename) {
    if (filename.includes('/posts/')) {
      // Inject `index` field.
      modFrontmatter.index ||= parseInt(
        filename.split('/').at(-1)?.substring(0, 4) ?? '-1',
        10
      )
    }
  },
})
