import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const APIKey = "AIzaSyCaGRRS827WanJDqgAuP92b6kuNb6VAeZg";
//key=AIzaSyCaGRRS827WanJDqgAuP92b6kuNb6VAeZg

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
  });
  
  app.get("/ewfew", async (req, res) => {
    res.render("index.ejs");
      try {
          const result = await axios.get("https://secrets-api.appbrewery.com/random");
          const data = result.data;
          res.render("index.ejs", { secret: data.secret, user: data.username });
        } catch (error) {
          res.render("index.ejs", { content: JSON.stringify(error.response.data) });
        }
    });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  