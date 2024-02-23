import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import linkApi from "../../app/api/link.api";
import Notification from "../../app/common/Notification/Notification.Component";
import ROUTES from "../../app/routes/routes";

const RedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const redirect = async () => {
        const shortened = location.pathname.substring(1) || '';
        console.log(shortened);
        
        const response = await linkApi.getOriginalByShortened(shortened).catch((error) => {});
        
        if (response?.status === 200) {
            window.location.href = response.data;
        }
        else {
            setIsVisible(true);
            setTimeout(() => navigate(ROUTES.TABLE), 3000);
        }
    };

    useEffect(() => {
        redirect();
    });
    
    return (
        <div>
            <h1>URL Shortener</h1>
            {isVisible && <Notification message={"Url not found"} type="warning" setState={setIsVisible} state={isVisible}/>}
        </div>
    );
}

export default RedirectPage;