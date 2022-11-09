import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { Content } from './content';

@Entity('user_content_views')
export class UserContentView {
  @PrimaryColumn()
  contentId: number;

  @PrimaryColumn()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Content, ({ userContentViews }) => userContentViews)
  content: Content;
}
