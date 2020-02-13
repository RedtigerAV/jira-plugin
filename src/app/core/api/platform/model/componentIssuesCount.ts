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


/**
 * Count of issues assigned to a component.
 */
export interface ComponentIssuesCountModel { 
    /**
     * The URL for this count of issues for a component.
     */
    readonly self?: string;
    /**
     * The count of issues assigned to a component.
     */
    readonly issueCount?: number;
}

