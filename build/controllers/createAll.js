"use strict";
//const {organizacion,metrics,tribu,repositorio} = require('../db')
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const CreateAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nameOr, nameTr, nameRe, state, statusOr, statusTr, statusRe, create_time, coverage, bugs, vulnerabilities, code_smells, hostpots } = req.body;
    try {
        yield organizacion.create({
            name: nameOr,
            status: statusOr
        });
        const searchOr = yield organizacion.findAll({
            where: {
                name: nameOr,
            },
        });
        // const aja = await JSON.parse(searchOr)
        yield tribu.create({
            name: nameTr,
            status: statusTr,
            id_organization: searchOr[0].dataValues.id_organizacion
        });
        const searchTr = yield tribu.findAll({
            where: {
                name: nameTr,
            },
        });
        yield repositorio.create({
            name: nameRe,
            state,
            create_time,
            status: statusRe,
            id_tribe: searchTr[0].dataValues.id_tribe
        });
        const searchRe = yield repositorio.findAll({
            where: {
                name: nameRe,
            },
        });
        console.log("----------------------------------------------------------", searchRe[0].dataValues.id_repository);
        yield metrics.create({
            coverage,
            bugs,
            vulnerabilities,
            hostpot: hostpots,
            code_smells,
            id_repository: searchRe[0].dataValues.id_repository
        });
        // console.log(searchOr.id_organization)
        //res.send(searchOr)
    }
    catch (error) {
        console.log(error);
    }
    res.end();
});
module.exports = {
    CreateAll,
};
//const searchOr = await organizacion.findAll({
//         where: {
//         name: name,
//         },
//     });  
//   await createOr.settribu(searchOr)
//         res.send(createOr)
