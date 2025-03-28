# {{ cookiecutter.project_description }} infrastructure
AWS resource definitions for {{ cookiecutter.project_description }}.

## Prerequisites
1. Install [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. Run
    
    ```
    export AWS_PROFILE={{ cookiecutter.aws_cli_profile_name }}
    aws configure set profile.$AWS_PROFILE.region {{ cookiecutter.aws_default_region }}
    aws configure set profile.$AWS_PROFILE.sso_account_id 1234567 # Replace with your actual account ID
    aws configure set profile.$AWS_PROFILE.sso_start_url 'https://d-1234567.awsapps.com/start#/' # Replace with your actual start URL
    aws configure set profile.$AWS_PROFILE.sso_region {{ cookiecutter.aws_default_region }}
    aws configure set profile.$AWS_PROFILE.sso_role_name AdministratorAccess  # Replace with your actual role
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