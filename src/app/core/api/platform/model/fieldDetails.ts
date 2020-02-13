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
import { JsonTypeBeanModel } from './jsonTypeBean';
import { ScopeModel } from './scope';


/**
 * Details about a field.
 */
export interface FieldDetailsModel { 
    /**
     * The ID of the field.
     */
    id?: string;
    /**
     * The key of the field.
     */
    key?: string;
    /**
     * The name of the field.
     */
    name?: string;
    /**
     * Indicates whether the field is a custom field.
     */
    custom?: boolean;
    /**
     * Indicates whether the content of the field can be used to order lists.
     */
    orderable?: boolean;
    /**
     * Indicates whether the field can be used as a column on the issue navigator.
     */
    navigable?: boolean;
    /**
     * Indicates whether the content of the field can be searched.
     */
    searchable?: boolean;
    /**
     * The names that can be used to reference the field in an advanced search. For more information, see [Advanced searching - fields reference](https://confluence.atlassian.com/x/gwORLQ).
     */
    clauseNames?: Array<string>;
    /**
     * The scope of the field.
     */
    scope?: ScopeModel;
    /**
     * The data schema for the field.
     */
    schema?: JsonTypeBeanModel;
}

