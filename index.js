import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let APIkey= "ede";


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs", res.locals={APIkey:APIkey});
  });

app.post("/submit", (req, res) => {
  console.log(req.body["APIkey"]);
  APIkey = req.body["APIkey"];
  res.redirect("/");
  
});

app.post("/search", (req, res) => {
  console.log(req.body);
  res.redirect("/");
  
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
  