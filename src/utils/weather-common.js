const request = require('request');
const geoWeather = (lat,long,callback) => {
    const apiUrl = 'http://api.weatherstack.com/current?access_key=528692f6a2228c8b4487415fc224ec04&query='+lat+','+long+'';
    request({url:apiUrl,json:true},(error,response)=> {
        if(error){
            callback('unable to connect',undefined);
        }else if(response.body.error){
            callback('unable to find location',undefined);
        }else{
            callback(undefined,response.body.current.temperature);
        }
    })
}

module.exports = geoWeather;