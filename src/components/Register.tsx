import React, { FormEvent, useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { Link } from "react-router-dom";


class RegisterPage extends React.Component<any> {
    state = { userName: '', email: '', password: '', tel: '', address: '' };

    handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    render() {
        return (
            <React.Fragment>
                <h2>Register Form</h2>
                <form onSubmit={this.handleSubmit} action={<Link to="/login" /> as unknown as string}>
                    {/* <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}> */}
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="User Name"
                        onChange={e => this.setState({ userName: e.target.value })}
                        value={this.state.userName}
                        fullWidth
                        required
                    />
                    {/* <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Last Name"
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            fullWidth
                            required
                        /> */}
                    {/* </Stack> */}
                    <TextField
                        type="email"
                        variant='outlined'
                        color='secondary'
                        label="Email"
                        onChange={e => this.setState({ email: e.target.value })}
                        value={this.state.email}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                    />
                    <TextField
                        type="password"
                        variant='outlined'
                        color='secondary'
                        label="Password"
                        onChange={e => this.setState({ password: e.target.value })}
                        value={this.state.password}
                        required
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Tellphone"
                        onChange={e => this.setState({ tel: e.target.value })}
                        value={this.state.tel}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Address"
                        onChange={e => this.setState({ address: e.target.value })}
                        value={this.state.address}
                        fullWidth
                        required
                    />
                    <Button variant="outlined" color="secondary" type="submit">Register</Button>
                </form>
                <small>Already have an account? <Link to="/login">Login Here</Link></small>

            </React.Fragment >
        )
    }
}

export { RegisterPage };