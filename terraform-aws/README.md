# About
Template for a [Terraform](https://developer.hashicorp.com/terraform/language) project to manage resources in AWS cloud.

## Create project from template
1. Install pipx if you don't have it yet: `python -m pip install pipx`
2. Run `pipx run cookiecutter https://github.com/mifeet/boilerplate-templates.git --directory="terraform-aws"`
3. Fill in all the values when prompted
    * **Important**: The value of `environment_aws_account_ids` needs to be a JSON map of environment name to account id, e.g., `{ "dev": "1234", "prod": "5678" }`

## Initial setup of the project
1. Follow Prerequisites and First Time Setup in the generated README.md