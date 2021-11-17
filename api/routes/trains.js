const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//import modelu
const Train = require("../models/train");

// R read    GET    /pociagi    lista wszystkich pociagow
router.get("/", (req, res, next) => {
    Train.find()
    .then(result => {
        res.status(200).json({
            wiadomosc: "Lista wszystkich pociągów", 
            info: result});
    })
    .catch(err => console.log(err));

});

// C create  POST   /pociagi    dodanie nowego pociagu
router.post("/", (req, res, next) => {

const train = new Train({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    type: req.body.type,
    capacity: req.body.capacity
})

train.save()
.then(result => {
    res.status(201).json({
        wiadomosc: "Dodano nowy pociąg",
        info: train
});
})
.catch(err => console.log(err));


});

//                  /pociagi/100    szczegóły pociągu o numerze 100
router.get("/:trainId", (req, res, mext) => {
    const id = req.params.trainId;
    Train.findById(id)
    .then(result => {
        res.status(200).json({
            wiadomosc: "szczegóły pociągu o numerze " + id,
            info: result
        });
    })
    .catch(err => console.log(err));
});

// U update  PUT    /pociagi/100    zmiana pociągu o nr 100
router.put("/:trainId", (req, res, mext) => {
    const id = req.params.trainId;
    Train.findByIdAndUpdate(id, {    
        name: req.body.name,
        type: req.body.type,
        capacity: req.body.capacity},
        {new: true}
        )
        .then(result => {
            res.status(200).json({
                wiadomosc: "Zmiana nr pociągu o nr " + id,
                info: result
            });
        })
        .catch(err => console.log(err));
});

// D delete  DELETE /pociagi/100    usunęcie pociągu o nr 100
router.delete("/:trainId", (req, res, mext) => {
    const id = req.params.trainId;
    Train.findByIdAndRemove(id)
    .then(result => {
        res.status(200).json({wiadomosc: "usunięcie pociągu o numerze " + id});
    })
    .catch(err => console.log(err));
});

module.exports = router;