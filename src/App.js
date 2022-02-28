import React, { useState } from "react";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import { AiOutlineSearch } from "react-icons/ai"

import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "./redux/LocationReducer"
import { setMode } from "./redux/ModeReducer"
import { addLocationCard } from "./redux/LocationCardsReducer"

function App() {

    const [cityInputData, setCityInputData] = useState("")

    const dispatch = useDispatch();
    const mode = useSelector((state) => state.mode.value);
    const location = useSelector((state) => state.location.value);
    const locationCards = useSelector((state) => state.locationCards.value);

    const getData = async (position, query) => {
        const URLToGet = position
            ? `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&units=metric&appid=${'e4f273e6c4c93188f9964501de66d735'}`
            : `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${'e4f273e6c4c93188f9964501de66d735'}`

        const response = await fetch(URLToGet)

        const jsonData = await response.json()

        const response2 = await fetch(`https://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`)
        const result = await response2.blob()

        const tempjsonData = jsonData;
        const imageObjectURL = URL.createObjectURL(result);
        tempjsonData["imageObjectURL"] = imageObjectURL

        return tempjsonData
    }

    React.useEffect(() => {

        const hours = new Date().getHours()
        dispatch(setMode((hours > 6 && hours < 19) ? "light" : "dark"))

        if (location && Object.keys(location).length === 0) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                try {
                    const weatherData = await getData(pos.coords)
                    dispatch(setLocation(weatherData));
                }
                catch (e) {
                    alert("City not found!")
                    return
                }
            });
        }
    }, [])


    const handleSubmit = async (name) => {
        try {
            const weatherData = await getData(null, name)
            dispatch(addLocationCard(weatherData));
        }
        catch (e) {
            alert("City not found!")
            return
        }
        setCityInputData("")
    }

    return (
        <div className={`${mode === "dark" ? "dark bg-[#171717]" : "bg-white"}`}>
            <Header />
            <div className="dark:bg-[#171717] min-h-[calc(100vh-100px)] flex flex-col items-center">

                <div className="w-[95%] sm:w-3/4 md:w-1/2 flex flex-row">
                    <input type="text" className="dark:text-gray-300 mr-1 h-14 w-full px-10 rounded-full z-0 focus:shadow-md focus:outline-none dark:bg-[#121212] bg-gray-100" placeholder="Search for cities" value={cityInputData} onChange={(e) => { setCityInputData(e.target.value) }} />
                    <button
                        onClick={() => { handleSubmit(cityInputData) }}
                        className="dark:text-gray-300 ml-1 font-bold border dark:bg-[#121212] dark:border-black border-gray-300 dark:hover:bg-[#1f1f1f] hover:bg-gray-200 dark:active:bg-[#171717] active:bg-gray-400 bg-gray-100 px-4 text-2xl rounded-full"><AiOutlineSearch /></button>
                </div>
                {locationCards.length > 0
                    ? <div className="px-5 sm:px-10 py-14 grid gap-14 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full">
                        {locationCards.length > 0 && locationCards.map((card) => {
                            return (<WeatherCard key={card.id} data={card} />)
                        })}
                    </div>
                    : <div className="flex flex-row justify-center items-center w-full min-h-[calc(100vh-156px)]">
                        <p className="text-gray-600">Start searching to view weather of cities</p>
                    </div>
                }

            </div>
        </div>
    );
}

export default App;

