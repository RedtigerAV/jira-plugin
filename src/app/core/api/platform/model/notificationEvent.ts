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
 * Details about a notification event.
 */
export interface NotificationEventModel { 
    /**
     * The ID of the event. The event can be a [Jira system event](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or a [custom event](https://confluence.atlassian.com/x/AIlKLg).
     */
    id?: number;
    /**
     * The name of the event.
     */
    name?: string;
    /**
     * The description of the event.
     */
    description?: string;
    /**
     * The template of the event. Only custom events configured by Jira administrators have template.
     */
    templateEvent?: NotificationEventModel;
}

