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

import { BulkIssuePropertyUpdateRequestModel } from '../model/bulkIssuePropertyUpdateRequest';
import { EntityPropertyModel } from '../model/entityProperty';
import { ErrorCollectionModel } from '../model/errorCollection';
import { IssueEntityPropertiesModel } from '../model/issueEntityProperties';
import { IssueFilterForBulkPropertyDeleteModel } from '../model/issueFilterForBulkPropertyDelete';
import { PropertyKeysModel } from '../model/propertyKeys';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class IssuePropertiesService {

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
     * Bulk delete issue property
     * Deletes a property value from multiple issues. The issues to be updated can be specified by filter criteria.  The criteria the filter used to identify eligible issues are:   *  &#x60;entityIds&#x60; Only issues from this list are eligible.  *  &#x60;currentValue&#x60; Only issues with the property set to this value are eligible.  If both criteria is specified, they are joined with the logical *AND*: only issues that satisfy both criteria are considered eligible.  If no filter criteria are specified, all the issues visible to the user and where the user has the EDIT\\_ISSUES permission for the issue are considered eligible.  This operation is:   *  transactional, either the property is deleted from all eligible issues or, when errors occur, no properties are deleted.  *  [asynchronous](#async). Follow the &#x60;location&#x60; link in the response to determine the status of the task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.  **[Permissions](#permissions) required:**   *  *Browse projects* [ project permission](https://confluence.atlassian.com/x/yodKLg) for each project containing issues.  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.  *  *Edit issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for each issue.
     * @param propertyKey The key of the property.
     * @param issueFilterForBulkPropertyDeleteModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bulkDeleteIssueProperty(propertyKey: string, issueFilterForBulkPropertyDeleteModel: IssueFilterForBulkPropertyDeleteModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public bulkDeleteIssueProperty(propertyKey: string, issueFilterForBulkPropertyDeleteModel: IssueFilterForBulkPropertyDeleteModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public bulkDeleteIssueProperty(propertyKey: string, issueFilterForBulkPropertyDeleteModel: IssueFilterForBulkPropertyDeleteModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public bulkDeleteIssueProperty(propertyKey: string, issueFilterForBulkPropertyDeleteModel: IssueFilterForBulkPropertyDeleteModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (propertyKey === null || propertyKey === undefined) {
            throw new Error('Required parameter propertyKey was null or undefined when calling bulkDeleteIssueProperty.');
        }
        if (issueFilterForBulkPropertyDeleteModel === null || issueFilterForBulkPropertyDeleteModel === undefined) {
            throw new Error('Required parameter issueFilterForBulkPropertyDeleteModel was null or undefined when calling bulkDeleteIssueProperty.');
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

        return this.httpClient.delete<any>(`${this.configuration.basePath}/rest/api/3/issue/properties/${encodeURIComponent(String(propertyKey))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Bulk set issue property
     * Sets a property value on multiple issues. The issues to be updated can be specified by a filter.  The filter identifies issues eligible for update using these criteria:   *  &#x60;entityIds&#x60; Only issues from this list are eligible.  *  &#x60;currentValue&#x60; Only issues with the property set to this value are eligible.  *  &#x60;hasProperty&#x60;:           *  If *true*, only issues with the property are eligible.      *  If *false*, only issues without the property are eligible.  If more than one criteria is specified, they are joined with the logical *AND*: only issues that satisfy all criteria are eligible.  If an invalid combination of criteria is provided, an error is returned. For example, specifying a &#x60;currentValue&#x60; and &#x60;hasProperty&#x60; as *false* would not match any issues (because without the property the property cannot have a value).  The filter is optional. Without the filter all the issues visible to the user and where the user has the EDIT\\_ISSUES permission for the issue are considered eligible.  This operation is:   *  transactional, either all eligible issues are updated or, when errors occur, none are updated.  *  [asynchronous](#async). Follow the &#x60;location&#x60; link in the response to determine the status of the task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.  **[Permissions](#permissions) required:**   *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for each project containing issues.  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.  *  *Edit issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for each issue.
     * @param propertyKey The key of the property. The maximum length is 255 characters.
     * @param bulkIssuePropertyUpdateRequestModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bulkSetIssueProperty(propertyKey: string, bulkIssuePropertyUpdateRequestModel: BulkIssuePropertyUpdateRequestModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public bulkSetIssueProperty(propertyKey: string, bulkIssuePropertyUpdateRequestModel: BulkIssuePropertyUpdateRequestModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public bulkSetIssueProperty(propertyKey: string, bulkIssuePropertyUpdateRequestModel: BulkIssuePropertyUpdateRequestModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public bulkSetIssueProperty(propertyKey: string, bulkIssuePropertyUpdateRequestModel: BulkIssuePropertyUpdateRequestModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (propertyKey === null || propertyKey === undefined) {
            throw new Error('Required parameter propertyKey was null or undefined when calling bulkSetIssueProperty.');
        }
        if (bulkIssuePropertyUpdateRequestModel === null || bulkIssuePropertyUpdateRequestModel === undefined) {
            throw new Error('Required parameter bulkIssuePropertyUpdateRequestModel was null or undefined when calling bulkSetIssueProperty.');
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

        return this.httpClient.put<any>(`${this.configuration.basePath}/rest/api/3/issue/properties/${encodeURIComponent(String(propertyKey))}`,
            bulkIssuePropertyUpdateRequestModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Bulk set issues properties
     * Sets the values of entity properties on issues. It can set up to 10 entity properties on up to 10,000 issues.  The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON. The maximum length of single issue property value is 32768 characters. This operation can be accessed anonymously.  This operation is:   *  transactional, either all properties are updated in all eligible issues or, when errors occur, no properties are updated.  *  [asynchronous](#async). Follow the &#x60;location&#x60; link in the response to determine the status of the task and use [Get task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.  **[Permissions](#permissions) required:**   *  *Browse projects* and *Edit issues* [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     * @param issueEntityPropertiesModel Issue properties to be set or updated with values.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public bulkSetIssuesProperties(issueEntityPropertiesModel: IssueEntityPropertiesModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public bulkSetIssuesProperties(issueEntityPropertiesModel: IssueEntityPropertiesModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public bulkSetIssuesProperties(issueEntityPropertiesModel: IssueEntityPropertiesModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public bulkSetIssuesProperties(issueEntityPropertiesModel: IssueEntityPropertiesModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (issueEntityPropertiesModel === null || issueEntityPropertiesModel === undefined) {
            throw new Error('Required parameter issueEntityPropertiesModel was null or undefined when calling bulkSetIssuesProperties.');
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

        return this.httpClient.post<any>(`${this.configuration.basePath}/rest/api/3/issue/properties`,
            issueEntityPropertiesModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete issue property
     * Deletes an issue\&#39;s property.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:**   *  *Browse projects* and *Edit issues* [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     * @param issueIdOrKey The key or ID of the issue.
     * @param propertyKey The key of the property.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteIssueProperty(issueIdOrKey: string, propertyKey: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteIssueProperty(issueIdOrKey: string, propertyKey: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteIssueProperty(issueIdOrKey: string, propertyKey: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteIssueProperty(issueIdOrKey: string, propertyKey: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (issueIdOrKey === null || issueIdOrKey === undefined) {
            throw new Error('Required parameter issueIdOrKey was null or undefined when calling deleteIssueProperty.');
        }
        if (propertyKey === null || propertyKey === undefined) {
            throw new Error('Required parameter propertyKey was null or undefined when calling deleteIssueProperty.');
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
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.configuration.basePath}/rest/api/3/issue/${encodeURIComponent(String(issueIdOrKey))}/properties/${encodeURIComponent(String(propertyKey))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get issue property
     * Returns the key and value of an issue\&#39;s property.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:**   *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     * @param issueIdOrKey The key or ID of the issue.
     * @param propertyKey The key of the property.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getIssueProperty(issueIdOrKey: string, propertyKey: string, observe?: 'body', reportProgress?: boolean): Observable<EntityPropertyModel>;
    public getIssueProperty(issueIdOrKey: string, propertyKey: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<EntityPropertyModel>>;
    public getIssueProperty(issueIdOrKey: string, propertyKey: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<EntityPropertyModel>>;
    public getIssueProperty(issueIdOrKey: string, propertyKey: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (issueIdOrKey === null || issueIdOrKey === undefined) {
            throw new Error('Required parameter issueIdOrKey was null or undefined when calling getIssueProperty.');
        }
        if (propertyKey === null || propertyKey === undefined) {
            throw new Error('Required parameter propertyKey was null or undefined when calling getIssueProperty.');
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

        return this.httpClient.get<EntityPropertyModel>(`${this.configuration.basePath}/rest/api/3/issue/${encodeURIComponent(String(issueIdOrKey))}/properties/${encodeURIComponent(String(propertyKey))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get issue property keys
     * Returns the URLs and keys of an issue\&#39;s properties.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:** Property details are only returned where the user has:   *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     * @param issueIdOrKey The key or ID of the issue.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getIssuePropertyKeys(issueIdOrKey: string, observe?: 'body', reportProgress?: boolean): Observable<PropertyKeysModel>;
    public getIssuePropertyKeys(issueIdOrKey: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PropertyKeysModel>>;
    public getIssuePropertyKeys(issueIdOrKey: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PropertyKeysModel>>;
    public getIssuePropertyKeys(issueIdOrKey: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (issueIdOrKey === null || issueIdOrKey === undefined) {
            throw new Error('Required parameter issueIdOrKey was null or undefined when calling getIssuePropertyKeys.');
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

        return this.httpClient.get<PropertyKeysModel>(`${this.configuration.basePath}/rest/api/3/issue/${encodeURIComponent(String(issueIdOrKey))}/properties`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Set issue property
     * Sets the value of an issue\&#39;s property. Use this resource to store custom data against an issue.  The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:**   *  *Browse projects* and *Edit issues* [project permissions](https://confluence.atlassian.com/x/yodKLg) for the project containing the issue.  *  If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.
     * @param issueIdOrKey The ID or key of the issue.
     * @param propertyKey The key of the issue property. The maximum length is 255 characters.
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public setIssueProperty(issueIdOrKey: string, propertyKey: string, body: object, observe?: 'body', reportProgress?: boolean): Observable<object>;
    public setIssueProperty(issueIdOrKey: string, propertyKey: string, body: object, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<object>>;
    public setIssueProperty(issueIdOrKey: string, propertyKey: string, body: object, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<object>>;
    public setIssueProperty(issueIdOrKey: string, propertyKey: string, body: object, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (issueIdOrKey === null || issueIdOrKey === undefined) {
            throw new Error('Required parameter issueIdOrKey was null or undefined when calling setIssueProperty.');
        }
        if (propertyKey === null || propertyKey === undefined) {
            throw new Error('Required parameter propertyKey was null or undefined when calling setIssueProperty.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling setIssueProperty.');
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

        return this.httpClient.put<object>(`${this.configuration.basePath}/rest/api/3/issue/${encodeURIComponent(String(issueIdOrKey))}/properties/${encodeURIComponent(String(propertyKey))}`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
