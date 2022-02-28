import React from 'react'
import { AiOutlineClose } from "react-icons/ai"

import { useDispatch } from "react-redux";
import { deleteLocationCard } from "../redux/LocationCardsReducer"

export default function WeatherCard({ data }) {

    const dispatch = useDispatch();

    return (
        <div className="md:m-0 m-auto md:min-w-[auto] sm:min-w-[350px] min-w-[300px] max-w-[440px] dark:bg-[#0f0f0f] py-10 px-7 bg-gray-50 rounded-3xl shadow-md divide-y-2 divide-gray-200">

            <div className="relative pb-2 w-full dark:text-gray-300 text-gray-600 text-xl text-center tracking-wider first-letter:capitalize">
                <div
                    onClick={() => { dispatch(deleteLocationCard(data)) }}
                    className="absolute text-2xl top-0 right-0 active:text-red-700 hover:text-gray-700 text-red-500"><AiOutlineClose />
                </div>
                <p>{data.name}<sup className="font-bold text-xs">{data.sys.country}</sup></p>
            </div>

            <div className="flex flex-col items-center">
                <div className="w-full pt-5 flex flex-row justify-center items-center">
                    <p className="w-1/2 font-thin tracking-tighter dark:text-gray-400 text-gray-700 text-6xl">{parseInt(data.main.temp)}&#176;C</p>
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <p className="first-letter:capitalize font-bold text-md text-center dark:text-gray-400 text-gray-700">{data.weather[0].description}</p>
                        <p className="dark:text-gray-300 text-gray-600">Max: {parseInt(data.main.temp_max)}&#176;C</p>
                        <p className="dark:text-gray-300 text-gray-600">Min: {parseInt(data.main.temp_min)}&#176;C</p>
                    </div>
                </div>

                <img className="w-32 h-20 object-cover" src={data.imageObjectURL} />

                <div className="w-full pt-5 flex flex-row justify-center items-center">
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <p className="font-thin tracking-tighter dark:text-gray-200 text-gray-500 text-5xl">{parseInt(data.main.feels_like)}&#176;C</p>
                        <p className="text-center font-bold tracking-tighter dark:text-gray-300 text-gray-600 text-xs">Feels like</p>
                    </div>

                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <p className="font-thin tracking-tighter dark:text-gray-200 text-gray-500 text-5xl">{parseInt(data.main.humidity)}%</p>
                        <p className="text-center font-bold tracking-tighter dark:text-gray-300 text-gray-600 text-xs">Humidity</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
