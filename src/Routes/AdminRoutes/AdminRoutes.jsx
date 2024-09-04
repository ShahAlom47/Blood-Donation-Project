

import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useUser from "../../CustomHocks/useUser";
import Loading from "../../SharedComponent/Loading";


const AdminRoutes = ({children}) => {
    const {user,loading}=useUser()
    
    const location=useLocation()

  

    if (loading) {
        return <Loading></Loading>
    }

    if (user&& user.role==='admin') {
        return (
            <div>
                {children}
            </div>
        )
    }

        return <Navigate state={location.pathname} to={'/'} replace></Navigate>
    

};

export default AdminRoutes;
AdminRoutes.propTypes = {
    children: PropTypes.node.isRequired
};