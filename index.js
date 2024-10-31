const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());

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
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});
app.get("/api/persons/:id", (request, response) => {
  const id = String(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`
  );
});
const generateid = () => {
  return Math.round(Math.random() * 10000);
};
const nameExists = (name) => {
  return persons.some((person) => person.name === name);
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
  const person = {
    id: String(generateid()),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  response.json(persons);
});
app.delete("/api/persons/:id", (request, response) => {
  const id = String(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});
