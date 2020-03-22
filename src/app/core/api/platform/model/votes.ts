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
import { UserModel } from './user';


/**
 * The details of votes on an issue.
 */
export interface VotesModel { 
    /**
     * The URL of these issue vote details.
     */
    readonly self?: string;
    /**
     * The number of votes on the issue.
     */
    readonly votes?: number;
    /**
     * Whether the user making this request has voted on the issue.
     */
    readonly hasVoted?: boolean;
    /**
     * List of the users who have voted on this issue. An empty list is returned when the calling user doesn\'t have the *View voters and watchers* project permission.
     */
    readonly voters?: Array<UserModel>;
}

