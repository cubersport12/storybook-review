/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MetadataPublishDto } from '../models/MetadataPublishDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PublisherService {

    /**
     * @param formData 
     * @returns MetadataPublishDto 
     * @throws ApiError
     */
    public static metadataPublisherControllerPublishMetadata(
formData: MetadataPublishDto,
): CancelablePromise<MetadataPublishDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/metadata-publisher/publish',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

}
