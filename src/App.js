import { BrowserRouter } from "react-router-dom";
// import Router from "./router";
import { Sidebar } from "./components/sidebar/Sidebar";
import "./App.css";
import Router from "./router";
import { DataContextProvider } from "./context/dataContext";

function App() {
  return (
    <DataContextProvider>
      <BrowserRouter>
        <div className="main">
          <Sidebar />
          <Router />
        </div>
      </BrowserRouter>
    </DataContextProvider>
  );
}

export default App;
