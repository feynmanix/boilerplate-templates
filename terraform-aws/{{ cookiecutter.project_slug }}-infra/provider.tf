terraform {
  backend "s3" {
    encrypt      = true
    key          = "default/terraform.tfstate"
    use_lockfile = true
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
  allowed_account_ids = [var.aws_account_id]
}
