# {{ cookiecutter.project_description }} infrastructure
AWS resource definitions for {{ cookiecutter.project_description }}.

## Prerequisites
1. Install [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. Run
    
    ```
    aws configure set profile.{{ cookiecutter.aws_cli_profile_name }}.region us-east-1
    aws configure set profile.{{ cookiecutter.aws_cli_profile_name }}.sso_account_id 061051254256
    aws configure set profile.{{ cookiecutter.aws_cli_profile_name }}.sso_start_url 'https://d-9067a84839.awsapps.com/start#/'
    aws configure set profile.{{ cookiecutter.aws_cli_profile_name }}.sso_region us-east-1
    aws configure set profile.{{ cookiecutter.aws_cli_profile_name }}.sso_role_name AdministratorAccess  # Replace with your actual role
    ```

3. To verify your setup, run
    ```
    export AWS_PROFILE={{ cookiecutter.aws_cli_profile_name }}
    aws sso login
    aws sts get-caller-identity # verify login
    ```
   
4. [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)

5. Before running any commands involving terraform, **set the environment variable** `export AWS_PROFILE=conj-backup`

## First time setup
You need to run this *only* before applying Terraform for the first time _for each environment_.

1. Run `./bootstrap/bootstrap-env.sh <env-name>`

## Apply infrastructure changes

1. Run `./apply-to-env.sh <env-name>`