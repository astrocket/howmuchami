import React from "react";
import {useRoutes, A} from "hookrouter";
import routes from "./routes";
import Navigation from "./components/Navigation.jsx";

function App() {
  const routeResult = useRoutes(routes);
  return (
    <div className="leading-normal tracking-normal text-gray-900">
      <Navigation/>
      <div className="pb-14 bg-right bg-cover">
        {routeResult || <div className="w-screen flex items-center justify-center flex-col" style={{ height: '50vh' }}>
          <span className="text-5xl">😲</span><br/>
          <span className="text-3xl">없는 페이지 입니다.</span>
        </div>}
      </div>
    </div>
  );
}

export default App;