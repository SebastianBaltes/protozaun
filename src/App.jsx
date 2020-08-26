import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Stage from './Stage.jsx';

function App() {
    return (
        <Stage>
            <Button variant="contained" color="primary">
                Hello World
            </Button>

        </Stage>
    );
}

ReactDOM.render(<App />, document.querySelector('#app'));
