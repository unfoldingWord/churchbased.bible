// Cloudflare Worker entry (Workers + Static Assets model).
//
// Static assets in dist/ are served automatically for any path that matches a
// file; this Worker only runs for paths with no matching asset. It handles
// 301s for old WordPress permalinks and the retired contact page, and
// otherwise hands back to the static-asset server (which serves /404.html for
// misses, per `not_found_handling` in wrangler.toml).

export interface Env {
  ASSETS: Fetcher;
}

// Old WordPress attachment/permalink URLs → their new home.
const REDIRECTS: Record<string, string> = {
  '/cbbt-advocacy-video-v9-sensitive-mov/': '/about/',
  '/biblical-theology-video-1-intro-mp4/': '/research/',
  '/biblical-theology-video-2-reasons-mp4/': '/research/',
  '/biblical-theology-video-3-resources-mp4/': '/research/',
  '/cbbt-video-footer-mp4/': '/',
  '/cbbt-homepage-video-mp4/': '/',
  '/cbbt-impact-stories-video-mp4/': '/stories/',
  '/cbbt-impact-stories-video-1-mp4/': '/stories/',
  '/cbbt-impact-stories-video-2-mp4/': '/stories/',
  '/cbbt-impact-stories-header-mp4/': '/stories/',
  '/feed/': '/',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const target = REDIRECTS[url.pathname];
    if (target) {
      return Response.redirect(new URL(target, url).toString(), 301);
    }
    // The contact page was retired (email lives in the footer) — send old
    // links, in any locale, to that locale's home page.
    const contact = url.pathname.match(/^\/(?:([a-z]{2})\/)?contact\/?$/);
    if (contact) {
      return Response.redirect(new URL(contact[1] ? `/${contact[1]}/` : '/', url).toString(), 301);
    }
    if (url.pathname === '/wp-admin' || url.pathname.startsWith('/wp-admin/')) {
      return Response.redirect(new URL('/', url).toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
