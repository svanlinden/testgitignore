'use strict';
const fs = require("fs");
const persons = require("../../persons.json");

function findById(id){
    console.log('Calling findById');
  for (let i=0; i<persons.persons.length; i++){
      if(id == persons.persons[i].id){
          return persons.persons[i];
      }
  }
}


module.exports = findById;