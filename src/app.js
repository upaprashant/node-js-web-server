const path    = require('path') //node default to find path of directory
const express = require('express');
const hbs     = require('hbs'); //to use partial handlebars
const geoWeather = require('./utils/weather-common');
const app = express();
const pathDirectory     = path.join(__dirname,'../public');
const viewsDirectory    = path.join(__dirname,'../templates/views'); //this is used to load views folder 
const partialsDirectory = path.join(__dirname,'../templates/partials'); //this is used to load views folder 

app.set('view engine','hbs') //to load handlebar for views
app.set('views',viewsDirectory) //to load handlebar for views
hbs.registerPartials(partialsDirectory) //to load partials views
app.use(express.static(pathDirectory));
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        author:'Test'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Weather App',
        author:'Test Name'
    });
});

app.get('/help',(req,res)=>{
    res.render('about',{
        title:'About help App',
        author:'prashant'
    });
});

app.get('/help/*',(req,res)=>{
    res.render('page-not-found',{
        message:'Help Not found',
        title:'About help App',
        author:'prashant'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide address'
        })
    }
    geoWeather(37.8267,-122.4233,(error,data)=>{
        if(error !== undefined){
            return res.send({
               error : error 
            });
        }
        res.send({
            temp:'Current Temp is ' + data,
            address:req.query.address,
        });
    });
});

app.get('*',(req,res)=>{
    res.render('page-not-found',{
        message:'page Not found',
        title:'About help App',
        author:'prashant' 
    });
});

app.listen(3000,()=>{
    console.log('server started')
});