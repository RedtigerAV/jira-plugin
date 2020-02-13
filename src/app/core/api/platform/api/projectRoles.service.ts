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

import { CreateUpdateRoleRequestBeanModel } from '../model/createUpdateRoleRequestBean';
import { ProjectRoleModel } from '../model/projectRole';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class ProjectRolesService {

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
     * Create project role
     * Creates a new project role with no [default actors](#api-rest-api-2-resolution-get). You can use the [Add default actors to project role](#api-rest-api-2-role-id-actors-post) operation to add default actors to the project role after creating it.  *Note that although a new project role is available to all projects upon creation, any default actors that are associated with the project role are not added to projects that existed prior to the role being created.*&lt;  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param createUpdateRoleRequestBeanModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createProjectRole(createUpdateRoleRequestBeanModel: CreateUpdateRoleRequestBeanModel, observe?: 'body', reportProgress?: boolean): Observable<ProjectRoleModel>;
    public createProjectRole(createUpdateRoleRequestBeanModel: CreateUpdateRoleRequestBeanModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProjectRoleModel>>;
    public createProjectRole(createUpdateRoleRequestBeanModel: CreateUpdateRoleRequestBeanModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProjectRoleModel>>;
    public createProjectRole(createUpdateRoleRequestBeanModel: CreateUpdateRoleRequestBeanModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (createUpdateRoleRequestBeanModel === null || createUpdateRoleRequestBeanModel === undefined) {
            throw new Error('Required parameter createUpdateRoleRequestBeanModel was null or undefined when calling createProjectRole.');
        }

        let headers = this.defaultHeaders;

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

        return this.httpClient.post<ProjectRoleModel>(`${this.configuration.basePath}/rest/api/2/role`,
            createUpdateRoleRequestBeanModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete project role
     * Deletes a project role. You must specify a replacement project role if you wish to delete a project role that is in use.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param id The ID of the project role to delete. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role IDs.
     * @param swap The ID of the project role that will replace the one being deleted.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteProjectRole(id: number, swap?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteProjectRole(id: number, swap?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteProjectRole(id: number, swap?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteProjectRole(id: number, swap?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteProjectRole.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (swap !== undefined && swap !== null) {
            queryParameters = queryParameters.set('swap', <any>swap);
        }

        let headers = this.defaultHeaders;

        // authentication (basicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.configuration.basePath}/rest/api/2/role/${encodeURIComponent(String(id))}`,
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
     * Fully update project role
     * Updates the project role\&#39;s name and description. You must include both a name and a description in the request.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param id The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role IDs.
     * @param createUpdateRoleRequestBeanModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public fullyUpdateProjectRole(id: number, createUpdateRoleRequestBeanModel: CreateUpdateRoleRequestBeanModel, observe?: 'body', reportProgress?: boolean): Observable<ProjectRoleModel>;
    public fullyUpdateProjectRole(id: number, createUpdateRoleRequestBeanModel: CreateUpdateRoleRequestBeanModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProjectRoleModel>>;
    public fullyUpdateProjectRole(id: number, createUpdateRoleRequestBeanModel: CreateUpdateRoleRequestBeanModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProjectRoleModel>>;
    public fullyUpdateProjectRole(id: number, createUpdateRoleRequestBeanModel: CreateUpdateRoleRequestBeanModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling fullyUpdateProjectRole.');
        }
        if (createUpdateRoleRequestBeanModel === null || createUpdateRoleRequestBeanModel === undefined) {
            throw new Error('Required parameter createUpdateRoleRequestBeanModel was null or undefined when calling fullyUpdateProjectRole.');
        }

        let headers = this.defaultHeaders;

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

        return this.httpClient.put<ProjectRoleModel>(`${this.configuration.basePath}/rest/api/2/role/${encodeURIComponent(String(id))}`,
            createUpdateRoleRequestBeanModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get all project roles
     * Gets a list of all project roles, complete with project role details and default actors.  ### About project roles ###  [Project roles](https://confluence.atlassian.com/x/3odKLg) are a flexible way to to associate users and groups with projects. In Jira Cloud, the list of project roles is shared globally with all projects, but each project can have a different set of actors associated with it (unlike groups, which have the same membership throughout all Jira applications).  Project roles are used in [permission schemes](#api-rest-api-2-permissionscheme-get), [email notification schemes](#api-rest-api-2-notificationscheme-get), [issue security levels](#api-rest-api-2-issuesecurityschemes-get), [comment visibility](#api-rest-api-2-comment-list-post), and workflow conditions.  #### Members and actors ####  In the Jira REST API, a member of a project role is called an *actor*. An *actor* is a group or user associated with a project role.  Actors may be set as [default members](https://confluence.atlassian.com/x/3odKLg#Managingprojectroles-Specifying\&#39;defaultmembers\&#39;foraprojectrole) of the project role or set at the project level:   *  Default actors: Users and groups that are assigned to the project role for all newly created projects. The default actors can be removed at the project level later if desired.  *  Actors: Users and groups that are associated with a project role for a project, which may differ from the default actors. This enables you to assign a user to different roles in different projects.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllProjectRoles(observe?: 'body', reportProgress?: boolean): Observable<Array<ProjectRoleModel>>;
    public getAllProjectRoles(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ProjectRoleModel>>>;
    public getAllProjectRoles(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ProjectRoleModel>>>;
    public getAllProjectRoles(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<ProjectRoleModel>>(`${this.configuration.basePath}/rest/api/2/role`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get project role for project
     * Returns a project role\&#39;s details and actors associated with the project. The list of actors is sorted by display name.  To check whether a user belongs to a role based on their group memberships, use [Get user](#api-rest-api-2-user-get) with the &#x60;groups&#x60; expand parameter selected. Then check whether the user keys and groups match with the actors returned for the project.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:** *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param projectIdOrKey The project ID or project key (case sensitive).
     * @param id The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role IDs.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getProjectRole(projectIdOrKey: string, id: number, observe?: 'body', reportProgress?: boolean): Observable<ProjectRoleModel>;
    public getProjectRole(projectIdOrKey: string, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProjectRoleModel>>;
    public getProjectRole(projectIdOrKey: string, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProjectRoleModel>>;
    public getProjectRole(projectIdOrKey: string, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (projectIdOrKey === null || projectIdOrKey === undefined) {
            throw new Error('Required parameter projectIdOrKey was null or undefined when calling getProjectRole.');
        }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getProjectRole.');
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

        return this.httpClient.get<ProjectRoleModel>(`${this.configuration.basePath}/rest/api/2/project/${encodeURIComponent(String(projectIdOrKey))}/role/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get project role by ID
     * Gets the project role details and the default actors associated with the role. The list of default actors is sorted by display name.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param id The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role IDs.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getProjectRoleById(id: number, observe?: 'body', reportProgress?: boolean): Observable<ProjectRoleModel>;
    public getProjectRoleById(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProjectRoleModel>>;
    public getProjectRoleById(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProjectRoleModel>>;
    public getProjectRoleById(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getProjectRoleById.');
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

        return this.httpClient.get<ProjectRoleModel>(`${this.configuration.basePath}/rest/api/2/role/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get project role details
     * Returns all [project roles](https://confluence.atlassian.com/x/3odKLg) and the details for each role. Note that the list of project roles is common to all projects.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
     * @param projectIdOrKey The project ID or project key (case sensitive).
     * @param currentMember Whether the roles should be filtered to include only those the user is assigned to.
     * @param excludeConnectAddons 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getProjectRoleDetails(projectIdOrKey: string, currentMember?: boolean, excludeConnectAddons?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<ProjectRoleModel>>;
    public getProjectRoleDetails(projectIdOrKey: string, currentMember?: boolean, excludeConnectAddons?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ProjectRoleModel>>>;
    public getProjectRoleDetails(projectIdOrKey: string, currentMember?: boolean, excludeConnectAddons?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ProjectRoleModel>>>;
    public getProjectRoleDetails(projectIdOrKey: string, currentMember?: boolean, excludeConnectAddons?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (projectIdOrKey === null || projectIdOrKey === undefined) {
            throw new Error('Required parameter projectIdOrKey was null or undefined when calling getProjectRoleDetails.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (currentMember !== undefined && currentMember !== null) {
            queryParameters = queryParameters.set('currentMember', <any>currentMember);
        }
        if (excludeConnectAddons !== undefined && excludeConnectAddons !== null) {
            queryParameters = queryParameters.set('excludeConnectAddons', <any>excludeConnectAddons);
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

        return this.httpClient.get<Array<ProjectRoleModel>>(`${this.configuration.basePath}/rest/api/2/project/${encodeURIComponent(String(projectIdOrKey))}/roledetails`,
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
     * Get project roles for project
     * Returns a list of [project roles](https://confluence.atlassian.com/x/3odKLg) for the project returning the name and self URL for each role.  Note that all project roles are shared with all projects in Jira Cloud. See [Get all project roles](#api-rest-api-2-role-get) for more information.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:** *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for any project on the site or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param projectIdOrKey The project ID or project key (case sensitive).
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getProjectRoles(projectIdOrKey: string, observe?: 'body', reportProgress?: boolean): Observable<{ [key: string]: string; }>;
    public getProjectRoles(projectIdOrKey: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<{ [key: string]: string; }>>;
    public getProjectRoles(projectIdOrKey: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<{ [key: string]: string; }>>;
    public getProjectRoles(projectIdOrKey: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (projectIdOrKey === null || projectIdOrKey === undefined) {
            throw new Error('Required parameter projectIdOrKey was null or undefined when calling getProjectRoles.');
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

        return this.httpClient.get<{ [key: string]: string; }>(`${this.configuration.basePath}/rest/api/2/project/${encodeURIComponent(String(projectIdOrKey))}/role`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Partial update project role
     * Updates either the project role\&#39;s name or its description.  You cannot update both the name and description at the same time using this operation. If you send a request with a name and a description only the name is updated.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param id The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role IDs.
     * @param createUpdateRoleRequestBeanModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public partialUpdateProjectRole(id: number, createUpdateRoleRequestBeanModel: CreateUpdateRoleRequestBeanModel, observe?: 'body', reportProgress?: boolean): Observable<ProjectRoleModel>;
    public partialUpdateProjectRole(id: number, createUpdateRoleRequestBeanModel: CreateUpdateRoleRequestBeanModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProjectRoleModel>>;
    public partialUpdateProjectRole(id: number, createUpdateRoleRequestBeanModel: CreateUpdateRoleRequestBeanModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProjectRoleModel>>;
    public partialUpdateProjectRole(id: number, createUpdateRoleRequestBeanModel: CreateUpdateRoleRequestBeanModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling partialUpdateProjectRole.');
        }
        if (createUpdateRoleRequestBeanModel === null || createUpdateRoleRequestBeanModel === undefined) {
            throw new Error('Required parameter createUpdateRoleRequestBeanModel was null or undefined when calling partialUpdateProjectRole.');
        }

        let headers = this.defaultHeaders;

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

        return this.httpClient.post<ProjectRoleModel>(`${this.configuration.basePath}/rest/api/2/role/${encodeURIComponent(String(id))}`,
            createUpdateRoleRequestBeanModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
