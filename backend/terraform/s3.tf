resource "aws_s3_bucket" "portfolio_bucket" {
  bucket = "resume-portfolio-assets"

  tags = {
    Name        = "Resume Portfolio Image Bucket"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_public_access_block" "portfolio_bucket_access" {
  bucket = aws_s3_bucket.portfolio_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}


resource "aws_s3_bucket_policy" "portfolio_bucket_policy" {
  bucket = aws_s3_bucket.portfolio_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowOnlyOwnerAccess"
        Effect    = "Allow"
        Principal = { AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root" }
        Action    = "s3:*"
        Resource  = [
          "arn:aws:s3:::${aws_s3_bucket.portfolio_bucket.id}",
          "arn:aws:s3:::${aws_s3_bucket.portfolio_bucket.id}/*"
        ]
      },
      {
        Sid       = "AllowPublicReadAccessToUploads"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "arn:aws:s3:::${aws_s3_bucket.portfolio_bucket.id}/uploads/*"
      }
    ]
  })
}

data "aws_caller_identity" "current" {}

resource "aws_s3_object" "resume_images" {
  for_each = fileset("${path.module}/../uploads", "*") # Go up one level to find the uploads folder
  bucket   = aws_s3_bucket.portfolio_bucket.id
  key      = "uploads/${each.value}" # Ensuring images are placed inside 'uploads/' in S3
  source   = "${path.module}/../uploads/${each.value}"
  etag     = filemd5("${path.module}/../uploads/${each.value}")
}
