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

import { PageBeanFieldConfigurationIssueTypeItemModel } from '../model/pageBeanFieldConfigurationIssueTypeItem';
import { PageBeanFieldConfigurationSchemeProjectsModel } from '../model/pageBeanFieldConfigurationSchemeProjects';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class IssueFieldConfigurationsService {

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
     * Get field configuration issue type items
     * Returns a paginated list of field configuration issue type items.  Only items used in classic projects are returned.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param fieldConfigurationSchemeId The list of field configuration scheme IDs. To include multiple field configuration schemes separate IDs with ampersand: &#x60;fieldConfigurationSchemeId&#x3D;10000&amp;fieldConfigurationSchemeId&#x3D;10001&#x60;.
     * @param startAt The index of the first item to return in a page of results (page offset).
     * @param maxResults The maximum number of items to return per page.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getFieldConfigurationSchemeMappings(fieldConfigurationSchemeId: Array<number>, startAt?: number, maxResults?: number, observe?: 'body', reportProgress?: boolean): Observable<PageBeanFieldConfigurationIssueTypeItemModel>;
    public getFieldConfigurationSchemeMappings(fieldConfigurationSchemeId: Array<number>, startAt?: number, maxResults?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageBeanFieldConfigurationIssueTypeItemModel>>;
    public getFieldConfigurationSchemeMappings(fieldConfigurationSchemeId: Array<number>, startAt?: number, maxResults?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageBeanFieldConfigurationIssueTypeItemModel>>;
    public getFieldConfigurationSchemeMappings(fieldConfigurationSchemeId: Array<number>, startAt?: number, maxResults?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (fieldConfigurationSchemeId === null || fieldConfigurationSchemeId === undefined) {
            throw new Error('Required parameter fieldConfigurationSchemeId was null or undefined when calling getFieldConfigurationSchemeMappings.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (startAt !== undefined && startAt !== null) {
            queryParameters = queryParameters.set('startAt', <any>startAt);
        }
        if (maxResults !== undefined && maxResults !== null) {
            queryParameters = queryParameters.set('maxResults', <any>maxResults);
        }
        if (fieldConfigurationSchemeId) {
            fieldConfigurationSchemeId.forEach((element) => {
                queryParameters = queryParameters.append('fieldConfigurationSchemeId', <any>element);
            })
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

        return this.httpClient.get<PageBeanFieldConfigurationIssueTypeItemModel>(`${this.configuration.basePath}/rest/api/3/fieldconfigurationscheme/mapping`,
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
     * Get field configuration schemes for projects
     * Returns a paginated list of field configuration schemes and, for each scheme, a list of the projects that use it.  The list is sorted by field configuration scheme ID. The first item contains the list of project IDs not assigned to any scheme.  Only field configuration schemes used in classic projects are returned.  **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
     * @param projectId The list of project IDs. To include multiple projects, separate IDs with ampersand: &#x60;projectId&#x3D;10000&amp;projectId&#x3D;10001&#x60;.
     * @param startAt The index of the first item to return in a page of results (page offset).
     * @param maxResults The maximum number of items to return per page.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getFieldConfigurationSchemeProjectMapping(projectId: Array<number>, startAt?: number, maxResults?: number, observe?: 'body', reportProgress?: boolean): Observable<PageBeanFieldConfigurationSchemeProjectsModel>;
    public getFieldConfigurationSchemeProjectMapping(projectId: Array<number>, startAt?: number, maxResults?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageBeanFieldConfigurationSchemeProjectsModel>>;
    public getFieldConfigurationSchemeProjectMapping(projectId: Array<number>, startAt?: number, maxResults?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageBeanFieldConfigurationSchemeProjectsModel>>;
    public getFieldConfigurationSchemeProjectMapping(projectId: Array<number>, startAt?: number, maxResults?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (projectId === null || projectId === undefined) {
            throw new Error('Required parameter projectId was null or undefined when calling getFieldConfigurationSchemeProjectMapping.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (startAt !== undefined && startAt !== null) {
            queryParameters = queryParameters.set('startAt', <any>startAt);
        }
        if (maxResults !== undefined && maxResults !== null) {
            queryParameters = queryParameters.set('maxResults', <any>maxResults);
        }
        if (projectId) {
            projectId.forEach((element) => {
                queryParameters = queryParameters.append('projectId', <any>element);
            })
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

        return this.httpClient.get<PageBeanFieldConfigurationSchemeProjectsModel>(`${this.configuration.basePath}/rest/api/3/fieldconfigurationscheme/project`,
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
