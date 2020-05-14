import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

import { Container } from "./styles";

interface CourseProps {
  name: string;
  created_at: string;
  updated_at: string;
}

interface CourseItemProps {
  data?: CourseProps;
}

const CourseItem: React.FC<CourseItemProps> = ({ data }) => {
  return (
    <Container>
      <div>
        <p>{data?.name}</p>
        <section>
          <span>Liberado em: {data?.created_at}</span>
          <span>Expira em: {data?.updated_at}</span>
        </section>
      </div>
      <Link to="/course">
        <MdKeyboardArrowRight size={48} />
      </Link>
    </Container>
  );
};

export default CourseItem;
