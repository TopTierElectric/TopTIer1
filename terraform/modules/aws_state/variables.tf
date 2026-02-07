variable "bucket_name" {
  description = "Name of the S3 bucket to create for Terraform state."
  type        = string
}

variable "lock_table_name" {
  description = "Name of the DynamoDB table to create for state locking."
  type        = string
}
