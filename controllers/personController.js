const Person = require('../models/Person')

exports.createPerson = async function (req,res){
    let body = req.body
    let name = body.name
    let role = body.role
    let order_ids = []
    let username = body.username
    let password = body.password
    let bdate = Date(body.bdate)

    if(username === undefined || password === undefined || name === undefined || role === undefined
      || bdate === undefined || name === undefined){
        res.send('invalid_fields_error');
        return;
      }

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
      if (err)
      res.send('user_exists_error');
      res.send(`Saved ${username}`);
    });

    
  }

exports.getPersons = async function (req,res){
  let persons = await Person.find();
  res.send(persons);
}

exports.deleteAllPersons = async function (req,res){
  await Person.deleteMany();
  res.send('Ok');
}

exports.delete = async function (req,res){
  let username = req.params.username;
  await Person.deleteOne({_id: username});
  res.send(`Deleted ${username}`);
}