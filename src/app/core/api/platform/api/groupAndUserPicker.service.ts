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

import { FoundUsersAndGroupsModel } from '../model/foundUsersAndGroups';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class GroupAndUserPickerService {

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
     * Find users and groups
     * Returns a list of users and groups matching a string. The string is used:   *  for users, to find a case-insensitive match with display name and e-mail address. Note that if a user has hidden their email address in their user profile, partial matches of the email address will not find the user. An exact match is required.  *  for groups, to find a case-sensitive match with group name.  For example, if the string *tin* is used, records with the display name *Tina*, email address *sarah@tinplatetraining.com*, and the group *accounting* would be returned.  Optionally, the search can be refined to:   *  the projects and issue types associated with a custom field, such as a user picker. The search can then be further refined to return only users and groups that have permission to view specific:           *  projects.      *  issue types.          If multiple projects or issue types are specified, they must be a subset of those enabled for the custom field or no results are returned. For example, if a field is enabled for projects A, B, and C then the search could be limited to projects B and C. However, if the search is limited to projects B and D, nothing is returned.  *  not return Connect app users and groups.  *  return groups that have a case-insensitive match with the query.  The primary use case for this resource is to populate a picker field suggestion list with users or groups. To this end, the returned object includes an &#x60;html&#x60; field for each list. This field highlights the matched query term in the item name with the HTML strong tag. Also, each list is wrapped in a response object that contains a header for use in a picker, specifically *Showing X of Y matching groups*.  This operation can be accessed anonymously.  **[Permissions](#permissions) required:** *Browse users and groups* [global permission](https://confluence.atlassian.com/x/yodKLg).
     * @param query The search string.
     * @param maxResults The maximum number of items to return in each list.
     * @param showAvatar Whether the user avatar should be returned. If an invalid value is provided, the default value is used.
     * @param fieldId The custom field ID of the field this request is for.
     * @param projectId The ID of a project that returned users and groups must have permission to view. To include multiple projects, provide an ampersand-separated list. For example, &#x60;projectId&#x3D;10000&amp;projectId&#x3D;10001&#x60;. This parameter is only used when &#x60;fieldId&#x60; is present.
     * @param issueTypeId The ID of an issue type that returned users and groups must have permission to view. To include multiple issue types, provide an ampersand-separated list. For example, &#x60;issueTypeId&#x3D;10000&amp;issueTypeId&#x3D;10001&#x60;. Special values, such as &#x60;-1&#x60; (all standard issue types) and &#x60;-2&#x60; (all subtask issue types), are supported. This parameter is only used when &#x60;fieldId&#x60; is present.
     * @param avatarSize The size of the avatar to return. If an invalid value is provided, the default value is used.
     * @param caseInsensitive Whether the search for groups should be case insensitive.
     * @param excludeConnectAddons Whether Connect app users and groups should be excluded from the search results. If an invalid value is provided, the default value is used.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findUsersAndGroups(query: string, maxResults?: number, showAvatar?: boolean, fieldId?: string, projectId?: Array<string>, issueTypeId?: Array<string>, avatarSize?: 'xsmall' | 'xsmall@2x' | 'xsmall@3x' | 'small' | 'small@2x' | 'small@3x' | 'medium' | 'medium@2x' | 'medium@3x' | 'large' | 'large@2x' | 'large@3x' | 'xlarge' | 'xlarge@2x' | 'xlarge@3x' | 'xxlarge' | 'xxlarge@2x' | 'xxlarge@3x' | 'xxxlarge' | 'xxxlarge@2x' | 'xxxlarge@3x', caseInsensitive?: boolean, excludeConnectAddons?: boolean, observe?: 'body', reportProgress?: boolean): Observable<FoundUsersAndGroupsModel>;
    public findUsersAndGroups(query: string, maxResults?: number, showAvatar?: boolean, fieldId?: string, projectId?: Array<string>, issueTypeId?: Array<string>, avatarSize?: 'xsmall' | 'xsmall@2x' | 'xsmall@3x' | 'small' | 'small@2x' | 'small@3x' | 'medium' | 'medium@2x' | 'medium@3x' | 'large' | 'large@2x' | 'large@3x' | 'xlarge' | 'xlarge@2x' | 'xlarge@3x' | 'xxlarge' | 'xxlarge@2x' | 'xxlarge@3x' | 'xxxlarge' | 'xxxlarge@2x' | 'xxxlarge@3x', caseInsensitive?: boolean, excludeConnectAddons?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FoundUsersAndGroupsModel>>;
    public findUsersAndGroups(query: string, maxResults?: number, showAvatar?: boolean, fieldId?: string, projectId?: Array<string>, issueTypeId?: Array<string>, avatarSize?: 'xsmall' | 'xsmall@2x' | 'xsmall@3x' | 'small' | 'small@2x' | 'small@3x' | 'medium' | 'medium@2x' | 'medium@3x' | 'large' | 'large@2x' | 'large@3x' | 'xlarge' | 'xlarge@2x' | 'xlarge@3x' | 'xxlarge' | 'xxlarge@2x' | 'xxlarge@3x' | 'xxxlarge' | 'xxxlarge@2x' | 'xxxlarge@3x', caseInsensitive?: boolean, excludeConnectAddons?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FoundUsersAndGroupsModel>>;
    public findUsersAndGroups(query: string, maxResults?: number, showAvatar?: boolean, fieldId?: string, projectId?: Array<string>, issueTypeId?: Array<string>, avatarSize?: 'xsmall' | 'xsmall@2x' | 'xsmall@3x' | 'small' | 'small@2x' | 'small@3x' | 'medium' | 'medium@2x' | 'medium@3x' | 'large' | 'large@2x' | 'large@3x' | 'xlarge' | 'xlarge@2x' | 'xlarge@3x' | 'xxlarge' | 'xxlarge@2x' | 'xxlarge@3x' | 'xxxlarge' | 'xxxlarge@2x' | 'xxxlarge@3x', caseInsensitive?: boolean, excludeConnectAddons?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (query === null || query === undefined) {
            throw new Error('Required parameter query was null or undefined when calling findUsersAndGroups.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (query !== undefined && query !== null) {
            queryParameters = queryParameters.set('query', <any>query);
        }
        if (maxResults !== undefined && maxResults !== null) {
            queryParameters = queryParameters.set('maxResults', <any>maxResults);
        }
        if (showAvatar !== undefined && showAvatar !== null) {
            queryParameters = queryParameters.set('showAvatar', <any>showAvatar);
        }
        if (fieldId !== undefined && fieldId !== null) {
            queryParameters = queryParameters.set('fieldId', <any>fieldId);
        }
        if (projectId) {
            projectId.forEach((element) => {
                queryParameters = queryParameters.append('projectId', <any>element);
            })
        }
        if (issueTypeId) {
            issueTypeId.forEach((element) => {
                queryParameters = queryParameters.append('issueTypeId', <any>element);
            })
        }
        if (avatarSize !== undefined && avatarSize !== null) {
            queryParameters = queryParameters.set('avatarSize', <any>avatarSize);
        }
        if (caseInsensitive !== undefined && caseInsensitive !== null) {
            queryParameters = queryParameters.set('caseInsensitive', <any>caseInsensitive);
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

        return this.httpClient.get<FoundUsersAndGroupsModel>(`${this.configuration.basePath}/rest/api/3/groupuserpicker`,
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
