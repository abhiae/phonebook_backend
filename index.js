const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
require("dotenv").config();
const Contact = require("./models/contact");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
//creating token to log post request data
morgan.token("post-data", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : null;
});
// tiny config + custom post-data token
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data"
  )
);

app.get("/api/persons", (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts);
  });
});
app.get("/api/persons/:id", (request, response) => {
  Contact.findById(request.params.id).then((contact) => {
    response.json(contact);
  });
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${Contact.length} people</p> <p>${date}</p>` // this way of length doesn't work need to check on internet
  );
});

const nameExists = (searchname) => {
  Contact.findOne({ name: searchname }).then((person) => {
    console.log(person.name);
    console.log("search name:", searchname);
    const boolValue = person.name === searchname;
    console.log("bool:", boolValue);
    return boolValue;
  });
};
app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: "either name or number missing" });
  }
  if (nameExists(body.name)) {
    return response
      .status(400)
      .json({ error: "this name already exists, name must be unique" });
  }
  const person = new Contact({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = String(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});
