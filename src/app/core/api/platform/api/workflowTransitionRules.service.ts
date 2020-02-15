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

import { ErrorCollectionModel } from '../model/errorCollection';
import { PageBeanWorkflowTransitionRulesModel } from '../model/pageBeanWorkflowTransitionRules';
import { WorkflowTransitionRulesUpdateErrorsModel } from '../model/workflowTransitionRulesUpdateErrors';
import { WorkflowTransitionRulesUpdateModel } from '../model/workflowTransitionRulesUpdate';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class WorkflowTransitionRulesService {

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
     * Get workflow transition rule configurations
     * Returns a paginated list of workflows with transition rules. The workflows can be filtered to return only those containing workflow transition rules:   *  of one or more transition rule types, such as [workflow post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/).  *  matching one or more transition rule keys.  Only workflows containing transition rules created by the calling Connect app are returned. However, if a workflow is returned all transition rules that match the filters are returned for that workflow.  Due to server-side optimizations, workflows with an empty list of rules may be returned; these workflows can be ignored.  **[Permissions](#permissions) required:** Only Connect apps can use this operation.
     * @param types The types of the transition rules to return.
     * @param startAt The index of the first item to return in a page of results (page offset).
     * @param maxResults The maximum number of items to return per page.
     * @param keys The transition rule class keys, as defined in the Connect app descriptor, of the transition rules to return.
     * @param expand Use [expand](#expansion) to include additional information in the response. This parameter accepts &#x60;transition&#x60;, which, for each rule, returns information about the transition the rule is assigned to.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getWorkflowTransitionRuleConfigurations(types: Array<'postfunction' | 'condition' | 'validator'>, startAt?: number, maxResults?: number, keys?: Array<string>, expand?: string, observe?: 'body', reportProgress?: boolean): Observable<PageBeanWorkflowTransitionRulesModel>;
    public getWorkflowTransitionRuleConfigurations(types: Array<'postfunction' | 'condition' | 'validator'>, startAt?: number, maxResults?: number, keys?: Array<string>, expand?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageBeanWorkflowTransitionRulesModel>>;
    public getWorkflowTransitionRuleConfigurations(types: Array<'postfunction' | 'condition' | 'validator'>, startAt?: number, maxResults?: number, keys?: Array<string>, expand?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageBeanWorkflowTransitionRulesModel>>;
    public getWorkflowTransitionRuleConfigurations(types: Array<'postfunction' | 'condition' | 'validator'>, startAt?: number, maxResults?: number, keys?: Array<string>, expand?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (types === null || types === undefined) {
            throw new Error('Required parameter types was null or undefined when calling getWorkflowTransitionRuleConfigurations.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (startAt !== undefined && startAt !== null) {
            queryParameters = queryParameters.set('startAt', <any>startAt);
        }
        if (maxResults !== undefined && maxResults !== null) {
            queryParameters = queryParameters.set('maxResults', <any>maxResults);
        }
        if (types) {
            types.forEach((element) => {
                queryParameters = queryParameters.append('types', <any>element);
            })
        }
        if (keys) {
            keys.forEach((element) => {
                queryParameters = queryParameters.append('keys', <any>element);
            })
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

        return this.httpClient.get<PageBeanWorkflowTransitionRulesModel>(`${this.configuration.basePath}/rest/api/2/workflow/rule/config`,
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
     * Update workflow transition rule configurations
     * Updates configuration of workflow transition rules. The following rule types are supported:   *  [post functions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-post-function/)  *  [conditions](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-condition/)  *  [validators](https://developer.atlassian.com/cloud/jira/platform/modules/workflow-validator/)  Only rules created by the calling Connect app can be updated.  **[Permissions](#permissions) required:** Only Connect apps can use this operation.
     * @param workflowTransitionRulesUpdateModel 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateWorkflowTransitionRuleConfigurations(workflowTransitionRulesUpdateModel: WorkflowTransitionRulesUpdateModel, observe?: 'body', reportProgress?: boolean): Observable<WorkflowTransitionRulesUpdateErrorsModel>;
    public updateWorkflowTransitionRuleConfigurations(workflowTransitionRulesUpdateModel: WorkflowTransitionRulesUpdateModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<WorkflowTransitionRulesUpdateErrorsModel>>;
    public updateWorkflowTransitionRuleConfigurations(workflowTransitionRulesUpdateModel: WorkflowTransitionRulesUpdateModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<WorkflowTransitionRulesUpdateErrorsModel>>;
    public updateWorkflowTransitionRuleConfigurations(workflowTransitionRulesUpdateModel: WorkflowTransitionRulesUpdateModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (workflowTransitionRulesUpdateModel === null || workflowTransitionRulesUpdateModel === undefined) {
            throw new Error('Required parameter workflowTransitionRulesUpdateModel was null or undefined when calling updateWorkflowTransitionRuleConfigurations.');
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

        return this.httpClient.put<WorkflowTransitionRulesUpdateErrorsModel>(`${this.configuration.basePath}/rest/api/2/workflow/rule/config`,
            workflowTransitionRulesUpdateModel,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}