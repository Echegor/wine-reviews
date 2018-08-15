import {Component, OnInit} from '@angular/core';
import {WineService} from '../wine/wine.service';
import {ContextualService} from '../webSearch/contextual.service';
import {map} from 'rxjs/operators';
import {Image} from '../data/image';
import {PageEvent} from '@angular/material';
import {WinePage} from '../data/winePage';

@Component({
  selector: 'app-wine-card',
  templateUrl: './wine-card.component.html',
  styleUrls: ['./wine-card.component.css']
})
export class WineCardComponent implements OnInit {
  winePage: WinePage;
  wineImage: Image;
  length: number;
  pageSize = 1;
  pageIndex = 0;
  pageSizeOptions: number[] = [1];

  constructor(private wineService: WineService, private contextualService: ContextualService) {
    this.winePage = new WinePage();
  }

  ngOnInit() {
    this.getWinePage();
  }

  /*
  * TODO: maybe fetch into another array 2 items away to fetch in background
  * */
  handlePage(event?: PageEvent) {
    this.pageIndex = event.pageIndex;
    console.log('page index ' + event.pageIndex);
    if (this.winePage.page.size === this.pageIndex) {
      console.log('Limit reached');
      this.wineService.getNextPage(this.winePage).subscribe(page => {
        console.log('Fetched next pageee, %o', page);
        this.handlePageFetched(page);
      });
    }
    else {
      this.getWineImage(this.winePage._embedded.wines[this.pageIndex%20].title);
    }
  }

  handlePageFetched(winePage: WinePage): void {
    console.log('Fetched next page, %o', WinePage);
    if (!winePage) {
      return;
    }
    this.winePage = winePage;
    console.log("current page: %o", this.winePage._embedded.wines[0]);
    this.length = this.winePage.page.totalPages;
    this.getWineImage(this.winePage._embedded.wines[this.pageIndex%20].title);
  }

  getWinePage(): void {
    console.log('Fetching wine page');
    this.wineService.getWines().subscribe(page => {
      this.handlePageFetched(page);
    });
  }

  // getWine(id: number): void {
  //   console.log('Fetching ' + id);
  //   this.wineService.getWineNo404(id).pipe(
  //     map(res => {
  //       console.log(res);
  //       return res;
  //     })
  //   ).subscribe(wine => {
  //     this.wine = wine;
  //     if (wine.title) {
  //       this.getWineImage(wine.title);
  //     }
  //   });
  // }

  getWineImage(title: string) {
    this.contextualService.getImage(title).pipe(
      map(res => {
        return res;
      })
    ).subscribe(image => {
      this.wineImage = image;
    });
  }
}
