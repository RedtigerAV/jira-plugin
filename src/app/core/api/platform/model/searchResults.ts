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
import { IssueBeanModel } from './issueBean';
import { JsonTypeBeanModel } from './jsonTypeBean';


/**
 * The result of a JQL search.
 */
export interface SearchResultsModel { 
    /**
     * Expand options that include additional search result details in the response.
     */
    readonly expand?: string;
    /**
     * The index of the first item returned on the page.
     */
    readonly startAt?: number;
    /**
     * The maximum number of results that could be on the page.
     */
    readonly maxResults?: number;
    /**
     * The number of results on the page.
     */
    readonly total?: number;
    /**
     * The list of issues found by the search.
     */
    readonly issues?: Array<IssueBeanModel>;
    /**
     * Any warnings related to the JQL query.
     */
    readonly warningMessages?: Array<string>;
    /**
     * The ID and name of each field in the search results.
     */
    readonly names?: { [key: string]: string; };
    /**
     * The schema describing the field types in the search results.
     */
    readonly schema?: { [key: string]: JsonTypeBeanModel; };
}
