import { useNavigate } from "react-router-dom";
import { Home, User } from "lucide-react"
import styles from "../../styles/Navbar.module.css"

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <div className={styles.navbarContainer}>
            <Home onClick={() => navigate('/')}/>
            <User onClick={() => navigate('/me')}/>
        </div>
    )
}