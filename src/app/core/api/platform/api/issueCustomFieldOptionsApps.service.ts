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

import { IssueFieldOptionModel } from '../model/issueFieldOption';
import { PageBeanIssueFieldOptionModel } from '../model/pageBeanIssueFieldOption';
import { TaskProgressBeanRemoveOptionFromIssuesResultModel } from '../model/taskProgressBeanRemoveOptionFromIssuesResult';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class IssueCustomFieldOptionsAppsService {

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
     * Create issue field option
     * Creates an option for a select list issue field.  Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field.
     * @param fieldKey The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the &#x60;fieldKey&#x60; value, do one of the following:   *  open the app\&#39;s plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the &#x60;jiraIssueFields&#x60; module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in &#x60;key&#x60;. For example, &#x60;\&quot;key\&quot;: \&quot;teams-add-on__team-issue-field\&quot;&#x60;
     * @param requestBody 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createIssueFieldOption(fieldKey: string, requestBody: { [key: string]: object; }, observe?: 'body', reportProgress?: boolean): Observable<IssueFieldOptionModel>;
    public createIssueFieldOption(fieldKey: string, requestBody: { [key: string]: object; }, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<IssueFieldOptionModel>>;
    public createIssueFieldOption(fieldKey: string, requestBody: { [key: string]: object; }, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<IssueFieldOptionModel>>;
    public createIssueFieldOption(fieldKey: string, requestBody: { [key: string]: object; }, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fieldKey === null || fieldKey === undefined) {
            throw new Error('Required parameter fieldKey was null or undefined when calling createIssueFieldOption.');
        }
        if (requestBody === null || requestBody === undefined) {
            throw new Error('Required parameter requestBody was null or undefined when calling createIssueFieldOption.');
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

        return this.httpClient.post<IssueFieldOptionModel>(`${this.configuration.basePath}/rest/api/3/field/${encodeURIComponent(String(fieldKey))}/option`,
            requestBody,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete issue field option
     * Deletes an option from a select list issue field.  Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field.
     * @param fieldKey The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the &#x60;fieldKey&#x60; value, do one of the following:   *  open the app\&#39;s plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the &#x60;jiraIssueFields&#x60; module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in &#x60;key&#x60;. For example, &#x60;\&quot;key\&quot;: \&quot;teams-add-on__team-issue-field\&quot;&#x60;
     * @param optionId The ID of the option to be deleted.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteIssueFieldOption(fieldKey: string, optionId: number, observe?: 'body', reportProgress?: boolean): Observable<object>;
    public deleteIssueFieldOption(fieldKey: string, optionId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<object>>;
    public deleteIssueFieldOption(fieldKey: string, optionId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<object>>;
    public deleteIssueFieldOption(fieldKey: string, optionId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fieldKey === null || fieldKey === undefined) {
            throw new Error('Required parameter fieldKey was null or undefined when calling deleteIssueFieldOption.');
        }
        if (optionId === null || optionId === undefined) {
            throw new Error('Required parameter optionId was null or undefined when calling deleteIssueFieldOption.');
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

        return this.httpClient.delete<object>(`${this.configuration.basePath}/rest/api/3/field/${encodeURIComponent(String(fieldKey))}/option/${encodeURIComponent(String(optionId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get all issue field options
     * Returns all the options of a select list issue field. A select list issue field is a type of [issue field](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field/) that enables a user to select a value from a list of options.  Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field.
     * @param fieldKey The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the &#x60;fieldKey&#x60; value, do one of the following:   *  open the app\&#39;s plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the &#x60;jiraIssueFields&#x60; module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in &#x60;key&#x60;. For example, &#x60;\&quot;key\&quot;: \&quot;teams-add-on__team-issue-field\&quot;&#x60;
     * @param startAt The index of the first item to return in a page of results (page offset).
     * @param maxResults The maximum number of items to return per page.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllIssueFieldOptions(fieldKey: string, startAt?: number, maxResults?: number, observe?: 'body', reportProgress?: boolean): Observable<PageBeanIssueFieldOptionModel>;
    public getAllIssueFieldOptions(fieldKey: string, startAt?: number, maxResults?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageBeanIssueFieldOptionModel>>;
    public getAllIssueFieldOptions(fieldKey: string, startAt?: number, maxResults?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageBeanIssueFieldOptionModel>>;
    public getAllIssueFieldOptions(fieldKey: string, startAt?: number, maxResults?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fieldKey === null || fieldKey === undefined) {
            throw new Error('Required parameter fieldKey was null or undefined when calling getAllIssueFieldOptions.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (startAt !== undefined && startAt !== null) {
            queryParameters = queryParameters.set('startAt', <any>startAt);
        }
        if (maxResults !== undefined && maxResults !== null) {
            queryParameters = queryParameters.set('maxResults', <any>maxResults);
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

        return this.httpClient.get<PageBeanIssueFieldOptionModel>(`${this.configuration.basePath}/rest/api/3/field/${encodeURIComponent(String(fieldKey))}/option`,
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
     * Get issue field option
     * Returns an option from a select list issue field.  Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field.
     * @param fieldKey The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the &#x60;fieldKey&#x60; value, do one of the following:   *  open the app\&#39;s plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the &#x60;jiraIssueFields&#x60; module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in &#x60;key&#x60;. For example, &#x60;\&quot;key\&quot;: \&quot;teams-add-on__team-issue-field\&quot;&#x60;
     * @param optionId The ID of the option to be returned.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getIssueFieldOption(fieldKey: string, optionId: number, observe?: 'body', reportProgress?: boolean): Observable<IssueFieldOptionModel>;
    public getIssueFieldOption(fieldKey: string, optionId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<IssueFieldOptionModel>>;
    public getIssueFieldOption(fieldKey: string, optionId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<IssueFieldOptionModel>>;
    public getIssueFieldOption(fieldKey: string, optionId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fieldKey === null || fieldKey === undefined) {
            throw new Error('Required parameter fieldKey was null or undefined when calling getIssueFieldOption.');
        }
        if (optionId === null || optionId === undefined) {
            throw new Error('Required parameter optionId was null or undefined when calling getIssueFieldOption.');
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

        return this.httpClient.get<IssueFieldOptionModel>(`${this.configuration.basePath}/rest/api/3/field/${encodeURIComponent(String(fieldKey))}/option/${encodeURIComponent(String(optionId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get selectable issue field options
     * Returns options for a select list issue field that can be viewed and selected by the user.  Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.  **[Permissions](#permissions) required:** Permission to access Jira.
     * @param fieldKey The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the &#x60;fieldKey&#x60; value, do one of the following:   *  open the app\&#39;s plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the &#x60;jiraIssueFields&#x60; module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in &#x60;key&#x60;. For example, &#x60;\&quot;key\&quot;: \&quot;teams-add-on__team-issue-field\&quot;&#x60;
     * @param startAt The index of the first item to return in a page of results (page offset).
     * @param maxResults The maximum number of items to return per page.
     * @param projectId Filters the results to options that are only available in the specified project.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getSelectableIssueFieldOptions(fieldKey: string, startAt?: number, maxResults?: number, projectId?: number, observe?: 'body', reportProgress?: boolean): Observable<PageBeanIssueFieldOptionModel>;
    public getSelectableIssueFieldOptions(fieldKey: string, startAt?: number, maxResults?: number, projectId?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageBeanIssueFieldOptionModel>>;
    public getSelectableIssueFieldOptions(fieldKey: string, startAt?: number, maxResults?: number, projectId?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageBeanIssueFieldOptionModel>>;
    public getSelectableIssueFieldOptions(fieldKey: string, startAt?: number, maxResults?: number, projectId?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fieldKey === null || fieldKey === undefined) {
            throw new Error('Required parameter fieldKey was null or undefined when calling getSelectableIssueFieldOptions.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (startAt !== undefined && startAt !== null) {
            queryParameters = queryParameters.set('startAt', <any>startAt);
        }
        if (maxResults !== undefined && maxResults !== null) {
            queryParameters = queryParameters.set('maxResults', <any>maxResults);
        }
        if (projectId !== undefined && projectId !== null) {
            queryParameters = queryParameters.set('projectId', <any>projectId);
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

        return this.httpClient.get<PageBeanIssueFieldOptionModel>(`${this.configuration.basePath}/rest/api/3/field/${encodeURIComponent(String(fieldKey))}/option/suggestions/edit`,
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
     * Get visible issue field options
     * Returns options for a select list issue field that can be viewed by the user.  Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.  **[Permissions](#permissions) required:** Permission to access Jira.
     * @param fieldKey The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the &#x60;fieldKey&#x60; value, do one of the following:   *  open the app\&#39;s plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the &#x60;jiraIssueFields&#x60; module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in &#x60;key&#x60;. For example, &#x60;\&quot;key\&quot;: \&quot;teams-add-on__team-issue-field\&quot;&#x60;
     * @param startAt The index of the first item to return in a page of results (page offset).
     * @param maxResults The maximum number of items to return per page.
     * @param projectId Filters the results to options that are only available in the specified project.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getVisibleIssueFieldOptions(fieldKey: string, startAt?: number, maxResults?: number, projectId?: number, observe?: 'body', reportProgress?: boolean): Observable<PageBeanIssueFieldOptionModel>;
    public getVisibleIssueFieldOptions(fieldKey: string, startAt?: number, maxResults?: number, projectId?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageBeanIssueFieldOptionModel>>;
    public getVisibleIssueFieldOptions(fieldKey: string, startAt?: number, maxResults?: number, projectId?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageBeanIssueFieldOptionModel>>;
    public getVisibleIssueFieldOptions(fieldKey: string, startAt?: number, maxResults?: number, projectId?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fieldKey === null || fieldKey === undefined) {
            throw new Error('Required parameter fieldKey was null or undefined when calling getVisibleIssueFieldOptions.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (startAt !== undefined && startAt !== null) {
            queryParameters = queryParameters.set('startAt', <any>startAt);
        }
        if (maxResults !== undefined && maxResults !== null) {
            queryParameters = queryParameters.set('maxResults', <any>maxResults);
        }
        if (projectId !== undefined && projectId !== null) {
            queryParameters = queryParameters.set('projectId', <any>projectId);
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

        return this.httpClient.get<PageBeanIssueFieldOptionModel>(`${this.configuration.basePath}/rest/api/3/field/${encodeURIComponent(String(fieldKey))}/option/suggestions/search`,
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
     * Replace issue field option
     * Deselects an issue-field select-list option from all issues where it is selected. A different option can be selected to replace the deselected option. The update can also be limited to a smaller set of issues by using a JQL query.  This is an [asynchronous operation](#async). The response object contains a link to the long-running task.  Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field.
     * @param fieldKey The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the &#x60;fieldKey&#x60; value, do one of the following:   *  open the app\&#39;s plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the &#x60;jiraIssueFields&#x60; module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in &#x60;key&#x60;. For example, &#x60;\&quot;key\&quot;: \&quot;teams-add-on__team-issue-field\&quot;&#x60;
     * @param optionId The ID of the option to be deselected.
     * @param replaceWith The ID of the option that will replace the currently selected option.
     * @param jql A JQL query that specifies the issues to be updated. For example, *project&#x3D;10000*.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public replaceIssueFieldOption(fieldKey: string, optionId: number, replaceWith?: number, jql?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public replaceIssueFieldOption(fieldKey: string, optionId: number, replaceWith?: number, jql?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public replaceIssueFieldOption(fieldKey: string, optionId: number, replaceWith?: number, jql?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public replaceIssueFieldOption(fieldKey: string, optionId: number, replaceWith?: number, jql?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fieldKey === null || fieldKey === undefined) {
            throw new Error('Required parameter fieldKey was null or undefined when calling replaceIssueFieldOption.');
        }
        if (optionId === null || optionId === undefined) {
            throw new Error('Required parameter optionId was null or undefined when calling replaceIssueFieldOption.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (replaceWith !== undefined && replaceWith !== null) {
            queryParameters = queryParameters.set('replaceWith', <any>replaceWith);
        }
        if (jql !== undefined && jql !== null) {
            queryParameters = queryParameters.set('jql', <any>jql);
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

        return this.httpClient.delete<any>(`${this.configuration.basePath}/rest/api/3/field/${encodeURIComponent(String(fieldKey))}/option/${encodeURIComponent(String(optionId))}/issue`,
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
     * Update issue field option
     * Updates or creates an option for a select list issue field. This operation requires that the option ID is provided when creating an option, therefore, the option ID needs to be specified as a path and body parameter. The option ID provided in the path and body must be identical.  Note that this operation **only works for issue field select list options added by Connect apps**, it cannot be used with issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). Jira permissions are not required for the app providing the field.
     * @param fieldKey The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the &#x60;fieldKey&#x60; value, do one of the following:   *  open the app\&#39;s plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the &#x60;jiraIssueFields&#x60; module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in &#x60;key&#x60;. For example, &#x60;\&quot;key\&quot;: \&quot;teams-add-on__team-issue-field\&quot;&#x60;
     * @param optionId The ID of the option to be updated.
     * @param issueFieldOptionModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateIssueFieldOption(fieldKey: string, optionId: number, issueFieldOptionModel: IssueFieldOptionModel, observe?: 'body', reportProgress?: boolean): Observable<IssueFieldOptionModel>;
    public updateIssueFieldOption(fieldKey: string, optionId: number, issueFieldOptionModel: IssueFieldOptionModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<IssueFieldOptionModel>>;
    public updateIssueFieldOption(fieldKey: string, optionId: number, issueFieldOptionModel: IssueFieldOptionModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<IssueFieldOptionModel>>;
    public updateIssueFieldOption(fieldKey: string, optionId: number, issueFieldOptionModel: IssueFieldOptionModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fieldKey === null || fieldKey === undefined) {
            throw new Error('Required parameter fieldKey was null or undefined when calling updateIssueFieldOption.');
        }
        if (optionId === null || optionId === undefined) {
            throw new Error('Required parameter optionId was null or undefined when calling updateIssueFieldOption.');
        }
        if (issueFieldOptionModel === null || issueFieldOptionModel === undefined) {
            throw new Error('Required parameter issueFieldOptionModel was null or undefined when calling updateIssueFieldOption.');
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

        return this.httpClient.put<IssueFieldOptionModel>(`${this.configuration.basePath}/rest/api/3/field/${encodeURIComponent(String(fieldKey))}/option/${encodeURIComponent(String(optionId))}`,
            issueFieldOptionModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
