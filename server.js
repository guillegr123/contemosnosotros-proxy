import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

const baseUrl = "https://contemosnosotros.org";

const app = express();

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/valida", (req, res) => {
  axios.get(`${baseUrl}/valida/`).then(response => {
    res.json(response.data);
  });
});

app.get("/valida/image/:token", (req, res) => {
  const token = req.params.token;
  axios
    .get(`${baseUrl}/valida/image/${token}`, {
      responseType: "arraybuffer"
    })
    .then(response => {
      res.contentType("image/jpeg");
      res.end(response.data, "binary");
    });
});

app.post("/valida/conteo", (req, res) => {
  axios.post(`${baseUrl}/valida/conteo`, req.body).then(response => {
    res.json(response.data);
  });
});

// Start
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
