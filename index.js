require('dotenv').config()
require('colors')

const { leerInput, inquirerMenu, pausa,listarLugares } = require("./helpers/inquirer")
const {Busquedas}                       = require('./models/busquedas')

const main = async()=>{
    let opcion ;
    let busquedas = new Busquedas()
    do{
        opcion = await inquirerMenu()
        switch (opcion) {
            case 1:
                // mostrat mensaje
                let input            = await leerInput()
                const ciudades       =await  busquedas.ciudad(input)
                const id = await listarLugares(ciudades);
                if(id == 0) continue
                const lugarSel       = ciudades.find(l=> l.id == id)

                
                busquedas.aggHistorial(lugarSel.nombre)
                const getClima       = await busquedas.Clima(lugarSel.lat,lugarSel.lng)

                // buscar lugar
                // selecciona un lugar de
                // clima
                // mostrar informacion del lugar
                console.log('\nInformacion de la ciudad \n')
                console.log(`Ciudad :${lugarSel.nombre.green}`)
                console.log(`Latitud :${lugarSel.lat.toString().red}`)
                console.log(`Longitud:${lugarSel.lng.toString().red}`)
                console.log(`Temperatura: ${getClima.temp.toString().red} grados centigrados`)
                console.log(`temperatura minima : ${getClima.min.toString().red}   grados centigrados`)
                console.log(`temperatura maxima : ${getClima.max.toString().red}   grados centigrados`)
                console.log(`humedad            : ${getClima.humedad.toString().red} %`)
                

                break;
                case 2:
            busquedas.historialCapitalizado.forEach((place,i)=>{
                const idx = `${i++}`.red;
                console.log(`${i} -- ${place}`)
            })
                    break
        
            default:
                break;
        }
        if(opcion != 0) {await pausa()}
        console.log(opcion)

    }while(opcion != 0)
}
main()