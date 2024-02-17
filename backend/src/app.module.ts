import { Logger, Module } from '@nestjs/common';
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
import { StoriesDistModule } from './modules/stories-dist/stories-dist.module';

@Module({
  imports: [
    AuthModule,
    ProjectsSetupModule,
    StoriesDistModule,
    RepositoriesModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
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
  providers: [AppService, Logger],
})
export class AppModule {}
