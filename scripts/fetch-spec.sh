#!/usr/bin/env bash
# Download only deposition-document-contradiction-llm-spec.md (requires: gh auth login)
#
# Optional: GITHUB_DOCS_OWNER, GITHUB_DOCS_REPO, GITHUB_DOCS_SPEC_PATH

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${ROOT}/docs/deposition-document-contradiction-llm-spec.md"
OWNER="${GITHUB_DOCS_OWNER:-courtscribesinc-org}"
REPO="${GITHUB_DOCS_REPO_NAME:-cs-dd-docs}"
SPEC_PATH="${GITHUB_DOCS_SPEC_PATH:-deposition-document-contradiction-llm-spec.md}"

mkdir -p "$(dirname "${OUT}")"

echo "Fetching ${OWNER}/${REPO}/${SPEC_PATH} ..."
gh api "repos/${OWNER}/${REPO}/contents/${SPEC_PATH}" \
  -H "Accept: application/vnd.github.raw" \
  > "${OUT}"
echo "Wrote ${OUT}"
