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
import { UserBeanAvatarUrlsModel } from './userBeanAvatarUrls';


export interface UserBeanModel { 
    /**
     * This property is deprecated in favor of `accountId` because of privacy changes. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.   The key of the user.
     */
    key?: string;
    /**
     * The URL of the user.
     */
    self?: string;
    /**
     * This property is deprecated in favor of `accountId` because of privacy changes. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.   The username of the user.
     */
    name?: string;
    /**
     * The display name of the user. Depending on the user’s privacy setting, this may return an alternative value.
     */
    displayName?: string;
    /**
     * Whether the user is active.
     */
    active?: boolean;
    /**
     * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
     */
    accountId?: string;
    /**
     * The avatars of the user.
     */
    avatarUrls?: UserBeanAvatarUrlsModel;
}

