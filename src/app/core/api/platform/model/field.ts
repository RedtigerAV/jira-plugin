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
import { FieldLastUsedModel } from './fieldLastUsed';
import { JsonTypeBeanModel } from './jsonTypeBean';


/**
 * Details of a field.
 */
export interface FieldModel { 
    /**
     * The ID of the field.
     */
    id: string;
    /**
     * The name of the field.
     */
    name: string;
    schema?: JsonTypeBeanModel;
    /**
     * The description of the field.
     */
    description?: string;
    /**
     * The key of the field.
     */
    key?: string;
    /**
     * Whether the field is locked.
     */
    isLocked?: boolean;
    /**
     * Number of screens where the field is used.
     */
    screensCount?: number;
    /**
     * Number of contexts where the field is used.
     */
    contextsCount?: number;
    lastUsed?: FieldLastUsedModel;
}
