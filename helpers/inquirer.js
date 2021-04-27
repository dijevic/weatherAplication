let inquirer = require('inquirer')
require('colors')
let menuOpt = [
    {
        type: 'list',
        name: 'option',
        message : 'que desea hacer?',
        choices: [
            {
            value:1,
            name:`${'1'.red}. buscar ciudad`
             },
            {
            value:2,
            name:`${'2'.red}. historial`
             },
            {
            value:0,
            name:`${'0'.red}. salir`
             }
    ]
    }
]

let inputPausa =[
    {
        name:'input',
        message: `presione ${'enter'.red} para continuar`,
        name:'enter'
    }
]

const inquirerMenu = async()=>{
    console.clear()
    console.log('===================='.green)
    console.log('--ESCOJA UNA OPCION--'.red)
    console.log('====================\n'.green)

    let {option} = await inquirer.prompt(menuOpt)
    return option
}
const pausa = async()=>{

        console.log('\n')
        console.log('\n')
    return await inquirer.prompt(inputPausa)

}
const leerInput =async(message)=>{
 const question =
  [
    {  
        name:'desc',
        message,
        type:'input',
        validate(value){
            if(value.length === 0){
                return ' por favor ingrese una tarea'
            }else{
                return  true
            }
        }
  }
 ]
    const {desc} = await inquirer.prompt(question)
    return desc
}





const listarLugares = async(lugares)=>{

    let i = 0;
    const choices = lugares.map(lugar=>{
        i++
        return {
            name:  ` ${i.toString().green}.--  ${lugar.nombre}`,
            value : lugar.id
        }
    })

    choices.unshift({
        name:'0. CANCELAR'.red,
        value:0
    })
    const preguntas = [
        {
            type: 'list',
            name : 'id',
            message : 'escoja un lugar mas exacto',
            choices
        }

    ];

    let {id} = await inquirer.prompt(preguntas)
    return id
    




}

const confirmarBorrar = async(mensaje)=>{

        const pregunta = [
            {
                type: 'confirm',
                name:'ok',
                message:mensaje
            }
        ]
    let {ok} = await inquirer.prompt(pregunta)
    return ok

}
const mostrarListadoChoices = async(tareas)=>{

    let i = 0;
    const choices = tareas.map(tarea=>{
        i++
        return {
            name:  ` ${i.toString().green}.--  ${tarea.description}`,
            value : tarea.id,
            checked : (tarea.completadoEn) ? true : false
        }
    })

    choices.unshift({
        name:'0. CANCELAR'.red,
        value:0
    })
    const preguntas = [
        {
            type: 'checkbox',
            name : 'ids',
            message : 'selecciones',
            choices
        }

    ];

    let {ids} = await inquirer.prompt(preguntas)
    return ids
    




}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    confirmarBorrar,
    mostrarListadoChoices,
    listarLugares
   
}