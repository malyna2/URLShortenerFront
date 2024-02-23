import { useEffect } from "react";
import "./Notification.styles.scss";

const Notification = ({ message, type, setState, state }: { message: string, type: string, setState: any, state: any}) => {
    useEffect(() => {
        setTimeout(() => { setState(false) }, 3000);

    }, [setState]);

    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    );
}
export default Notification;