/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MetadataPublishDto = {
    /**
     * Ид проекта
     */
    projectId: string;
    /**
     * Файл данных
     */
    file: Blob;
    /**
     * Кто публикует
     */
    who: string;
    /**
     * С какой ветки
     */
    branchName: string;
};
