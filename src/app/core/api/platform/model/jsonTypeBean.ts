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
 * The schema of a field.
 */
export interface JsonTypeBeanModel { 
    /**
     * The data type of the field.
     */
    readonly type: string;
    /**
     * When the data type is an array, the name of the field items within the array.
     */
    readonly items?: string;
    /**
     * If the field is a system field, the name of the field.
     */
    readonly system?: string;
    /**
     * If the field is a custom field, the URI of the field.
     */
    readonly custom?: string;
    /**
     * If the field is a custom field, the custom ID of the field.
     */
    readonly customId?: number;
    /**
     * If the field is a custom field, the configuration of the field.
     */
    readonly configuration?: { [key: string]: object; };
}
