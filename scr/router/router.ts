import {Router} from 'express'

import {Create, Delete,Get,Update,Simulacion,IdTribu,Archivo} from '../controllers/controller'
import { CreateAll } from '../controllers/createAll'

//const {CreateAll} = require('../controllers/createAll')

const router = Router()
router.get("/", Get)
router.get("/idtribu", IdTribu)
router.get("/archivocsv/:id", Archivo)
router.get("/simulacion", Simulacion)
router.post("/create", Create)
router.post("/createall", CreateAll)
router.put("/update", Update)
router.delete("/delete", Delete)


export default router
