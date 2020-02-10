import React from "react";
import {useRoutes} from "hookrouter";
import routes from "./routes";
import krwRateContext from "./contexts/krwRate.context";
import useKrwRate  from "./hooks/krwRate.hook";
import Navigation from "./components/Navigation.jsx";
import Footer from "./components/Footer.jsx";
import LikeButton from "./components/LikeButton";

function App() {
  const routeResult = useRoutes(routes);
  const krwRate = useKrwRate();

  return (
    <krwRateContext.Provider value={krwRate}>
      <div className="leading-normal tracking-normal text-gray-900">
        <Navigation/>
        <div className="pb-14 bg-right bg-cover">
          {routeResult || <div className="w-screen flex items-center justify-center flex-col" style={{ height: '50vh' }}>
            <span className="text-5xl">😲</span><br/>
            <span className="text-3xl">없는 페이지 입니다.</span>
          </div>}
        </div>
        <Footer/>
        <LikeButton />
      </div>
    </krwRateContext.Provider>
  );
}

export default App;