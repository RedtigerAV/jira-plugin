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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { BulkPermissionGrantsModel } from '../model/bulkPermissionGrants';
import { BulkPermissionsRequestBeanModel } from '../model/bulkPermissionsRequestBean';
import { ErrorCollectionModel } from '../model/errorCollection';
import { PermissionsKeysBeanModel } from '../model/permissionsKeysBean';
import { PermissionsModel } from '../model/permissions';
import { PermittedProjectsModel } from '../model/permittedProjects';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

    protected basePath = 'https://timgo.atlassian.net';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {

        if (configuration) {
            this.configuration = configuration;
            this.configuration.basePath = configuration.basePath || basePath || this.basePath;

        } else {
            this.configuration.basePath = basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Get bulk permissions
     * Returns:   *  for a list of global permissions, the global permissions granted to the user.  *  for a list of project permissions and lists of projects and issues, for each project permission a list of the projects and issues the user can access or manipulate.  Note that:   *  Invalid project and issue IDs are ignored.  *  A maximum of 1000 projects and 1000 issues can be checked.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:** None.
     * @param bulkPermissionsRequestBeanModel Details of the permissions to check.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBulkPermissions(bulkPermissionsRequestBeanModel: BulkPermissionsRequestBeanModel, observe?: 'body', reportProgress?: boolean): Observable<BulkPermissionGrantsModel>;
    public getBulkPermissions(bulkPermissionsRequestBeanModel: BulkPermissionsRequestBeanModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BulkPermissionGrantsModel>>;
    public getBulkPermissions(bulkPermissionsRequestBeanModel: BulkPermissionsRequestBeanModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BulkPermissionGrantsModel>>;
    public getBulkPermissions(bulkPermissionsRequestBeanModel: BulkPermissionsRequestBeanModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (bulkPermissionsRequestBeanModel === null || bulkPermissionsRequestBeanModel === undefined) {
            throw new Error('Required parameter bulkPermissionsRequestBeanModel was null or undefined when calling getBulkPermissions.');
        }

        let headers = this.defaultHeaders;

        // authentication (OAuth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<BulkPermissionGrantsModel>(`${this.configuration.basePath}/rest/api/3/permissions/check`,
            bulkPermissionsRequestBeanModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get my permissions
     * Returns a list of permissions indicating which permissions the user has. Details of the user\&#39;s permissions can be obtained in a global, project, or issue context.  The user is reported as having a project permission:   *  in the global context, if the user has the project permission in any project.  *  for a project, where the project permission is determined using issue data, if the user meets the permission\&#39;s criteria for any issue in the project. Otherwise, if the user has the project permission in the project.  *  for an issue, where a project permission is determined using issue data, if the user has the permission in the issue. Otherwise, if the user has the project permission in the project containing the issue.  This means that users may be shown as having an issue permission (such as EDIT\\_ISSUE) in the global context or a project context but may not have the permission for any or all issues. For example, if Reporters have the EDIT\\_ISSUE permission a user would be shown as having this permission in the global context or the context of a project, because any user can be a reporter. However, if they are not the user who reported the issue queried they would not have EDIT\\_ISSUE permission for that issue.  Global permissions are unaffected by context.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:** None.
     * @param projectKey The key of project. Ignored if &#x60;projectId&#x60; is provided.
     * @param projectId The ID of project.
     * @param issueKey The key of the issue. Ignored if &#x60;issueId&#x60; is provided.
     * @param issueId The ID of the issue.
     * @param permissions A list of permission keys. This parameter accepts a comma-separated list. [ Omitting this parameter is **deprecated**.](https://developer.atlassian.com/cloud/jira/platform/change-notice-get-my-permissions-requires-permissions-query-parameter/) To get the list of available permissions, use [Get all permissions](#api-rest-api-3-permissions-get). Note that deprecated keys cannot be used. Deprecated keys are not returned by [Get all permissions](#api-rest-api-3-permissions-get) but are returned by this operation if &#x60;permissions&#x60; is omitted.
     * @param projectUuid 
     * @param projectConfigurationUuid 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getMyPermissions(projectKey?: string, projectId?: string, issueKey?: string, issueId?: string, permissions?: string, projectUuid?: string, projectConfigurationUuid?: string, observe?: 'body', reportProgress?: boolean): Observable<PermissionsModel>;
    public getMyPermissions(projectKey?: string, projectId?: string, issueKey?: string, issueId?: string, permissions?: string, projectUuid?: string, projectConfigurationUuid?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PermissionsModel>>;
    public getMyPermissions(projectKey?: string, projectId?: string, issueKey?: string, issueId?: string, permissions?: string, projectUuid?: string, projectConfigurationUuid?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PermissionsModel>>;
    public getMyPermissions(projectKey?: string, projectId?: string, issueKey?: string, issueId?: string, permissions?: string, projectUuid?: string, projectConfigurationUuid?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (projectKey !== undefined && projectKey !== null) {
            queryParameters = queryParameters.set('projectKey', <any>projectKey);
        }
        if (projectId !== undefined && projectId !== null) {
            queryParameters = queryParameters.set('projectId', <any>projectId);
        }
        if (issueKey !== undefined && issueKey !== null) {
            queryParameters = queryParameters.set('issueKey', <any>issueKey);
        }
        if (issueId !== undefined && issueId !== null) {
            queryParameters = queryParameters.set('issueId', <any>issueId);
        }
        if (permissions !== undefined && permissions !== null) {
            queryParameters = queryParameters.set('permissions', <any>permissions);
        }
        if (projectUuid !== undefined && projectUuid !== null) {
            queryParameters = queryParameters.set('projectUuid', <any>projectUuid);
        }
        if (projectConfigurationUuid !== undefined && projectConfigurationUuid !== null) {
            queryParameters = queryParameters.set('projectConfigurationUuid', <any>projectConfigurationUuid);
        }

        let headers = this.defaultHeaders;

        // authentication (OAuth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<PermissionsModel>(`${this.configuration.basePath}/rest/api/3/mypermissions`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get permitted projects
     * Returns all the projects where the user is granted a list of project permissions.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:** None.
     * @param permissionsKeysBeanModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getPermittedProjects(permissionsKeysBeanModel: PermissionsKeysBeanModel, observe?: 'body', reportProgress?: boolean): Observable<PermittedProjectsModel>;
    public getPermittedProjects(permissionsKeysBeanModel: PermissionsKeysBeanModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PermittedProjectsModel>>;
    public getPermittedProjects(permissionsKeysBeanModel: PermissionsKeysBeanModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PermittedProjectsModel>>;
    public getPermittedProjects(permissionsKeysBeanModel: PermissionsKeysBeanModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (permissionsKeysBeanModel === null || permissionsKeysBeanModel === undefined) {
            throw new Error('Required parameter permissionsKeysBeanModel was null or undefined when calling getPermittedProjects.');
        }

        let headers = this.defaultHeaders;

        // authentication (OAuth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<PermittedProjectsModel>(`${this.configuration.basePath}/rest/api/3/permissions/project`,
            permissionsKeysBeanModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
