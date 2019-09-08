# Personal Site

🌎 www.davidharting.com

## Build

To build, you must inject required environment variables:

- `GOODREADS_API_KEY` (String)
  This is a personal developer key that can be obtained in your account settings page.

For local development, a `.env` file is expected. To build on a remote machine, you must inject the expected variables into the environment.

## Deploy

Deployment is done using the `awscli` which is installed via `pip`.

To set up my environment I did.

```bash
pyenv local 3.7.0
pip install awscli --upgrade --user
```

Note that I am relying on having a `s3-deploy` user with credentials to upload to S3 buckets.

To deploy simply `npm run deploy`.
