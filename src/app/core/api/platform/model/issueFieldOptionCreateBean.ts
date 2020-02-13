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
import { IssueFieldOptionConfigurationModel } from './issueFieldOptionConfiguration';


export interface IssueFieldOptionCreateBeanModel { 
  [key: string]: object | any;


    /**
     * The option\'s name, which is displayed in Jira.
     */
    value: string;
    /**
     * The properties of the option as arbitrary key-value pairs. These properties can be searched using JQL, if the extractions (see https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/) are defined in the descriptor for the issue field module.
     */
    properties?: { [key: string]: object; };
    config?: IssueFieldOptionConfigurationModel;
}

