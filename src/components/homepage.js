import React, { useEffect, useState } from "react";
import "./style.css"
import cloudsIcon from "./images/cloudsIcon.png"
import searchicon from "./images/search-icon-png-9969.png"
import humidity from "./images/humidity.png"
import wind from "./images/wind.webp"
import clear from "./images/sunLight.webp"
import rain from "./images/rain.png"
import drizzle from "./images/drizzle.webp"
import mist from "./images/snowIcon.webp"
import axios from "axios"
function Home() {
    const [data, setData] = useState(
        {
            celcius: 35,

            humidity: 40,
            speed: 2,


        })
    const [name, setName] = useState('madurai');
    const [error, setError] = useState('');
    const [image, setImage] = useState(cloudsIcon);

    useEffect(function () {
        console.log("hi karthick")
        handleClick();
    }, [])
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleClick();
        }
    }

    const handleClick = () => {
        console.log("adithya")
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=3f1bf96fc24d3786134de758d49902c8&&unit=metric`;

            axios.get(apiUrl)
                .then(res => {
                    //  let imagePath = '';
                    console.log(res.data)
                    if (res.data.weather[0].main === "clouds") {
                        //  imagePath = "./images/cloudsIcon.png"
                        setImage(cloudsIcon)
                    } else if (res.data.weather[0].main === "Clear") {
                        //   imagePath = "./images/sunLight.webp"
                        setImage(clear)
                    } else if (res.data.weather[0].main === "Rain") {
                        //   imagePath = "./images/rain.png"
                        setImage(rain)
                    } else if (res.data.weather[0].main == "Drizzle") {
                        //   imagePath = "./images/drizzle.webp"
                        setImage(drizzle)
                    } else if (res.data.weather[0].main == "Mist") {
                        //   imagePath = "./images/snowIcon.webp"
                        setImage(mist)
                    } else {
                        //   imagePath = './images/cloudsIcon.png'
                        setImage(cloudsIcon)
                    }


                    console.log({ ...data, name: data.name })
                    console.log(res.data.weather[0].main)
                    setData({
                        ...data, celcius: res.data.main.temp, name: res.data.name,
                        humidity: res.data.main.humidity, speed: res.data.wind.speed
                    })

                    setError('');
                })
                .catch(err => {
                    if (err.response.status == 404) {
                        setError("Invalid City Name")
                    } else {
                        setError('');
                    }
                    console.log(err)
                });
        }
    }


    return (
        <div className="container">
            <div className="weather">
                <div className="search">
                    <input type="text" placeholder="Enter City Name" value={name} onChange={e => setName(e.target.value)} onKeyDown={handleKeyDown} />
                    <button><img src={searchicon} onClick={handleClick} alt="" /></button>
                </div>
                <div className="error">
                    <p> {error}</p>
                </div>
                <div className="winfo">
                    <img src={image} alt="img" className="icon" />
                    <h1>{Math.round(data.celcius)}°c</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src={humidity} alt="" />
                            <div className="humidity">
                                <p>{Math.round(data.humidity)}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind} alt="" />
                            <div className="wind">
                                <p>{Math.round(data.speed)} km/h</p>
                                <p>Wind</p>
                            </div>

                        </div>

                    </div>

                </div>
                <p>Designed by : <strong>Adithya SS</strong></p>

            </div>
        </div>
    )
}
export default Home;
