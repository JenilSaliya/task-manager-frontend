import React from "react";

const LanguageCard = ({ logo, title, version }) => {

    return (

        <div className="flex flex-col  items-center p-4 bg-black border border-emerald-600 rounded-xl  w-36 m-2">

            <img src={logo} alt={`${title} logo`} className="mb-3 h-[45px] w-fit  " />
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">v{version}</p>

        </div>

    );

};

export default LanguageCard;
