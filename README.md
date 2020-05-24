
# lambda-mailchimp

Create or update a Mailchimp subscription with this simple lambda function. Use it as a proxy for the Mailchimp API from your website/app without exposing your API key or running into CORS problems.

## Usage

### Setup

Get your username, API key, data center and list or audience id from your Mailchimp account.

* Create an API key here: `https://admin.mailchimp.com/account/api/`
* Your datacenter is the the first subdomain part, e.g. `us18` when viewing your admin pages
* Find your unique list or audience id in your list or audience settings

Make a copy of the .env.sample

```shell
$ cp .env.sample .env
```

and fill in your details.

### Upload

You can create a .zip file for uploading your lambda function to AWS with

```
$ npm run zip
```

### API Gateway

After creating your new lambda function, uploading the zip file and saving your changes you add a new API Gateway trigger, leave all defaults as suggested by AWS and you're good to go.

You can send all parameters that should be proxied with a POST request to your new API endpoint, at least email_address is required. Read more about the optional parameters:

```shell
https://mailchimp.com/developer/reference/lists/list-members/
```

### Return values

The lambda function transparently returns all reponse values from the Mailchimp API

### License
MIT 
