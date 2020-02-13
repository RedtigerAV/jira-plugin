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

import { ContainerForRegisteredWebhooksModel } from '../model/containerForRegisteredWebhooks';
import { ContainerForWebhookIDsModel } from '../model/containerForWebhookIDs';
import { ErrorCollectionModel } from '../model/errorCollection';
import { FailedWebhooksModel } from '../model/failedWebhooks';
import { PageBeanWebhookModel } from '../model/pageBeanWebhook';
import { WebhookRegistrationDetailsModel } from '../model/webhookRegistrationDetails';
import { WebhooksExpirationDateModel } from '../model/webhooksExpirationDate';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class WebhooksService {

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
     * Delete webhooks by ID
     * Removes webhooks by ID. Only webhooks registered by the calling Connect app are removed. If webhooks created by other apps are specified, they are ignored.  **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation.
     * @param containerForWebhookIDsModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteWebhookById(containerForWebhookIDsModel: ContainerForWebhookIDsModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteWebhookById(containerForWebhookIDsModel: ContainerForWebhookIDsModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteWebhookById(containerForWebhookIDsModel: ContainerForWebhookIDsModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteWebhookById(containerForWebhookIDsModel: ContainerForWebhookIDsModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (containerForWebhookIDsModel === null || containerForWebhookIDsModel === undefined) {
            throw new Error('Required parameter containerForWebhookIDsModel was null or undefined when calling deleteWebhookById.');
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

        return this.httpClient.delete<any>(`${this.configuration.basePath}/rest/api/2/webhook`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get dynamic webhooks for app
     * Returns the webhooks registered by the calling app.  **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation.
     * @param startAt The index of the first item to return in a page of results (page offset).
     * @param maxResults The maximum number of items to return per page.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDynamicWebhooksForApp(startAt?: number, maxResults?: number, observe?: 'body', reportProgress?: boolean): Observable<PageBeanWebhookModel>;
    public getDynamicWebhooksForApp(startAt?: number, maxResults?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageBeanWebhookModel>>;
    public getDynamicWebhooksForApp(startAt?: number, maxResults?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageBeanWebhookModel>>;
    public getDynamicWebhooksForApp(startAt?: number, maxResults?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<PageBeanWebhookModel>(`${this.configuration.basePath}/rest/api/2/webhook`,
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
     * Get failed webhooks
     * Returns webhooks that have recently failed to be delivered to the requesting app after the maximum number of retries.  After 72 hours the failure may no longer be returned by this operation.  The oldest failure is returned first.  This method uses a cursor-based pagination. To request the next page use the failure time of the last webhook on the list as the &#x60;failedAfter&#x60; value or use the URL provided in &#x60;next&#x60;.  **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation.
     * @param maxResults The maximum number of webhooks to return per page. If obeying the maxResults directive would result in records with the same failure time being split across pages, the directive is ignored and all records with the same failure time included on the page.
     * @param after The time after which any webhook failure must have occurred for the record to be returned, expressed as milliseconds since the UNIX epoch.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getFailedWebhooks(maxResults?: number, after?: number, observe?: 'body', reportProgress?: boolean): Observable<FailedWebhooksModel>;
    public getFailedWebhooks(maxResults?: number, after?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FailedWebhooksModel>>;
    public getFailedWebhooks(maxResults?: number, after?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FailedWebhooksModel>>;
    public getFailedWebhooks(maxResults?: number, after?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (maxResults !== undefined && maxResults !== null) {
            queryParameters = queryParameters.set('maxResults', <any>maxResults);
        }
        if (after !== undefined && after !== null) {
            queryParameters = queryParameters.set('after', <any>after);
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

        return this.httpClient.get<FailedWebhooksModel>(`${this.configuration.basePath}/rest/api/2/webhook/failed`,
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
     * Extend webhook life
     * Webhooks registered through the REST API expire after 30 days. Call this resource periodically to keep them alive.  Unrecognized webhook IDs (nonexistent or belonging to other apps) are ignored.  **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation.
     * @param containerForWebhookIDsModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public refreshWebhooks(containerForWebhookIDsModel: ContainerForWebhookIDsModel, observe?: 'body', reportProgress?: boolean): Observable<WebhooksExpirationDateModel>;
    public refreshWebhooks(containerForWebhookIDsModel: ContainerForWebhookIDsModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<WebhooksExpirationDateModel>>;
    public refreshWebhooks(containerForWebhookIDsModel: ContainerForWebhookIDsModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<WebhooksExpirationDateModel>>;
    public refreshWebhooks(containerForWebhookIDsModel: ContainerForWebhookIDsModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (containerForWebhookIDsModel === null || containerForWebhookIDsModel === undefined) {
            throw new Error('Required parameter containerForWebhookIDsModel was null or undefined when calling refreshWebhooks.');
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

        return this.httpClient.put<WebhooksExpirationDateModel>(`${this.configuration.basePath}/rest/api/2/webhook/refresh`,
            containerForWebhookIDsModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Register dynamic webhooks
     * Registers webhooks.  **[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/integrating-with-jira-cloud/#atlassian-connect) can use this operation.
     * @param webhookRegistrationDetailsModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public registerDynamicWebhooks(webhookRegistrationDetailsModel: WebhookRegistrationDetailsModel, observe?: 'body', reportProgress?: boolean): Observable<ContainerForRegisteredWebhooksModel>;
    public registerDynamicWebhooks(webhookRegistrationDetailsModel: WebhookRegistrationDetailsModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ContainerForRegisteredWebhooksModel>>;
    public registerDynamicWebhooks(webhookRegistrationDetailsModel: WebhookRegistrationDetailsModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ContainerForRegisteredWebhooksModel>>;
    public registerDynamicWebhooks(webhookRegistrationDetailsModel: WebhookRegistrationDetailsModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (webhookRegistrationDetailsModel === null || webhookRegistrationDetailsModel === undefined) {
            throw new Error('Required parameter webhookRegistrationDetailsModel was null or undefined when calling registerDynamicWebhooks.');
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

        return this.httpClient.post<ContainerForRegisteredWebhooksModel>(`${this.configuration.basePath}/rest/api/2/webhook`,
            webhookRegistrationDetailsModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
