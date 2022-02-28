import React from "react";
import Logo from "../assets/cloud-logo-180.png"
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { useSelector, useDispatch } from "react-redux";
import { setMode } from "../redux/ModeReducer";


export default function Header() {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.mode.value);
    const location = useSelector((state) => state.location.value);

    const toggleDarkMode = (checked) => {
        dispatch(setMode(checked ? "dark" : "light"))
    };

    return (
        <div className="bg-gray-50 text-black dark:text-white dark:bg-black shadow-lg w-full h-20 flex flex-row items-center justify-center mb-5">
            <div className="absolute left-2 sm:left-14">
                <DarkModeSwitch
                    moonColor={"#f0c420"}
                    sunColor={"#f9d71c"}
                    checked={mode === "light" ? false : mode === "dark" && true}
                    onChange={toggleDarkMode}
                    size={45}
                />
            </div>

            <div className="py-5 flex flex-col items-center">
                <div className="flex flex-row items-center">
                    <img src={Logo} alt="" className="w-8 h-8 mr-2" />
                    <p className="font-lobster font-bold text-3xl">Weather app</p>
                </div>
                <p className="text-sm font-semibold italic text-gray-600 dark:text-gray-400">by - Atharv varshney</p>
            </div>

            <div className="hidden sm:block absolute right-14">

                {location && Object.keys(location).length > 0
                    ? <div className="space-y-2">
                        <div className="flex flex-row items-center justify-center divide-x-2 divide-gray-300 dark:divide-gray-800">
                            <p className="px-2">{location.name}</p>
                            <p className="font-bold px-2">{parseInt(location.main.temp)} &#176;C</p>
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <img className="w-14 h-7 object-cover" src={location.imageObjectURL} />
                            <p className="text-sm first-letter:capitalize font-semibold text-gray-700 dark:text-gray-200">{location.weather[0].description}</p>
                        </div>
                    </div>

                    : "loading..."}
            </div>

        </div>
    );
}
