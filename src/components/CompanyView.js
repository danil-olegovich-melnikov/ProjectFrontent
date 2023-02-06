import React from 'react';
import {connect, useSelector} from 'react-redux';
import {useParams} from "react-router";


function CompanyView() {
    let {pk} = useParams();
    pk = parseInt(pk)
    let company = useSelector((state) => state.data.companies.list.filter(c => c.id === pk))

    if (company.length === 1) {
        company = company[0]
        return (
            <div key={company.id} className="company">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-6">
                            <img className="w-100" src={company.logo} alt="..."/>
                        </div>
                        <div className="col-6 pt-4">
                            <h1>{company.name}</h1>
                            <p>{company.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
};


export default connect(mapStateToProps, {})(CompanyView)
