import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import linkApi from "../../app/api/link.api";
import userApi from "../../app/api/user.api";
import ROUTES from "../../app/routes/routes";
import Link from "../../models/Link.model";
import "./LinkPage.styles.scss";
import UserRequestDTO from "../../models/UserRequest.model";

const LinkPage = () => {
    const navigate = useNavigate();
    const [link, setLink] = useState<Link>();
    const [user, setUser] = useState<UserRequestDTO>();
    const [loggedIn, setLoggedIn] = useState(false);
    const id = Number(localStorage.getItem('id'));

    const fetchLink = async () => {
        if(id)
            linkApi.get(id).then((response) => setLink(response.data)).catch((response) => {
                if (response.status === 404) {
                    console.log(response);
                    navigate(ROUTES.TABLE);
                }
            });
        
    }
    const fetchUser = async () => {
        if (link)
            userApi.get(link.userId).then((response) => setUser(response.data)).catch((response) => {
                if (response.status === 404) {
                    console.log(response);
                    navigate(ROUTES.TABLE);
                }});
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate(ROUTES.TABLE);
        }
        fetchLink();
    }, []);

    useEffect(() => {
        fetchUser();
    }, [link]);

    return (
        <div className="linkCard">
            <h2>Link Details</h2>
            {<div className="linkInfo">
                <div className="text">ID: {link?.id}</div>
                <div className="text">Original URL: {link?.originalURL}</div>
                <div className="text">Shortened URL: {ROUTES.BASE + link?.shortenedURL}</div>
                <div className="text">User ID: {link?.userId}</div>
                <div className="text">UserName: {user?.username}</div>
                <div className="text">Created At: {link?.createdAt ? link.createdAt.slice(0, 19) : ''}</div>
            </div>}
        </div>
    );
}
export default LinkPage;