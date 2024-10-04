// Import the React and ReactDOM libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { commentsData } from './data';

// Create a render function to DOM
function renderDOM(content, id) {
    ReactDOM.createRoot(document.getElementById(id)).render(content);
}


//create a function for comment container
const Comment = ({ data }) => {
    return data.map((dataComment, index) => (
        <div className="ui container comments" key={index}>
            <div className="comment">
                <a href="/" className="avatar">
                    <img alt="avatar" src={dataComment.avatar} />
                </a>
                <div className="content">
                    <a href="/" className="author">
                        {dataComment.name}
                    </a>
                    <div className="metadata">
                        <span className="date">{dataComment.day}</span>
                    </div>
                    <div className="text">{dataComment.comment}</div>
                </div>
            </div>
        </div>
    ));
};

//call function
const App = () => {
    return <div>{<Comment data={commentsData} />}</div>;
};

// Show the component on the screen
renderDOM(<App />, "root");
