#!/bin/sh
# Build this package and run it in a local n8n via ~/.n8n/custom.
set -e
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

cd "$REPO_DIR"
rm -rf ./dist
npm run build

mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
[ -f package.json ] || npm init -y >/dev/null
npm i "$REPO_DIR"
n8n
