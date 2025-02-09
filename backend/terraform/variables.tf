variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "us-east-1"
}

variable "s3_bucket_name" {
  description = "S3 bucket name for portfolio images"
  type        = string
  default     = "resume-portfolio-assets"
}
