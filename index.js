const puppeteer = require('puppeteer');
const tenonNode = require('tenon-node');
const fs = require('fs');
const sleep = require('sleep');

const tenonApi = new tenonNode({
    key: 'ENTER YOUR API KEY HERE', // your API key
    endPoint: 'https://www.tenon.io/api/index.php' // or your private tenon instance
});

const projectID = 'ENTER YOUR PROJECT ID HERE'; // your projectID
const filename = './queue.txt';

fs.readFile(filename, 'utf8', function (err, data) {

    if (err) {
        console.log('Error: ');
        console.log(err);
    }

    //
    let arr = data.toString().split('\n');
    i = arr.length;

    console.log('Queue Items Remaining: ' + i);

    let linesExceptFirst = data.split('\n').slice(1).join('\n');

    console.log('Testing: ');
    console.log(arr[0]);

    puppeteer.launch().then(async browser => {
        const page = await browser.newPage();

        const url = arr[0];
        const docID = url.replace(/^https?\:\/\/www\./, '').replace(/[^a-z0-9]+/gi, '_');

        await page.goto(url, {
            'waitUntil': 'networkidle2'
        });

        const content = await page.content();

        tenonApi.checkSrc(content, {
            'projectID': projectID,
            'docID': docID
        }, function (err, result) {
            if (err) {
                console.error('Error: ' + err);
                console.log(result);
            } else {
                console.log('Status: ', result.status);
                console.log(result);
            }
        });

        fs.writeFile(filename, linesExceptFirst);

        await browser.close();
        sleep.sleep(1);
    });

});
