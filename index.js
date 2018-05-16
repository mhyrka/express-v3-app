const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const data = require('./data.json')
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({ data })
})

function filterById(data, id) {
  return data.filter(instructor => {
    return instructor.ID == id
  })
}

app.get('/:id', (req, res, next) => {
  let result = filterById(data, req.params.id)

  if (!result[0]) {
    res.status(404).json({
      error: {
        message: 'No Record! Try another ID'
      }
    })
  } else {res.json({ data: result[0] })}
})



app.listen(port, () => console.log('working'))
