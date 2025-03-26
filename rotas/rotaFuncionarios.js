//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

/*import { Router } from "express"; //micro-aplicação HTTP
import funcionarioCtrl from "../Controle/funcionarioCtrl.js";

const catCtrl = new funcionarioCtrl();
const rotafuncionario = Router();

rotafuncionario.post("/", catCtrl.gravar);
rotafuncionario.put("/:codigo", catCtrl.editar);
rotafuncionario.patch("/:codigo", catCtrl.editar);
rotafuncionario.delete("/:codigo", catCtrl.excluir);
rotafuncionario.get("/:codigo", catCtrl.consultar);
rotafuncionario.get("/",catCtrl.consultar);

export default rotafuncionario;
*/


import rotaFuncionario from './rotas/rotaFuncionarios.js';

dotenv.config();

const host = "0.0.0.0";
const porta = 4000;

const app = express(); 
app.use(express.json());


app.use(cors({
                "origin":"*",
                "Access-Control-Allow-Origin":'*'
        }));

app.use(express.static('./publico'));


app.use("/cadastro_funcionarios",rotaFuncionario);

