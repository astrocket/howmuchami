import React from "react";
import HomeIndex from "./pages/home/Index.jsx";

const routes = {
    "/": () => <HomeIndex />,
    "/about": () => <p className="m-5 h-16 text-center flex items-center justify-center">Live in the future and build what seems interesting.</p>
};

export default routes;