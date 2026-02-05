<template>
  <header class="ssg-header">
    <div class="ssg-background">
      <div
        class="animate-gradientMove min-h-[120vmax] min-w-[120vmax] -translate-x-1/4 -translate-y-1/4 opacity-60 blur-[90px]"
        :style="gradient1"
        aria-hidden
      />
      <div
        class="animate-gradientMove2 min-h-[120vmax] min-w-[120vmax] translate-x-1/4 -translate-y-1/4 opacity-60 blur-[90px]"
        :style="gradient2"
        aria-hidden
      />
    </div>

    <main class="ssg-main">
      <div class="ssg-content">
        <div class="text-center">
          <h1 class="text-4xl md:text-7xl font-bold text-[#0debd8] mb-3 text-shadow-cyan">
            SSG
          </h1>
          <p class="text-white/90 max-w-2xl mx-auto">
            This page is statically generated — a Vike SSG example for EdgeOne Pages.
          </p>
          <p class="text-sm text-white/70 mt-2">
            Generated at:
            <time :dateTime="buildTimeIso">{{ buildTimeFormatted }}</time>
          </p>
        </div>

        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <a
            v-for="card in cards"
            :key="card.title"
            :href="card.href"
            target="_blank"
            rel="noopener noreferrer"
            class="card-glow block p-6 rounded-[2rem] border border-[#0debd8]/40 bg-gray-950/40 backdrop-blur hover:border-[#0debd8]"
          >
            <h3 class="text-lg font-semibold text-[#0debd8] mb-2">{{ card.title }}</h3>
            <p class="text-sm text-white/85">{{ card.description }}</p>
            <span class="inline-block mt-4 text-sm text-[#0debd8]">Read on vike.dev →</span>
          </a>
        </div>
      </div>
    </main>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SSG_CARDS } from './ssgCards'
import type { SsgCard } from './ssgCards'

const props = withDefaults(
  defineProps<{
    buildTimeIso?: string
    cards?: SsgCard[]
  }>(),
  {
    buildTimeIso: '',
    cards: () => SSG_CARDS
  }
)

const buildTimeFormatted = computed(() => {
  if (!props.buildTimeIso) return '—'
  return new Date(props.buildTimeIso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'long'
  })
})

const gradient1 = {
  background:
    'radial-gradient(ellipse 70% 70% at 50% 50%, #2cc2f0 0%, #1f6986 35%, transparent 65%)'
}
const gradient2 = {
  background:
    'radial-gradient(ellipse 70% 70% at 50% 50%, #02ffee 0%, #277752 35%, transparent 65%)'
}
</script>

<style scoped>
/* Match home: h-screen = height: 100vh so inner main's height: 100% works */
.ssg-header {
  position: relative;
  height: 100vh;
  min-height: 100vh;
  background-color: rgb(3 7 18);
  overflow: hidden;
}

.ssg-background {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

/* Same spacing as home Hero: 7rem top for fixed nav, px-6 pb-10 */
.ssg-main {
  position: relative;
  z-index: 10;
  height: 100%;
  padding-top: 7rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 2.5rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.ssg-content {
  width: 100%;
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
