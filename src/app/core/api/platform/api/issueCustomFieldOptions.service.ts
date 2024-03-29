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

import { BulkCreateCustomFieldOptionRequestModel } from '../model/bulkCreateCustomFieldOptionRequest';
import { CustomFieldOptionModel } from '../model/customFieldOption';
import { ErrorCollectionModel } from '../model/errorCollection';
import { PageBeanCustomFieldOptionDetailsModel } from '../model/pageBeanCustomFieldOptionDetails';
import { UpdateCustomFieldOptionModel } from '../model/updateCustomFieldOption';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class IssueCustomFieldOptionsService {

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
     * Create custom field options
     * Creates options and, where the custom select field is of the type *Select List (cascading)*, cascading options for a custom select field. The options are added to the global context of the field.  Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param fieldId The ID of the custom field. Note: This is the numeric part of the of the field ID. For example, for a field with the ID *customfield\\_10075* use *10075*.
     * @param bulkCreateCustomFieldOptionRequestModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createCustomFieldOptions(fieldId: number, bulkCreateCustomFieldOptionRequestModel: BulkCreateCustomFieldOptionRequestModel, observe?: 'body', reportProgress?: boolean): Observable<object>;
    public createCustomFieldOptions(fieldId: number, bulkCreateCustomFieldOptionRequestModel: BulkCreateCustomFieldOptionRequestModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<object>>;
    public createCustomFieldOptions(fieldId: number, bulkCreateCustomFieldOptionRequestModel: BulkCreateCustomFieldOptionRequestModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<object>>;
    public createCustomFieldOptions(fieldId: number, bulkCreateCustomFieldOptionRequestModel: BulkCreateCustomFieldOptionRequestModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fieldId === null || fieldId === undefined) {
            throw new Error('Required parameter fieldId was null or undefined when calling createCustomFieldOptions.');
        }
        if (bulkCreateCustomFieldOptionRequestModel === null || bulkCreateCustomFieldOptionRequestModel === undefined) {
            throw new Error('Required parameter bulkCreateCustomFieldOptionRequestModel was null or undefined when calling createCustomFieldOptions.');
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

        return this.httpClient.post<object>(`${this.configuration.basePath}/rest/api/3/customField/${encodeURIComponent(String(fieldId))}/option`,
            bulkCreateCustomFieldOptionRequestModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get custom field option
     * Returns a custom field option. For example, an option in a select list.  Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:** None.
     * @param id The ID of the custom field option.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCustomFieldOption(id: string, observe?: 'body', reportProgress?: boolean): Observable<CustomFieldOptionModel>;
    public getCustomFieldOption(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CustomFieldOptionModel>>;
    public getCustomFieldOption(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CustomFieldOptionModel>>;
    public getCustomFieldOption(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getCustomFieldOption.');
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

        return this.httpClient.get<CustomFieldOptionModel>(`${this.configuration.basePath}/rest/api/3/customFieldOption/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get options for field
     * Returns the options and, where the custom select field is of the type *Select List (cascading)*, cascading options for custom select fields. Cascading options are included in the item count when determining pagination. Only options from the global context are returned.  Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param fieldId The ID of the custom field. Note: This is the numeric part of the of the field ID. For example, for a field with the ID *customfield\\_10075* use *10075*.
     * @param startAt The index of the first item to return in a page of results (page offset).
     * @param maxResults The maximum number of items to return per page.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getOptionsForField(fieldId: number, startAt?: number, maxResults?: number, observe?: 'body', reportProgress?: boolean): Observable<PageBeanCustomFieldOptionDetailsModel>;
    public getOptionsForField(fieldId: number, startAt?: number, maxResults?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageBeanCustomFieldOptionDetailsModel>>;
    public getOptionsForField(fieldId: number, startAt?: number, maxResults?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageBeanCustomFieldOptionDetailsModel>>;
    public getOptionsForField(fieldId: number, startAt?: number, maxResults?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fieldId === null || fieldId === undefined) {
            throw new Error('Required parameter fieldId was null or undefined when calling getOptionsForField.');
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

        return this.httpClient.get<PageBeanCustomFieldOptionDetailsModel>(`${this.configuration.basePath}/rest/api/3/customField/${encodeURIComponent(String(fieldId))}/option`,
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
     * Update custom field options
     * Updates the options on a custom select field. Where an updated option is in use on an issue, the value on the issue is also updated. Options that are not found are ignored. A maximum of 1000 options, including sub-options of *Select List (cascading)* fields, can be updated per request. The options are updated on the global context of the field.  Note that this operation **only works for issue field select list options created in Jira or using operations from the [Issue custom field options](#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param fieldId The ID of the custom field. Note: This is the numeric part of the of the field ID. For example, for a field with the ID *customfield\\_10075* use *10075*.
     * @param updateCustomFieldOptionModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateCustomFieldOptions(fieldId: number, updateCustomFieldOptionModel: UpdateCustomFieldOptionModel, observe?: 'body', reportProgress?: boolean): Observable<object>;
    public updateCustomFieldOptions(fieldId: number, updateCustomFieldOptionModel: UpdateCustomFieldOptionModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<object>>;
    public updateCustomFieldOptions(fieldId: number, updateCustomFieldOptionModel: UpdateCustomFieldOptionModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<object>>;
    public updateCustomFieldOptions(fieldId: number, updateCustomFieldOptionModel: UpdateCustomFieldOptionModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fieldId === null || fieldId === undefined) {
            throw new Error('Required parameter fieldId was null or undefined when calling updateCustomFieldOptions.');
        }
        if (updateCustomFieldOptionModel === null || updateCustomFieldOptionModel === undefined) {
            throw new Error('Required parameter updateCustomFieldOptionModel was null or undefined when calling updateCustomFieldOptions.');
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

        return this.httpClient.put<object>(`${this.configuration.basePath}/rest/api/3/customField/${encodeURIComponent(String(fieldId))}/option`,
            updateCustomFieldOptionModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
