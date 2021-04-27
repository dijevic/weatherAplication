
let   fs    = require('fs')
const axios = require('axios')
require('colors')


class Busquedas {

    historial = []
    path = `./db/database.json`
    constructor(){
        this.cargarDB()
    }
    get paramsMapBox(){
        return {
            'limit':5,
            'laguage':'es',
            'access_token' :process.env.MAPBOX_KEY

        }
    }
    get paramsWeather(){
        return {
            
            'lang':'es',
            'appid' :process.env.OPENWEATHER_KEY,
            'units' : 'metric',

        }
    }
    get historialCapitalizado(){

       return  this.historial.map(place=>{
            let palabras = place.split()
            let palCapitalizadas = palabras.map(pal => pal[0].toUpperCase().red + pal.substring(1))

            return palCapitalizadas.join(' ')
        })
    }
    

    async ciudad(lugar =''){
        

           try{
               const instace = axios.create({
                   baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
                   params: this.paramsMapBox
                       
                   
               })
               const resp = await instace.get()
               
               return resp.data.features.map(lugar=>({
                   id:lugar.id,
                   nombre:lugar.place_name,
                   lng   : lugar.center[0],
                   lat   : lugar.center[1]
               }))

           }catch(err){
               return []

           }

    }

    async Clima(lat,long){

        try{
            const instace = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}`,
                params: this.paramsWeather
                    
                
            })
            const resp = await instace.get()

             return {
                descripcion : resp.data.weather[3],
                max         : resp.data.main.temp_min,
                min         : resp.data.main.temp_max,
                temp        : resp.data.main.temp,
                humedad     : resp.data.main.humidity,

             }

            


        }catch(err){
            console.log(err)

        }
        
    }

    aggHistorial(lugar){

        if(this.historial.includes(lugar)){
            return
        }
        this.historial = this.historial.splice(0,5)
        this.historial.unshift(lugar)
        this.guardarDB()
    }

     async guardarDB(){
        const payload = {
            historial : this.historial
        }

        fs.writeFileSync(this.path,JSON.stringify(payload).toLocaleLowerCase())
    }

    async cargarDB(){

        if(!fs.readFileSync(this.path)) return
       const info = fs.readFileSync(this.path,{encoding: 'utf8'})
        let data = JSON.parse(info)
        this.historial = data.historial
    }
}

module.exports = {
    Busquedas
}