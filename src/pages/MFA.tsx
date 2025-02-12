import React from "react";
import EntityTemplate from "./EntityTemplate";

const MFA = () => {
    return <EntityTemplate entityName="MFA" logoSrc="/src/images/MFA.png" providers={["MOR", "MOTRI", "MOLS"]} />;
};

export default MFA;
