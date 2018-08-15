import {Wine} from './wine';

export class WinePage {
  _embedded: { wines: Array<Wine> };
  _links: {
    first: { href: string },
    self: { href: string, templated: boolean },
    next: { href: string },
    last: { href: string },
    profile: { href: string },
  };
  page: {
    size: number,
    totalElements: string,
    totalPages: number,
    number: number
  };
}
