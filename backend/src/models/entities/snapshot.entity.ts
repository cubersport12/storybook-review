import {
  Column,
  Entity,
  JoinColumn, ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { StoryItemEntity } from './story-item.entity';

@Entity({
  name: 'Snapshots',
})
export class SnapshotEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;
  @Column({ nullable: true, type: 'varbinary', length: 'MAX' })
  public readonly buffer: Buffer;
  @OneToOne(() => StoryItemEntity, (x) => x.snapshot)
  @JoinColumn()
  public readonly storyItem: StoryItemEntity;
}
