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
 * Details of the scope of the default sharing for new filters and dashboards.
 */
export interface DefaultShareScopeModel { 
    /**
     * The scope of the default sharing for new filters and dashboards:   *  `AUTHENTICATED` Shared with all logged-in users.  *  `GLOBAL` Shared with all logged-in users. This shows as `AUTHENTICATED` in the response.  *  `PRIVATE` Not shared with any users.
     */
    scope: DefaultShareScopeModel.ScopeModelEnum;
}
export namespace DefaultShareScopeModel {
    export type ScopeModelEnum = 'GLOBAL' | 'AUTHENTICATED' | 'PRIVATE';
    export const ScopeModelEnum = {
        GLOBAL: 'GLOBAL' as ScopeModelEnum,
        AUTHENTICATED: 'AUTHENTICATED' as ScopeModelEnum,
        PRIVATE: 'PRIVATE' as ScopeModelEnum
    };
}
