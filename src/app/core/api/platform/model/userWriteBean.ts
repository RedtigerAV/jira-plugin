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


export interface UserWriteBeanModel { 
  [key: string]: object | any;


    /**
     * The URL of the user.
     */
    readonly self?: string;
    /**
     * The key for the user. When provided with `name`, overrides the value in `name` to set both `name` and `key`. This property is deprecated because of privacy changes. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.
     */
    key?: string;
    /**
     * The username for the user. This property is deprecated because of privacy changes. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.
     */
    name?: string;
    /**
     * A password for the user. If a password is not set, a random password is generated.
     */
    password?: string;
    /**
     * The email address for the user.
     */
    emailAddress: string;
    /**
     * The display name for the user.
     */
    displayName: string;
    /**
     * Sends the user an email confirmation that they have been added to Jira. Default is `false`.
     */
    notification?: string;
    /**
     * Deprecated, do not use.
     */
    applicationKeys?: Array<string>;
}

