import { Module } from '@nestjs/common';
import { StoriesDistController } from './controllers/stories-dist.controller';
import { StoriesDistService } from './services/stories-dist.service';
import { RepositoriesModule } from '@repositories';

@Module({
  imports: [RepositoriesModule],
  providers: [StoriesDistService],
  controllers: [StoriesDistController],
})
export class StoriesDistModule {}
