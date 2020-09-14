const got = require('got')

const forecast = async (lat , long , data) =>{
    try{
        const url = `http://api.weatherapi.com/v1/current.json?key=8687e5f432fe460691982459200409&q=${lat},${long}`
        const response = await got(url , { responseType: 'json' })
        data(response.body.current.condition.text + ". It is currently " + response.body.current.temp_c + " degree out. There is " + response.body.current.precip_in + " % chances of rain.")
        //console.log(response.body.current.condition.text + ". It is currently " + response.body.current.temp_c + " degree out. There is " + response.body.current.precip_in + " % chances of rain.")
    }
    catch(err){
        if(err.code == "ENOTFOUND"){
            data("Check your Internet connection")
        }
        else
        data('No matching location found.')
    }
}

// https://api.openweathermap.org/data/2.5/onecall?lat=29.1292&lon=75.7217&appid=53a919a42441838c3729ce4b35481395&units=metric
//const url = "http://api.weatherapi.com/v1/current.json?key=8687e5f432fe460691982459200409&q=29.1292,75.7217"

// request({url:url} , (err , res) => {
//     console.log(JSON.parse(res.body))
// })

// got(url , { responseType: 'json' }).then(res =>{
//     console.log(res.body.current.condition.text + ". It is currently " + res.body.current.temp_c + " degree out. There is " + res.body.current.precip_in + " % chances of rain.")
// }).catch(err =>{
//     console.log(err)
// })

module.exports = forecast