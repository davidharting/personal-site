# Metalsmith Trial

## Deploy
Deployment is done using the `awscli` which is installed via `pip`.

To set up my environment I did.

```bash
pyenv local 3.7.0
pip install awscli --upgrade --user
```

Note that I am relying on having a `s3-deploy` user with credentials to upload to S3 buckets.
