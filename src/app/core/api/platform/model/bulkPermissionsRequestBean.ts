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
import { BulkProjectPermissionsModel } from './bulkProjectPermissions';


/**
 * Details of global permissions to look up and project permissions with associated projects and issues to look up.
 */
export interface BulkPermissionsRequestBeanModel { 
    /**
     * Project permissions with associated projects and issues to look up.
     */
    projectPermissions?: Array<BulkProjectPermissionsModel>;
    /**
     * Global permissions to look up.
     */
    globalPermissions?: Array<string>;
}
