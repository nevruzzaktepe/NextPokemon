import {LIMIT} from "@/app/consts/const";
import Link from "next/link";
import Listitem from "@/app/components/listitem";

const getData = async (offset) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`)
    const json = await res.json()
    console.log(json)

    const fetchPokeDetail = async (url) => {
        const pokemonDetails = await fetch(url)
        return await pokemonDetails.json()
    }

    const pokemonDetailPromise = json.results.map(async (item) => {
        const pd = await fetchPokeDetail(item.url)
        item.info = pd
        return item
    })

    json.results = await Promise.all(pokemonDetailPromise)
    console.log('json', json)
    return json

}
const List = async ({
                        offset
                    }) => {

    const data = await getData(offset)
    return (
        <div className='flex flex-col gap-6'>
            <div className="flex items-center gap-6">
                <h1 className='text-2xl text-white'>Toplam : {data.count}</h1> |
                <h1 className='text-2xl text-white'>Şuanda Listelenen: {LIMIT}</h1> |
                <h1 className='text-2xl text-white'>Toplam : {Math.round(data.count/LIMIT)} sayfa</h1> |
                <h1 className='text-2xl text-white'>Bulundugunuz sayfa : {offset / LIMIT || 1}.sayfa</h1>
          <div className='flex flex-1 text-xl items-center justify-end gap-6'>
                    {data.previous && <Link href={`/?page=${new URL(data.previous).searchParams.get('offset')/LIMIT}`}>Önceki</Link>
                    }
                    {data.next && <Link href={`/?page=${new URL(data.next).searchParams.get('offset')/LIMIT}`}>Sonraki</Link>
                    }
          </div>

        </div>
           <div className='grid grid-cols-5 gap-6'>
            {data.results.map((item)=>{
                  return(
                    <Listitem item={item} key={item.name}/>
                  )
            })}
           </div>
        </div>
    )
}
export default List;
