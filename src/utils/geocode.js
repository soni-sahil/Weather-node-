const got = require('got')

const geocode = async (address , getdata) =>{
    const mapurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`+encodeURIComponent(address)+`.json?access_token=pk.eyJ1Ijoic29uaXNhaGlsNjgwIiwiYSI6ImNrZXpvZDNqOTBneXgyeG8wcnpobWUzeGYifQ.PdmZYnfac71CaIDA7368EQ&limit=1&language=en`
    try{
        const response = await got(mapurl , {responseType: 'json'})
        if(response.body.features.length === 0){
            getdata('Unable to find location')
        }
        else{
            getdata({
                latitude: response.body.features[0].center[1] ,
                longitude: response.body.features[0].center[0] ,
                location: response.body.features[0].place_name_en
            })
        }
    }
    catch(err){
        if(err.code == "ENOTFOUND"){
            getdata("Check your Internet connection")
        }
    }
}

// const mapurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/LosAngeles.json?access_token=pk.eyJ1Ijoic29uaXNhaGlsNjgwIiwiYSI6ImNrZXpvZDNqOTBneXgyeG8wcnpobWUzeGYifQ.PdmZYnfac71CaIDA7368EQ&limit=1'

// got(mapurl , {responseType: 'json'})
//     .then(res =>{
//         if(res.body.features.length === 0){
//             console.log("Unable to find location")
//         }
//         else{
//             const lat = res.body.features[0].center[1]
//             const long = res.body.features[0].center[0]
//             console.log(lat , long)
//         }
//     })
//     .catch(err =>{
//         console.log(err)
//     })


module.exports = geocode