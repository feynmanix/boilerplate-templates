variable "env_name" {
  type        = string
  description = "Short name of the environment"

  validation {
    condition     = can(regex("^{{ cookiecutter.environment_aws_account_ids.keys() | join("|") }}$", var.env_name))
    error_message = "Invalid environment name"
  }
}

variable "aws_account_id" {
  type = string
}

variable "aws_region" {
  type    = string
  default = "{{ cookiecutter.aws_default_region }}"
}