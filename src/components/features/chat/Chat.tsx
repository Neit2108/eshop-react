import { useAuth } from "@/hooks/useAuth";
import { ChatPage } from "../../../pages/chat/ChatPage";

export default function ChatApp() {
    const {user, logout} = useAuth();
    const token = localStorage.getItem("accessToken");
    const apiUrl = "http://localhost:5000";
    const userId = user?.id;

    return (
        <ChatPage
            token={token!}
            currentUserId={userId!}
            apiUrl={apiUrl}
            onLogout={logout}
        />
    );
}