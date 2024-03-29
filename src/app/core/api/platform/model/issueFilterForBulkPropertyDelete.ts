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
 * Bulk operation filter details.
 */
export interface IssueFilterForBulkPropertyDeleteModel { 
    /**
     * List of issues to perform the bulk delete operation on.
     */
    entityIds?: Array<number>;
    /**
     * The value of properties to perform the bulk operation on.
     */
    currentValue?: object;
}

