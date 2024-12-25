locals {
}

## Example resources - modify as needed
# resource "aws_s3_bucket" "access_log" {
#   bucket = "${var.aws_account_id}-s3-access-logs"
# }
#
# resource "aws_s3_bucket_public_access_block" "access_log" {
#   bucket                  = aws_s3_bucket.access_log.id
#   block_public_acls       = true
#   block_public_policy     = true
#   ignore_public_acls      = true
#   restrict_public_buckets = true
# }
#
# resource "aws_s3_bucket_server_side_encryption_configuration" "access_log" {
#   bucket = aws_s3_bucket.access_log.bucket
#   rule {
#     bucket_key_enabled = false
#     apply_server_side_encryption_by_default {
#       kms_master_key_id = null
#       sse_algorithm     = "AES256"
#     }
#   }
# }
#
# data "aws_iam_policy_document" "access_log_write" {
#   statement {
#     actions = [
#       "s3:PutObject"
#     ]
#     effect = "Allow"
#     resources = ["arn:aws:s3:::${aws_s3_bucket.access_log.bucket}/*"]
#   }
# }
#
# resource "aws_iam_policy" "access_log_write" {
#   name        = "access-log-write"
#   description = "Permission for writing to access log bucket"
#   policy      = data.aws_iam_policy_document.access_log_write.json
# }
#
# resource "aws_iam_group_policy_attachment" "backup_uploaders" {
#   group      = ...
#   policy_arn = aws_iam_policy.access_log_write.arn
# }

