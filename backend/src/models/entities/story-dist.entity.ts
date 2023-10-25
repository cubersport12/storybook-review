import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BuildEntity } from './build.entity';

@Entity({
  name: 'StoriesDist',
})
export class StoryDistEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;
  @Column()
  public buffer: Buffer;
  @OneToOne(() => BuildEntity, (x) => x.dist)
  public readonly build: BuildEntity;
}
