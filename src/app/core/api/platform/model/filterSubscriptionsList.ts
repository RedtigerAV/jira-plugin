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
import { FilterSubscriptionModel } from './filterSubscription';


/**
 * A paginated list of subscriptions to a filter.
 */
export interface FilterSubscriptionsListModel { 
    /**
     * The number of items on the page.
     */
    readonly size?: number;
    /**
     * The list of items.
     */
    readonly items?: Array<FilterSubscriptionModel>;
    /**
     * The maximum number of results that could be on the page.
     */
    readonly maxResults?: number;
    /**
     * The index of the first item returned on the page.
     */
    readonly startIndex?: number;
    /**
     * The index of the last item returned on the page.
     */
    readonly endIndex?: number;
}

