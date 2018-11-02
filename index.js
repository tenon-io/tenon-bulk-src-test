const puppeteer = require('puppeteer');
const tenonNode = require('tenon-node');
const fs = require('fs');

const tenonApi = new tenonNode({
    key: 'ENTER YOUR API KEY HERE', // your API key
    endPoint: 'https://www.tenon.io/api/index.php' // or your private tenon instance
});

const projectID = 'ENTER YOUR PROJECT ID HERE'; // your projectID
const filename = './queue.txt';

const runTenon = async data => {
    const itemsOnQueue = (data.match(/(http.*)/gm) || []).length;

    if (!itemsOnQueue) {
        console.info(`Zero items on queue - exiting.`);
        process.exit(0);
    }

    console.info('Queue items remaining: ' + itemsOnQueue);

    const url = data.match(/^([^\n]*)$/m)[1];
    const rest = data.replace(url + (itemsOnQueue > 1 ? '\n' : ''), '');

    console.info(`Testing: ${url}`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const docID = url.replace(/^https?\:\/\/www\./, '').replace(/[^a-z0-9]+/gi, '_');

    await page.goto(url, {
        'waitUntil': 'networkidle2'
    });

    const content = await page.content();

    tenonApi.checkSrc(content, {
        'projectID': projectID,
        'docID': docID
    }, (error, result) => {
        if (error) {
            console.error(`[Tenon] error: ${error}`);
        } else {
            console.info(`[Tenon] response status: ${result.status}`);
        }

        console.info(`[Tenon] result: ${JSON.stringify(result)}`);

        fs.writeFile(filename, rest, async error => {
            if (error) {
                console.error(`Error saving queue file: ${error.message}`)
            }
            await browser.close();
        });
    });
};

fs.readFile(filename, 'utf8', (error, data) => {
    if (error) {
        console.error(`Error opening ${filename}: ${error.message}`);
        process.exit(1);
    }

    runTenon(data);
});