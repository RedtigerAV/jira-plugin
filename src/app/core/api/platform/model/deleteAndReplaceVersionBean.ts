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
import { CustomFieldReplacementModel } from './customFieldReplacement';


export interface DeleteAndReplaceVersionBeanModel { 
    /**
     * The ID of the version to update `fixVersion` to when the field contains the deleted version.
     */
    moveFixIssuesTo?: number;
    /**
     * The ID of the version to update `affectedVersion` to when the field contains the deleted version.
     */
    moveAffectedIssuesTo?: number;
    /**
     * An array of custom field IDs (`customFieldId`) and version IDs (`moveTo`) to update when the fields contain the deleted version.
     */
    customFieldReplacementList?: Array<CustomFieldReplacementModel>;
}

