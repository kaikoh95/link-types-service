export enum RequestHeaderKey {
    X_API_KEY = 'x-sm-apikey',
    X_FORWARDED_FOR = 'x-forwarded-for',
}

export enum LinkTypes {
    CLASSIC = 'classic',
    MUSIC_PLAYER = 'music-player',
    SHOWS_LIST = 'shows-list',
}

export enum SortBy {
    ID = 'id',
    DATETIME_CREATED = 'datetimeCreated',
    LINK_TYPE = 'linkType',
}

export enum OrderBy {
    ASC = 'asc',
    DESC = 'desc',
}

export const API_CALLS_LIMIT = 10;
export const API_CALLS_WINDOW = 1000; // ms
export const APP_TTL = 60 * 60 * 24; // 1 day
