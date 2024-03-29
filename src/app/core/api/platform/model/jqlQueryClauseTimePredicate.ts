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
import { JqlQueryClauseOperandModel } from './jqlQueryClauseOperand';


/**
 * A time predicate for a temporal JQL clause.
 */
export interface JqlQueryClauseTimePredicateModel { 
    /**
     * The operator between the field and the operand.
     */
    operator: JqlQueryClauseTimePredicateModel.OperatorModelEnum;
    operand: JqlQueryClauseOperandModel;
}
export namespace JqlQueryClauseTimePredicateModel {
    export type OperatorModelEnum = 'before' | 'after' | 'from' | 'to' | 'on' | 'during' | 'by';
    export const OperatorModelEnum = {
        Before: 'before' as OperatorModelEnum,
        After: 'after' as OperatorModelEnum,
        From: 'from' as OperatorModelEnum,
        To: 'to' as OperatorModelEnum,
        On: 'on' as OperatorModelEnum,
        During: 'during' as OperatorModelEnum,
        By: 'by' as OperatorModelEnum
    };
}

