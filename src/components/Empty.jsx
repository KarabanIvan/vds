import React from 'react';

const Empty = ({txt}) => {
    return (
        <div className="empty">
            <p>
                {
                    txt ? txt : 'Здесь пока ничего нет'
                }</p>
        </div>
    );
};

export default Empty;