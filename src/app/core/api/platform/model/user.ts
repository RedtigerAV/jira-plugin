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
import { AvatarUrlsBeanModel } from './avatarUrlsBean';
import { SimpleListWrapperApplicationRoleModel } from './simpleListWrapperApplicationRole';
import { SimpleListWrapperGroupNameModel } from './simpleListWrapperGroupName';


/**
 * A user with details as permitted by the user\'s Atlassian Account privacy settings. However, be aware of these exceptions:   *  User record deleted from Atlassian: This occurs as the result of a right to be forgotten request. In this case, `displayName` provides an indication and other parameters have default values or are blank (for example, email is blank).  *  User record corrupted: This occurs as a results of events such as a server import and can only happen to deleted users. In this case, `accountId` returns *unknown* and all other parameters have fallback values.  *  User record unavailable: This usually occurs due to an internal service outage. In this case, all parameters have fallback values.
 */
export interface UserModel { 
    /**
     * The URL of the user.
     */
    readonly self?: string;
    /**
     * This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.
     */
    key?: string;
    /**
     * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required in requests.
     */
    accountId?: string;
    /**
     * The user account type. Can take the following values:   *  `atlassian` regular Atlassian user account  *  `app` system account used for Connect applications and OAuth to represent external systems  *  `customer` Jira Service Desk account representing an external service desk
     */
    readonly accountType?: UserModel.AccountTypeModelEnum;
    /**
     * This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.
     */
    name?: string;
    /**
     * The email address of the user. Depending on the user’s privacy setting, this may be returned as null.
     */
    readonly emailAddress?: string;
    /**
     * The avatars of the user.
     */
    readonly avatarUrls?: AvatarUrlsBeanModel;
    /**
     * The display name of the user. Depending on the user’s privacy setting, this may return an alternative value.
     */
    readonly displayName?: string;
    /**
     * Indicates whether the user is active.
     */
    readonly active?: boolean;
    /**
     * The time zone specified in the user\'s profile. Depending on the user’s privacy setting, this may be returned as null.
     */
    readonly timeZone?: string;
    /**
     * The locale of the user. Depending on the user’s privacy setting, this may be returned as null.
     */
    readonly locale?: string;
    /**
     * The groups that the user belongs to.
     */
    readonly groups?: SimpleListWrapperGroupNameModel;
    /**
     * The application roles the user is assigned to.
     */
    readonly applicationRoles?: SimpleListWrapperApplicationRoleModel;
    /**
     * Expand options that include additional user details in the response.
     */
    readonly expand?: string;
}
export namespace UserModel {
    export type AccountTypeModelEnum = 'atlassian' | 'app' | 'customer' | 'unknown';
    export const AccountTypeModelEnum = {
        Atlassian: 'atlassian' as AccountTypeModelEnum,
        App: 'app' as AccountTypeModelEnum,
        Customer: 'customer' as AccountTypeModelEnum,
        Unknown: 'unknown' as AccountTypeModelEnum
    };
}
