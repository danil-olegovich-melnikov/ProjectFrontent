import React from 'react';
import {connect, useSelector} from 'react-redux';
import {useParams} from "react-router";
import {Link} from "react-router-dom";


function view_image(img) {
    return (
        <div key={img.id} className="col-3">
            <img className="w-100" key={img.id} src={img.file} alt=""/>
        </div>
    )
}

function view_location(place) {
    return (
        <Link key={place.id} to={"/locations/" + place.id} className="btn btn-secondary me-3">{place.name}</Link>
    )
}

function Trip() {
    let {pk} = useParams();

    pk = parseInt(pk)
    let trip = useSelector((state) => state.data.trips.list.filter(c => c.id === pk))

    if (trip.length === 1) {
        trip = trip[0]
        return (
            <div key={trip.id} className="trip">
                <div className="container py-5">
                    <div className="row mb-5">
                        {trip.files.map(view_image)}
                    </div>
                    <h1 className="my-3">{trip.description}</h1>
                    <div className="locations my-3">
                        {trip.locations.map(view_location)}
                    </div>
                    <p>Уровень сложности: <span className="text-decoration-underline"
                                                title={trip.level.description}>{trip.level.name}</span>
                    </p>
                    <p>Время отъезда: {trip.leaving_time}</p>
                    <p>Дата отъезда: {trip.leaving_date}</p>
                    <p>Время приезда: {trip.arrival_time}</p>
                    <p>Дата приезда: {trip.arrival_date}</p>
                    <p>Компания: <Link to={"/companies/" + trip.company.id}>{trip.company.name}</Link></p>
                    <p>Стоимость: {trip.price} сом</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
};


export default connect(mapStateToProps, {})(Trip)
