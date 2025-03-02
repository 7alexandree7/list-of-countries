import React from 'react'
import ContryCard from './components/CoutryCard/CountryCard'



export type Countries = {
    name: {
        common: string
    }
    translations: {
        por: {
            common: string
        }
    }
    flags: {
        svg: string
        alt: string
    }
    capital: string
    region: string
    subregion: string
    population: number
    languages?: {
        [key: string]: string
    }
    borders?: string[]
    cca3: string
}

const getAllContries = async (): Promise<Countries[]> => {
    const res = await fetch("https://restcountries.com/v3.1/all")
    return res.json()
}

const Home = async () => {

    const countries = await getAllContries()

    return (
        <section className='container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 w-full mt-16 '>
            {countries.map((countrie) => (
                <ContryCard
                    key={countrie.cca3}
                    name={countrie.name.common}
                    ptName={countrie.translations.por.common}
                    flag={countrie.flags.svg}
                    flagAlt={countrie.flags.alt} />
            ))}
        </section>
    )
}
export default Home
