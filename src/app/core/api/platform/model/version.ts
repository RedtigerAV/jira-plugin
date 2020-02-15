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
import { SimpleLinkModel } from './simpleLink';
import { VersionIssuesStatusModel } from './versionIssuesStatus';


/**
 * Details about a project version.
 */
export interface VersionModel { 
    /**
     * Use [expand](em>#expansion) to include additional information about version in the response. This parameter accepts a comma-separated list. Expand options include:   *  `operations` Returns the list of operations available for this version.  *  `issuesstatus` Returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*.  Optional for create and update.
     */
    expand?: string;
    /**
     * The URL of the version.
     */
    readonly self?: string;
    /**
     * The ID of the version.
     */
    readonly id?: string;
    /**
     * The description of the version. Optional when creating or updating a version.
     */
    description?: string;
    /**
     * The unique name of the version. Required when creating a version. Optional when updating a version. The maximum length is 255 characters.
     */
    name?: string;
    /**
     * Indicates that the version is archived. Optional when creating or updating a version.
     */
    archived?: boolean;
    /**
     * Indicates that the version is released. If the version is released a request to release again is ignored. Not applicable when creating a version. Optional when updating a version.
     */
    released?: boolean;
    /**
     * The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version.
     */
    startDate?: string;
    /**
     * The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version.
     */
    releaseDate?: string;
    /**
     * Indicates that the version is overdue.
     */
    readonly overdue?: boolean;
    /**
     * The date on which work on this version is expected to start, expressed in the instance\'s *Day/Month/Year Format* date format.
     */
    readonly userStartDate?: string;
    /**
     * The date on which work on this version is expected to finish, expressed in the instance\'s *Day/Month/Year Format* date format.
     */
    readonly userReleaseDate?: string;
    /**
     * Deprecated. Use `projectId`.
     */
    project?: string;
    /**
     * The ID of the project to which this version is attached. Required when creating a version. Not applicable when updating a version.
     */
    projectId?: number;
    /**
     * The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not applicable when creating a version. Optional when updating a version.
     */
    moveUnfixedIssuesTo?: string;
    /**
     * If the expand option `operations` is used, returns the list of operations available for this version.
     */
    readonly operations?: Array<SimpleLinkModel>;
    /**
     * If the expand option `issuesstatus` is used, returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*.
     */
    readonly issuesStatusForFixVersion?: VersionIssuesStatusModel;
}
