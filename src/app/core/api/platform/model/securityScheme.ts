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
import { SecurityLevelModel } from './securityLevel';


/**
 * Details about a security scheme.
 */
export interface SecuritySchemeModel { 
    /**
     * The URL of the issue security scheme.
     */
    readonly self?: string;
    /**
     * The ID of the issue security scheme.
     */
    readonly id?: number;
    /**
     * The name of the issue security scheme.
     */
    readonly name?: string;
    /**
     * The description of the issue security scheme.
     */
    readonly description?: string;
    /**
     * The ID of the default security level.
     */
    readonly defaultSecurityLevelId?: number;
    levels?: Array<SecurityLevelModel>;
}
