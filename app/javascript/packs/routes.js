import React from "react";
import HomeIndex from "./pages/home/Index.jsx";

const routes = {
    "/": () => <HomeIndex />,
    "/about": () => <div className="container mx-auto h-16 flex items-center justify-center">Live in the future and build what seems interesting.</div>
};

export default routes;