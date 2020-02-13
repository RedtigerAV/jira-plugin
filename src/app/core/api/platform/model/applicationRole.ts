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
 * Details of an application role.
 */
export interface ApplicationRoleModel { 
    /**
     * The key of the application role.
     */
    key?: string;
    /**
     * The groups associated with the application role.
     */
    groups?: Array<string>;
    /**
     * The display name of the application role.
     */
    name?: string;
    /**
     * The groups that are granted default access for this application role.
     */
    defaultGroups?: Array<string>;
    /**
     * Determines whether this application role should be selected by default on user creation.
     */
    selectedByDefault?: boolean;
    /**
     * Deprecated.
     */
    defined?: boolean;
    /**
     * The maximum count of users on your license.
     */
    numberOfSeats?: number;
    /**
     * The count of users remaining on your license.
     */
    remainingSeats?: number;
    /**
     * The number of users counting against your license.
     */
    userCount?: number;
    /**
     * The [type of users](https://confluence.atlassian.com/x/lRW3Ng) being counted against your license.
     */
    userCountDescription?: string;
    hasUnlimitedSeats?: boolean;
    /**
     * Indicates if the application role belongs to Jira platform (`jira-core`).
     */
    platform?: boolean;
}

