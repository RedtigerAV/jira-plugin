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
 * A project category.
 */
export interface ProjectCategoryModel { 
    /**
     * The URL of the project category.
     */
    readonly self?: string;
    /**
     * The ID of the project category.
     */
    readonly id?: string;
    /**
     * The name of the project category. Required on create, optional on update.
     */
    name?: string;
    /**
     * The description of the project category. Required on create, optional on update.
     */
    description?: string;
}

