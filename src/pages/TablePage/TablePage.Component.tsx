import { useEffect, useState } from "react";
import linkApi from "../../app/api/link.api";
import "./TablePage.styles.scss";
import { jwtDecode } from "jwt-decode";
import Notification from "../../app/common/Notification/Notification.Component";
import ROUTES from "../../app/routes/routes";
import { useNavigate } from "react-router-dom";

export default function TablePage() {
    const navigate = useNavigate();
    const [links, setLinks] = useState([]);
    const [url, setUrl] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const [fetched, setFetched] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const fetchLinks = async () => {
        const response = await linkApi.getAll();
        setLinks(response.data);
    }

    const handleUrlChange = (event: any) => {
        setUrl(event.target.value);
    };

    const handleCreateLink = () => {
        if(url !== "") {
            linkApi.create(url).then(() => fetchLinks()).catch(() => { setType("warning"); setMessage("This URL already exists"); setIsVisible(true) });
            setUrl("");
            setMessage("Created");
            setType("success");
            setIsVisible(true);
        }
    };

    const handleDeleteLinkChange = (id: number) => {
        linkApi.delete(id).then(() => fetchLinks()).catch((error) => {
            if (error.response.status === 401)
                setMessage("You can't delete this url");
            if (error.response.status === 404)
                setMessage("This URL doesn't exist");
            setType("warning");
        });
        setMessage("Deleted");
        setType("success");
        setIsVisible(true);
    };

    const handleGoToLink = (link: any) => {
        window.location.href = link.originalURL
    }

    const handleCopyLink = (link: any) => {
        navigator.clipboard.writeText(ROUTES.BASE + link.shortenedURL);
        setType("success");
        setMessage("Link copied to clipboard");
        setIsVisible(true);
    }

    const handleMore = (id: number) => {
        navigate(ROUTES.LINK);
        localStorage.setItem('id', String(id));
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setMessage("Logged out");
        setType("success");
        setIsVisible(true);
        setLoggedIn(false);
    }

    const handleLogin = () => {
        navigate(ROUTES.LOGIN);
    }

    useEffect(() => {
        if (!fetched) {
            fetchLinks();
            setFetched(true);
            setLoggedIn(localStorage.getItem('token') !== null);
        }
    });

    return (
        <div>
            <div className="header">
                {loggedIn
                    ? <button onClick={() => handleLogout()}>Log Out</button>
                    : <button onClick={() => handleLogin()}>Log In</button>
                }
            </div>
            <div>
                <h1>Link Table</h1>
                {loggedIn && <div className="tableItem">
                    <div className="horizontal">
                        <input
                            className="textInput"
                            type="text"
                            placeholder="Enter URL"
                            value={url}
                            onChange={handleUrlChange} />
                        <button onClick={handleCreateLink}>Create Link</button>
                    </div>
                </div>}
                {links.map((link: any) => {
                    return (
                        <div className="tableItem">
                            <div className="text">Original URL: {link.originalURL}</div>
                            <div className="text">Shortened URL: {ROUTES.BASE + link.shortenedURL}</div>
                            <div className="horizontal">
                                <button onClick={() => handleCopyLink(link)} >Copy</button>
                                <button onClick={() => handleGoToLink(link)} >Go To</button>
                                {loggedIn && <button onClick={() => handleDeleteLinkChange(link.id)}>Delete</button>}
                                {loggedIn && <button onClick={() => handleMore(link.id)}>More</button>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {isVisible && <Notification message={message} type={type} setState={setIsVisible} state={isVisible} />}
        </div>
    )
}