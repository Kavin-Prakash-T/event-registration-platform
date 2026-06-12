import Sidebar from "./Sidebar";
import FloatingChatbot from "./FloatingChatbot";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="min-h-screen pt-14 md:ml-64 md:pt-0">
        {children}
      </main>

      <FloatingChatbot />
    </div>
  );
};

export default AppLayout;