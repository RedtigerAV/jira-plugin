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


/**
 * A JQL query clause that consists of nested clauses. For example, `(labels in (urgent, blocker) OR lastCommentedBy = currentUser()). Note that, where nesting is not defined, the parser nests JQL clauses based on the operator precedence. For example, \"A OR B AND C\" is parsed as \"(A OR B) AND C\". See Setting the precedence of operators for more information about precedence in JQL queries.`
 */
export interface CompoundClauseModel { 
    /**
     * The list of nested clauses.
     */
    clauses: Array<object>;
    /**
     * The operator between the clauses.
     */
    operator: CompoundClauseModel.OperatorModelEnum;
}
export namespace CompoundClauseModel {
    export type OperatorModelEnum = 'and' | 'or' | 'not';
    export const OperatorModelEnum = {
        And: 'and' as OperatorModelEnum,
        Or: 'or' as OperatorModelEnum,
        Not: 'not' as OperatorModelEnum
    };
}

