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
import { JqlQueryFieldModel } from './jqlQueryField';


/**
 * An element of the order-by JQL clause.
 */
export interface JqlQueryOrderByClauseElementModel { 
    field?: JqlQueryFieldModel;
    /**
     * The direction in which to order the results.
     */
    direction?: JqlQueryOrderByClauseElementModel.DirectionModelEnum;
}
export namespace JqlQueryOrderByClauseElementModel {
    export type DirectionModelEnum = 'asc' | 'desc';
    export const DirectionModelEnum = {
        Asc: 'asc' as DirectionModelEnum,
        Desc: 'desc' as DirectionModelEnum
    };
}

