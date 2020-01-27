import React from "react";
import HomeIndex from "./pages/home/Index.jsx";

const routes = {
    "/": () => <HomeIndex />,
    "/about": () => <p className="m-5 h-16 text-center flex flex-col items-center justify-center">
        Live in the future and build what seems interesting.<br />
        <a href="https://www.facebook.com/astrocket" className="mt-3 text-blue-500 hover:underline" target="_blank">facebook.com/astrocket</a>
    </p>
};

export default routes;