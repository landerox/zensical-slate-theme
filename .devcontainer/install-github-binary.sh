#!/usr/bin/env bash
# =============================================================================
# install-github-binary.sh
# =============================================================================
#
# Download a GitHub release tarball and install the binary under
# /usr/local/bin. Called by the devcontainer Dockerfile for tools that
# don't ship as a devcontainer feature (currently: lychee, pinact).
#
# =============================================================================
set -euo pipefail

if [[ $# -ne 5 ]]; then
    echo "Usage: $0 <binary> <repo> <tag> <asset_amd64> <asset_arm64>" >&2
    exit 2
fi

binary="$1"
repo="$2"
tag="$3"
asset_amd64="$4"
asset_arm64="$5"

case "$(uname -m)" in
    x86_64)         asset="$asset_amd64" ;;
    aarch64|arm64)  asset="$asset_arm64" ;;
    *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

curl -sSfL "https://github.com/${repo}/releases/download/${tag}/${asset}" \
    -o "${tmp}/asset.tar.gz"
tar -xzf "${tmp}/asset.tar.gz" -C "${tmp}"

# Locate the binary regardless of whether it sits at the top level or
# inside a nested directory.
binary_path=$(find "${tmp}" -name "${binary}" -type f -executable -print -quit)
if [[ -z "${binary_path}" ]]; then
    echo "Binary '${binary}' not found in extracted tarball" >&2
    exit 1
fi

install -m 0755 "${binary_path}" "/usr/local/bin/${binary}"
