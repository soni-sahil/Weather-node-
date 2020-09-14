const myFetch = async (location) =>{
    const response = await fetch(`/weather?address=${location}`)
    const jsondata = await response.json()
    if(jsondata.Error){
        msg1.textContent = (jsondata.Error)
    }
    else{
        msg1.textContent=(jsondata.Location)
        msg2.textContent=(jsondata.Forecast)
    }
} 

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('.message-1')
const msg2 = document.querySelector('.message-2')


weatherform.addEventListener('submit' ,(e)=>{
    e.preventDefault()

    msg1.textContent = 'Loading...'
    
    msg2.textContent = ''

    const location = search.value
    myFetch(location)
    console.log(location)
})