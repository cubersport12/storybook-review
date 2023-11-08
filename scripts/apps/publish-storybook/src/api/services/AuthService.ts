/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginResultDto } from '../models/LoginResultDto';
import type { LoginUserDto } from '../models/LoginUserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Авторизоваться в системе
     * @param requestBody 
     * @returns LoginResultDto Success
     * @throws ApiError
     */
    public static authControllerLogin(
requestBody: LoginUserDto,
): CancelablePromise<LoginResultDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
