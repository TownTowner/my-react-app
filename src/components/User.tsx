import React from 'react';

import { authServiceInstance, IUser } from '../services';

class UserPage extends React.Component<any, { users: IUser[], currentUser: IUser }> {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: authServiceInstance.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
        console.log('UserPage didmount');
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
                            <li key={user.id}>{user.name} {user.email}</li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export { UserPage };