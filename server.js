const express = require('express')
const cors = require("cors");

const app = express()

app.use(cors());
app.use(express.json())

app.get('/calculator', async (req, res) => {
  const { query  } = req

  const operatorList = [
    { name: 'plus', operator: '+'},
    { name: 'minus', operator: '-'},
    { name: 'multiple', operator: '*'},
    { name: 'divide', operator: '/'}
  ]
  
  try {
    if (query.first_number && query.second_number && query.operator) {
      const operatorFromReq = operatorList.find((operator) => operator.name === query.operator)
      if (operatorFromReq) {
        const result = eval(query.first_number + operatorFromReq.operator + query.second_number)
        res.status(202).json({ result: result})
      } else {
        res.status(400).send({ message: 'Operator Not Found' })
      }
    } else {
      res.status(400).send({ message: 'Params Invalid'})
    }
  }catch (e) {
    res.status(400).send({ message: 'Bad Request' })
  }
})


app.listen(7000, () => {
  console.log('Start server at port 7000.')
})