// import { Component } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function withRouter(Component) {
    function ComponentwithRouterProp(props) {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        return (<Component {...props} router={{ location, navigate, params }} />);
    }
    ComponentwithRouterProp.displayName = `withRouter(${Component.displayName || Component.name || 'Component'})`;
    return ComponentwithRouterProp;
};