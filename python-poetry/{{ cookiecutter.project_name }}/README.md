# {{ cookiecutter.project_description }}


## Basic commands
Activate python version >= {{ cookiecutter.min_python_version }} (if needed), and install dependencies:
  ```bash
  poetry install
  ```
  
Running tests:
  ```bash
  poetry run pytest
  ```
  
Execute or inspect [`run-checks.sh`](./run-checks.sh) for running other static checks and formatting. 
