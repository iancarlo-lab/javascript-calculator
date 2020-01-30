import React from 'react';

class Result extends React.Component {
    render(){
        let {result} = this.props
        return(
            <div id="input">
                <p id="display">{result}</p>
            </div>
        )
    }
}

export default Result;