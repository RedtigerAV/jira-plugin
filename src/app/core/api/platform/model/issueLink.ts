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
import { IssueLinkTypeModel } from './issueLinkType';
import { LinkedIssueModel } from './linkedIssue';


/**
 * Details of a link between issues.
 */
export interface IssueLinkModel { 
    /**
     * The ID of the issue link.
     */
    readonly id?: string;
    /**
     * The URL of the issue link.
     */
    readonly self?: string;
    /**
     * The type of link between the issues.
     */
    type?: IssueLinkTypeModel;
    /**
     * The issue the link joins to.
     */
    inwardIssue?: LinkedIssueModel;
    /**
     * The issue the link originates from.
     */
    outwardIssue?: LinkedIssueModel;
}

