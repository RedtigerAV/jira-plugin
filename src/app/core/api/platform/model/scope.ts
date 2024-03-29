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
import { ProjectForScopeModel } from './projectForScope';


/**
 * The projects the item is associated with. Indicated for items associated with [next-gen projects](https://confluence.atlassian.com/x/loMyO).
 */
export interface ScopeModel { 
  [key: string]: object | any;


    /**
     * The type of scope.
     */
    readonly type?: ScopeModel.TypeModelEnum;
    /**
     * The project the item has scope in.
     */
    readonly project?: ProjectForScopeModel;
}
export namespace ScopeModel {
    export type TypeModelEnum = 'PROJECT' | 'TEMPLATE';
    export const TypeModelEnum = {
        PROJECT: 'PROJECT' as TypeModelEnum,
        TEMPLATE: 'TEMPLATE' as TypeModelEnum
    };
}

