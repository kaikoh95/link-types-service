import { LinkTypes, OrderBy, SortBy } from '../../../common/util/constant';

export interface LinkTypePayload<T = any> extends Record<string, any> {
  linkType: LinkTypes;
  title?: string;
  url?: string;
  data?: T[]; // allow for extension such as Show or MusicPlayer types
  datetimeCreated: string;
  datetimeModified: string;
  datetimeDeleted: string | null;
  id: number;
  ownerId: string;
}

export type UserLinks<T = any> = {
  [linkType in LinkTypes]: LinkTypePayload<T>[];
};

export interface LinksQueryParams {
  sortBy: SortBy;
  orderBy: OrderBy;
}
