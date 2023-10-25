import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoryItemEntity } from './story-item.entity';

@Entity({
  name: 'Users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;
  @Column()
  public readonly username: string;
  @Column()
  public readonly password: string;
  @OneToMany(() => StoryItemEntity, (x) => x.reviewer)
  public readonly assignedStories: StoryItemEntity[];
}
