"use client"

import React, { useEffect, useState } from 'react';
import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline';

function SeuComponente() {
  const [musicaData, setMusicaData] = useState([]); 
  const [favoritos, setFavoritos] = useState({}); 

  useEffect(() => {

    const buscarDadosDasMusicas = async () => {
      try {
        const response = await fetch('https://api.vagalume.com.br/rank.php?type=alb&period=month&periodVal=202309&scope=internacional&limit=20&apikey={c5efc47c2e8e46f1086a5154bdb7af07}');
        if (!response.ok) {
          throw new Error('Erro na requisição à API');
        }

        const data = await response.json();

        transformarURLsNoJSON(data);

        setMusicaData(data.alb.month.internacional);
      } catch (error) {
        console.error('Erro ao buscar dados das músicas:', error);
      }
    };

    buscarDadosDasMusicas();
  }, []);

  function transformarURL(url) {
    return url.replace(/-W100\.jpg$/, '.webp');
  }

  function transformarURLsNoJSON(objetoJSON) {
    for (const chave in objetoJSON) {
      if (typeof objetoJSON[chave] === 'object') {
        transformarURLsNoJSON(objetoJSON[chave]);
      } else if (chave === 'cover' && typeof objetoJSON[chave] === 'string') {
        objetoJSON[chave] = transformarURL(objetoJSON[chave]);
      }
    }
  }

  function toggleFavorito(id) {
    setFavoritos((prevState) => {
      if (prevState[id]) {
        const newFavoritos = { ...prevState };
        delete newFavoritos[id]; 
        return newFavoritos;
      } else {
        return { ...prevState, [id]: true }; 
      }
    });
  }

  return (
    <div className="flex flex-wrap gap-7">
      {musicaData.map((musica) => {
        const favorito = favoritos[musica.id]; 
        return (
          <div key={musica.id} className="flex flex-col gap-1 items-left bg-slate-900 p-4 rounded-lg w-56 m-2 shadow-md">
            <img alt={musica.name} src={transformarURL(musica.cover)} className="rounded-lg h-48 line-clamp-1" />
            <a className="font-normal text-lg w-full text-left line-clamp-1">{musica.name}</a>
            <a className="font-light text-lg w-full text-center line-clamp-1">{musica.art && musica.art.name}</a>
            <button
              onClick={() => {
                toggleFavorito(musica.id);
              }}
            >
              {favorito ? (
                <HeartIcon
                  className="h-6 w-6 text-[#990e8d]  cursor-pointer"
                />
              ) : (
                <HeartIconOutline
                  className="h-6 w-6 text-zinc-400  cursor-pointer hover:text-[#990e8d]"
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SeuComponente;