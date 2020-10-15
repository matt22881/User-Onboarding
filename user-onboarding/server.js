const express = require('express')
const uuid = require('uuid').v4
const cors = require('cors')
const app = express()

const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

const users = [
  {
    id: uuid(),
    username: 'Matt',
    email: 'matt@matt.me',
    language: 'blow',
    password: '1234',
    tos: true
  },
]

app.get('/users/:id', (req, res) => {
  const user = users.find(fr => fr.id === req.params.id)
  if (!user) {
    res.status(404).json({ message: 'No such user!' })
  }
  else {
    res.json(user)
  }
})

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', (req, res) => {
  const { name, email, language, password, tos } = req.body
  const requiredFields = { name, email, language, password, tos }

  if (Object.values(requiredFields).some(field => (!field || !field.trim()))) {
    res.status(400).json({ message: 'Some required fields are missing or invalid.' })
  }
  else if (req.body.hobbies && !Array.isArray(req.body.hobbies)) {
    res.status(400).json({ message: 'The optional `hobbies` field must be an array.' })
  }
  else {
    const newUser = { id: uuid(), ...req.body }
    users.push(newUser)
    res.status(200).json(newUser)
  }
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
