import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    useEffect(() => {
        if(!user || user.role.id !== 2) {
            navigate('/dang-nhap');
        } else {
            document.title = "dashboard";
        }
    });
    return (
        <div className="container">
            <h2>Dashboard</h2>
        </div>
    );
}

export default Dashboard;