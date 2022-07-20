const request = require('supertest');
const axios = require('axios')

const baseUrl = 'http://localhost:3001/';


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
		console.log(result.body)
		expect(result.body.status).toBe("2");
		
	})
})

// describe('Obtener organizaciones', () => {

// })

// it("Borrar organizacion", done =>{
// 	request(baseUrl)
// 	.delete("delete/?name=banco Lobo")
//     .expect(200,done) 
	
// })
  
// describe('Probar endpoint mock', () => {
// 	it('should return a 200 status code', async () => {
// 		const response = await request(baseUrl)
// 			.get('simulacion ');

// 		expect(response.statusCode).toBe(200);
// 	});
// })


// it("crear organizacion", async(done) =>{
	
//     const data = {
//       name:"banco Lobo",
//       status:2,
//     }
// 	const status = "2"
// 	const result = await request(baseUrl).post("create")
//     .send(data)
// 	//console.log(result.body.name)
// 	//const pru = JSON.parse(result.text).name
//      expect(result.body.status).toEqual(status);
//   })

//   it("crear organizacion", done =>{
//     const data = {
//       name:"banco Lobo",
//       status:2,
//     }
//     request(baseUrl)
//     .post("create")
//     .send(data)
//     .expect(200,done)
//   })
 
// it("Traer organizaciones",done =>{
// 	//let dataOrganizacion = await axios.get("http://localhost:3001/")
// 	request(baseUrl)
// 	.get("")
// 	.set('Accept','application/json')
//     .expect('Content-Type',/json/)
//     .expect(200,done)
//    // .expect(dataOrganizacion.data)
	
// })
// it("Borrar organizacion", done =>{
// 	request(baseUrl)
// 	.delete("delete/?name=banco Lobo")
//     .expect(200,done)
//     .expect('{"id_organizacion": "780561785000624130","name": "banco Lobo                                        ","status": "2"}')
	
// })
  

describe('crear organizacion', () => {
	it('should return a 200 status code', async () => {
		const response = await request(baseUrl)
			.get('simulacion ');

		expect(response.statusCode).toBe(200);
	});
})


/* eslint-disable import/no-extraneous-dependencies 
const { expect } = require('chai');

const request = require('supertest');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
 
    id:"ARG",
    name:"argentina",
    imagen:"url",
    continente:"americas",
    capital:"cordoba",
    subregion:"sur america",
    area: 5000,
    poblacion:10000,
    tours:[{name:"comer"}]
  }

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
  it("validacion busqueda por id del pais", done =>{
    request(agent)
    agent.get("/countries/ARG")
    .set('Accept','application/json')
    .expect('Content-Type',/json/)
    .expect(200,done)
    .expect('{"id":"ARG","name":"argentina","imagen":"url","continente":"americas","capital":"cordoba","subregion":"sur america","area":5000,"poblacion":10000}')
  })
  it("validacion busqueda por nombre", done =>{
    request(agent)
    agent.get("/countries?name=argentina")
    .set('Accept','application/json')
    .expect('Content-Type',/json/)
    .expect(200,done)
    .expect('[{"id":"ARG","name":"argentina","imagen":"url","continente":"americas","capital":"cordoba","subregion":"sur america","area":5000,"poblacion":10000,"tours":[]}]')
  })
  it("validacion crear tour", done =>{
    const data = {
      name:"comer",
      dificultad:4,
      duracion:2,
      pais:"argentina",
      temporada:"verano"
    }
    request(agent)
    agent.post("/tour")
    .send(data)
    .expect(200,done)
  })


});
*/
