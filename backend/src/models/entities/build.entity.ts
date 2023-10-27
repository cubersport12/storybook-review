import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BranchEntity } from './branch.entity';
import { StoryItemEntity } from './story-item.entity';
import { StoryDistEntity } from './story-dist.entity';

@Entity({
  name: 'Builds',
})
export class BuildEntity {
  @PrimaryGeneratedColumn('increment')
  public readonly id?: number;
  @Column()
  public readonly name?: string;
  @Column({
    type: 'date',
  })
  public readonly lastChanged?: Date;
  @ManyToOne(() => BranchEntity, (x) => x.builds)
  public readonly branch?: BranchEntity;
  @Column()
  public readonly branchId?: string;
  @OneToMany(() => StoryItemEntity, (x) => x.build)
  public readonly stories?: StoryItemEntity[];
  @OneToOne(() => StoryDistEntity, (x) => x.build)
  public readonly dist?: StoryDistEntity;
}
