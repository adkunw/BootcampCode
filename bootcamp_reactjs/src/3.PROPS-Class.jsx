import React from "react";
import ReactDOM from "react-dom/client";

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el);

// Mengubah App menjadi class
class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hi, my name is {this.props.name}</h1>
                <h2>and my job is {this.props.job}</h2>
            </div>
        );
    }
}

// Mengubah Data menjadi class
class Data extends React.Component {
    render() {
        return (
            <div>
                <App name="Kunto" job="Technical Mentor" />
                <App name="Syalza" job="Developer" />
            </div>
        );
    }
}

root.render(<Data />);
