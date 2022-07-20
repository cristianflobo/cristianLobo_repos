//const {organizacion,metrics,tribu,repositorio} = require('../db')
const {organizacion,metrics,tribu,repositorio} = require('../db')

const CreateAll = async (req:any, res:any) => {
    const {nameOr,nameTr,nameRe,state, statusOr,statusTr,statusRe,create_time,coverage,bugs,vulnerabilities,code_smells,hostpots} = req.body
    try{
        await organizacion.create({
            name:nameOr,
            status:statusOr
        });
            const searchOr = await organizacion.findAll({
                where: {
                name: nameOr,
                },
            });
            
           // const aja = await JSON.parse(searchOr)
       await tribu.create({
            name:nameTr,
            status:statusTr,
            id_organization:searchOr[0].dataValues.id_organizacion
        });
            const searchTr = await tribu.findAll({
                where: {
                name: nameTr,
                },
            }); 
        await repositorio.create({
            name:nameRe,
            state,
            create_time,
            status:statusRe,
            id_tribe:searchTr[0].dataValues.id_tribe 
        });
            const searchRe = await repositorio.findAll({
                where: {
                name: nameRe,
                },
            }); 
            console.log("----------------------------------------------------------",searchRe[0].dataValues.id_repository )
        await metrics.create({
            coverage,
            bugs,
            vulnerabilities,
            hostpot:hostpots,
            code_smells,
            id_repository:searchRe[0].dataValues.id_repository 
        });     
       // console.log(searchOr.id_organization)
        //res.send(searchOr)
    } catch (error) {
          console.log(error)
    }      
    res.end()  
   
  };

  export  {
  CreateAll
   
  }
//const searchOr = await organizacion.findAll({
    //         where: {
    //         name: name,
    //         },
    //     });  
    //   await createOr.settribu(searchOr)
    //         res.send(createOr)