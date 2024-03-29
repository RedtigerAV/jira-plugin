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
 * The description of the page of issues loaded by the provided JQL query.
 */
export interface IssuesJqlMetaDataBeanModel { 
    /**
     * The index of the first issue.
     */
    startAt: number;
    /**
     * The maximum number of issues that could be loaded in this evaluation.
     */
    maxResults: number;
    /**
     * The number of issues that were loaded in this evaluation.
     */
    count: number;
    /**
     * The total number of issues the JQL returned.
     */
    totalCount: number;
    /**
     * Any warnings related to the JQL query. Present only if the validation mode was set to `warn`.
     */
    validationWarnings?: Array<string>;
}

