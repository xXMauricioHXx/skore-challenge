import { ContentType } from '@/domain/entities/content';
import { UserContentView } from '@/infra/repositories/mysql/entities/user-content-view';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column({ enum: [ContentType.IMAGE, ContentType.PDF, ContentType.VIDEO] })
  type: ContentType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserContentView, ({ content }) => content)
  userContentViews: UserContentView[];
}
