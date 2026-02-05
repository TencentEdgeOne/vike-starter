import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import SsgPage from './SsgPage.vue'
import type { SsgVueProps } from './mountSsgVue'

export async function renderSsgVue(props: SsgVueProps): Promise<string> {
  const app = createSSRApp(SsgPage, props)
  return renderToString(app)
}
