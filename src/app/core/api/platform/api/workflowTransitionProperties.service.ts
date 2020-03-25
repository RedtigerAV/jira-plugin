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

import { WorkflowTransitionPropertyModel } from '../model/workflowTransitionProperty';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class WorkflowTransitionPropertiesService {

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
     * Create workflow transition property
     * Adds a property to a workflow transition. Transition properties are used to change the behavior of a transition. For more information, see [Transition properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param transitionId The ID of the transition. To get the ID, view the workflow in text mode in the Jira admin settings. The ID is shown next to the transition.
     * @param key The key of the property being added, also known as the name of the property. Set this to the same value as the &#x60;key&#x60; defined in the request body.
     * @param workflowName The name of the workflow that the transition belongs to.
     * @param requestBody 
     * @param workflowMode The workflow status. Set to *live* for inactive workflows or *draft* for draft workflows. Active workflows cannot be edited.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createWorkflowTransitionProperty(transitionId: number, key: string, workflowName: string, requestBody: { [key: string]: object; }, workflowMode?: 'live' | 'draft', observe?: 'body', reportProgress?: boolean): Observable<WorkflowTransitionPropertyModel>;
    public createWorkflowTransitionProperty(transitionId: number, key: string, workflowName: string, requestBody: { [key: string]: object; }, workflowMode?: 'live' | 'draft', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<WorkflowTransitionPropertyModel>>;
    public createWorkflowTransitionProperty(transitionId: number, key: string, workflowName: string, requestBody: { [key: string]: object; }, workflowMode?: 'live' | 'draft', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<WorkflowTransitionPropertyModel>>;
    public createWorkflowTransitionProperty(transitionId: number, key: string, workflowName: string, requestBody: { [key: string]: object; }, workflowMode?: 'live' | 'draft', observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (transitionId === null || transitionId === undefined) {
            throw new Error('Required parameter transitionId was null or undefined when calling createWorkflowTransitionProperty.');
        }
        if (key === null || key === undefined) {
            throw new Error('Required parameter key was null or undefined when calling createWorkflowTransitionProperty.');
        }
        if (workflowName === null || workflowName === undefined) {
            throw new Error('Required parameter workflowName was null or undefined when calling createWorkflowTransitionProperty.');
        }
        if (requestBody === null || requestBody === undefined) {
            throw new Error('Required parameter requestBody was null or undefined when calling createWorkflowTransitionProperty.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (key !== undefined && key !== null) {
            queryParameters = queryParameters.set('key', <any>key);
        }
        if (workflowName !== undefined && workflowName !== null) {
            queryParameters = queryParameters.set('workflowName', <any>workflowName);
        }
        if (workflowMode !== undefined && workflowMode !== null) {
            queryParameters = queryParameters.set('workflowMode', <any>workflowMode);
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

        return this.httpClient.post<WorkflowTransitionPropertyModel>(`${this.configuration.basePath}/rest/api/3/workflow/transitions/${encodeURIComponent(String(transitionId))}/properties`,
            requestBody,
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
     * Delete workflow transition property
     * Deletes a property from a workflow transition. Transition properties are used to change the behavior of a transition. For more information, see [Transition properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param transitionId The ID of the transition. To get the ID, view the workflow in text mode in the Jira admin settings. The ID is shown next to the transition.
     * @param key The name of the transition property to delete, also known as the name of the property.
     * @param workflowName The name of the workflow that the transition belongs to.
     * @param workflowMode The workflow status. Set to &#x60;live&#x60; for inactive workflows or &#x60;draft&#x60; for draft workflows. Active workflows cannot be edited.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteWorkflowTransitionProperty(transitionId: number, key: string, workflowName: string, workflowMode?: 'live' | 'draft', observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteWorkflowTransitionProperty(transitionId: number, key: string, workflowName: string, workflowMode?: 'live' | 'draft', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteWorkflowTransitionProperty(transitionId: number, key: string, workflowName: string, workflowMode?: 'live' | 'draft', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteWorkflowTransitionProperty(transitionId: number, key: string, workflowName: string, workflowMode?: 'live' | 'draft', observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (transitionId === null || transitionId === undefined) {
            throw new Error('Required parameter transitionId was null or undefined when calling deleteWorkflowTransitionProperty.');
        }
        if (key === null || key === undefined) {
            throw new Error('Required parameter key was null or undefined when calling deleteWorkflowTransitionProperty.');
        }
        if (workflowName === null || workflowName === undefined) {
            throw new Error('Required parameter workflowName was null or undefined when calling deleteWorkflowTransitionProperty.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (key !== undefined && key !== null) {
            queryParameters = queryParameters.set('key', <any>key);
        }
        if (workflowName !== undefined && workflowName !== null) {
            queryParameters = queryParameters.set('workflowName', <any>workflowName);
        }
        if (workflowMode !== undefined && workflowMode !== null) {
            queryParameters = queryParameters.set('workflowMode', <any>workflowMode);
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

        return this.httpClient.delete<any>(`${this.configuration.basePath}/rest/api/3/workflow/transitions/${encodeURIComponent(String(transitionId))}/properties`,
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
     * Get workflow transition properties
     * Returns the properties on a workflow transition. Transition properties are used to change the behavior of a transition. For more information, see [Transition properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param transitionId The ID of the transition. To get the ID, view the workflow in text mode in the Jira administration console. The ID is shown next to the transition.
     * @param workflowName The name of the workflow that the transition belongs to.
     * @param includeReservedKeys Some properties with keys that have the *jira.* prefix are reserved, which means they are not editable. To include these properties in the results, set this parameter to *true*.
     * @param key The key of the property being returned, also known as the name of the property. If this parameter is not specified, all properties on the transition are returned.
     * @param workflowMode The workflow status. Set to *live* for active and inactive workflows, or *draft* for draft workflows.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getWorkflowTransitionProperties(transitionId: number, workflowName: string, includeReservedKeys?: boolean, key?: string, workflowMode?: 'live' | 'draft', observe?: 'body', reportProgress?: boolean): Observable<WorkflowTransitionPropertyModel>;
    public getWorkflowTransitionProperties(transitionId: number, workflowName: string, includeReservedKeys?: boolean, key?: string, workflowMode?: 'live' | 'draft', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<WorkflowTransitionPropertyModel>>;
    public getWorkflowTransitionProperties(transitionId: number, workflowName: string, includeReservedKeys?: boolean, key?: string, workflowMode?: 'live' | 'draft', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<WorkflowTransitionPropertyModel>>;
    public getWorkflowTransitionProperties(transitionId: number, workflowName: string, includeReservedKeys?: boolean, key?: string, workflowMode?: 'live' | 'draft', observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (transitionId === null || transitionId === undefined) {
            throw new Error('Required parameter transitionId was null or undefined when calling getWorkflowTransitionProperties.');
        }
        if (workflowName === null || workflowName === undefined) {
            throw new Error('Required parameter workflowName was null or undefined when calling getWorkflowTransitionProperties.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (includeReservedKeys !== undefined && includeReservedKeys !== null) {
            queryParameters = queryParameters.set('includeReservedKeys', <any>includeReservedKeys);
        }
        if (key !== undefined && key !== null) {
            queryParameters = queryParameters.set('key', <any>key);
        }
        if (workflowName !== undefined && workflowName !== null) {
            queryParameters = queryParameters.set('workflowName', <any>workflowName);
        }
        if (workflowMode !== undefined && workflowMode !== null) {
            queryParameters = queryParameters.set('workflowMode', <any>workflowMode);
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

        return this.httpClient.get<WorkflowTransitionPropertyModel>(`${this.configuration.basePath}/rest/api/3/workflow/transitions/${encodeURIComponent(String(transitionId))}/properties`,
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
     * Update workflow transition property
     * Updates a workflow transition by changing the property value. Trying to update a property that does not exist results in a new property being added to the transition. Transition properties are used to change the behavior of a transition. For more information, see [Transition properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param transitionId The ID of the transition. To get the ID, view the workflow in text mode in the Jira admin settings. The ID is shown next to the transition.
     * @param key The key of the property being updated, also known as the name of the property. Set this to the same value as the &#x60;key&#x60; defined in the request body.
     * @param workflowName The name of the workflow that the transition belongs to.
     * @param requestBody 
     * @param workflowMode The workflow status. Set to &#x60;live&#x60; for inactive workflows or &#x60;draft&#x60; for draft workflows. Active workflows cannot be edited.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateWorkflowTransitionProperty(transitionId: number, key: string, workflowName: string, requestBody: { [key: string]: object; }, workflowMode?: 'live' | 'draft', observe?: 'body', reportProgress?: boolean): Observable<WorkflowTransitionPropertyModel>;
    public updateWorkflowTransitionProperty(transitionId: number, key: string, workflowName: string, requestBody: { [key: string]: object; }, workflowMode?: 'live' | 'draft', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<WorkflowTransitionPropertyModel>>;
    public updateWorkflowTransitionProperty(transitionId: number, key: string, workflowName: string, requestBody: { [key: string]: object; }, workflowMode?: 'live' | 'draft', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<WorkflowTransitionPropertyModel>>;
    public updateWorkflowTransitionProperty(transitionId: number, key: string, workflowName: string, requestBody: { [key: string]: object; }, workflowMode?: 'live' | 'draft', observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (transitionId === null || transitionId === undefined) {
            throw new Error('Required parameter transitionId was null or undefined when calling updateWorkflowTransitionProperty.');
        }
        if (key === null || key === undefined) {
            throw new Error('Required parameter key was null or undefined when calling updateWorkflowTransitionProperty.');
        }
        if (workflowName === null || workflowName === undefined) {
            throw new Error('Required parameter workflowName was null or undefined when calling updateWorkflowTransitionProperty.');
        }
        if (requestBody === null || requestBody === undefined) {
            throw new Error('Required parameter requestBody was null or undefined when calling updateWorkflowTransitionProperty.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (key !== undefined && key !== null) {
            queryParameters = queryParameters.set('key', <any>key);
        }
        if (workflowName !== undefined && workflowName !== null) {
            queryParameters = queryParameters.set('workflowName', <any>workflowName);
        }
        if (workflowMode !== undefined && workflowMode !== null) {
            queryParameters = queryParameters.set('workflowMode', <any>workflowMode);
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

        return this.httpClient.put<WorkflowTransitionPropertyModel>(`${this.configuration.basePath}/rest/api/3/workflow/transitions/${encodeURIComponent(String(transitionId))}/properties`,
            requestBody,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
