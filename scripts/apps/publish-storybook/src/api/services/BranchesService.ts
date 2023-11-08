/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BranchDto } from '../models/BranchDto';
import type { CreateBranchDto } from '../models/CreateBranchDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BranchesService {

    /**
     * @param repoId 
     * @returns BranchDto 
     * @throws ApiError
     */
    public static branchesControllerGetBranches(
repoId: string,
): CancelablePromise<Array<BranchDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/branches/list/{repoId}',
            path: {
                'repoId': repoId,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static branchesControllerCreateBranch(
requestBody: CreateBranchDto,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/branches',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
