import React from "react";

const getData = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const json = await res.json();
    return json;
};

const Page = async ({ params }) => {
    const data = await getData(params.id);

    return (
        <div className="p-8">
            <div className="grid mb-8 border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">
                <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
                    <blockquote className="max-w-2xl mx-auto text-gray-500 lg:mb-8 dark:text-gray-400">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {data.name.toUpperCase()}
                        </h3>
                        <p className="my-4">Weight : {data.weight}kg</p>
                        <p className="my-4">Height : {data.height}m</p>
                        <p className="my-4">Exp Weight : {data.base_experience}pt</p>
                    </blockquote>
                    <figcaption className="flex items-center justify-center">
                        <img
                            className="rounded-full w-9 h-9"
                            src={data.sprites?.other?.["official-artwork"]?.front_default || "/placeholder.png"}
                            alt={data.name}
                        />
                        <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                            <div className="text-xl">Stats</div>
                            {data.stats.map((item) => (
                                <div
                                    key={item.stat.url}
                                    className="text-sm text-gray-500 dark:text-gray-400"
                                >
                  <span className="font-bold">
                    {item.stat.name} - {item.base_stat}
                  </span>
                                </div>
                            ))}
                        </div>
                    </figcaption>
                </figure>
                <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
                    <figcaption className="flex items-center justify-center">
                        <img
                            className="object-none"
                            src={data.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_shiny || "/fallback.png"}
                            alt={data.name}
                        />
                        <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                            <div>Game Indices</div>
                            {data.game_indices.map((item) => (
                                <div
                                    key={`${item.game_index}-${item.version.name}`}
                                    className="text-sm text-gray-500 dark:text-gray-400"
                                >
                                    Versiyon : {item.version.name} | Game Index : {item.game_index}
                                </div>
                            ))}
                        </div>
                    </figcaption>
                </figure>
            </div>
        </div>
    );
};

export default Page;
