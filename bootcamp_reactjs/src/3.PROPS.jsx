import React from "react"
import ReactDOM from "react-dom/client"

const el = document.getElementById("root")

const root = ReactDOM.createRoot(el)

function App(props) {
    return (
        <div>
            <h1>Hi, my name is {props.name}</h1>
            <h2>and my job is {props.job}</h2>
        </div>
    )
}

function Data() {
    return (
        <div>
            <App name="Kunto" job="Technical Mentor" />
            <App name="Syalza" job="Developer" />
        </div>
    )
}

root.render(<Data />)