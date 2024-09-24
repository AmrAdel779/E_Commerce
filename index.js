import express from 'express'
import { connection } from './DB/connection.js'
import { bootstrap } from './src/Modules/bootstrap.js'
import { globalError } from './src/Middleares/globalError.js'
import cors from "cors"
import 'dotenv/config'
const app = express()
app.use(express.json())
app.use(cors())
app.use('/uploads',express.static('uploads'))
const port = process.env.PORT || 3000;
bootstrap(app)
app.use('*', (req, res, next) => {
    next(new AppError(`route not found ${req.originalUrl}`, 404))
})
app.use(globalError)
app.listen(port, () => console.log(`Server is running in ${port}!`))