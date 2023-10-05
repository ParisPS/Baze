"use client"

import Image from "next/image"
import loginimage from "@/images/banner.jpeg"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { PlayCircleOutlined,Search, VideocamOffOutlined} from '@mui/icons-material';
import { serverLogin } from "@/actions/auth";

export default function login(){
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const {push} = useRouter()

    function login(e){
        e.preventDefault()
        if (email === "paris.perez.s@gmail.com" && senha === "Paris_2003"){
            push("/")
        }else{
            toast.error("Credenciais Invalidas",)
    }
}

    return (
        <div className="flex h-screen">
            <aside className="hidden md:flex">
                <Image className="h-full w-full object-cover "src={loginimage} alt=""></Image>
            </aside>

            <main className="container m-auto max-w-md p-6 text-zinc-400">
                <div className="flex">
                    <h1 className="text-xl font-bold">Baze</h1>
                </div>
                <form onSubmit={login} className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input className="bg-slate-900 p-1 rounded" 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    />

                    <label htmlFor="senha">Senha</label>
                    <input className="bg-slate-900 p-1 rounded" 
                    type="password" 
                    id="senha" 
                    value={senha} 
                    onChange={e => setSenha(e.target.value)}
                    />

                    <button className="bg-[#990e8d] p-2 mt-5 rounded">Entrar</button>
                </form>
            </main>
        </div>
    )
}