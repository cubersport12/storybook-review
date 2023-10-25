import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RepositoryEntity } from './repository.entity';
import { BuildEntity } from './build.entity';

@Entity({
  name: 'Branches',
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
  @Column({ unique: true, nullable: false })
  public readonly name?: string;
}
