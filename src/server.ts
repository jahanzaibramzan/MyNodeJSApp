import express, { Express } from 'express'

import { initRoutes } from './api/routes'

const app: Express = express()
const port = process.env.PORT ?? 3000

// middlewares
app.use(express.json()) // pasre json bodies in the request

// initialize all routes
initRoutes(app)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
