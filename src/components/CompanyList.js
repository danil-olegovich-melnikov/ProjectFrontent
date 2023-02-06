import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";


class CompanyList extends React.Component {
    view(company) {
        return (
            <div key={company.id} className="col-3">
                <div className="card text-center">
                    <img src={company.logo} className="card-img-top" alt="..."/>
                    <div className="card-body my-2">
                        <h5 className="card-title text-primary">{company.name}</h5>
                        <Link to={"/companies/" + company.id} className="btn btn-light mt-2">Просмотреть</Link>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="company">
                <div className="container py-5">
                    <h1>Компании</h1>
                    <p>Количество компаний: {this.props.data.companies.count}</p>
                    <div className="companies row mt-5">
                        {this.props.data.companies.list.map(this.view)}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state
};


export default connect(mapStateToProps, {})(CompanyList)
