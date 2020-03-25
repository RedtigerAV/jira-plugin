/* tslint:disable */

import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AppPropertiesService } from './api/appProperties.service';
import { AuditRecordsService } from './api/auditRecords.service';
import { DashboardsService } from './api/dashboards.service';
import { DynamicModulesService } from './api/dynamicModules.service';
import { FilterSharingService } from './api/filterSharing.service';
import { FiltersService } from './api/filters.service';
import { GroupAndUserPickerService } from './api/groupAndUserPicker.service';
import { GroupsService } from './api/groups.service';
import { IssueAttachmentsService } from './api/issueAttachments.service';
import { IssueCommentPropertiesService } from './api/issueCommentProperties.service';
import { IssueCommentsService } from './api/issueComments.service';
import { IssueCustomFieldOptionsService } from './api/issueCustomFieldOptions.service';
import { IssueCustomFieldOptionsAppsService } from './api/issueCustomFieldOptionsApps.service';
import { IssueFieldConfigurationsService } from './api/issueFieldConfigurations.service';
import { IssueFieldsService } from './api/issueFields.service';
import { IssueLinkTypesService } from './api/issueLinkTypes.service';
import { IssueLinksService } from './api/issueLinks.service';
import { IssueNotificationSchemesService } from './api/issueNotificationSchemes.service';
import { IssuePrioritiesService } from './api/issuePriorities.service';
import { IssuePropertiesService } from './api/issueProperties.service';
import { IssueRemoteLinksService } from './api/issueRemoteLinks.service';
import { IssueResolutionsService } from './api/issueResolutions.service';
import { IssueSearchService } from './api/issueSearch.service';
import { IssueSecuritySchemesService } from './api/issueSecuritySchemes.service';
import { IssueTypePropertiesService } from './api/issueTypeProperties.service';
import { IssueTypeSchemesService } from './api/issueTypeSchemes.service';
import { IssueTypesService } from './api/issueTypes.service';
import { IssueVotesService } from './api/issueVotes.service';
import { IssueWatchersService } from './api/issueWatchers.service';
import { IssueWorklogPropertiesService } from './api/issueWorklogProperties.service';
import { IssueWorklogsService } from './api/issueWorklogs.service';
import { IssuesService } from './api/issues.service';
import { JQLService } from './api/jQL.service';
import { JiraExpressionsService } from './api/jiraExpressions.service';
import { JiraSettingsService } from './api/jiraSettings.service';
import { LabelsService } from './api/labels.service';
import { MyselfService } from './api/myself.service';
import { PermissionsService } from './api/permissions.service';
import { ProjectAvatarsService } from './api/projectAvatars.service';
import { ProjectCategoriesService } from './api/projectCategories.service';
import { ProjectComponentsService } from './api/projectComponents.service';
import { ProjectPermissionSchemesService } from './api/projectPermissionSchemes.service';
import { ProjectPropertiesService } from './api/projectProperties.service';
import { ProjectRoleActorsService } from './api/projectRoleActors.service';
import { ProjectRolesService } from './api/projectRoles.service';
import { ProjectTypesService } from './api/projectTypes.service';
import { ProjectVersionsService } from './api/projectVersions.service';
import { ProjectsService } from './api/projects.service';
import { ScreensService } from './api/screens.service';
import { ServerInfoService } from './api/serverInfo.service';
import { TasksService } from './api/tasks.service';
import { TimeTrackingService } from './api/timeTracking.service';
import { UserPropertiesService } from './api/userProperties.service';
import { UserSearchService } from './api/userSearch.service';
import { UsersService } from './api/users.service';
import { WebhooksService } from './api/webhooks.service';
import { WorkflowSchemeDraftsService } from './api/workflowSchemeDrafts.service';
import { WorkflowSchemeProjectAssociationsService } from './api/workflowSchemeProjectAssociations.service';
import { WorkflowSchemesService } from './api/workflowSchemes.service';
import { WorkflowStatusCategoriesService } from './api/workflowStatusCategories.service';
import { WorkflowStatusesService } from './api/workflowStatuses.service';
import { WorkflowTransitionPropertiesService } from './api/workflowTransitionProperties.service';
import { WorkflowTransitionRulesService } from './api/workflowTransitionRules.service';
import { WorkflowsService } from './api/workflows.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AppPropertiesService,
    AuditRecordsService,
    DashboardsService,
    DynamicModulesService,
    FilterSharingService,
    FiltersService,
    GroupAndUserPickerService,
    GroupsService,
    IssueAttachmentsService,
    IssueCommentPropertiesService,
    IssueCommentsService,
    IssueCustomFieldOptionsService,
    IssueCustomFieldOptionsAppsService,
    IssueFieldConfigurationsService,
    IssueFieldsService,
    IssueLinkTypesService,
    IssueLinksService,
    IssueNotificationSchemesService,
    IssuePrioritiesService,
    IssuePropertiesService,
    IssueRemoteLinksService,
    IssueResolutionsService,
    IssueSearchService,
    IssueSecuritySchemesService,
    IssueTypePropertiesService,
    IssueTypeSchemesService,
    IssueTypesService,
    IssueVotesService,
    IssueWatchersService,
    IssueWorklogPropertiesService,
    IssueWorklogsService,
    IssuesService,
    JQLService,
    JiraExpressionsService,
    JiraSettingsService,
    LabelsService,
    MyselfService,
    PermissionsService,
    ProjectAvatarsService,
    ProjectCategoriesService,
    ProjectComponentsService,
    ProjectPermissionSchemesService,
    ProjectPropertiesService,
    ProjectRoleActorsService,
    ProjectRolesService,
    ProjectTypesService,
    ProjectVersionsService,
    ProjectsService,
    ScreensService,
    ServerInfoService,
    TasksService,
    TimeTrackingService,
    UserPropertiesService,
    UserSearchService,
    UsersService,
    WebhooksService,
    WorkflowSchemeDraftsService,
    WorkflowSchemeProjectAssociationsService,
    WorkflowSchemesService,
    WorkflowStatusCategoriesService,
    WorkflowStatusesService,
    WorkflowTransitionPropertiesService,
    WorkflowTransitionRulesService,
    WorkflowsService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
