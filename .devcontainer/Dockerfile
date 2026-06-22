# =============================================================================
# Global build args
# =============================================================================
# UV_VERSION is declared before the first FROM so it is visible across stages.
ARG UV_VERSION="0.11.23"

# -----------------------------------------------------------------------------
# uv source stage: pinned by UV_VERSION + SHA256 digest. Exists so the
# final stage can `COPY --from=uv-source ...` without variable expansion in --from.
# -----------------------------------------------------------------------------
FROM ghcr.io/astral-sh/uv:${UV_VERSION}@sha256:d0a0a753ab981624b49c97abc98821c1c09f4ca69d1ef5cee69c501be3d88479 AS uv-source

# -----------------------------------------------------------------------------
# Main devcontainer stage (mcr.microsoft.com/devcontainers/python on Debian 13)
# -----------------------------------------------------------------------------
FROM mcr.microsoft.com/devcontainers/python:3-3.13-trixie@sha256:e797f7e02a8adf1c6d375a4873591205cc867a2d68083506e7f3aa89822f2026

# Use bash with pipefail for all RUN steps.
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Global environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_LINK_MODE=copy

# Pull uv & uvx from the pinned upstream image (see uv-source stage above).
COPY --from=uv-source /uv /uvx /usr/local/bin/

# Upgrade pip to the requested version
RUN python3 -m pip install --no-cache-dir --upgrade pip==26.1.2

# Install lychee (link checker, pinned vía LYCHEE_VERSION arg)
ARG LYCHEE_VERSION="0.24.2"
RUN --mount=type=bind,source=install-github-binary.sh,target=/install-github-binary.sh \
    /install-github-binary.sh \
        lychee \
        lycheeverse/lychee \
        "lychee-v${LYCHEE_VERSION}" \
        lychee-x86_64-unknown-linux-gnu.tar.gz \
        lychee-aarch64-unknown-linux-gnu.tar.gz

# Install pinact (Action SHA pinner, pinned vía PINACT_VERSION arg)
ARG PINACT_VERSION="4.0.0"
RUN --mount=type=bind,source=install-github-binary.sh,target=/install-github-binary.sh \
    /install-github-binary.sh \
        pinact \
        suzuki-shunsuke/pinact \
        "v${PINACT_VERSION}" \
        pinact_linux_amd64.tar.gz \
        pinact_linux_arm64.tar.gz
