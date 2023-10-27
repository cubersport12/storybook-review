import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BuildEntity } from './build.entity';

@Entity({
  name: 'StoriesDist',
})
export class StoryDistEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;
  @Column({ nullable: true, type: 'varbinary', length: 'MAX' })
  public buffer: Buffer;
  @OneToOne(() => BuildEntity, (x) => x.dist)
  @JoinColumn()
  public readonly build: BuildEntity;
}
