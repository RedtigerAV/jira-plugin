/* tslint:disable */

/**
 * The Jira Cloud platform REST API
 * Jira Cloud platform REST API documentation
 *
 * The version of the OpenAPI document: 1001.0.0-SNAPSHOT
 * Contact: ecosystem@atlassian.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface IssueTypeCreateBeanModel { 
    /**
     * The unique name for the issue type. The maximum length is 60 characters.
     */
    name: string;
    /**
     * The description of the issue type.
     */
    description?: string;
    /**
     * Whether the issue type is `subtype` or `standard`. Defaults to `standard`.
     */
    type?: IssueTypeCreateBeanModel.TypeModelEnum;
}
export namespace IssueTypeCreateBeanModel {
    export type TypeModelEnum = 'subtask' | 'standard';
    export const TypeModelEnum = {
        Subtask: 'subtask' as TypeModelEnum,
        Standard: 'standard' as TypeModelEnum
    };
}
