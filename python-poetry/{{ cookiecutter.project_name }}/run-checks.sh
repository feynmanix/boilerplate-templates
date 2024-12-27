#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

echo -e "\n== Running pytest =="
poetry run pytest .

echo -e "\n== Running pyright =="
poetry run pyright .

echo -e "\n== Running ruff check =="
poetry run ruff check .

echo -e "\n== Running ruff format =="
poetry run ruff format .

echo -e "\n== Running bandit =="
poetry run bandit .


