import React from 'react';

function GhostBox(props) {
    return <div style={styles.box}>{props.children}</div>;
}

const styles = {
    box: {
        padding: '10px 20px',
        background: 'rgba(0, 0, 0, 0.7)',  // 배경을 더 어둡게 조정
        border: '2px solid rgba(255, 255, 255, 0.3)',
        color: 'rgba(255, 255, 255, 0.9)',  // 텍스트를 더 밝게 조정
        fontSize: '16px',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
        transition: 'all 0.3s ease'
    }
};

export default GhostBox;