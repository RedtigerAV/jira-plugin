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
import { AvatarUrlsBeanModel } from './avatarUrlsBean';
import { ComponentModel } from './component';
import { HierarchyModel } from './hierarchy';
import { IssueTypeDetailsModel } from './issueTypeDetails';
import { ProjectCategoryModel } from './projectCategory';
import { ProjectInsightModel } from './projectInsight';
import { ProjectPermissionsModel } from './projectPermissions';
import { UserModel } from './user';
import { VersionModel } from './version';


/**
 * Details about a project.
 */
export interface ProjectModel { 
    /**
     * Expand options that include additional project details in the response.
     */
    readonly expand?: string;
    /**
     * The URL of the project details.
     */
    readonly self?: string;
    /**
     * The ID of the project.
     */
    id?: string;
    /**
     * The key of the project.
     */
    readonly key?: string;
    /**
     * A brief description of the project.
     */
    readonly description?: string;
    /**
     * The username of the project lead.
     */
    readonly lead?: UserModel;
    /**
     * List of the components contained in the project.
     */
    readonly components?: Array<ComponentModel>;
    /**
     * List of the issue types available in the project.
     */
    readonly issueTypes?: Array<IssueTypeDetailsModel>;
    /**
     * A link to information about this project, such as project documentation.
     */
    readonly url?: string;
    /**
     * An email address associated with the project.
     */
    email?: string;
    /**
     * The default assignee when creating issues for this project.
     */
    readonly assigneeType?: ProjectModel.AssigneeTypeModelEnum;
    /**
     * The versions defined in the project. For more information, see [Create version](#api-rest-api-2-version-post).
     */
    readonly versions?: Array<VersionModel>;
    /**
     * The name of the project.
     */
    readonly name?: string;
    /**
     * The name and self URL for each role defined in the project. For more information, see [Create project role](#api-rest-api-2-role-post).
     */
    readonly roles?: { [key: string]: string; };
    /**
     * The URLs of the project\'s avatars.
     */
    readonly avatarUrls?: AvatarUrlsBeanModel;
    /**
     * The category the project belongs to.
     */
    readonly projectCategory?: ProjectCategoryModel;
    /**
     * The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project.
     */
    readonly projectTypeKey?: ProjectModel.ProjectTypeKeyModelEnum;
    /**
     * Whether the project is simplified.
     */
    readonly simplified?: boolean;
    /**
     * The type of the project.
     */
    readonly style?: ProjectModel.StyleModelEnum;
    /**
     * Whether the project is selected as a favorite.
     */
    favourite?: boolean;
    /**
     * Whether the project is private.
     */
    readonly isPrivate?: boolean;
    /**
     * The issue type hierarchy for the project
     */
    readonly issueTypeHierarchy?: HierarchyModel;
    /**
     * User permissions on the project
     */
    readonly permissions?: ProjectPermissionsModel;
    /**
     * Map of project properties
     */
    readonly properties?: { [key: string]: object; };
    /**
     * Unique ID for next-gen projects.
     */
    readonly uuid?: string;
    /**
     * Insights about the project.
     */
    readonly insight?: ProjectInsightModel;
    /**
     * Whether the project is marked as deleted.
     */
    readonly deleted?: boolean;
    /**
     * The date when the project is deleted permanently.
     */
    readonly retentionTillDate?: Date;
    /**
     * The date when the project was marked as deleted.
     */
    readonly deletedDate?: Date;
    /**
     * The user who marked the project as deleted.
     */
    readonly deletedBy?: UserModel;
}
export namespace ProjectModel {
    export type AssigneeTypeModelEnum = 'PROJECT_LEAD' | 'UNASSIGNED';
    export const AssigneeTypeModelEnum = {
        PROJECTLEAD: 'PROJECT_LEAD' as AssigneeTypeModelEnum,
        UNASSIGNED: 'UNASSIGNED' as AssigneeTypeModelEnum
    };
    export type ProjectTypeKeyModelEnum = 'software' | 'service_desk' | 'business';
    export const ProjectTypeKeyModelEnum = {
        Software: 'software' as ProjectTypeKeyModelEnum,
        ServiceDesk: 'service_desk' as ProjectTypeKeyModelEnum,
        Business: 'business' as ProjectTypeKeyModelEnum
    };
    export type StyleModelEnum = 'CLASSIC' | 'NEXTGEN' | 'classic' | 'next-gen';
    export const StyleModelEnum = {
        CLASSIC: 'CLASSIC' as StyleModelEnum,
        NEXTGEN: 'NEXTGEN' as StyleModelEnum,
        Classic: 'classic' as StyleModelEnum,
        NextGen: 'next-gen' as StyleModelEnum
    };
}
