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
import { JqlQueryUnitaryOperandModel } from './jqlQueryUnitaryOperand';


/**
 * An operand that is a list of values.
 */
export interface ListOperandModel { 
    /**
     * The list of operand values.
     */
    values?: Array<JqlQueryUnitaryOperandModel>;
}
