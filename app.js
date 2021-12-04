const PORT = 3000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const fs = require("fs");

const app = express();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const NDTV = "https://www.ndtv.com/";

const articles = [];
axios(NDTV)
  .then((data) => {
    const HTML = data.data;
    const $ = cheerio.load(HTML);

    // fs.writeFileSync("test.txt", HTML);

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
