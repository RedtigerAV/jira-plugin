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
import { ProjectIssueCreateMetadataModel } from './projectIssueCreateMetadata';


/**
 * The wrapper for the issue creation metadata for a list of projects.
 */
export interface IssueCreateMetadataModel { 
    /**
     * Expand options that include additional project details in the response.
     */
    readonly expand?: string;
    /**
     * List of projects and their issue creation metadata.
     */
    readonly projects?: Array<ProjectIssueCreateMetadataModel>;
}
