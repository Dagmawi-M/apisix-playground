import React from "react";
import EntityTemplate from "./EntityTemplate";
import NID from "./NID";

const DARS = () => {
    return <EntityTemplate entityName="DARS" logoSrc="/src/images/DARS.png" providers={["NID", "MFA"]} />;
};

export default DARS;
