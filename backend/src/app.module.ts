import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsSetupModule } from './modules/projects-setup/projects-setup.module';
import { RepositoriesModule } from '@repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BranchEntity,
  BuildEntity,
  RepositoryEntity,
  SnapshotEntity,
  StoryDistEntity,
  StoryItemEntity,
  UserEntity,
} from '@entities';

@Module({
  imports: [
    AuthModule,
    ProjectsSetupModule,
    RepositoriesModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'IVANOVAA10\\IVANOVAA',
      username: 'prgacc',
      port: 1433,
      password: 'account',
      database: 'Storybook',
      autoLoadEntities: true,
      entities: [
        UserEntity,
        BranchEntity,
        BuildEntity,
        RepositoryEntity,
        StoryItemEntity,
        SnapshotEntity,
        StoryDistEntity,
      ],
      synchronize: true,
      logger: 'debug',
      options: {
        encrypt: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
