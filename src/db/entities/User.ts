import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  static tableName = 'users';

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name' })
  userName: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, name: 'mobile_phone' })
  mobilePhone: string;
}
