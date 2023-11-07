/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRepoDto } from '../models/CreateRepoDto';
import type { ListProjectsDto } from '../models/ListProjectsDto';
import type { ProjectItemDto } from '../models/ProjectItemDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReposService {

    /**
     * @returns ListProjectsDto 
     * @throws ApiError
     */
    public static reposControllerGetRepos(): CancelablePromise<ListProjectsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/repos/list',
        });
    }

    /**
     * @param requestBody 
     * @returns ProjectItemDto 
     * @throws ApiError
     */
    public static reposControllerGenerateRepo(
requestBody: CreateRepoDto,
): CancelablePromise<ProjectItemDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/repos/generate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
