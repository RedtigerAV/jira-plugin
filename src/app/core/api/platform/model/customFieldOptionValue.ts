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
 * Value of a custom field option and the values of its cascading options.
 */
export interface CustomFieldOptionValueModel { 
    /**
     * The value of the custom field option.
     */
    value: string;
    /**
     * The cascading options.
     */
    cascadingOptions?: Array<string>;
}
