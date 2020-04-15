const express = require('express');
const router = express.Router();
const persons = require("../../persons");
const addSelf = require("../util/Hal");
const carsRouter = require("./carsRouter");

router.use("/persons/:id/cars", carsRouter);
router.use("/cars", carsRouter);

router.get("/persons", (req, res) => {
    res.status(200).json(persons.persons.map(p => {
        let {id, first_name, last_name} = p;
        return {id, first_name, last_name, _links: addSelf(p, req, "persons")}
    }));
});

router.get("/persons/:id", (req, res) => {
    let persoon = persons.persons.find(p => p.id === parseInt(req.params.id));
    if (!persoon) return res.status(404).send('The person with the given ID was not found.');

    res.status(200).json(persoon);
});


router.post("/persons", (req, res) => {
    let persoon = {
        id: persons.persons.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_day: req.body.birth_day,
        gender: req.body.gender,
        married: req.body.married,
        image: req.body.image,
        yearsService: req.body.yearsService
    };

    persons.persons.push(persoon);
    res.status(201).json(persoon);

});

module.exports = router;