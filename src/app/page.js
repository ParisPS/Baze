import { PlayCircleOutlined,Search} from '@mui/icons-material';
import './globals.css';
import Titulo from "@/components/Titulo";
import CardSom from "@/components/Card";

async function carregarDados(){
  const url = "https://api.vagalume.com.br/rank.php?type=alb&period=month&scope=internacional&limit=20&apikey={c5efc47c2e8e46f1086a5154bdb7af07}"
  const response = await fetch(url)
  const json = await response.json()
  console.log(json);
  return json
}

export default async function Home() {

const musicas = await carregarDados()
console.log(musicas)
  
  return (
    <>
      <nav className="bg-slate-900 text-zinc-400 p-5">
        <ul className="flex flex-row justify-between px-10">
          <li className='flex space-x-0.5'>
            <a href="/" className="text-3xl font-bold">Baze</a>
          </li>
          <li>
            <a href="#" className='text-2xl font-bold'>Favoritos</a>
          </li>
          <li>
            <a href="#" className='text-2xl font-bold'>Sobre</a>
          </li>
          <li>
            <a href="login" className='text-2xl font-bold'>Login</a>
          </li>
        </ul>
      </nav>
      
      <Titulo>Álbuns Populares</Titulo>
      
      <section className="flex flex-wrap px-40 justify-between text-zinc-100">
       <CardSom musica={musicas} />
      </section>    
    </>    
  )
}