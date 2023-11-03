import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// eslint-disable-next-line prettier/prettier
import { BranchEntity } from '@entities';

@Entity({
  name: 'StoriesDist',
})
export class StoryDistEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;
  @Column({ nullable: true, type: 'varbinary', length: 'MAX' })
  public buffer: Buffer;
  @OneToOne(() => BranchEntity, (x) => x.dist)
  @JoinColumn()
  public readonly branch: BranchEntity;
}
