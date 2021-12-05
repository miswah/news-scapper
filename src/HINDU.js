const axios = require("axios");
const cheerio = require("cheerio");
const newsSchema = require("./news.model");

const THEHINDU = "https://www.thehindu.com/";

module.exports = {
  scrappTHEHINDU: async () => {
    axios(THEHINDU)
      .then((data) => {
        const HTML = data.data;
        const $ = cheerio.load(HTML);
        $("h3", HTML).each((index, element) => {
          const title = $(element).text().replace(/\s\s+/g, "");
          const url = $(element).find("a").attr("href");
          let article = {
            title,
            url,
          };
          if (article.title != undefined || null) {
            newsSchema
              .find({})
              .then((data) => {
                if (data[index].title !== article.title) {
                  newsSchema.create(article, (err, news) => {
                    console.log(`New data created ${news}`);
                  });
                }
              })
              .catch((err) => console.log(err));
          }

          // newsSchema.create(article, (err, news) => {
          //   console.log(news);
          // });
        });
      })
      .catch((err) => console.log(err));
  },
};
