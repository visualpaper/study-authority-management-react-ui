import bodyParser from 'body-parser'
import express from 'express'
import { login, loginAdmin } from './data/login'
import { setting } from './data/setting'
import { users } from './data/users'

// node server.js
const app = express()

let errorState = {
  error: false,
  status: 500,
  response: {},
}

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

/**
 * エラー制御を割り込みさせる
 */
app.use((req: any, res: any, next: any) => {
  if (errorState.error && req.path !== '/uiDev/error') {
    res.status(errorState.status)
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(errorState.response))
    return
  } else {
    next()
  }
})

const BASE_URL = '/api' + '/v1'

let loggined = false

/* login */
app.post(BASE_URL + '/login', (req: any, res: any) => {
  res.status(200)
  res.setHeader('Content-Type', 'application/json')
  setTimeout(() => {
    loggined = true
    if (req.body.id == '99999999') {
      res.json(loginAdmin())
    } else {
      res.json(login())
    }
  }, 1000)
})

app.post(BASE_URL + '/loginWithCookie', (req: any, res: any) => {
  res.status(200)
  res.setHeader('Content-Type', 'application/json')
  setTimeout(() => {
    if (!loggined) {
      res.send({})
    } else {
      res.json(login())
    }
  }, 1000)
})

app.put(BASE_URL + '/setting', (req: any, res: any) => {
  res.status(200)
  res.setHeader('Content-Type', 'application/json')
  setTimeout(() => {
    res.json(setting())
  }, 1000)
})

/* users */
app.post(BASE_URL + '/users/regist', (req: any, res: any) => {
  res.status(204)
  res.setHeader('Content-Type', 'application/json')
  setTimeout(() => {
    res.send()
  }, 1000)
})

app.get(BASE_URL + '/users', (req: any, res: any) => {
  res.status(200)
  res.setHeader('Content-Type', 'application/json')
  setTimeout(() => {
    res.json(users())
  }, 1000)
})

app.get(BASE_URL + '/users/:id', (req: any, res: any) => {
  const user = users().users.find((v) => v.id == req.params.id)

  if (user) {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    setTimeout(() => {
      res.json(user)
    }, 1000)
  } else {
    res.status(404)
    res.setHeader('Content-Type', 'application/json')
    setTimeout(() => {
      res.send({})
    }, 1000)
  }
})

app.put(BASE_URL + '/users/:id', (req: any, res: any) => {
  res.status(204)
  res.setHeader('Content-Type', 'application/json')
  setTimeout(() => {
    res.send()
  }, 1000)
})

/*
```
  res = await fetch("/uiDev/error", {
    method: 'PUT',
    body: JSON.stringify({
    error:true,
    status:500,
    response :{}
  }),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  await res.json()
```
*/

app.put('/uiDev/error', (req: any, res: any) => {
  console.log(req.body)
  errorState = req.body
  res.setHeader('Content-Type', 'application/json')
  res.json(errorState)
})

app.listen(5000)
