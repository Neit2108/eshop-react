import { useAuth } from "@/hooks/useAuth";
import { ChatPage } from "../../../pages/chat/ChatPage";
import { useNavigate } from "react-router-dom";

export default function ChatApp() {
    const {user, logout} = useAuth();
    const token = localStorage.getItem("accessToken");
    const apiUrl = "http://localhost:5000";
    const userId = user?.id;
    const navigate = useNavigate();
    return (
        <ChatPage
            token={token!}
            currentUserId={userId!}
            apiUrl={apiUrl}
            onLogout={logout}
            onBackHome={() => navigate('/')}
        />
    );
}