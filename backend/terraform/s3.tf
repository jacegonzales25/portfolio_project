resource "aws_s3_bucket" "portfolio_bucket" {
  bucket = "resume-app"

  tags = {
    Name        = "Resume Portfolio Image Bucket"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_acl" "portfolio_bucket_acl" {
  bucket = aws_s3_bucket.portfolio_bucket.id
  acl    = "private" # Change to "public-read" if you need public access
}

resource "aws_s3_object" "resume_images" {
  for_each = fileset("${path.module}/uploads", "*") # Upload all files in 'uploads' directory

  bucket = aws_s3_bucket.portfolio_bucket.id
  key    = each.value
  source = "${path.module}/uploads/${each.value}"
  etag   = filemd5("${path.module}/uploads/${each.value}")
}
