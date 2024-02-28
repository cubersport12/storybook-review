import {
  Injectable,
  Logger,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  RequestMethod,
} from '@nestjs/common';
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
import * as path from 'path';

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void): any {
    return (req, res, next) => {
      console.info('FrontendMiddleware', req, res);
      res.sendFile(path.resolve('../frontend/dist/my-app/index.html'));
    };
  }
}

// test
@Module({
  imports: [
    AuthModule,
    ProjectsSetupModule,
    StoriesDistModule,
    RepositoriesModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'IVANOVAA10.zav.mir\\IVANOVAA',
      username: 'prgacc',
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
