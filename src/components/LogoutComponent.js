import { Redirect } from 'react-router-dom';

function LogoutComponent() {
    sessionStorage.removeItem('userData')
    return(<Redirect to = {'/'}/>)
}

export default LogoutComponent;