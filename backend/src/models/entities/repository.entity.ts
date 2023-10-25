import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BranchEntity } from './branch.entity';

@Entity({
  name: 'Repositories',
})
export class RepositoryEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;
  @Column()
  public readonly name: string;
  @OneToMany((x) => BranchEntity, (x) => x.repository)
  public readonly branches?: BranchEntity[];
}
