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
import { GroupNameModel } from './groupName';
import { UserDetailsModel } from './userDetails';


/**
 * Details of the users and groups to receive the notification.
 */
export interface NotificationRecipientsModel { 
  [key: string]: object | any;


    /**
     * Indicates whether the notification should be sent to the issue\'s reporter.
     */
    reporter?: boolean;
    /**
     * Indicates whether the notification should be sent to the issue\'s assignees.
     */
    assignee?: boolean;
    /**
     * Indicates whether the notification should be sent to the issue\'s watchers.
     */
    watchers?: boolean;
    /**
     * Indicates whether the notification should be sent to the issue\'s voters.
     */
    voters?: boolean;
    /**
     * List of users to receive the notification.
     */
    users?: Array<UserDetailsModel>;
    /**
     * List of groups to receive the notification.
     */
    groups?: Array<GroupNameModel>;
}

