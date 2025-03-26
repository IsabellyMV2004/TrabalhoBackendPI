//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import funcionarioCtrl from "../Controle/funcionarioCtrl.js";

const funcCtrl = new funcionarioCtrl();
const rotaFuncionario = Router();

rotaFuncionario.post("/", funcCtrl.gravar);
rotaFuncionario.put("/:codigo", funcCtrl.editar);
rotaFuncionario.patch("/:codigo", funcCtrl.editar);
rotaFuncionario.delete("/:codigo", funcCtrl.excluir);
rotaFuncionario.get("/:codigo", funcCtrl.consultar);
rotaFuncionario.get("/",funcCtrl.consultar);

export default rotaFuncionario;

