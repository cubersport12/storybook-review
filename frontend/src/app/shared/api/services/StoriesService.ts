/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuildItemDto } from '../models/BuildItemDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StoriesService {

    /**
     * @param buildId 
     * @returns BuildItemDto 
     * @throws ApiError
     */
    public static storiesControllerGetStories(
buildId: number,
): CancelablePromise<Array<BuildItemDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stories/{buildId}',
            path: {
                'buildId': buildId,
            },
        });
    }

}
