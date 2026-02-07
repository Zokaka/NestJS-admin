import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
/* 在属性名后面加 !，告诉 TypeScript：“这个属性会在运行时被 TypeORM 自动赋值，不用担心它是 undefined”。 */

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string; // 加密存储
}
