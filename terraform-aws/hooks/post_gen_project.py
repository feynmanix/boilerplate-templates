import os
import shutil
from pathlib import Path
from collections import OrderedDict

environment_accounts_ids = {{ cookiecutter.environment_aws_account_ids }}
for environment, account_id in environment_accounts_ids.items():
    Path('env-config').mkdir(parents=True, exist_ok=True)
    Path(f'env-config/{environment}.aws.tfbackend').write_text(f'bucket = "{account_id}-terraform-tfstate-bucket"\nregion = "{{ cookiecutter.aws_default_region }}"')
    Path(f'env-config/{environment}.tfvars').write_text(f'env_name = "{environment}"\naws_account_id = "{account_id}"')
    Path('bootstrap/env-config').mkdir(parents=True, exist_ok=True)
    Path(f'bootstrap/env-config/{environment}.tfvars').write_text(f'aws_account_id = "{account_id}"')
