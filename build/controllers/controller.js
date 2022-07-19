"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//const {organizacion,metrics,tribu,repositorio} = require('../db')
//const createObjectCsvWriter = require("fast-csv").createObjectCsvWriter;
const ObjectsToCsv = require('objects-to-csv');
const axios = require('axios');
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, status } = req.body;
    try {
        const createOr = yield organizacion.create({
            name,
            status,
        });
        //  await createOr.set
        res.send(createOr);
    }
    catch (error) {
        console.log(error);
    }
    res.end();
});
const Delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        const deleteOr = yield organizacion.findOne({
            where: { name: name },
        });
        if (deleteOr) {
            yield deleteOr.destroy(); // deletes the row
        }
        res.send(deleteOr);
    }
    catch (error) {
        console.log(error);
    }
    res.end();
});
const Get = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todos = yield organizacion.findAll();
        res.send(todos);
    }
    catch (error) {
        console.log(error);
    }
});
const Simulacion = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const simulacion = { repositories: [
            { "id": 1, "state": 604 },
            { "id": 2, "state": 605 },
            { "id": 3, "state": 606 }
        ] };
    res.send(simulacion);
});
const Update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateName, name, status } = req.body;
    console.log(updateName, name, status);
    if (name) {
        try {
            const updateOr = yield organizacion.findOne({
                where: { name: updateName },
            });
            const update = yield organizacion.update({ name: name ? name : updateOr.name, status: status ? status : updateOr.status }, {
                where: {
                    name: updateName
                }
            });
            res.send(update);
        }
        catch (error) {
            console.log(error);
        }
    }
    res.end();
});
const IdTribu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datoSearch = req.query;
    const validate = Object.keys(datoSearch);
    let id = Object.values(datoSearch)[0];
    const findIdTribu = yield tribu.findOne({
        where: { id_tribe: id },
    });
    if (findIdTribu === null) { // && validate != "informacion"
        return res.send("La Tribu no se encuentra registrada");
    }
    //if( validate[0] === "cobertura"){   
    const cobertura = yield repositorio.findAll({
        where: { id_tribe: parseInt(id) },
    });
    let valitCover = false;
    if (cobertura) {
        yield Promise.all(cobertura.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const metric = yield metrics.findOne({
                where: { id_repository: item.id_repository },
            });
            // array.push(metric.dataValues.coverage)
            if (metric.dataValues.coverage > 75) {
                valitCover = true;
            }
        })));
        if (!valitCover) {
            return res.send("La Tribu no tiene repositorios que cumplan con la cobertura necesaria");
        }
    }
    // if( validate[0] === "metric"){   
    let currentTime = new Date();
    let currentYear = currentTime.getFullYear();
    let dataResult = [];
    let dataObjeto, {} = {};
    try {
        const findCoverage = yield repositorio.findAll({
            where: { id_tribe: id },
            include: metrics
        });
        yield Promise.all(findCoverage.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            //  console.log(item)
            const stateItem = { E: "Enable", D: "Disable", A: "Archive", };
            let year = item.create_time;
            let yearInt = parseInt(JSON.stringify(year).slice(1, 5));
            let state = item.state;
            if (yearInt === currentYear && state === "A" && item.dataValues.metric.dataValues.coverage > 75) {
                const findTribu = yield tribu.findOne({
                    where: { id_tribe: item.dataValues.id_tribe },
                });
                const findOrganization = yield organizacion.findOne({
                    where: { id_organizacion: findTribu.dataValues.id_organization },
                });
                //console.log(stateItem[item.dataValues.state])
                dataObjeto.id = item.dataValues.id_repository;
                dataObjeto.name = item.dataValues.name.replace(/ /g, "");
                dataObjeto.tribe = findTribu.dataValues.name.replace(/ /g, "");
                dataObjeto.organization = findOrganization.dataValues.name.replace(/ /g, "");
                dataObjeto.coverage = item.dataValues.metric.dataValues.coverage;
                dataObjeto.codeSmells = item.dataValues.metric.dataValues.code_smells;
                dataObjeto.bugs = item.dataValues.metric.dataValues.bugs;
                dataObjeto.vulnerabilities = item.dataValues.metric.dataValues.vulnerabilities;
                dataObjeto.hotspots = item.dataValues.metric.dataValues.hostpot;
                dataObjeto.verificationState = "Verificado";
                dataObjeto.state = stateItem[item.dataValues.state];
                console.log("--------------------------------------------------SA");
                dataResult.push(dataObjeto);
                console.log(item.dataValues.metric.dataValues.codeSmells);
            }
            //console.log("--------------------------------------------------SA")
        })));
        //console.log(dataResult)
        res.send(dataResult);
        res.end();
    }
    catch (error) {
        console.log(error);
    }
    // }
    if (validate[0] === "informacion") {
        let mockNumber = -1;
        let objetoStateMock = {
            604: "verificado",
            605: "En espera",
            606: "aprobado",
        };
        try {
            const mock = yield axios.get("http://localhost:3001/simulacion");
            mock.data.repositories.map((item) => {
                if (item.id === parseInt(id)) {
                    mockNumber = item.state;
                }
            });
            res.send(objetoStateMock[mockNumber]);
        }
        catch (error) {
            console.log(error);
        }
    }
    res.end();
});
const Archivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield axios.get(`http://localhost:3001/idtribu/?metric=${id}`);
    if (data.data === Object) {
        const csv = new ObjectsToCsv(data.data);
        yield csv.toDisk('./tribu.csv');
    }
    res.end();
});
module.exports = {
    Create,
    Delete,
    Get,
    Update,
    Simulacion,
    IdTribu,
    Archivo,
};
