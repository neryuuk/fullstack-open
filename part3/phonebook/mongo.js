const mongoose = require('mongoose')
const database = 'phonebook'

const argsCount = process.argv.length
if (argsCount !== 3 && argsCount !== 5) {
  console.log(
    '\nMissing arguments. Usage is as follows:',
    '\n> node mongo.js PASSWORD ## To list all entries',
    '\n> node mongo.js PASSWORD "NAME" "NUMBER" ## To add a new entry'
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

mongoose.set('strictQuery', false)
mongoose.connect(`mongodb+srv://fullstack:${password}@fullstack-open.lgzchww.mongodb.net/${database}?retryWrites=true&w=majority`)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', phoneSchema)

if (argsCount === 3) {
  return Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => { console.log(person.name, person.number) })
    mongoose.connection.close()
  })
}

const entry = new Person({ name, number })
entry.save().then(_ => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})
