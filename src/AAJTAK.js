const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const AAJTAK = "https://www.aajtak.in/";

const articles = [];

module.exports = {
  scrappAAJTAK: async () => {
    axios(AAJTAK)
      .then((data) => {
        const HTML = data.data;
        const $ = cheerio.load(HTML);
        $(".sm-thumb-listing", HTML).each((i, element) => {
          const title = $(element).find("ul > li > a").attr("title");
          const url = $(element).find("ul > li > a").attr("href");
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
