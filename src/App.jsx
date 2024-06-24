import NavBar from "./pages/components/navBar";
import BlogPage from "./pages/BlogPage";

const App = () => {
  return (
    <div className="bg-slate-500 min-h-screen">
      <NavBar />
      <div className="flex flex-col ">
        <BlogPage />
      </div>
    </div>
  );
};

export default App;
