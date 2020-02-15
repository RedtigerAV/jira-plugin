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
import { WorkflowIdModel } from './workflowId';


/**
 * Details of any errors encountered while updating workflow transition rules for a workflow.
 */
export interface WorkflowTransitionRulesUpdateErrorDetailsModel { 
    workflowId?: WorkflowIdModel;
    /**
     * A list of transition rule update errors, indexed by the transition rule ID. Any transition rule that appears here wasn\'t updated.
     */
    ruleUpdateErrors: { [key: string]: Array<string>; };
    /**
     * The list of errors that specify why the workflow update failed. The workflow was not updated if the list contains any entries.
     */
    updateErrors?: Array<string>;
}
