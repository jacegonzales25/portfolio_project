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
  for_each = fileset("${path.module}/../uploads/photos", "*")
  bucket   = aws_s3_bucket.portfolio_bucket.id
  key      = "uploads/photos/${each.value}"
  source   = "${path.module}/../uploads/photos/${each.value}"
  etag     = filemd5("${path.module}/../uploads/photos/${each.value}")
}

resource "aws_s3_object" "resume_pdf" {
  bucket              = aws_s3_bucket.portfolio_bucket.id
  key                 = "uploads/files/Functional Resume - Jace L Gonzales.pdf"
  source              = "${path.module}/../uploads/files/Functional Resume - Jace L Gonzales.pdf"
  content_type        = "application/pdf"
  content_disposition = "attachment; filename=\"Functional_Resume_Jace_L_Gonzales.pdf\""
  etag                = filemd5("${path.module}/../uploads/files/Functional Resume - Jace L Gonzales.pdf")
}
