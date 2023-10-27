/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuildItemDto } from '../models/BuildItemDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BuildsService {

    /**
     * @param branchId 
     * @returns BuildItemDto 
     * @throws ApiError
     */
    public static buildsControllerGetBuilds(
branchId: string,
): CancelablePromise<Array<BuildItemDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/builds/{branchId}',
            path: {
                'branchId': branchId,
            },
        });
    }

}
