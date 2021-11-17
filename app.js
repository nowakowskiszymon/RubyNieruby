const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//wyciągnięcie zmiennych środowiskowych 
require('dotenv').config()

//łączę się z bazą danych 
mongoose.connect("mongodb+srv://"+ process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0.sgcid.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority");

//ładuję plik z routami
const trainRoutes = require("./api/routes/trains");

// instancja expressa
const app = express();

//uruchamiam loggera
app.use(morgan("combined"));

//wyciągam dane z części body HTTP
app.use(bodyParser.json());

// route /trains
app.use("/trains", trainRoutes);

app.use((req, res, next) => {
    res.status(200).json({wiadomość: "Brak zasobu"});
});

module.exports = app;

// C create  POST   /pociagi    dodanie nowego pociagu
// R read    GET    /pociagi    lista wszystkich pociagow
//                  /pociagi/100    szczegóły pociągu o numerze 100
// U update  PUT    /pociagi/100    zmiana pociągu o nr 100
// D delete  DELETE /pociagi/100    usunęcie pociągu o nr 100