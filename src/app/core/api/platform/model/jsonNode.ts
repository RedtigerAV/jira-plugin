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


export interface JsonNodeModel { 
    elements?: object;
    number?: boolean;
    valueNode?: boolean;
    containerNode?: boolean;
    missingNode?: boolean;
    object?: boolean;
    pojo?: boolean;
    integralNumber?: boolean;
    floatingPointNumber?: boolean;
    _int?: boolean;
    _long?: boolean;
    _double?: boolean;
    bigDecimal?: boolean;
    bigInteger?: boolean;
    textual?: boolean;
    _boolean?: boolean;
    binary?: boolean;
    numberValue?: number;
    numberType?: JsonNodeModel.NumberTypeModelEnum;
    intValue?: number;
    longValue?: number;
    bigIntegerValue?: number;
    doubleValue?: number;
    decimalValue?: number;
    booleanValue?: boolean;
    binaryValue?: Array<string>;
    valueAsInt?: number;
    valueAsLong?: number;
    valueAsDouble?: number;
    valueAsBoolean?: boolean;
    fieldNames?: object;
    textValue?: string;
    valueAsText?: string;
    array?: boolean;
    fields?: object;
    _null?: boolean;
}
export namespace JsonNodeModel {
    export type NumberTypeModelEnum = 'INT' | 'LONG' | 'BIG_INTEGER' | 'FLOAT' | 'DOUBLE' | 'BIG_DECIMAL';
    export const NumberTypeModelEnum = {
        INT: 'INT' as NumberTypeModelEnum,
        LONG: 'LONG' as NumberTypeModelEnum,
        BIGINTEGER: 'BIG_INTEGER' as NumberTypeModelEnum,
        FLOAT: 'FLOAT' as NumberTypeModelEnum,
        DOUBLE: 'DOUBLE' as NumberTypeModelEnum,
        BIGDECIMAL: 'BIG_DECIMAL' as NumberTypeModelEnum
    };
}

