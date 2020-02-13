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
import { AvatarModel } from './avatar';


/**
 * Details about system and custom avatars.
 */
export interface AvatarsModel { 
    /**
     * System avatars list.
     */
    readonly system?: Array<AvatarModel>;
    /**
     * Custom avatars list.
     */
    readonly custom?: Array<AvatarModel>;
}

