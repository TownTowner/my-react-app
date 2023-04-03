import React, { FormEvent } from 'react';

import { AuthService } from '../services';
import { Link } from 'react-router-dom';
import { TextField, Stack, Button, Alert } from '@mui/material';

interface ILoginState {
    email?: string;
    password?: string;
    emailError: boolean;
    passwordError: boolean;
    msg?: string;
}
class LoginPage extends React.Component<any, ILoginState> {

    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (AuthService.prototype.currentUserValue) {
            this.props.history.push('/');
        }
        this.state = { email: '', password: '', emailError: false, passwordError: false, msg: '' };
    }

    submit = ({ email, password }, action: string) => {
        // setStatus && setStatus();
        var pro = action === 'login' ?
            AuthService.prototype.login(email, password) :
            AuthService.prototype.register(email, password);

        pro.then(
            user => {
                if (action === 'login') {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                    console.log('login from,',from)
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

                {/* <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={this.submit}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                /> */}
            </div>
        )
    }
}

export { LoginPage };


/*import React, {FormEvent, useState} from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { Link } from "react-router-dom"
 
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
 
    const handleSubmit = (event:FormEvent) => {
        event.preventDefault()
 
        setEmailError(false)
        setPasswordError(false)
 
        if (email == '') {
            setEmailError(true)
        }
        if (password == '') {
            setPasswordError(true)
        }
 
        if (email && password) {
            console.log(email, password)
        }
    }
     
    return ( 
        <React.Fragment>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <h2>Login Form</h2>
                <TextField 
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value={email}
                    error={emailError}
                 />
                 <TextField 
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <Button variant="outlined" color="secondary" type="submit">Login</Button>
             
        </form>
        <small>Need an account? <Link to="/">Register here</Link></small>
        </React.Fragment>
     );
}
 
export default Login;*/