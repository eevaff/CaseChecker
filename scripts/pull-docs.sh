#!/usr/bin/env bash
# Pull latest files from your private GitHub docs repo into docs/github-docs/
#
# One-time auth (pick one):
#   brew install gh && gh auth login
#   OR: git config --global credential.helper osxkeychain
#       then first git clone will prompt; use GitHub username + PAT as password.
#
# Override repo: GITHUB_DOCS_REPO='https://github.com/org/repo.git' ./scripts/pull-docs.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="${ROOT}/docs/github-docs"
REPO_URL="${GITHUB_DOCS_REPO:-https://github.com/courtscribesinc-org/cs-dd-docs.git}"

mkdir -p "${ROOT}/docs"

if [[ -d "${TARGET}/.git" ]]; then
  echo "Updating ${TARGET} ..."
  git -C "${TARGET}" pull --ff-only
  echo "Done."
else
  echo "Cloning into ${TARGET} ..."
  git clone "${REPO_URL}" "${TARGET}"
  echo "Done. Re-run this script anytime to pull the latest."
fi
