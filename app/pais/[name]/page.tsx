import { Countries } from "@/app/page";
import Image from "next/image";
import Link from "next/link";
import CountryCard from '../../components/CoutryCard/CountryCard'


async function getContryByName(name: string): Promise<Countries> {
    const response = await fetch(`https://restcountries.com/v3.1/all`)
    const countries: Countries[] = await response.json()
    return countries.find((countrie) => countrie.name.common === name)!
}

async function getContryByBordersName(name: string) {
    const response = await fetch(`https://restcountries.com/v3.1/all`)  // chamada da api com o cache
    const countries: Countries[] = await response.json() // Trazer os dados em formato JSON

    const contry = countries.find((countrie) => countrie.name.common === name)! // encontrar o pais que for passado como parametro na url 

    return contry.borders?.map((border) => { // Buscar os paises que fazem fronteira com o pai passado como parametro
        const borderCountry = countries.find((countrie) => countrie.cca3 === border)! // encontrar o pais que faz fronteira
        return { // retornar um array com os paises que fazem fronteira
            name: borderCountry.name.common,
            ptName: borderCountry.translations.por.common,
            flag: borderCountry.flags.svg,
            flagAlt: borderCountry.flags.alt,
        }
    })
}

export default async function ContryPage({ params: { name } }: { params: { name: string } }) {

    const country = await getContryByName(decodeURI(name))
    const bordersCountry = await getContryByBordersName(decodeURI(name))

    const formatter = Intl.NumberFormat("en", { notation: "compact" })

    return (
        <section className="flex flex-col container">
            <h1 className="text-5xl font-bold text-gray-800 my-16 text-center">{country.translations.por.common}</h1>
            <Link className="flex items-center py-2" href="/">
                <Image src="/arrow-back.svg" alt="seta de voltar" width={24} height={24} />
                Voltar
            </Link>
            <article className="flex justify-between min-w-full p-10 bg-white">
                <section>
                    {country.capital && <h2 className="text-xl text-gray-800">🏰<b>Capital: </b>{country.capital}</h2>}
                    <h2 className="text-xl text-gray-800">🗺️<b>Continente: </b>{country.region} {country.subregion && ` - ${country.subregion}`}</h2>
                    <h2 className="text-xl text-gray-800">👨‍👩‍👧‍👦<b>População: </b>{formatter.format(country.population)}</h2>
                    {country.languages && (
                        <h2 className="text-xl text-gray-800">🗣️<b>Línguas Faladas: </b> <br />{Object.values(country.languages).map((lang) => (
                            <span key={lang} className="inline-block p-1.5 bg-indigo-700 mr-2 text-white text-sm rounded-full ">{lang}</span>
                        ))}</h2>
                    )}
                </section>
                <div className="relative">
                    <Image className="object-cover" src={country.flags.svg} alt={country.flags.alt} width={350} height={350} />
                </div>
            </article>
            <section>
                <h3 className="mt-12 text-2xl font-semibold  text-gray-800">Países que faz fronteira</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 w-full mt-4">
                    {bordersCountry?.map((border) => (
                        <CountryCard key={border.name} {...border}/>
                    ))}
                </div>
            </section>
        </section>
    )
}