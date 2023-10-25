import {
  BranchEntity,
  BuildEntity,
  RepositoryEntity,
  StoryItemEntity,
} from '@entities';
import { BranchDto, BuildItemDto, ProjectItemDto, StoryItemDto } from '@dto';

export class Mappers {
  public static repoEntityToDto(entity: RepositoryEntity): ProjectItemDto {
    const r = new ProjectItemDto();
    r.id = entity.id;
    r.name = entity.name;
    r.image = null;
    return r;
  }

  public static branchEntityToDto(entity: BranchEntity): BranchDto {
    const b = new BranchDto();
    b.id = entity.id;
    b.name = entity.name;
    b.repositoryId = entity.repositoryId;
    return b;
  }

  public static buildEntityToDto(entity: BuildEntity): BuildItemDto {
    const b = new BuildItemDto();
    b.id = entity.id;
    b.name = entity.name;
    b.lastChanged = entity.lastChanged;
    return b;
  }

  public static storyItemEntityToDto(entity: StoryItemEntity): StoryItemDto {
    const s = new StoryItemDto();
    s.id = entity.id;
    s.name = entity.name;
    s.reviewerId = entity.reviewer?.id;
    s.status = entity.status;
    return s;
  }
}
