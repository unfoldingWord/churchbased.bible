#!/usr/bin/env bash
# Phase 1 archive of churchbased.bible before WordPress decommission.
set -uo pipefail

BASE="https://churchbased.bible"
RAW="$(cd "$(dirname "$0")/.." && pwd)/raw"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"

LOCALES=(en es fr hi ru ar zh sw pt id vi bn ur fa my nl)
PAGES=(home about training research stories contact)

mkdir -p "$RAW/html" "$RAW/css" "$RAW/images" "$RAW/videos"

fail=0

echo "== HTML: 6 pages x 16 locales =="
for loc in "${LOCALES[@]}"; do
  mkdir -p "$RAW/html/$loc"
  prefix=""
  [ "$loc" != "en" ] && prefix="/$loc"
  for page in "${PAGES[@]}"; do
    path="/"
    [ "$page" != "home" ] && path="/$page/"
    url="$BASE$prefix$path"
    out="$RAW/html/$loc/$page.html"
    if [ -s "$out" ]; then continue; fi
    code=$(curl -sL -A "$UA" -o "$out" -w '%{http_code}' "$url")
    if [ "$code" != "200" ]; then
      echo "FAIL $code $url"
      rm -f "$out"
      fail=1
    fi
    sleep 0.3
  done
  echo "  $loc done"
done

echo "== Videos (VideoPress) =="
VIDEOS=(
  "https://videos.files.wordpress.com/FaiY1nP8/cbbt-advocacy-video-v9-sensitive.mov"
  "https://videos.files.wordpress.com/V0XlL21x/biblical-theology-video-1-intro.mp4"
  "https://videos.files.wordpress.com/3iRz3Q1E/biblical-theology-video-2-reasons.mp4"
  "https://videos.files.wordpress.com/oaqo1fpI/biblical-theology-video-3-resources.mp4"
  "https://videos.files.wordpress.com/Ag0GySC1/cbbt-video-footer.mp4"
  "https://videos.files.wordpress.com/T5zMXVbk/cbbt-homepage-video.mp4"
  "https://videos.files.wordpress.com/Kh7Yilu5/cbbt-impact-stories-video.mp4"
  "https://videos.files.wordpress.com/1lqde5Hf/cbbt-impact-stories-video-1.mp4"
  "https://videos.files.wordpress.com/EnLz1Lnd/cbbt-impact-stories-video-2.mp4"
  "https://videos.files.wordpress.com/ukyyr9yY/cbbt-impact-stories-header.mp4"
)
for v in "${VIDEOS[@]}"; do
  name=$(basename "$v")
  out="$RAW/videos/$name"
  if [ -s "$out" ]; then echo "  skip $name"; continue; fi
  echo "  $name"
  curl -sL -A "$UA" -o "$out" "$v" || { echo "FAIL video $v"; rm -f "$out"; fail=1; }
done

echo "== CSS referenced by the English homepage =="
grep -oE '<link[^>]+rel="stylesheet"[^>]*>' "$RAW/html/en/home.html" \
  | grep -oE 'href="[^"]+"' | sed 's/href="//;s/"$//' | sort -u | while read -r css; do
    case "$css" in http*) u="$css";; //*) u="https:$css";; /*) u="$BASE$css";; *) continue;; esac
    name=$(echo "$u" | sed 's|[^a-zA-Z0-9._-]|_|g' | tail -c 120)
    [ -s "$RAW/css/$name" ] && continue
    curl -sL -A "$UA" -o "$RAW/css/$name" "$u" || echo "FAIL css $u"
done

echo "== Images referenced across all archived HTML =="
grep -rhoE '(src|href|content|poster|data-src|srcset)="[^"]*wp-content/uploads[^"]*"' "$RAW/html" \
  | grep -oE 'https?://[^" ,]*wp-content/uploads/[^" ,]*' \
  | sed 's/[?].*$//' | sort -u > "$RAW/image-urls.txt"
# srcset entries may lack protocol; also catch i0.wp.com CDN forms
grep -rhoE '"[^"]*i[0-2]\.wp\.com/[^"]*"' "$RAW/html" \
  | grep -oE 'https?://i[0-2]\.wp\.com/[^" ,?]*' | sed 's/[?].*$//' | sort -u >> "$RAW/image-urls.txt"
sort -u "$RAW/image-urls.txt" -o "$RAW/image-urls.txt"

total=$(wc -l < "$RAW/image-urls.txt" | tr -d ' ')
i=0
while read -r img; do
  i=$((i+1))
  # keep the uploads-relative path so filenames with date dirs don't collide
  rel=$(echo "$img" | sed -E 's|^https?://[^/]+/||; s|^churchbased.bible/||')
  out="$RAW/images/$rel"
  [ -s "$out" ] && continue
  mkdir -p "$(dirname "$out")"
  curl -sL -A "$UA" -o "$out" "$img" || { echo "FAIL img $img"; rm -f "$out"; }
  sleep 0.1
done < "$RAW/image-urls.txt"
echo "  $total image URLs processed"

echo "== Summary =="
echo "HTML files:  $(find "$RAW/html" -name '*.html' | wc -l | tr -d ' ')"
echo "CSS files:   $(find "$RAW/css" -type f | wc -l | tr -d ' ')"
echo "Images:      $(find "$RAW/images" -type f | wc -l | tr -d ' ')"
echo "Videos:      $(find "$RAW/videos" -type f | wc -l | tr -d ' ')"
du -sh "$RAW"
exit $fail
