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
import { IssueTypeInfoModel } from './issueTypeInfo';


/**
 * Details of an issue type hierarchy level.
 */
export interface ProjectIssueTypesHierarchyLevelModel { 
    /**
     * The ID of the issue type hierarchy level.
     */
    readonly entityId?: string;
    /**
     * The level of the issue type hierarchy level.
     */
    readonly level?: number;
    /**
     * The name of the issue type hierarchy level.
     */
    readonly name?: string;
    /**
     * The list of issue types in the hierarchy level.
     */
    readonly issueTypes?: Array<IssueTypeInfoModel>;
}
