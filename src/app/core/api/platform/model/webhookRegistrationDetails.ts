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
import { WebhookDetailsModel } from './webhookDetails';


/**
 * Details of webhooks to register.
 */
export interface WebhookRegistrationDetailsModel { 
    /**
     * A list of webhooks.
     */
    webhooks: Array<WebhookDetailsModel>;
    /**
     * The URL that specifies where to send the webhooks.
     */
    url: string;
}

