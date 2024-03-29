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
 * Metadata for an item in an attachment archive.
 */
export interface AttachmentArchiveItemReadableModel { 
    /**
     * The path of the archive item.
     */
    readonly path?: string;
    /**
     * The position of the item within the archive.
     */
    readonly index?: number;
    /**
     * The size of the archive item.
     */
    readonly size?: string;
    /**
     * The MIME type of the archive item.
     */
    readonly mediaType?: string;
    /**
     * The label for the archive item.
     */
    readonly label?: string;
}

