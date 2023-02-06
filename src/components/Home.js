import React from 'react';
import {Link} from "react-router-dom";
import {trips_url} from "../Links";
import background from '../images/background.jpg'

class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <div className="banner-image" style={{backgroundImage: `url(${background})`}}>
                    <div className="py-5 text-center banner-wrapper">
                        <div className="container py-5 banner-content">
                            <h1 className="display-2">Поиск туров по Кыргызстану</h1>
                            <Link to={trips_url} className="btn btn-primary mt-5">Найти</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
