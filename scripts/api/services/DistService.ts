/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DistService {

    /**
     * @param repoId 
     * @param branchId 
     * @param fileName 
     * @returns any 
     * @throws ApiError
     */
    public static storiesDistControllerStoryDist(
repoId: string,
branchId: string,
fileName: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stories-dist/{repoId}/{branchId}/{fileName}',
            path: {
                'repoId': repoId,
                'branchId': branchId,
                'fileName': fileName,
            },
        });
    }

}
