-----------------------------------------------------------------------------------------------------------------------
Para iniciar el proyecto se ejecuta el siguiente comando: npm run dev                                           
-----------------------------------------------------------------------------------------------------------------------
Para ejecutar la pruebas unitarias se ejecuta el siguiente comando: npm test test.js previamente ejecutado el proyecto
en algunos text se pone una x delante para que no los ejecute ejemplo:  xit('Modificar organizacion', done => {
-----------------------------------------------------------------------------------------------------------------------
en la carpeta src/ el archivo index.ts se puede forzar a reiniciar la base de datos
        app.listen(3001,() =>{
            console.log("server on port 3001")
            db.sync({force:false});                   //pones la variable force:true
        })
------------------------------------------------------------------------------------------------------------------------
El archivo que se crea en el punto 4 se llama tribu.csv
------------------------------------------------------------------------------------------------------------------------

SIMULACION PUNTO 1 MOCK
     GET - http://localhost:3001/simulacion    
        {
        "repositories": [
        {"id": 1,
        "state": 604},
        {"id": 2,
        "state": 605},
        {"id": 3,
        "state": 606} ]}

OBTENER LAS ORGANIZACIONES
    GET - http://localhost:3001/

CREAR ORGANIZACION 
    POST - http://localhost:3001/create
        por body 
        {
        "name":"prueba",
        "status": "1"
        }
ACTUALIZAR ORGANIZACION
    UPDATE - http://localhost:3001/update
        {
        "updateName":"prueba10",    //nombre de organizacion a a ctualizar
        "name":"prueba11"           //nuevo nombre 
        "status":"1"                //nuevo status
        }
                 
ELIMINAR ORGANIZACION
    DELETE - http://localhost:3001/delete/?name=prueba
        Por Query:
        name = nombre de la organizacion    

--------------------------------------------------------------------------------------------
Las busquedad son con el id de la tribu
EJERCICIO 3
    Escenario 1: Obtener m??tricas de repositorios por tribu:
        Dado: que env??o el identificador de una tribu
        Cuando: consumo el servicio para obtener los repositorios
        Entonces me retornar?? el detalle de las m??tricas de los repositorios creados este a??o
        Y que se encuentren habilitados (state: ENABLE)
        Y que su cobertura sea superior a 75%

        http://localhost:3001/idtribu/?metric=2

    --------------------------------------------------------------------------------------------
    Escenario 2: Tribu inexistente.
        Dado que env??o el identificador de una tribu
        Cuando consumo el servicio para obtener los repositorios y la tribu no existe
        Entonces me retornar?? el siguiente error: 'La Tribu no se encuentra registrada
        
        GET http://localhost:3001/idtribu/?metric=4

    --------------------------------------------------------------------------------------------
    Escenario 3: Informaci??n de verificaci??n.
        Dado que env??o el identificador de una tribu
        Cuando consumo el servicio para obtener los repositorios
        Y obtengo el estado de verificaci??n de los repositorios desde API Simulada (mock)
        Entonces me retornar?? una etiqueta en la respuesta indicando un texto en lenguaje natural del 
        estado de verificaci??n actual de cada repositorio

        -no entendi muy bien lo hice de acuerdo a como lo entendi

    --------------------------------------------------------------------------------------------
    Escenario 4: Tribu no tiene repositorios que cumplan con la cobertura.
        Dado que env??o el identificador de una tribu
        Cuando consumo el servicio para obtener los repositorios
        Y la tribu no tiene repositorios que cumplan con el 75% de cobertura
        Entonces me retornar?? el siguiente error: 'La Tribu no tiene repositorios que cumplan con la 
        cobertura necesaria'

        GET http://localhost:3001/idtribu/?metric=2 
        
--------------------------------------------------------------------------------------------
EJERCICIO 4
    Escenario 1: Generar reporte
        Dado que env??o el identificador de una tribu
        Cuando consumo el servicio para generar el reporte de m??tricas de repositorios
        Entonces me retornar?? un archivo .csv con el detalle de la consulta elaborada en el ejercicio 
        n??mero 3, donde cada atributo se representa como una columna.

        GET http://localhost:3001/archivocsv/2
--------------------------------------------------------------------------------------------

--------------------------------------------------------------------------------------------
Con esta ruta se puede crear unos ejemplos 
        GET http://localhost:3001/createall
        body
        { 
            "nameOr": "Banco Pichincha",
            "nameTr": "Centro Digital",
            "nameRe": "cd-common-text",
            "state":"E",
            "statusOr":"1",
            "statusTr": "1",
            "statusRe":"I",
            "create_time":"2022",
            "coverage":"80",
            "bugs":"0",
            "vulnerabilities":"2",
            "code_smells":"0",
            "hostpots":"0"
            
        }