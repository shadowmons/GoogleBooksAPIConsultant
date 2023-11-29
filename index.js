import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let APIkey;
const URL = "https://www.googleapis.com/books/v1/volumes?q=";


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
  
  app.post("/search", async (req, res) => {
    console.log(req.body);
    let URLsearch = URL + req.body["volume"].replace(/ /g, '+');
    if (req.body["special"]!='No keyword'){
      URLsearch = URLsearch + "+" + req.body["special"]+ ":" +req.body["keyword"];
    }

    if (req.body["filter"]!='no filter'){
      URLsearch = URLsearch + "&filter=" + req.body["filter"];
    }

    if (req.body["printType"]!='no filter'){
      URLsearch = URLsearch + "&printType=" + req.body["printType"];
    }

    if (req.body["sorting"]!='No defined'){
      URLsearch = URLsearch + "&orderBy=" + req.body["sorting"];
    }
    
    URLsearch = URLsearch + "&key=" +APIkey;
    console.log(URLsearch);

    try {
      const result = await axios.get(URLsearch);
      const data = result.data;
      console.log(data);
      res.render("index.ejs", res.locals={APIkey:APIkey,results: data });
      console.log("se logro")
    } catch (error) {
      res.render("index.ejs", { APIkey:APIkey, error: error.response.data });
    }
    });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  