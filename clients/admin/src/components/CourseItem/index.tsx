import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

import { Container } from "./styles";

interface CourseProps {
  id: string;
  name: string;
  created_at_formatted: string;
  updated_at_formatted: string;
}

interface CourseItemProps {
  course: CourseProps;
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  return (
    <Container>
      <div>
        <p>{course.name}</p>
        <section>
          <span>Liberado em: {course.created_at_formatted}</span>
          <span>Expira em: {course.updated_at_formatted}</span>
        </section>
      </div>
      <Link to={`/course/${course.id}`}>
        <MdKeyboardArrowRight size={48} />
      </Link>
    </Container>
  );
};

export default CourseItem;
