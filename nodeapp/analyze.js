const puppeteer = require(`puppeteer`)
const ora = require(`ora`)
const chalk = require(`chalk`)
const fs = require(`fs`)

class Scrapy {

    constructor(path = `createcommune`, host = `https://instagram.com/`) {
        this.path = path
        this.host = host
        const insta = {
            url: `${this.host}${this.path}`
        };
        this.insta  = insta
    }

    get url() {
        return `${this.host}${this.path}`
    }
    
    

    async start() {
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        await page.goto(this.url, {waitUntil: `networkidle0`})
        await page.waitForSelector('span.g47SY')
        await page.waitFor(waitForFollowing)

        function waitForFollowing() {
            return document.querySelector('span.g47SY') != ""
        }

        const myFollowersText = await page.evaluate(() => {
            return document.querySelectorAll('span.g47SY')[1].textContent;
        })
        this.insta.followers = myFollowersText;

        const imFollowingText = await page.evaluate(() => {
            return document.querySelectorAll('span.g47SY')[2].textContent;
        })
        this.insta.following = imFollowingText;

        const postsText = await page.evaluate(() => {
            return document.querySelectorAll('span.g47SY')[0].textContent;
        })
        this.insta.posts = postsText;

        console.table(this.insta); 

        // await page.evaluate(() => {
        //     var followNum = document.querySelector('span.g47SY').textContent
        //     return Array.from(followNum).map((text) => {console.table(text)})
        // })
        browser.close()
    }

}

module.exports = Scrapy
