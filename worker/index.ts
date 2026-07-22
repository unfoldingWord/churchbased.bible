// Cloudflare Worker entry (Workers + Static Assets model).
//
// Static assets in dist/ are served automatically for any path that matches a
// file; this Worker only runs for paths with no matching asset. It handles the
// contact-form endpoint, 301s for old WordPress permalinks, and otherwise
// hands back to the static-asset server (which serves /404.html for misses,
// per `not_found_handling` in wrangler.toml).
import { handleContact } from './contact';

export interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY: string;
  CONTACT_TO: string;
  CONTACT_FROM: string;
  TURNSTILE_SECRET?: string;
}

// Old WordPress attachment/permalink URLs → their new home (was public/_redirects).
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

    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
      }
      return handleContact(request, env);
    }

    const target = REDIRECTS[url.pathname];
    if (target) {
      return Response.redirect(new URL(target, url).toString(), 301);
    }
    if (url.pathname === '/wp-admin' || url.pathname.startsWith('/wp-admin/')) {
      return Response.redirect(new URL('/', url).toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
