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
 * Details of an avatar.
 */
export interface AvatarModel { 
    /**
     * The ID of the avatar.
     */
    id: string;
    /**
     * The owner of the avatar. For a system avatar the owner is null (and nothing is returned). For non-system avatars this is the appropriate identifier, such as the ID for a project or the account ID for a user.
     */
    readonly owner?: string;
    /**
     * Indicates whether the avatar is a system avatar.
     */
    readonly isSystemAvatar?: boolean;
    /**
     * Indicates whether the avatar is used in Jira. For example, shown as a project\'s avatar.
     */
    readonly isSelected?: boolean;
    /**
     * Indicates whether the avatar can be deleted.
     */
    readonly isDeletable?: boolean;
    /**
     * The file name of the avatar icon. Returned for system avatars.
     */
    readonly fileName?: string;
    /**
     * The list of avatar icon URLs.
     */
    readonly urls?: { [key: string]: string; };
}
