import React from 'react';

import { AuthService } from '../services';

class HomePage extends React.Component {
    state = {
        currentUser: AuthService.prototype.currentUserValue,
        users: null
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('didmount');
        // userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
                <h1>Hi {currentUser?.name}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users &&
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export { HomePage };