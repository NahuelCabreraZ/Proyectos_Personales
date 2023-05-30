import { useState, useEffect } from "react"
import './App.css'

//const ENDPOINT_CAT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_IMAGE_PREFIX = 'https://cataas.com'

export function App () {
const [fact, setFact] = useState()
const [image, setImage] = useState()

//efecto para recuperar hecho al cargar la pagina
useEffect(()=> {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
    .then(res => res.json())
    .then(data => {
        const { fact } = data
        setFact(fact)
        })
}, [])

//efecto para traer la imagen con el hecho cargado
useEffect(()=>{
    if (!fact) return

        const firstWord = fact.split(' ').slice(0, 3).join(' ')
        console.log(firstWord)
        fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
        .then(res => res.json())
        .then(response =>{
            const { url } = response
        setImage(url)
    })

},[fact])

    return (
        <main>
            <h1>APP de Mininus</h1>
            <section>
            {fact && <p>{fact}</p>}
            {image && <img src={`${CAT_IMAGE_PREFIX}${image}`} alt='imagen extraida usando las tres primeras palabras'/>}
            </section>

        </main>
    )
}