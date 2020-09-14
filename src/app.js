const express = require('express')

const path  = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

const publicDir = path.join(__dirname , '../public')
const viewDir = path.join(__dirname , '/templates/views')
const partialsDir = path.join(__dirname , '/templates/partials')

app.set('view engine', 'hbs')
app.set('views' , viewDir)
hbs.registerPartials(partialsDir)

app.use(express.static(publicDir))

app.get('' , (req , res) =>{
    res.render('index' , {
        title : 'Weather App',
    })
})

app.get('/weather' , (req , res) =>{
    if(!req.query.address){
        return res.send({
            error:'Please provide the address'
        })
    }

    geocode(req.query.address , (data) =>{
        forecast(data.latitude , data.longitude ,forecastData =>{
            if(data.location){
                res.send({
                    Address: req.query.address ,
                    Location :data.location ,
                    Forecast : forecastData
                })
            }
            else if(data === forecastData){
                res.send({
                    Error: data
                })
            }
            else{
                res.send({
                    Error: forecastData
                }) 
            }
        })
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
        title: "404"
    })
})

app.listen(port , ()=> console.log('server on 3000'))