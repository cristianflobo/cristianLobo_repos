const request = require('supertest');
const axios = require('axios')
const fs = require("fs");

let baseUrl = 'http://localhost:3001/';
let idTribu_noCumple = 5555
let idTribu_cumplaParametros = 55555 

describe('Ejercicio 1: Servicio simulado (Mock)', () => {
	it('trae informacion Mock', async () => {
		const response = await request(baseUrl)
			.get('simulacion ');
		expect(response.body).toEqual( {"repositories": [{ id: 1, state: 604 },{ id: 2, state: 605 },{ id: 3, state: 606 }]});
	});
})

describe('Ejercicio 2: Administración de organizaciones', () => {
	it('organizacion creada', done => {
		const data = {
			name:"banco Lobo",
			status:2,
		}
		request(baseUrl)
		.post("create")
		.send(data)
		.expect(200,done)
	});
	it('Traer organizacion', async() => {
		const data = {
			name:"banco Lobo",
			status:2,
		}
		request(baseUrl).get("")
		const organizacion = await axios.get(baseUrl)
		expect(organizacion.data[0].status).toBe("2");
	});
	it('Modificar organizacion', done => {
		const data = {
			updateName:"banco Lobo",
			name:"prueba11",        
			status:"2" ,            		
		}
		request(baseUrl)
		.put("update")
		.send(data)
		.expect(200,done)
	});

	it("Borrar organizacion", async() =>{
		const result = await request(baseUrl).delete("delete/?name=prueba11")
		expect(result.body.status).toBe("2");
		
	})
})
describe('Ejercicio 3: Servicio para obtener las métricas de un repositorio', () => {
	it('La tribu no se encuentra registrada', async () => {
		const response = await request(baseUrl)
			.get('idtribu/?metric=1000');
		expect(response.text).toEqual( "La Tribu no se encuentra registrada");
	});
  it('se espera una tribu que no cumpla mas del 75% cobertura', async () => {
		const response = await request(baseUrl)
			.get(`idtribu/?metric=${idTribu_noCumple}`);
		expect(response.text).toEqual( "La Tribu no tiene repositorios que cumplan con la cobertura necesaria");
	});
})
describe('Ejercicio 4: Generar reporte CSV métricas repositorio', () => {
	it('verifica si el archivo existe si localmente, ingresar en la variable id trubu que cumpla parametros ', async () => {
		const response = await request(baseUrl)
			.get(`idtribu/?metric=${idTribu_cumplaParametros}`);
      const path = "./tribu.csv";
      let confirmacion = ""
      try {
        if (fs.existsSync(path)) {
          confirmacion = "exists"
          }
        } catch(err) {
        console.error(err)
        }
      expect(confirmacion).toEqual("exists");
	});
})
