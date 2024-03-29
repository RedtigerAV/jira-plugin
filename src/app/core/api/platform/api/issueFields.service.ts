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

import { CustomFieldDefinitionJsonBeanModel } from '../model/customFieldDefinitionJsonBean';
import { ErrorCollectionModel } from '../model/errorCollection';
import { FieldDetailsModel } from '../model/fieldDetails';
import { PageBeanContextModel } from '../model/pageBeanContext';
import { PageBeanFieldModel } from '../model/pageBeanField';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class IssueFieldsService {

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
     * Create custom field
     * Creates a custom field.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param customFieldDefinitionJsonBeanModel Definition of the custom field to be created
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createCustomField(customFieldDefinitionJsonBeanModel: CustomFieldDefinitionJsonBeanModel, observe?: 'body', reportProgress?: boolean): Observable<FieldDetailsModel>;
    public createCustomField(customFieldDefinitionJsonBeanModel: CustomFieldDefinitionJsonBeanModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FieldDetailsModel>>;
    public createCustomField(customFieldDefinitionJsonBeanModel: CustomFieldDefinitionJsonBeanModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FieldDetailsModel>>;
    public createCustomField(customFieldDefinitionJsonBeanModel: CustomFieldDefinitionJsonBeanModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (customFieldDefinitionJsonBeanModel === null || customFieldDefinitionJsonBeanModel === undefined) {
            throw new Error('Required parameter customFieldDefinitionJsonBeanModel was null or undefined when calling createCustomField.');
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

        return this.httpClient.post<FieldDetailsModel>(`${this.configuration.basePath}/rest/api/3/field`,
            customFieldDefinitionJsonBeanModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get contexts for a field
     * Returns a [paginated](#pagination) list of the contexts a field is used in.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param fieldId The ID of the field to return contexts for.
     * @param startAt The index of the first item to return in a page of results (page offset).
     * @param maxResults The maximum number of items to return per page.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getContextsForField(fieldId: string, startAt?: number, maxResults?: number, observe?: 'body', reportProgress?: boolean): Observable<PageBeanContextModel>;
    public getContextsForField(fieldId: string, startAt?: number, maxResults?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageBeanContextModel>>;
    public getContextsForField(fieldId: string, startAt?: number, maxResults?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageBeanContextModel>>;
    public getContextsForField(fieldId: string, startAt?: number, maxResults?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fieldId === null || fieldId === undefined) {
            throw new Error('Required parameter fieldId was null or undefined when calling getContextsForField.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (startAt !== undefined && startAt !== null) {
            queryParameters = queryParameters.set('startAt', <any>startAt);
        }
        if (maxResults !== undefined && maxResults !== null) {
            queryParameters = queryParameters.set('maxResults', <any>maxResults);
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
        ];

        return this.httpClient.get<PageBeanContextModel>(`${this.configuration.basePath}/rest/api/3/field/${encodeURIComponent(String(fieldId))}/contexts`,
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
     * Get fields
     * Returns system and custom issue fields according to the following rules:   *  Fields that cannot be added to the issue navigator are always returned.  *  Fields that cannot be placed on an issue screen are always returned.  *  Fields that depend on global Jira settings are only returned if the setting is enabled. That is, timetracking fields, subtasks, votes, and watches.  *  For all other fields, this operation only returns the fields that the user has permission to view (that is, the field is used in at least one project that the user has *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.)  This operation can be accessed anonymously.  **[Permissions](#permissions) required:** None.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getFields(observe?: 'body', reportProgress?: boolean): Observable<Array<FieldDetailsModel>>;
    public getFields(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<FieldDetailsModel>>>;
    public getFields(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<FieldDetailsModel>>>;
    public getFields(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<FieldDetailsModel>>(`${this.configuration.basePath}/rest/api/3/field`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get fields paginated
     * Returns a [paginated](#pagination) list of fields for Classic Jira projects. The list can include:   *  all fields.  *  specific fields, by defining &#x60;id&#x60;.  *  fields that contain a string in the field name or description, by defining &#x60;query&#x60;.  *  specific fields that contain a string in the field name or description, by defining &#x60;id&#x60; and &#x60;query&#x60;.  Only custom fields can be queried, &#x60;type&#x60; must be set to &#x60;custom&#x60;.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param startAt The index of the first item to return in a page of results (page offset).
     * @param maxResults The maximum number of items to return per page.
     * @param type The type of fields to search.
     * @param id The IDs of the custom fields to return or, where&#x60;query is specified, filter. IDs should be provided in the format customfield_XXXXX.&#x60;
     * @param query String used to perform a case-insensitive partial match with field names or descriptions.
     * @param orderBy [Order](#ordering) the results by a field:   *  &#x60;contextsCount&#x60; Sorts by the number of contexts related to a field.  *  &#x60;lastUsed&#x60; Sorts by the date when the value of the field last changed.  *  &#x60;name&#x60; Sorts by the field name.  *  &#x60;screensCount&#x60; Sorts by the number of screens related to a field.
     * @param expand Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  &#x60;key&#x60; Returns the key for each field.  *  &#x60;lastUsed&#x60; Returns the date when the value of the field last changed.  *  &#x60;screensCount&#x60; Returns the number of screens related to a field.  *  &#x60;contextsCount&#x60; Returns the number of contexts related to a field.  *  &#x60;isLocked&#x60; Returns information about whether the field is [locked](https://confluence.atlassian.com/x/ZSN7Og).
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getFieldsPaginated(startAt?: number, maxResults?: number, type?: Array<'custom' | 'system'>, id?: Array<string>, query?: string, orderBy?: 'contextsCount' | '-contextsCount' | '+contextsCount' | 'lastUsed' | '-lastUsed' | '+lastUsed' | 'name' | '-name' | '+name' | 'screensCount' | '-screensCount' | '+screensCount', expand?: string, observe?: 'body', reportProgress?: boolean): Observable<PageBeanFieldModel>;
    public getFieldsPaginated(startAt?: number, maxResults?: number, type?: Array<'custom' | 'system'>, id?: Array<string>, query?: string, orderBy?: 'contextsCount' | '-contextsCount' | '+contextsCount' | 'lastUsed' | '-lastUsed' | '+lastUsed' | 'name' | '-name' | '+name' | 'screensCount' | '-screensCount' | '+screensCount', expand?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageBeanFieldModel>>;
    public getFieldsPaginated(startAt?: number, maxResults?: number, type?: Array<'custom' | 'system'>, id?: Array<string>, query?: string, orderBy?: 'contextsCount' | '-contextsCount' | '+contextsCount' | 'lastUsed' | '-lastUsed' | '+lastUsed' | 'name' | '-name' | '+name' | 'screensCount' | '-screensCount' | '+screensCount', expand?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageBeanFieldModel>>;
    public getFieldsPaginated(startAt?: number, maxResults?: number, type?: Array<'custom' | 'system'>, id?: Array<string>, query?: string, orderBy?: 'contextsCount' | '-contextsCount' | '+contextsCount' | 'lastUsed' | '-lastUsed' | '+lastUsed' | 'name' | '-name' | '+name' | 'screensCount' | '-screensCount' | '+screensCount', expand?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (startAt !== undefined && startAt !== null) {
            queryParameters = queryParameters.set('startAt', <any>startAt);
        }
        if (maxResults !== undefined && maxResults !== null) {
            queryParameters = queryParameters.set('maxResults', <any>maxResults);
        }
        if (type) {
            type.forEach((element) => {
                queryParameters = queryParameters.append('type', <any>element);
            })
        }
        if (id) {
            id.forEach((element) => {
                queryParameters = queryParameters.append('id', <any>element);
            })
        }
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', <any>query);
        }
        if (orderBy !== undefined && orderBy !== null) {
            queryParameters = queryParameters.set('orderBy', <any>orderBy);
        }
        if (expand !== undefined && expand !== null) {
            queryParameters = queryParameters.set('expand', <any>expand);
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
        ];

        return this.httpClient.get<PageBeanFieldModel>(`${this.configuration.basePath}/rest/api/3/field/search`,
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
