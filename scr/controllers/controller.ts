
const {organizacion,metrics,tribu,repositorio} = require('../db')
const ObjectsToCsv = require('objects-to-csv')
const axios = require('axios')

interface dataObjeto{
	id:number,
  name:string,
  tribe:string,
  organization:string,
  coverage:number,
  codeSmells:number,
  bugs:number,
  vulnerabilities:number,
  hotspots:number,
  verificationState:string,
  state:string,
}

const Create = async (req:any, res:any) => {
  const {name,status} = req.body
  try{
      const createOr= await organizacion.create({
          name,
          status,
      });
          res.send(createOr)

  } catch (error) {
        console.log(error)
  }      
  res.end()     
}

const Delete = async (req:any, res:any) => {
    const {name} = req.query;
    try {
      const deleteOr = await organizacion.findOne({
        where: { name: name },
      });
      if (deleteOr) {
        await deleteOr.destroy(); // deletes the row
      }
      res.send(deleteOr)
    } catch (error) {
       console.log(error)
    }
    res.end()
  };

const Get = async (_req:any, res:any) => {
    try {
      let todos = await organizacion.findAll()
      res.send(todos)
    } catch (error) {
       console.log(error)
    }
  };
  const Simulacion = async (_req:any, res:any) => {
    const simulacion = { repositories: [
      {"id": 1,"state": 604},
      {"id": 2,"state": 605},
      {"id": 3,"state": 606}
    ]}
      res.send(simulacion)
  };

const Update = async (req:any, res:any) => {
    const {updateName,name,status} = req.body
    console.log(updateName,name,status)
    if (name){
      try {
        const updateOr = await organizacion.findOne({
          where: { name: updateName },
        });
       const update = await organizacion.update({ name: name? name : updateOr.name , status: status? status : updateOr.status  }, {
          where: {
            name: updateName
          }
        });
        res.send(update)
      } catch (error) {
        console.log(error)
      }
    }
    res.end()
  };

  const IdTribu = async (req:any, res:any) => {
    const id:string = req.query.metric;
    let objetoStateMock:any = {
          604:"verificado",
          605:"En espera",
          606:"aprobado",
        }
    console.log(id)
    const findIdTribu = await tribu.findOne({
      where: { id_tribe: id },
    });
    if (findIdTribu === null) {                                
      return res.send("La Tribu no se encuentra registrada")
    } 
    const cobertura = await repositorio.findAll({
      where: {id_tribe: parseInt(id) },
    });
    let valitCover = false
    if(cobertura){
      await Promise.all( cobertura.map(async(item:any)=>{
        const metric = await metrics.findOne({
          where: {id_repository: item.id_repository },
        });
        if (metric.dataValues.coverage > 75) {
          valitCover = true  
        }
      }))
      if (!valitCover) {
        return res.send( "La Tribu no tiene repositorios que cumplan con la cobertura necesaria")
      }
    }
    let currentTime = new Date();
    let currentYear = currentTime.getFullYear()
    let dataResult:object[] = []
    let dataObjeto:dataObjeto = {
      id:0,
      name:"",
      tribe:"",
      organization:"",
      coverage:0,
      codeSmells:0,
      bugs:0,
      vulnerabilities:0,
      hotspots:0,
      verificationState:"",
      state:""
    }
    try {
      const findCoverage = await repositorio.findAll({
        where: { id_tribe: id },
        include:metrics
      });
      await Promise.all( findCoverage.map(async(item:any)=>{
        const stateItem:any =  {E:"Enable",D:"Disable",A:"Archive",}
        let year = item.create_time
        let yearInt = parseInt(JSON.stringify(year).slice(1,5))
        let state = item.state
        let verificationState = ""
        if (yearInt === currentYear && state === "E" && item.dataValues.metric.dataValues.coverage > 75 ) {
          const findTribu = await tribu.findOne({
            where: { id_tribe: item.dataValues.id_tribe },
          });
          const findOrganization = await organizacion.findOne({
            where: { id_organizacion: findTribu.dataValues.id_organization },
          });
          const mock = await axios.get("http://localhost:3001/simulacion") 
          mock.data.repositories.map((element:any)=>{
            if (element.id === item.dataValues.id_repository) {
              verificationState = objetoStateMock[element.state]
            }
          })
          dataObjeto.id =  item.dataValues.id_repository
          dataObjeto.name = item.dataValues.name.replace(/ /g, "")
          dataObjeto.tribe = findTribu.dataValues.name.replace(/ /g, "")
          dataObjeto.organization = findOrganization.dataValues.name.replace(/ /g, "")
          dataObjeto.coverage = item.dataValues.metric.dataValues.coverage
          dataObjeto.codeSmells = item.dataValues.metric.dataValues.code_smells
          dataObjeto.bugs = item.dataValues.metric.dataValues.bugs
          dataObjeto.vulnerabilities = item.dataValues.metric.dataValues.vulnerabilities
          dataObjeto.hotspots = item.dataValues.metric.dataValues.hostpot
          dataObjeto.verificationState = verificationState
          dataObjeto.state = stateItem[item.dataValues.state]
          dataResult.push(dataObjeto)
        }   
      }))
      res.send(dataResult)
      res.end()
    } catch (error) {
      console.log(error)
    }
  

   res.end()
  };

  const Archivo = async (req:any, res:any) => {
    const {id} = req.params
    const data = await axios.get(`http://localhost:3001/idtribu/?metric=${id}`)
    if (typeof data.data === "object") {
      const csv = new ObjectsToCsv(data.data)
      await csv.toDisk('./tribu.csv')
    }
    res.end()
  };

export  {
  Create,
  Delete,
  Get,
  Update,
  Simulacion,
  IdTribu,
  Archivo,
 
}



// interface stateItem{
//   A:string,
//   E:string
//   D:string
// }
// interface objetoStateMock{
//   604:string,
//   605:string,
//   606:string,
// }

