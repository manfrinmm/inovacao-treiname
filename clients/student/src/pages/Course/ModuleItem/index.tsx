import React from "react";

import { Container } from "./styles";

interface Props {
  selectedModule: string | undefined;
  handleSetModule: Function;
  module: {
    id: string;
    name: string;
  };
}

const ModuleItem: React.FC<Props> = ({
  module,
  selectedModule,
  handleSetModule,
}) => {
  return (
    <Container isSelected={selectedModule === module.id} key={module.id}>
      <button type="button" onClick={() => handleSetModule(module.id)}>
        {module.name}
      </button>
    </Container>
  );
};

export default ModuleItem;
