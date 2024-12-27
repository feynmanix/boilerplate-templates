# {{ cookiecutter.project_description }}


## Basic commands
* Install
    ```bash
    poetry install
    ```
* Run tests:
    ```bash
    poetry run pytest
    ```
* Run type checks:
    ```bash
    poetry run pyright .
    ```
* Format:
    ```bash
    poetry run black .
    ```
  

bandit -c pyproject.toml -r .
ruff check
ruff format    