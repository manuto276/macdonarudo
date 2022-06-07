const Person = require('../models/Person')

exports.createPerson = async function (req,res){
    let body = req.body
    let name = body.name
    let role = body.role
    let order_ids = []
    let username = body.username
    let password = body.password
    let bdate = Date(body.bdate)

    let person = new Person({
        name: name,
        role: role,
        order_ids: order_ids,
        _id: username,
        password: password,
        bdate: bdate
    })
 
    // save model to database
    await person.save(function (err, person) {
      if (err) return console.error(err);
      console.log(person.username + " saved.");
    });

    res.send('Ok')
  }

exports.getPersons = async function (req,res){
  let persons = await Person.find()
  res.send(persons)
}