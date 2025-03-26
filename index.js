import rotaFuncionario from './rotas/rotaFuncionarios';

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

app.listen(porta, host, () => {
        console.log(`Servidor escutando em http://${host}:${porta}`)
    });

