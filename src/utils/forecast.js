const request=require('request')
const forecast=(lat,long,callback)=>{
    const url='https://api.darksky.net/forecast/8102aef69b262b65a0a7c83610927f24/'+lat+','+long+'?units=si'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connet to the app',undefined)
        }else if(body.code===400){
            callback('unable to find the forecast',undefined)
    
        }
        else{
    callback(undefined,body.daily.data[0].summary+ ' It is currently '+body.currently.temperature+' degress out. There is '+body.currently.precipProbability+'% chance of rain')
    }})
}

module.exports=forecast


