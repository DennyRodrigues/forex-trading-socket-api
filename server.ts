import { config } from 'dotenv'
config()
import express from 'express'
import cors from 'cors'
import { startWebScocketServer } from './socket/webSocketServer'
import { createServer } from 'http'

const app = express()
app.use(cors())
const server = createServer(app)
startWebScocketServer(server)
