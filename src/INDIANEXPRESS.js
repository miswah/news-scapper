const axios = require("axios");
const cheerio = require("cheerio");

const INDIANEXPRESS = "https://indianexpress.com/";

const articles = [];

module.exports = {
  scrappIndianExpress: async () => {
    axios(INDIANEXPRESS)
      .then((data) => {
        const HTML = data.data;
        const $ = cheerio.load(HTML);
        $("h3", HTML).each((i, element) => {
          const title = $(element).text().replace(/\s\s+/g, "");
          const url = $(element).find("a").attr("href");
          articles.push([
            {
              title,
              url,
            },
          ]);
        });
        console.log(articles);
      })
      .catch((err) => console.log(err));
  },
};
