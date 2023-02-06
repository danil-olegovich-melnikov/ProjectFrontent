import React from 'react';
import {connect, useSelector} from 'react-redux';
import {useParams} from "react-router";


function LocationView() {
    let {pk} = useParams();
    pk = parseInt(pk)
    let location = useSelector((state) => state.data.locations.list.filter(c => c.id === pk))

    if (location.length === 1) {
        location = location[0]
        return (
            <div key={location.id} className="company">
                <div className="container py-5">
                    <h1>{location.name}</h1>
                    <p>{location.description}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
};


export default connect(mapStateToProps, {})(LocationView)
