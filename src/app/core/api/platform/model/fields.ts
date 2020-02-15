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
import { IssueTypeDetailsModel } from './issueTypeDetails';
import { PriorityModel } from './priority';
import { StatusDetailsModel } from './statusDetails';
import { UserDetailsModel } from './userDetails';


/**
 * Key fields from the linked issue.
 */
export interface FieldsModel { 
    /**
     * The summary description of the linked issue.
     */
    readonly summary?: string;
    /**
     * The status of the linked issue.
     */
    readonly status?: StatusDetailsModel;
    /**
     * The priority of the linked issue.
     */
    readonly priority?: PriorityModel;
    /**
     * The assignee of the linked issue.
     */
    readonly assignee?: UserDetailsModel;
    issuetype?: IssueTypeDetailsModel;
    /**
     * The type of the linked issue.
     */
    readonly issueType?: IssueTypeDetailsModel;
}
