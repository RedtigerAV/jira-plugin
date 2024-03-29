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
import { ScreenTypeIDsBeanModel } from './screenTypeIDsBean';


/**
 * A screen scheme.
 */
export interface ScreenSchemeModel { 
    /**
     * The ID of the screen scheme.
     */
    id?: number;
    /**
     * The name of the screen scheme.
     */
    name?: string;
    /**
     * The description of the screen scheme.
     */
    description?: string;
    /**
     * IDs of the screens for the associated screen types.
     */
    screens?: ScreenTypeIDsBeanModel;
}

