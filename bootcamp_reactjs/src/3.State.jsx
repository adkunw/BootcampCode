import React from "react";

class Counting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    render() {
        return (
            <div>
                return
                <h1>You Clicked {this.state.count} times</h1>;
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>click on me!</button>
            </div>
        )
    }
}

// Export the class
export default Counting;
