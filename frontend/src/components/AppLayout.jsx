import Sidebar from "./Sidebar";
import FloatingChatbot from "./FloatingChatbot";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        {children}
      </main>

      <FloatingChatbot />
    </div>
  );
};

export default AppLayout;