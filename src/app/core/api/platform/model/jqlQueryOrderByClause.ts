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
import { JqlQueryOrderByClauseElementModel } from './jqlQueryOrderByClauseElement';


/**
 * Details of the order-by JQL clause.
 */
export interface JqlQueryOrderByClauseModel { 
    /**
     * The list of order-by clause fields and their ordering directives.
     */
    fields: Array<JqlQueryOrderByClauseElementModel>;
}

