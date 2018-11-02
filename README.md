# READ ME

This is an *extremely* simple example of running through a list of URLs to test them with [Tenon API](https://tenon.io/)

This particular example is focused on testing the rendered DOM source of pages, rather than testing them by sending over their URLs.  This was created as a workaround for websites that use [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).  Sites that use a CSP often fail testing using Tenon. The best way to work around this is to add `*.tenon.io` to your CSP directives. 

This sample code exists for cases where you cannot modify your CSP. This node script will load up the page(s) in a headless browser, grab the rendered DOM as a string, and send that over to Tenon's API.

## Use it

### Install it

This requires Node & NPM on the computer that will run it. 

Download all the files in this repository.

Run `npm install`. All dependencies will install.

### Prepare your queue file

To test your URLs, add them to the `queue.txt`. Each URL must be on its own line.

### Set some configuration variables

In `index.js` there are a few things you'll need to configure:

Near the top is this code block:

```
const tenonApi = new tenonNode({
    key: 'ENTER YOUR API KEY HERE', // your API key
    endPoint: 'https://www.tenon.io/api/index.php' // or your private tenon instance
});
```

Enter your [Tenon API Key](https://tenon.io/apikey.php)  there where it says `key: 'ENTER YOUR API KEY HERE',`


Immediately below that:

```
const projectID = 'ENTER YOUR PROJECT ID HERE'; // your projectID

```

Enter the project ID from your project within Tenon.


### Run it

Infinite loops, FTW! Surely a more robust solution would be to do the looping from within the Node script, but this is proof-of-concept code.  Running the below from Command Line will work fine.

```
while true
do
node index.js
done   
```
