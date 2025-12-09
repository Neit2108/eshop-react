import { useAuth } from "@/hooks/useAuth";
import { ChatPage } from "../../../pages/chat/ChatPage";
import { useNavigate } from "react-router-dom";

export default function ChatApp() {
    const {user, logout} = useAuth();
    const token = localStorage.getItem("accessToken");
    const userId = user?.id;
    const navigate = useNavigate();
    
    return (
        <ChatPage
            token={token!}
            currentUserId={userId!}
            onLogout={logout}
            onBackHome={() => navigate('/')}
        />
    );
}