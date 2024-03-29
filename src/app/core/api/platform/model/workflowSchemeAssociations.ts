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
import { WorkflowSchemeModel } from './workflowScheme';


/**
 * A workflow scheme along with a list of projects that use it.
 */
export interface WorkflowSchemeAssociationsModel { 
    /**
     * The list of projects that use the workflow scheme.
     */
    projectIds: Array<string>;
    /**
     * The workflow scheme.
     */
    workflowScheme?: WorkflowSchemeModel;
}

