<script lang="ts">
  import type { PostItem, PostWithRoute } from './postsData';

  export let category: string;
  export let slug: string;
  export let post: PostItem | null;
  export let prevPost: PostWithRoute | null;
  export let nextPost: PostWithRoute | null;

  const gradient1 =
    'radial-gradient(ellipse 70% 70% at 50% 50%, #2cc2f0 0%, #1f6986 35%, transparent 65%)';
  const gradient2 =
    'radial-gradient(ellipse 70% 70% at 50% 50%, #02ffee 0%, #277752 35%, transparent 65%)';
</script>

<header class="posts-header">
  <div class="posts-background">
    <div
      class="animate-gradientMove min-h-[120vmax] min-w-[120vmax] -translate-x-1/4 -translate-y-1/4 opacity-60 blur-[90px]"
      style="background: {gradient1};"
      aria-hidden="true"
    ></div>
    <div
      class="animate-gradientMove2 min-h-[120vmax] min-w-[120vmax] translate-x-1/4 -translate-y-1/4 opacity-60 blur-[90px]"
      style="background: {gradient2};"
      aria-hidden="true"
    ></div>
  </div>

  <main class="posts-main">
    <div class="w-full max-w-5xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-6xl font-bold text-[#0debd8] mb-3 text-shadow-cyan">Posts</h1>
        <p class="text-white/90 max-w-2xl mx-auto">
          Dynamic routing example: <code class="text-white/90">/posts/@category/@slug</code> renders
          different content based on URL parameters.
        </p>
        <p class="text-sm text-white/70 mt-3">
          Current path: <code class="text-[#0debd8]">/posts/{category}/{slug}</code>
        </p>
      </div>

      <div
        class="card-glow p-6 rounded-[2rem] border border-[#0debd8]/40 bg-gray-950/40 backdrop-blur"
      >
        {#if post}
          <div class="flex items-center gap-3 mb-4">
            <span
              class="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-[#0debd8]/20 text-[#0debd8] border border-[#0debd8]/30"
            >
              {category}
            </span>
            <span class="text-xs text-white/50">{post.date}</span>
          </div>
          <h2 class="text-2xl font-bold text-[#0debd8] mb-3">{post.title}</h2>
          <p class="text-white/85 leading-relaxed">{post.content}</p>

          <div class="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
            {#if prevPost}
              <a
                href="/posts/{prevPost.category}/{prevPost.slug}"
                class="flex items-center gap-2 text-sm text-white/70 hover:text-[#0debd8] transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span class="hidden sm:inline">{prevPost.title}</span>
                <span class="sm:hidden">Prev</span>
              </a>
            {:else}
              <span></span>
            {/if}
            {#if nextPost}
              <a
                href="/posts/{nextPost.category}/{nextPost.slug}"
                class="flex items-center gap-2 text-sm text-white/70 hover:text-[#0debd8] transition-colors"
              >
                <span class="hidden sm:inline">{nextPost.title}</span>
                <span class="sm:hidden">Next</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            {:else}
              <span></span>
            {/if}
          </div>
        {:else}
          <div class="text-center py-8">
            <p class="text-white/70 mb-2">Post not found</p>
            <p class="text-sm text-white/50">
              Category: <code>{category}</code> / Slug: <code>{slug}</code>
            </p>
          </div>
        {/if}
      </div>
    </div>
  </main>
</header>

<style>
  .posts-header {
    position: relative;
    height: 100vh;
    min-height: 100vh;
    background-color: rgb(3 7 18);
    overflow: hidden;
  }

  .posts-background {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .posts-main {
    position: relative;
    z-index: 10;
    height: 100%;
    padding-top: 7rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 2.5rem;
    display: flex;
    align-items: center;
    color: white;
    box-sizing: border-box;
  }
</style>
