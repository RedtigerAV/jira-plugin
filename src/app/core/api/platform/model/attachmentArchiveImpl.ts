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
import { AttachmentArchiveEntryModel } from './attachmentArchiveEntry';


export interface AttachmentArchiveImplModel { 
    /**
     * The list of the items included in the archive.
     */
    entries?: Array<AttachmentArchiveEntryModel>;
    /**
     * The number of items in the archive.
     */
    totalEntryCount?: number;
}

