import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {connect} from 'react-redux';
import API from './axios';

import Home from "./components/Home";
import CompanyList from "./components/CompanyList";
import CompanyView from './components/CompanyView'
import LocationList from "./components/LocationList";
import Search from "./components/Search";
import PageNotFound from "./components/PageNotFound";
import Trip from "./components/Trip";
import LocationView from "./components/LocationView";
import Auth from "./components/Auth";

import logo from "./images/logo.png";
import {add} from './actions';

import {
    ADD_COMPANIES,
    ADD_LEVELS,
    ADD_LOCATIONS,
    ADD_SOCIAL_MEDIA,
    ADD_SOCIAL_MEDIA_TYPE,
    ADD_TRIPS,
} from './actions/types'
import {
    auth_url,
    companies_url,
    company_url,
    home_url,
    location_url,
    locations_url,
    non_found_url,
    trip_url,
    trips_url
} from "./Links";


class App extends React.Component {
    async componentDidMount() {
        await API.get("company/").then(response => {
            this.props.add(ADD_COMPANIES, response.data)
        })
        await API.get("levels/").then(response => {
            this.props.add(ADD_LEVELS, response.data)
        })
        await API.get("locations/").then(response => {
            this.props.add(ADD_LOCATIONS, response.data)
        })
        await API.get("social_media/").then(response => {
            this.props.add(ADD_SOCIAL_MEDIA, response.data)
        })
        await API.get("social_media_type/").then(response => {
            this.props.add(ADD_SOCIAL_MEDIA_TYPE, response.data)
        })
        await API.get("trips/").then(response => {
            this.props.add(ADD_TRIPS, response.data)
        })
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <nav className="navbar navbar-light bg-white">
                        <div className="container-fluid container">
                            <Link to="/" className="navbar-brand">
                                <img src={logo} alt="" height="25" className="d-inline-block align-text-top"/>
                                <span className="navbar-brand-text">BeSmartTraveler</span>
                            </Link>
                            <div className="d-flex">
                                <Link to={companies_url} className="nav-link mx-3">Компании</Link>
                                <Link to={locations_url} className="nav-link mx-3">Локации</Link>
                                <Link to={trips_url} className="nav-link mx-3">Туры</Link>
                                <Link to={auth_url} className="nav-link mx-3 btn btn-primary text-white">
                                    Профиль
                                </Link>
                            </div>
                        </div>
                    </nav>
                    <Routes>
                        <Route path={home_url} element={<Home/>}/>
                        <Route path={auth_url} element={<Auth/>}/>
                        <Route path={companies_url} element={<CompanyList/>}/>
                        <Route path={company_url} element={<CompanyView/>}/>
                        <Route path={trips_url} element={<Search/>}/>
                        <Route path={trip_url} element={<Trip/>}/>
                        <Route path={locations_url} element={<LocationList/>}/>
                        <Route path={location_url} element={<LocationView/>}/>
                        <Route path={non_found_url} element={<PageNotFound/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}


const mapStateToProps = (state) => state


export default connect(mapStateToProps, {add})(App)
