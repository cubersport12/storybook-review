import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { BuildEntity } from './build.entity';
import { SnapshotEntity } from './snapshot.entity';

@Entity({
  name: 'Stories',
})
export class StoryItemEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;
  @Column()
  public readonly name: string;
  @Column()
  public readonly status?: number;
  @ManyToOne(() => UserEntity)
  public readonly reviewer?: UserEntity;
  // @ManyToOne(() => BuildEntity, (x) => x.stories)
  // public readonly build?: BuildEntity;
  // @Column()
  // public readonly buildId?: number;
  @OneToOne(() => SnapshotEntity, (x) => x.storyItem)
  public readonly snapshot?: SnapshotEntity;
}
