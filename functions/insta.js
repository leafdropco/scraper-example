const puppeteer = require(`puppeteer`);

class Insta {

    constructor(path) {
        this.path = path,
        this.host = 'https://instagram.com/',
        this.insta = {url: `${this.host}${this.path}`};
    }

    async findPostImages() {
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        await page.goto(this.insta.url, {waitUntil: `networkidle0`});
        await page.waitForSelector('div.KL4Bh > img');

        const postPics = await page.evaluate(() => {
            const images = document.querySelectorAll(`a > div > div.KL4Bh > img`)
            const imgArr = [].map.call(images, img => img.src)
            return imgArr;
        })

        await page.close();
        await browser.close();
        return postPics;
    }

}

module.exports = Insta;
