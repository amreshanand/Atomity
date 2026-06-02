#!/usr/bin/env bash
set -euo pipefail

MSG=${1:-"chore: incremental commit"}

git add -A
git commit -m "$MSG" || echo "No changes to commit"
git push origin main

echo "Pushed to main with message: $MSG"
