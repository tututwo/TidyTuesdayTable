const request = require("request-promise")
const cheerio = require("cheerio")

async function main(){
    const officalPage = await request(`https://github.com/rfordatascience/tidytuesday`)
    const $ = cheerio.load(officalPage)
    const maxYearArr = []
    const maxYear = $("#readme > div.Box-body.px-5.pb-5 > article > h2:nth-child(39) > :not(.anchor)").each((i, element) => {
        maxYearArr.push(+$(element).text())
    })
    // console.log(Math.max(...maxYearArr))

    for (let page = 2018; page <= Math.max(...maxYearArr); page ++ ) { // current page's max value
        const web = await request(`https://github.com/rfordatascience/tidytuesday/tree/master/data/${page}`)
        const $ = cheerio.load(web)
        $("#readme > div.Box-body.px-5.pb-5 > article > table > thead > tr > th:nth-child(1)").each((i, element) => {
            console.log($(element).text())
        })
    console.log(`Data from Year ${page}`)
    } 




}

main()