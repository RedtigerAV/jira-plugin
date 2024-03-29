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
import { DashboardModel } from './dashboard';


/**
 * A page containing dashboard details.
 */
export interface PageOfDashboardsModel { 
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
     * The URL of the previous page of results, if any.
     */
    readonly prev?: string;
    /**
     * The URL of the next page of results, if any.
     */
    readonly next?: string;
    /**
     * List of dashboards.
     */
    readonly dashboards?: Array<DashboardModel>;
}

