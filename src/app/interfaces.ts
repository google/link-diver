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
    highlighted: boolean;
    highlightId: number;
    status?: number;
    statusOk?: boolean;
    contentType?: string;
}

/**
 * Packages all of the data needed to properly display a group of links
 */
export interface GroupData {
    key: string,
    list: LinkData[],
    size: number,
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

