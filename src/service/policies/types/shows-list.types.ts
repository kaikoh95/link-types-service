export enum ShowsState {
  SOLD_OUT = 'sold out',
  ON_SALE = 'on sale',
  NOT_ON_SALE = 'not on sale',
  SALE_FINISHED = 'sale finished',
}

export interface Show {
  showsState: ShowsState;
  location: string;
  datetimeStart: Date;
  name?: string;
  duration?: number; // in hours
};
