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
    Escenario 1: Obtener métricas de repositorios por tribu:
        Dado: que envío el identificador de una tribu
        Cuando: consumo el servicio para obtener los repositorios
        Entonces me retornará el detalle de las métricas de los repositorios creados este año
        Y que se encuentren habilitados (state: ENABLE)
        Y que su cobertura sea superior a 75%

        http://localhost:3001/idtribu/?metric=2

    --------------------------------------------------------------------------------------------
    Escenario 2: Tribu inexistente.
        Dado que envío el identificador de una tribu
        Cuando consumo el servicio para obtener los repositorios y la tribu no existe
        Entonces me retornará el siguiente error: 'La Tribu no se encuentra registrada
        
        GET http://localhost:3001/idtribu/?metric=4

    --------------------------------------------------------------------------------------------
    Escenario 3: Información de verificación.
        Dado que envío el identificador de una tribu
        Cuando consumo el servicio para obtener los repositorios
        Y obtengo el estado de verificación de los repositorios desde API Simulada (mock)
        Entonces me retornará una etiqueta en la respuesta indicando un texto en lenguaje natural del 
        estado de verificación actual de cada repositorio

        -no entendi muy bien lo hice de acuerdo a como lo entendi

    --------------------------------------------------------------------------------------------
    Escenario 4: Tribu no tiene repositorios que cumplan con la cobertura.
        Dado que envío el identificador de una tribu
        Cuando consumo el servicio para obtener los repositorios
        Y la tribu no tiene repositorios que cumplan con el 75% de cobertura
        Entonces me retornará el siguiente error: 'La Tribu no tiene repositorios que cumplan con la 
        cobertura necesaria'

        GET http://localhost:3001/idtribu/?metric=2 
        
--------------------------------------------------------------------------------------------
EJERCICIO 4
    Escenario 1: Generar reporte
        Dado que envío el identificador de una tribu
        Cuando consumo el servicio para generar el reporte de métricas de repositorios
        Entonces me retornará un archivo .csv con el detalle de la consulta elaborada en el ejercicio 
        número 3, donde cada atributo se representa como una columna.

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