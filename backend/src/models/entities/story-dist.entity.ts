import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// eslint-disable-next-line prettier/prettier
import { BranchEntity } from '@entities';

export const ENTITY_NAME = 'StoriesDist';

@Entity({
  name: ENTITY_NAME,
})
export class StoryDistEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;
  @Column({ nullable: true, type: 'varbinary', length: 'MAX' })
  public buffer: Buffer;
  @Column({ nullable: true, type: 'datetime' })
  public timestamp: Date;
  @OneToOne(() => BranchEntity, (x) => x.dist)
  @JoinColumn()
  public readonly branch: BranchEntity;
  @Column({ nullable: true, type: 'varchar', length: 100 })
  public owner: string;
}
