import React, { useState } from "react";

export default function ColorCheck() {
    const [color, setColor] = useState("red");
    const [car, setCar] = useState({
        brand: "Ford",
        model: "Mustang",
        color: "red",
        year: 1964
    });

    const UpdateColor = () => {
        setCar(previousState => {
            return {
                ...previousState,
                color: "blue"
            }
        })
    }

    return (
        <div>
            <h1>My Favorite car is {car.brand} {car.model}! It is a {car.color} car from {car.year}</h1>
            <button type="button" onClick={UpdateColor}>Change Color</button>


            <h1>My Favorite color is {color}!</h1>
            <button onClick={() => setColor("blue")}>Blue</button>
            <button onClick={() => setColor("green")}>Green</button>
            <button onClick={() => setColor("red")}>Red</button>
        </div>
    )
}