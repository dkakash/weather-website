const path=require('path')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const hbs=require('hbs')
const express=require('express')
const app=express()

const publicdir=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)



app.use(express.static(publicdir))
app.listen(3000,()=>{
    console.log("server running")
})
// app.get('/help',(req,res)=>{
// res.send([{name:'akash'},{name:'mani'}])
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page</h1>')
// })
app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'AKASH'
    })
})
app.get('/about',(req,res)=>{
res.render('about',{
    title:"About",
    name:"AKASH"
})


})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'AKASH',
        msg:'Contact me for any help'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:"No address Provided. Please Provide an address"})
    }
    geocode(req.query.address,(error,{lat,long,location}={})=>{
        if (error){
            return res.send({error:error})
        }else{
            
            forecast(lat,long,(error,forecastdata)=>{
                if (error){
                    return res.send(error)
                }else{
                    res.send({forecast:forecastdata,location:location,address:req.query.address})
                   
                }
            })
            
        }
        
       
    })
        
})


// app.get('/help/*',(req,res)=>{
//     res.send('help not found')
// })

// app.get('/*',(req,res)=>{
//     res.send('404 page')
// })


app.get('/help/*',(req,res)=>{
res.render('error',{
    title:'404 help',
    name:"AKASh",
    msg:'Help article not found'
})
})

app.get('*',(req,res)=>{
    res.render('error',{
    title:'404',
    msg:'page not found',
    name:'AKASH'
    }
    )
})

