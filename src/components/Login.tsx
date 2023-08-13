import React, { FormEvent } from 'react';

import { authServiceInstance } from '../services';
import { Link } from 'react-router-dom';
import { TextField, Stack, Button, Alert } from '@mui/material';
import withRouter from '../utils/withRouter';

interface ILoginState {
    email?: string;
    password?: string;
    emailError: boolean;
    passwordError: boolean;
    msg?: string;
}

class LoginPage extends React.Component<{ router: { location, navigate, params }, [key: string]: any }, ILoginState> {
    // function LoginPage (props:{ router: { location, navigate, params }, [key: string]: any }): ILoginState {

    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authServiceInstance.currentUserValue) {
            const { from } = this.props.router.location.state || { from: { pathname: "/" } };
            this.props.router.navigate(from.pathname || '/', { replace: true });
        }
        this.state = { email: '', password: '', emailError: false, passwordError: false, msg: '' };
    }

    submit = ({ email, password }, action: string) => {
        // setStatus && setStatus();
        var pro = action === 'login' ?
            authServiceInstance.login(email, password) :
            authServiceInstance.register(email, password);

        pro.then(
            user => {
                if (action === 'login') {
                    const { from } = this.props.router.location.state || { from: { pathname: "/" } };
                    this.props.router.navigate(from.pathname || '/', { replace: true });
                    console.log('login from,', from)
                    // this.props.whenLogin(() => {
                    //     console.log('dididi');
                    // });
                } else {
                    this.setState({ msg: 'Regist successful! Please Login now.' });
                    setTimeout(() => {
                        this.setState({ msg: null });
                    }, 3000);
                }
            },
            error => {
                console.error(action + ' error', error);
                // setSubmitting && setSubmitting(false);
                // setStatus && setStatus(error);
            }
        );
    };

    handleSubmit = (event: FormEvent, action: string) => {
        event.preventDefault()

        this.setState({ 'emailError': false });
        this.setState({ 'passwordError': false });

        if (this.state.email === '') {
            this.setState({ 'emailError': true });
        }
        if (this.state.password === '') {
            this.setState({ 'passwordError': true });
        }

        if (this.state.email && this.state.password) {
            this.submit({ email: this.state.email, password: this.state.password }, action);
        } else
            console.error('field error');
    }

    render() {
        return (
            <div>
                {/* <h2>Login</h2> */}

                <React.Fragment>
                    {/* onSubmit={this.handleSubmit} */}
                    <form autoComplete="off" >
                        <h2>Login Form</h2>
                        <TextField
                            label="Email"
                            onChange={e => this.setState({ email: e.target.value })}
                            required
                            variant="outlined"
                            color="secondary"
                            type="email"
                            sx={{ mb: 3 }}
                            fullWidth
                            value={this.state.email}
                            error={this.state.emailError}
                        />
                        <TextField
                            label="Password"
                            onChange={e => this.setState({ password: e.target.value })}
                            required
                            variant="outlined"
                            color="secondary"
                            type="password"
                            value={this.state.password}
                            error={this.state.passwordError}
                            fullWidth
                            sx={{ mb: 3 }}
                        />
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <Button variant="outlined" color="secondary" type="submit" onClick={e => this.handleSubmit(e, 'login')}>Login</Button>
                            <Button variant="outlined" color="secondary" type="button" onClick={e => this.handleSubmit(e, 'regist')} >Register</Button>
                        </Stack>

                        {this.state.msg && <Alert severity="success">{this.state.msg}</Alert>}

                    </form>
                    <small>Need an account? <Link to="/Register">Register here</Link></small>
                </React.Fragment>
            </div>
        )
    }
}

export default withRouter(LoginPage);
