const axios = require("axios");
const cheerio = require("cheerio");

const TIMESOFINDIA = "https://timesofindia.indiatimes.com/";

const articles = [];

module.exports = {
  scrappTIMESOFINDIA: async () => {
    axios(TIMESOFINDIA)
      .then((data) => {
        const HTML = data.data;
        const $ = cheerio.load(HTML);
        $(".linktype1 ", HTML).each((i, element) => {
          const title = $(element).text().replace(/\s\s+/g, "");
          const url = $(element).attr("href");
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
