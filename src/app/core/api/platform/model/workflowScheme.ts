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
import { IssueTypeDetailsModel } from './issueTypeDetails';
import { UserModel } from './user';


/**
 * Details about a workflow scheme.
 */
export interface WorkflowSchemeModel { 
    /**
     * The ID of the workflow scheme.
     */
    readonly id?: number;
    /**
     * The name of the workflow scheme. The name must be unique. The maximum length is 255 characters. Required when creating a workflow scheme.
     */
    name?: string;
    /**
     * The description of the workflow scheme.
     */
    description?: string;
    /**
     * The name of the default workflow for the workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. If `defaultWorkflow` is not specified when creating a workflow scheme, it is set to *Jira Workflow (jira)*.
     */
    defaultWorkflow?: string;
    /**
     * The issue type to workflow mappings, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme.
     */
    issueTypeMappings?: { [key: string]: string; };
    /**
     * For draft workflow schemes, this property is the name of the default workflow for the original workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira.
     */
    readonly originalDefaultWorkflow?: string;
    /**
     * For draft workflow schemes, this property is the issue type to workflow mappings for the original workflow scheme, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme.
     */
    readonly originalIssueTypeMappings?: { [key: string]: string; };
    /**
     * Whether the workflow scheme is a draft or not.
     */
    readonly draft?: boolean;
    /**
     * The user that last modified the draft workflow scheme. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows.
     */
    readonly lastModifiedUser?: UserModel;
    /**
     * The date-time that the draft workflow scheme was last modified. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows.
     */
    readonly lastModified?: string;
    readonly self?: string;
    /**
     * Whether to create or update a draft workflow scheme when updating an active workflow scheme. An active workflow scheme is a workflow scheme that is used by at least one project. The following examples show how this property works:   *  Update an active workflow scheme with `updateDraftIfNeeded` set to `true`: If a draft workflow scheme exists, it is updated. Otherwise, a draft workflow scheme is created.  *  Update an active workflow scheme with `updateDraftIfNeeded` set to `false`: An error is returned, as active workflow schemes cannot be updated.  *  Update an inactive workflow scheme with `updateDraftIfNeeded` set to `true`: The workflow scheme is updated, as inactive workflow schemes do not require drafts to update.  Defaults to `false`.
     */
    updateDraftIfNeeded?: boolean;
    /**
     * The issue types available in Jira.
     */
    readonly issueTypes?: { [key: string]: IssueTypeDetailsModel; };
}

