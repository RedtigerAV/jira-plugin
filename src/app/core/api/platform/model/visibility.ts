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
 * The group or role to which this item is visible.
 */
export interface VisibilityModel { 
  [key: string]: object | any;


    /**
     * Indicates whether visibility of this item is restricted to a group or role.
     */
    type?: VisibilityModel.TypeModelEnum;
    /**
     * The name of the group or role to which visibility of this item is restricted.
     */
    value?: string;
}
export namespace VisibilityModel {
    export type TypeModelEnum = 'group' | 'role';
    export const TypeModelEnum = {
        Group: 'group' as TypeModelEnum,
        Role: 'role' as TypeModelEnum
    };
}
