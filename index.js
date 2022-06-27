const express = require('express')
const app = express()
const port = 3333

app.use(express.urlencoded({ extended: false }))

app.get('/',(req,res)=>{
    return res.json({
        success: true,
        message: `backend is running`
    })
})

app.use('/',require(`./src/routes`))

app.use(`*`,(req, res)=>{
    return res.status(404).json({
        success: false,
        message: `Not Found`
    })
})

app.listen(port,()=>{
    console.log(`App running in port ${port}`);
})