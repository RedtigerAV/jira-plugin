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
import { ProjectIssueTypesHierarchyLevelModel } from './projectIssueTypesHierarchyLevel';


/**
 * The hierarchy of issue types within a project.
 */
export interface ProjectIssueTypeHierarchyModel { 
    /**
     * The ID of the project.
     */
    readonly projectId?: number;
    /**
     * Details of an issue type hierarchy level.
     */
    readonly hierarchy?: Array<ProjectIssueTypesHierarchyLevelModel>;
}

