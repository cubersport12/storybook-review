import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RepositoryEntity } from './repository.entity';
import { BuildEntity } from './build.entity';
import { StoryDistEntity } from '@entities';

export const BRANCH_ENTITY_NAME = 'Branches';

@Entity({
  name: BRANCH_ENTITY_NAME,
})
export class BranchEntity {
  @ManyToOne((x) => RepositoryEntity, (x) => x.branches)
  public readonly repository?: RepositoryEntity;
  @Column()
  public readonly repositoryId?: string;
  @OneToMany(() => BuildEntity, (x) => x.branch)
  public readonly builds?: BuildEntity[];
  @PrimaryGeneratedColumn('uuid')
  public readonly id?: string;
  @Column({ nullable: false })
  public readonly name?: string;
  @OneToOne(() => StoryDistEntity, (x) => x.branch)
  public readonly dist?: StoryDistEntity;
}
