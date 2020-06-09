import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import Log from "./Log";
import UserCourses from "./UserCourses";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  phone: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  exam_practice_link: string;

  @OneToMany(() => UserCourses, userCourses => userCourses.users)
  courses: UserCourses[];

  @OneToMany(() => Log, log => log.user)
  logs: Log[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
