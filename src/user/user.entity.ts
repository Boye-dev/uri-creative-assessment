import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  facebookId: string;

  @Column()
  name: string;

  @Column()
  friendsCount: number;
}
