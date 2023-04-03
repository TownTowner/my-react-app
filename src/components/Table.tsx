import React from 'react';

import { authServiceInstance, IUser } from '../services';

class TablePage extends React.Component<any, { tables: any[], currentUser: IUser }> {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: authServiceInstance.currentUserValue,
            tables: null
        };
    }

    componentDidMount() {
        console.log('didmount');
        // userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        return (
            <div>
                <h1>Hi {this.state.currentUser?.name}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {this.state.tables &&
                    <ul>
                        {this.state.tables.map(user =>
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

export { TablePage };