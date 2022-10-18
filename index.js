require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts= [
    {
        username : 'Maylar',
        title : 'post 1'
    },
    {
        username : 'Alex',
        title : 'post 2'
    }
]



//route middleware
app.get('/posts', (req,res) =>{
    res.json(posts)
})

app.post('/login',(req, res) =>{
    // Athonticate user

    const username =req.body.username
    const user ={name :username}

    const accessToken = jwt.sign(user,process.env.ACCESS_SECRET_SECRET)
    res.json({accessToken:accessToken})
})

app.listen(3000, () => console.log(`Server up and running`))