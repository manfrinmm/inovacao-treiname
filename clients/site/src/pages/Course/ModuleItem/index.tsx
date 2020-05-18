import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

import { Container } from "./styles";

interface ModuleItemProps {
  data: {
    name: string;
    description: string;
  };
}
const ModuleItem: React.FC<ModuleItemProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Container expanded={expanded}>
      <button type="button" onClick={() => setExpanded(!expanded)}>
        {expanded ? (
          <FaMinus size={24} color="#101451" />
        ) : (
          <FaPlus size={24} color="#101451" />
        )}
        <p>{data.name}</p>
      </button>

      {expanded && <p>{data.description}</p>}
    </Container>
  );
};

export default ModuleItem;
