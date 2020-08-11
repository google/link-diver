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

export interface GroupData {
    key: string,
    list: LinkData[],
    size: number,
    hide?: boolean
}

export interface GroupCount {
    numGroups: number;
    numLinks: number;
}

export enum SortOptions {
    DOM,
    DOMReverse,
    LexicoAscend,
    LexicoDescend
}

