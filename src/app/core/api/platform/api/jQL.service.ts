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

import { AutoCompleteSuggestionsModel } from '../model/autoCompleteSuggestions';
import { ConvertedJQLQueriesModel } from '../model/convertedJQLQueries';
import { ErrorCollectionModel } from '../model/errorCollection';
import { JQLPersonalDataMigrationRequestModel } from '../model/jQLPersonalDataMigrationRequest';
import { JQLReferenceDataModel } from '../model/jQLReferenceData';
import { JqlQueriesToParseModel } from '../model/jqlQueriesToParse';
import { ParsedJqlQueriesModel } from '../model/parsedJqlQueries';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class JQLService {

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
     * Get field reference data
     * Returns reference data for JQL searches. This is a downloadable version of the documentation provided in [Advanced searching - fields reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching - functions reference](https://confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom query builder.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:** None.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAutoComplete(observe?: 'body', reportProgress?: boolean): Observable<JQLReferenceDataModel>;
    public getAutoComplete(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<JQLReferenceDataModel>>;
    public getAutoComplete(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<JQLReferenceDataModel>>;
    public getAutoComplete(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<JQLReferenceDataModel>(`${this.configuration.basePath}/rest/api/3/jql/autocompletedata`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get field auto complete suggestions
     * Returns the JQL search auto complete suggestions for a field.  Suggestions can be obtained by providing:   *  &#x60;fieldName&#x60; to get a list of all values for the field.  *  &#x60;fieldName&#x60; and &#x60;fieldValue&#x60; to get a list of values containing the text in &#x60;fieldValue&#x60;.  *  &#x60;fieldName&#x60; and &#x60;predicateName&#x60; to get a list of all predicate values for the field.  *  &#x60;fieldName&#x60;, &#x60;predicateName&#x60;, and &#x60;predicateValue&#x60; to get a list of predicate values containing the text in &#x60;predicateValue&#x60;.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:** None.
     * @param fieldName The name of the field.
     * @param fieldValue The partial field item name entered by the user.
     * @param predicateName The name of the [ CHANGED operator predicate](https://confluence.atlassian.com/x/hQORLQ#Advancedsearching-operatorsreference-CHANGEDCHANGED) for which the suggestions are generated. The valid predicate operators are *by*, *from*, and *to*.
     * @param predicateValue The partial predicate item name entered by the user.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getFieldAutoCompleteForQueryString(fieldName?: string, fieldValue?: string, predicateName?: string, predicateValue?: string, observe?: 'body', reportProgress?: boolean): Observable<AutoCompleteSuggestionsModel>;
    public getFieldAutoCompleteForQueryString(fieldName?: string, fieldValue?: string, predicateName?: string, predicateValue?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AutoCompleteSuggestionsModel>>;
    public getFieldAutoCompleteForQueryString(fieldName?: string, fieldValue?: string, predicateName?: string, predicateValue?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AutoCompleteSuggestionsModel>>;
    public getFieldAutoCompleteForQueryString(fieldName?: string, fieldValue?: string, predicateName?: string, predicateValue?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (fieldName !== undefined && fieldName !== null) {
            queryParameters = queryParameters.set('fieldName', <any>fieldName);
        }
        if (fieldValue !== undefined && fieldValue !== null) {
            queryParameters = queryParameters.set('fieldValue', <any>fieldValue);
        }
        if (predicateName !== undefined && predicateName !== null) {
            queryParameters = queryParameters.set('predicateName', <any>predicateName);
        }
        if (predicateValue !== undefined && predicateValue !== null) {
            queryParameters = queryParameters.set('predicateValue', <any>predicateValue);
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

        return this.httpClient.get<AutoCompleteSuggestionsModel>(`${this.configuration.basePath}/rest/api/3/jql/autocompletedata/suggestions`,
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
     * Convert user identifiers to account IDs in JQL queries
     * Converts one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account IDs.  You may wish to use this operation if your system stores JQL queries and you want to make them GDPR-compliant. For more information about GDPR-related changes, see the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/).  **[Permissions](#permissions) required:** Permission to access Jira.
     * @param jQLPersonalDataMigrationRequestModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public migrateQueries(jQLPersonalDataMigrationRequestModel: JQLPersonalDataMigrationRequestModel, observe?: 'body', reportProgress?: boolean): Observable<ConvertedJQLQueriesModel>;
    public migrateQueries(jQLPersonalDataMigrationRequestModel: JQLPersonalDataMigrationRequestModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ConvertedJQLQueriesModel>>;
    public migrateQueries(jQLPersonalDataMigrationRequestModel: JQLPersonalDataMigrationRequestModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ConvertedJQLQueriesModel>>;
    public migrateQueries(jQLPersonalDataMigrationRequestModel: JQLPersonalDataMigrationRequestModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (jQLPersonalDataMigrationRequestModel === null || jQLPersonalDataMigrationRequestModel === undefined) {
            throw new Error('Required parameter jQLPersonalDataMigrationRequestModel was null or undefined when calling migrateQueries.');
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

        return this.httpClient.post<ConvertedJQLQueriesModel>(`${this.configuration.basePath}/rest/api/3/jql/pdcleaner`,
            jQLPersonalDataMigrationRequestModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Parse JQL query
     * Parses and validates JQL queries.  Validation is performed in context of the current user.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:** None.
     * @param jqlQueriesToParseModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public parseJqlQueries(jqlQueriesToParseModel: JqlQueriesToParseModel, observe?: 'body', reportProgress?: boolean): Observable<ParsedJqlQueriesModel>;
    public parseJqlQueries(jqlQueriesToParseModel: JqlQueriesToParseModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ParsedJqlQueriesModel>>;
    public parseJqlQueries(jqlQueriesToParseModel: JqlQueriesToParseModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ParsedJqlQueriesModel>>;
    public parseJqlQueries(jqlQueriesToParseModel: JqlQueriesToParseModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (jqlQueriesToParseModel === null || jqlQueriesToParseModel === undefined) {
            throw new Error('Required parameter jqlQueriesToParseModel was null or undefined when calling parseJqlQueries.');
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

        return this.httpClient.post<ParsedJqlQueriesModel>(`${this.configuration.basePath}/rest/api/3/jql/parse`,
            jqlQueriesToParseModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
