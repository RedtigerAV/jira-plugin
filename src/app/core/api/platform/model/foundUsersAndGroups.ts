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
import { FoundGroupsModel } from './foundGroups';
import { FoundUsersModel } from './foundUsers';


/**
 * List of users and groups found in a search.
 */
export interface FoundUsersAndGroupsModel { 
    users?: FoundUsersModel;
    groups?: FoundGroupsModel;
}

