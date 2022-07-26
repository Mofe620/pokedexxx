import React from "react";
import Link from "next/link";
import Head from 'next/head'

export async function getServerSideProps({query}){
 const id = query.id;
 try {
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let response = await request.json();
    console.log(response);
    const pokeman = response;
    //add other needed fields to the response object
    const paddedId = '00'+ id;
    const imageId = paddedId.slice(-3);
    pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
    pokeman.index = imageId;
    return {
      props: { pokeman }
    };
    
  } catch (error) {
    console.log(error);
  }
}

export default function Pokeman({pokeman}){
    return (
        <>
            <Head>
                <title>Pokedex | Mofe620</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-full h-full flex flex-col justify-center items-center p-20">
                <h2 className="font-bold">Pokemon <span>#{pokeman.index}</span></h2>
                <img src={pokeman.image} alt="" className="mt-8 grow" />
                <p className="mt-6 text-lg font-medium">{pokeman.name}</p>
                <Link href="/">
                    <a className="mt-2 text-blue-500">Back to Home</a>
                </Link>
            </div>
        </>
        
    );
}