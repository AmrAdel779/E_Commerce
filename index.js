import express from 'express'
import { connection } from './DB/connection.js'
import { bootstrap } from './src/Modules/bootstrap.js'
import { globalError } from './src/Middleares/globalError.js'
import cors from "cors"
import { Stripe } from "stripe"

import 'dotenv/config'
import { catchError } from './src/Middleares/catchError.js'
const app = express()
connection()
const stripe = new Stripe('sk_test_51Q2FAwHUoDGvuisU3Xl1ylvoAR8EnHRyeb8zxwXjyyBSzT6gHRSgzU2kxIQkfzOtB2Opc9mkSLYWpdQ2wvN7LOKf00TaIkk9h9');


app.post('/api/webhook', express.raw({ type: 'application/json' }), catchError((req, res) => {

    const signature = req.headers['stripe-signature'].toString();

    let event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        " whsec_eeF5BzGXHR1FcrrKQeKEW4goc7b9EDh0"
    )
    let checkout

    if (event.type == "checkout.session.completed") {
        checkout = event.data.object
    }

    res.json({ message: "success", checkout })

}

)
)





app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))
const port = process.env.PORT || 3000;
bootstrap(app)
app.use('*', (req, res, next) => {
    next(new AppError(`route not found ${req.originalUrl}`, 404))
})
app.use(globalError)
app.listen(port, () => console.log(`Server is running in ${port}!`))