import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";


function view_image(files) {
    if (files.length === 0) return

    return (
        <div key={files[0].id}>
            <img src={files[0].file} className="w-100" alt=""/>
            <div className="text-center">
                {files.map(file => {
                    return <div key={file.id} className="btn btn-light mx-2"/>
                })}
            </div>
        </div>
    )
}


function toggle(arr, item) {
    arr = [...arr]
    let i = arr.indexOf(item)
    if (i === -1) arr.push(item)
    else arr.splice(i, item)
    return arr
}


class Search extends React.Component {
    constructor(props) {
        super(props);

        let date1 = new Date();
        let date2 = new Date();
        date2.setDate(date2.getDate() + 7)
        this.initial_state = {
            min_price: "",
            max_price: "",
            currency: "сом",
            leaving_date: date1.toLocaleDateString('en-CA'),
            leaving_time: "00:00",
            arrival_date: date2.toLocaleDateString('en-CA'),
            arrival_time: "23:59",
            levels: [],
            companies: [],
            location: -1,
            multiplier: {"сом": 1, "₽": 1.2, "$": 84, "€": 84},

        }

        this.state = {...this.initial_state};
    }


    view(trip, state) {
        let date = ""
        if (trip.leaving_date === trip.arrival_date) {
            date = "Дата: " + trip.leaving_date
        } else {
            date = "Даты: " + trip.leaving_date + " - " + trip.arrival_date
        }


        return (
            <div key={trip.id} className="mb-4">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                {view_image(trip.files)}
                            </div>
                            <div className="col-8">
                                <h5 className="card-title text-primary">{trip.description}</h5>
                                <p className="fw-bolder text-dark">
                                    Цена: {Math.round(trip.price / state.multiplier[state.currency])} {state.currency}
                                </p>
                                <p className="text-secondary">{date}</p>
                                <Link to={"/trips/" + trip.id} className="btn btn-light mt-5">Просмотреть</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let data = this.props.data;
        let prices = data.trips.list.map(trip => trip.price)
        let max_price = Math.round(Math.max(...prices) / this.state.multiplier[this.state.currency])
        let min_price = Math.round(Math.min(...prices) / this.state.multiplier[this.state.currency])

        let trips = {...data.trips}
        trips.list = trips.list.filter(trip => (
            trip.price >= (this.state.min_price ? this.state.min_price : -Infinity) &&
            trip.price <= (this.state.max_price ? this.state.max_price : Infinity) &&
            (this.state.levels.length + this.state.levels.indexOf(trip.level.id)) &&
            (this.state.companies.length + this.state.companies.indexOf(trip.company.id)) &&
            (this.state.location === -1 || trip.locations.map(location => location.id).includes(this.state.location)) &&
            (new Date(trip.leaving_date).toLocaleDateString('en-CA') > this.state.leaving_date) &&
            (new Date(trip.arrival_date).toLocaleDateString('en-CA') <= this.state.arrival_date) &&
            (trip.leaving_time >= this.state.leaving_time) &&
            (trip.arrival_time <= this.state.arrival_time)
        ))

        return (
            <div className="search">
                <div className="container py-5">
                    <h1>Туры</h1>
                    <p>Общее количество: {trips.count}</p>

                    <div className="row mt-4">
                        <div className="col-4 bg-white filter p-4">
                            <h4 className="mb-4">Фильтры</h4>
                            <p className="small text-end pointer"
                               onClick={() => this.setState({...this.initial_state})}>
                                Сбросить
                            </p>
                            <form className="form">
                                <div className="mb-4">
                                    <h5 className="mb-2">Цена</h5>
                                    <div className="row my-2">
                                        <div className="col-6">
                                            <input className="form-control" type="number"
                                                   placeholder={"От " + (min_price === Infinity ? "" : min_price)}
                                                   value={this.state.min_price}
                                                   onChange={e => this.setState({"min_price": e.target.value})}/>
                                        </div>
                                        <div className="col-6">
                                            <input className="form-control" type="number"
                                                   placeholder={"До " + (max_price === -Infinity ? "" : max_price)}
                                                   value={this.state.max_price}
                                                   onChange={e => this.setState({"max_price": e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-12">
                                            <select className="form-control" name="currency"
                                                    onChange={e => this.setState({"currency": e.target.value})}
                                                    value={this.state.currency}>
                                                <option value="$">DOLLAR</option>
                                                <option value="€">EURO</option>
                                                <option value="₽">Рубль</option>
                                                <option value="сом">Сом</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h5 className="mb-2">Дата</h5>
                                    <div className="row my-2">
                                        <div className="col-6">
                                            <input className="form-control" type="date"
                                                   value={this.state.leaving_date}
                                                   onChange={e => this.setState({"leaving_date": e.target.value})}/>
                                        </div>
                                        <div className="col-6">
                                            <input className="form-control" type="date"
                                                   value={this.state.arrival_date}
                                                   onChange={e => this.setState({"arrival_date": e.target.value})}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h5 className="mb-2">Время</h5>
                                    <div className="row my-2">
                                        <div className="col-6">
                                            <input className="form-control" type="time"
                                                   onChange={e => this.setState({"leaving_time": e.target.value})}
                                                   value={this.state.leaving_time}/>
                                        </div>
                                        <div className="col-6">
                                            <input className="form-control" type="time"
                                                   onChange={e => this.setState({"arrival_time": e.target.value})}
                                                   value={this.state.arrival_time}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h5>Уровни сложности</h5>
                                    <p className="small my-1">*Можно выбрать несколько уровней</p>
                                    <div className="levels">
                                        {data.levels.list.map(level => (
                                                <div key={level.id}
                                                     className={"btn btn-sm me-2 mt-2 " +
                                                     (this.state.levels.indexOf(level.id) === -1 ?
                                                         "btn-light" : "btn-primary")
                                                     }
                                                     onClick={() => this.setState(
                                                         {"levels": toggle(this.state.levels, level.id)}
                                                     )}>
                                                    {level.name}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h5>Локации</h5>
                                    <p className="small my-1">*Можно выбрать одну локацию</p>
                                    <div className="locations">
                                        {data.locations.list.map(location => (
                                                <div key={location.id}
                                                     className={"btn btn-sm me-2 mt-2 " +
                                                     (this.state.location === location.id ?
                                                         "btn-primary" : "btn-light")
                                                     }
                                                     onClick={() => this.setState({
                                                         "location":
                                                             this.state.location === location.id ? -1 : location.id
                                                     })}>
                                                    {location.name}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h5>Компании</h5>
                                    <p className="small my-1">*Можно выбрать несколько компаний</p>
                                    <div className="companies">
                                        {data.companies.list.map(company => (
                                                <div key={company.id}
                                                     className={"btn btn-sm me-2 mt-2 " +
                                                     (this.state.companies.indexOf(company.id) === -1 ?
                                                         "btn-light" : "btn-primary")
                                                     }
                                                     onClick={() => this.setState(
                                                         {"companies": toggle(this.state.companies, company.id)}
                                                     )}>
                                                    {company.name}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-8">
                            <div className="trips">
                                {trips.list.map(trip => this.view(trip, this.state))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
};


export default connect(mapStateToProps, {})(Search)
