/* eslint-disable no-unused-vars */

/**
 * Packages the URL of a link along with other relevant metadata about that link
 * used throughout the app
 */
export interface LinkData {
    href: string;
    host: string;
    domId: number;
    visible: boolean;
    tagName: string;
    source: string;
    highlighted: boolean;
    highlightId: string;
    status?: number;
    statusOk?: boolean;
    contentType?: string;
    rewrite?: string;
}

/**
 * This defines the different keys the user can input to filter.
 */
export enum FilterKeys {
    Regex = 'regexp:',
    Host = 'host:',
    Visible = 'visible:',
    TagName = 'tag:',
    StatusCode = 'status_code:',
    StatusOk = 'status_ok:',
    ContentType = 'content_type:'
}

/**
 * This defines a filter criteria to use in the filter pipe.
 */
export interface FilterOption<T> {
    filterKey: FilterKeys;
    inputString: string;
    value: T;
    isNegation: boolean;
    isValidInput: boolean;
    isHighlightableRegex: boolean;
}

/**
 * This defines the different keys the use can input to group by.
 */
export enum GroupByKeys {
    None = 'none',
    Rewrite = 'rewrite',
    URL = 'url',
    Host = 'host',
    Visible = 'visible',
    TagName = 'tag',
    StatusCode = 'status_code',
    StatusOk = 'status_ok',
    ContentType = 'content_type'
}

/**
 * Defines modifiers that can be added to the group input to add to the
 * GroupingOptions.
 */
export enum GroupingModifiers {
    Regex = 'regexp:',
    Rewrite = 'rewrite:',
    Sort = 'sort:'
}

/**
 * Enumerates the different ways groups themselves can be sorted.
 */
export enum GroupOrders {
    None,
    LexicoAscend,
    LexicoDescend,
    SizeAscend,
    SizeDescend
}

/**
 * Defines the settings used to group links by metadata or by a custom rewrite
 * rule.
 */
export interface GroupingOptions {
    groupBy: GroupByKeys;
    sort: GroupOrders;
    regex?: RegExp;
    rewrite?: string;
}

/**
 * Packages all of the data needed to properly display a group of links.
 */
export interface GroupData {
    key: string,
    list: LinkData[],
    size: number,
    sizeProportion: number,
    hide?: boolean
}

/**
 * Stores the number of groups and number of links found in a query so that it
 * can be displayed by the GroupCountComponent.
 */
export interface GroupCount {
    numGroups: number;
    numLinks: number;
}

/**
 * Enumerates the different ways to sort the list of links.
 */
export enum SortOptions {
    DOM,
    DOMReverse,
    LexicoAscend,
    LexicoDescend
}
