require("dotenv").config()

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
    res.json(posts.filter(posts.username === req.user.name))
})

app.post('/login',(req, res) =>{
    // Athonticate user

    const username =req.body.username
    const user ={name :username}

    const accessToken = jwt.sign(user,process.env.ACCESS_SECRET_SECRET)
    res.json({accessToken: accessToken})
})
 

function authenticateToken(req, res, next) {
    const authHeader = req.headers ['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return red.sendStatus(401)
     
    jwt.verify(token, process.env.ACCESS_SECRET_SECRET, (err, user) =>{
        if(err) return res.sendStatus(403)
        req.user =user
        next()
    })
}

app.listen(3000, () => console.log(`Server up and running`))