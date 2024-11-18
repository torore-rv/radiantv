import React from 'react';

function MessageBox(props) {
    return <div style={styles.box}>{props.children}</div>;
}

const styles = {
    box: {
        border: '1px solid gray',
        //borderRadius: '5px',
        padding: '10px',
        width: '95%',
        backgroundColor: '#fff2bc',
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)'
    }
};

export default MessageBox;