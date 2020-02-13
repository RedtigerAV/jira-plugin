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


export interface VersionMoveBeanModel { 
    /**
     * The URL (self link) of the version after which to place the moved version. Cannot be used with `position`.
     */
    after?: string;
    /**
     * An absolute position in which to place the moved version. Cannot be used with `after`.
     */
    position?: VersionMoveBeanModel.PositionModelEnum;
}
export namespace VersionMoveBeanModel {
    export type PositionModelEnum = 'Earlier' | 'Later' | 'First' | 'Last';
    export const PositionModelEnum = {
        Earlier: 'Earlier' as PositionModelEnum,
        Later: 'Later' as PositionModelEnum,
        First: 'First' as PositionModelEnum,
        Last: 'Last' as PositionModelEnum
    };
}

