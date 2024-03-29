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
import { VersionUsageInCustomFieldModel } from './versionUsageInCustomField';


/**
 * Various counts of issues within a version.
 */
export interface VersionIssueCountsModel { 
    /**
     * The URL of these count details.
     */
    readonly self?: string;
    /**
     * Count of issues where the `fixVersion` is set to the version.
     */
    readonly issuesFixedCount?: number;
    /**
     * Count of issues where the `affectedVersion` is set to the version.
     */
    readonly issuesAffectedCount?: number;
    /**
     * Count of issues where a version custom field is set to the version.
     */
    readonly issueCountWithCustomFieldsShowingVersion?: number;
    /**
     * List of custom fields using the version.
     */
    readonly customFieldUsage?: Array<VersionUsageInCustomFieldModel>;
}

