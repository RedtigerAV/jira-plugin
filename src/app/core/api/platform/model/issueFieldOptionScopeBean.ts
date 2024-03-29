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
import { GlobalScopeBeanModel } from './globalScopeBean';
import { ProjectScopeBeanModel } from './projectScopeBean';


export interface IssueFieldOptionScopeBeanModel { 
    /**
     * DEPRECATED
     */
    projects?: Array<number>;
    /**
     * Defines the projects in which the option is available and the behavior of the option within each project. Specify one object per project. The behavior of the option in a project context overrides the behavior in the global context.
     */
    projects2?: Array<ProjectScopeBeanModel>;
    /**
     * Defines the behavior of the option within the global context. If this property is set, even if set to an empty object, then the option is available in all projects.
     */
    global?: GlobalScopeBeanModel;
}

