const mongoose = require('mongoose');
require('dotenv').config();
// code to take password from command argument
// Connect to MongoDB
const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(url);

// creating schema
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Contact = mongoose.model('Contact', contactSchema);

// // Display All saved Contacts if just 3args are passed
// if (process.argv.length === 3) {
//   Contact.find({}).then((result) => {
//     console.log("phonebook:");
//     result.forEach((contact) => {
//       console.log(contact.name, contact.number);
//     });
//     mongoose.connection.close();
//   });
// }

// Adding Contact according to the 5th and 6th arg
// if (process.argv.length === 5) {
//   const contact = new Contact({
//     name: process.argv[3],
//     number: process.argv[4],
//   });

//   contact.save().then((result) => {
//     console.log("contact saved:");
//     console.log(result.name, result.number);
//     mongoose.connection.close();
//   });
// }

// // adding data to the database
// // way of adding one by one
// const contact = new Contact({
//   name: "Arto Hellas",
//   number: "040-123456",
// });

// contact.save().then((result) => {
//   console.log("contact saved");
//   mongoose.connection.close();
// });

// // adding many at once
// const contacts = [
//   { name: "Arto Hellas", number: "040-123456" },
//   { name: "Ada Lovelace", number: "39-44-5323523" },
//   { name: "Dan Abramov", number: "12-43-234345" },
//   { name: "Mary Poppendieck", number: "39-23-6423122" },
// ];

// Contact.insertMany(contacts)
//   .then((result) => {
//     console.log("Contacts added:", result);
//   })
//   .catch((error) => {
//     console.error("Error adding contacts: ", error);
//   })
//   .finally(() => {
//     mongoose.connection.close();
//   });

Contact.find({ name: 'Test' }).then((contact) => {
  console.log(contact);
  mongoose.connection.close();
});
