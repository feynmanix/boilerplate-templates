#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE[0]}")" || exit 1
readonly ENVIRONMENT="${1:-}"

if [ "$ENVIRONMENT" != "{{ cookiecutter.environment_aws_account_ids.keys() | join('" -a "$ENVIRONMENT" != "') }}" ]; then
  echo "Usage: $(basename $0) <{{ cookiecutter.environment_aws_account_ids.keys() | join("|") }}>" 1>&2
  exit 1
fi

export AWS_PROFILE="{{ cookiecutter.aws_cli_profile_name }}"
terraform init -backend-config="./env-config/${ENVIRONMENT}.aws.tfbackend" -upgrade -reconfigure
terraform apply -var-file="env-config/${ENVIRONMENT}.tfvars" -parallelism=20
