const persons = require("../../persons.json");
const findById = require("./personRepository");

module.exports = function GetPersonwithCar(PersonId) {
    let person = findById(PersonId);
    let personWithCars = {
        person: person,
        cars: []
    };

    for (let i = 0; i < persons.cars.length; i++) {
        if (person.id == persons.cars[i].personId) {
            personWithCars.cars.push(persons.cars[i]);
        }
    }
    return personWithCars;
};


