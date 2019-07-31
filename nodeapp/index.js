// const Scrapy = require('./Scrapy.js')
const Scrapy = require('./analyze.js')

let path = process.argv[2]
let scrapy = new Scrapy(path)
scrapy.start().catch(error => console.error(error))