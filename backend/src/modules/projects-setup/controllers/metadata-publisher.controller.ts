import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MetadataPublishDto, PublishResultDto } from '@dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '@entities';
import { PublisherService } from '../services/publisher.service';

@Controller('metadata-publisher')
@ApiTags('publisher')
export class MetadataPublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post('publish')
  @ApiResponse({
    status: HttpStatus.OK,
    type: MetadataPublishDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @Public()
  public async publishMetadata(
    @UploadedFile() file: Express.Multer.File,
    @Body() metadata: MetadataPublishDto,
  ) {
    const data: PublishResultDto[] = JSON.parse(file.buffer.toString('utf8'));
    await this.publisherService.publishMetadata(data, metadata);
  }
}
