#Invow

Visit the website: [invow.xyz](http://invow.xyz)

## To do for local development:

Clone the repo: `git clone https://github.com/OlivierCoue/invow.git`

Create a `.env` file in the root directory of the project. Add
variables:

```
NODE_ENV=development
MONGODB_URI=mongodb://localhost:2000/test
HOST=http://localhost:8080
PORT=8080
SESSION_SECRET=my_session_secret
SESSION_NAME=localinvow
ADMIN_EMAILS=[]
IMAGES_URL=https://s3-eu-west-1.amazonaws.com/mybucketname/
IMAGES_FOLDER=dev
S3_BUCKET=my_bucket
AWS_ACCESS_KEY_ID=my_aws_id
AWS_SECRET_ACCESS_KEY=my_aws_secret
FACEBOOK_APP_ID=my_facebook_app_id
FACEBOOK_APP_SECRET=my_facebook_app_secret
TWITTER_CONSUMER_KEY=my_twitter_consumer_key
TWITTER_CONSUMER_SECRET=my_twitter_consumer_secret
GOOGLE_CLIENT_ID=my_google_client_id
GOOGLE_CLIENT_SECRET=my_google_client_secret
GOOGLE_API_KEY=my_google_api_key
MAILER_HOST=127.0.0.1
MAILER_USER=hello@invow.xyz
MAILER_PASSWORD=mailer_password
MAILER_PORT=1025
```

Install dependencies `npm install`

Install typings dependencies `typings install`. If typings is not installed on your computer run `npm install typings -g`

Run `npm run watch` to watch ts/sass/html.. files and and create the `dist` folder

Run `node server/server.js` to start the server

Run `maildev` to catch emails on port 1025. If maildev is not installed on your computer run `npm install maildev -g`

You can now visit the website on `localhost:8080` and open `localhost:1080` to see the emails send by the app.

### Generate API documentation

Install `apidoc` globally: `npm install apidoc -g`. Then run `apidoc -i server -o dist/api/doc`. You can now visit the api documentation on `localhost:8080/api/doc`.
