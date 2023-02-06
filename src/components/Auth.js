import {connect} from "react-redux";
import React from "react";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "action": "registration",
            "login": {
                "username": "",
                "password": "",
            },
            "registration": {
                "username": "",
                "first_name": "",
                "last_name": "",
                "date_of_birth": "",
                "password": "",
                "password_repear": "",
            }
        }
    }

    registration = () => {
        return (
            <form className="form" action="#">
                <div className="btn btn-outline my-2" onClick={() => this.setState({'action': "login"})}>
                    Войти
                </div>
                <h2 className="text-center">Регистрация</h2>
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">Никнейм</label>
                    <input type="text" className="form-control" id="registration-username"
                           value={this.state.registration.username}
                           onChange={e => this.setState({
                               "registration": {...this.state.registration, "username": e.target.value}
                           })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">Имя</label>
                    <input type="text" className="form-control" id="registration-first_name"
                           value={this.state.registration.first_name}
                           onChange={e => this.setState({
                               "registration": {...this.state.registration, "first_name": e.target.value}
                           })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">Фамилия</label>
                    <input type="text" className="form-control" id="registration-last_name"
                           value={this.state.registration.last_name}
                           onChange={e => this.setState({
                               "registration": {...this.state.registration, "last_name": e.target.value}
                           })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">Год рождения</label>
                    <input type="number" className="form-control" id="registration-date_of_birth"
                           value={this.state.registration.date_of_birth}
                           onChange={e => this.setState({
                               "registration": {...this.state.registration, "date_of_birth": e.target.value}
                           })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">Пароль</label>
                    <input type="password" className="form-control" id="registration-password"
                           value={this.state.registration.password}
                           onChange={e => this.setState({
                               "registration": {...this.state.registration, "password": e.target.value}
                           })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">Повторите пароль</label>
                    <input type="password" className="form-control" id="registration-password_repeat"
                           value={this.state.registration.password_repeat}
                           onChange={e => this.setState({
                               "registration": {...this.state.registration, "password_repeat": e.target.value}
                           })}/>
                </div>
                <div className="text-center">
                    <div className="btn btn-primary">Зарегистрироваться</div>
                </div>
            </form>
        )
    }

    login = () => {
        return (
            <form className="form" action="#">
                <div className="btn btn-outline" onClick={() => this.setState({'action': "registration"})}>
                    Регистрация
                </div>
                <h2 className="text-center">Войти в аккаунт</h2>
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">Никнейм</label>
                    <input type="text" className="form-control" id="login-username"
                           value={this.state.login.username}
                           onChange={e => this.setState({
                               "login": {...this.state.login, "username": e.target.value}
                           })}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="" className="form-label">Пароль</label>
                    <input type="password" className="form-control" id="login-username"
                           value={this.state.login.password}
                           onChange={e => this.setState({
                               "login": {...this.state.login, "password": e.target.value}
                           })}/>
                </div>
                <div className="text-center">
                    <div className="btn btn-primary">Войти</div>
                </div>
            </form>
        )
    }

    render() {
        return (
            <div className="auth">
                <div className="mt-5">
                    <div className="container">
                        <div className="bg-white rounded shadow p-4 w-75 mx-auto">
                            {this.state.action === "registration" ? this.registration() : this.login()}
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


export default connect(mapStateToProps, {})(Auth)
