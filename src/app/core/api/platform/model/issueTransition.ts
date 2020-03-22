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
import { FieldMetadataModel } from './fieldMetadata';
import { StatusDetailsModel } from './statusDetails';


/**
 * Details of an issue transition.
 */
export interface IssueTransitionModel { 
  [key: string]: object | any;


    /**
     * The ID of the issue transition. Required when specifying a transition to undertake.
     */
    id?: string;
    /**
     * The name of the issue transition.
     */
    readonly name?: string;
    /**
     * Details of the issue status after the transition.
     */
    readonly to?: StatusDetailsModel;
    /**
     * Whether there is a screen associated with the issue transition.
     */
    readonly hasScreen?: boolean;
    /**
     * Whether the issue transition is global, that is, the transition is applied to issues regardless of their status.
     */
    readonly isGlobal?: boolean;
    /**
     * Whether this is the initial issue transition for the workflow.
     */
    readonly isInitial?: boolean;
    /**
     * Whether the transition is available to be performed.
     */
    readonly isAvailable?: boolean;
    /**
     * Whether the issue has to meet criteria before the issue transition is applied.
     */
    readonly isConditional?: boolean;
    /**
     * Details of the fields associated with the issue transition screen. Use this information to populate `fields` and `update` in a transition request.
     */
    readonly fields?: { [key: string]: FieldMetadataModel; };
    /**
     * Expand options that include additional transition details in the response.
     */
    readonly expand?: string;
}

