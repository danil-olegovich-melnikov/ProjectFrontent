import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";


class LocationList extends React.Component {
    view_location(location) {
        return (
            <div className="col-3">
                <div key={location.id} className="card text-center">
                    {/*<img src={location.logo} className="card-img-top" alt="..."/>*/}
                    <div className="card-body my-2">
                        <h5 className="card-title text-primary">{location.name}</h5>
                        <Link to={'/locations/' + location.id} className="btn btn-light mt-2">Просмотреть</Link>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="location">
                <div className="container py-5">
                    <h1>Локации</h1>
                    <p>Количество локаций: {this.props.data.locations.count}</p>
                    <div className="companies row mt-5">
                        {this.props.data.locations.list.map(this.view_location)}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
};


export default connect(mapStateToProps, {})(LocationList)
