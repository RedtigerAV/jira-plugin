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
import { WebhookModel } from './webhook';


/**
 * A page of items.
 */
export interface PageBeanWebhookModel { 
    /**
     * The URL of the page.
     */
    readonly self?: string;
    /**
     * If there is another page of results, the URL of the next page.
     */
    readonly nextPage?: string;
    /**
     * The maximum number of items that could be returned.
     */
    readonly maxResults?: number;
    /**
     * The index of the first item returned.
     */
    readonly startAt?: number;
    /**
     * The number of items returned.
     */
    readonly total?: number;
    /**
     * Indicates whether this is the last page.
     */
    readonly isLast?: boolean;
    /**
     * The list of items.
     */
    readonly values?: Array<WebhookModel>;
}

