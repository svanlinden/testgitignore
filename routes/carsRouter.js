const persons = require("../../persons");
const router = require("express").Router({mergeParams: true});
const addSelf = require("../util/Hal");

router.get("/", getCars);


function getCars(req, res) {
    if (req.params.id) {
        let result = [];
        for (let entry in persons.cars) {
            if (persons.cars[entry].personId == req.params.id) {
                result[entry] = persons.cars[entry];
            }
        }
        if (Object.keys(result).length !== 0) {
           let filteredResult =  result.filter(r => r != null);
            res.json(filteredResult.map(r => {
                let {id, license, brand} = r;
                return {id, license, brand, _links: addSelf(r, req, "cars")}
            }));
            // res.json(filteredResult);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.status(200).json(persons.cars.map(p => {
            let {id, license, brand} = p;
            return {id, license, brand, _links: addSelf(p, req, "cars")}
        }));
    }
}

router.get("/:id", (req, res) => {
    let persoonIdentificatie;
    let car = persons.cars.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).send('The car with the given ID was not found.');
    persoonIdentificatie = car.personId;
    let persoon = findById(persoonIdentificatie);

    persoon = {
        id : persoon.id,
        first_name: persoon.first_name,
        last_name: persoon.last_name,
        _links: addSelf(persoon, req, "persons")
    };

   /* car = {
        id: car.id,
        license: car.license,
        brand: car.brand,
        model: car.model,
        person: persoon

    };*/

    let { id, license, brand, model} = car;

    res.status(200).json({id, license, brand, model, person: persoon});
});

function findById(id){
    console.log('Calling findById');
    for (let i=0; i<persons.persons.length; i++){
        if(id == persons.persons[i].id){
            return persons.persons[i];
        }
    }
}


module.exports = router;