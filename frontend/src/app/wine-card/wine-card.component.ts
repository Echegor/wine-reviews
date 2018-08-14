import {Component, OnInit} from '@angular/core';
import {Wine} from '../data/wine';
import {WineService} from '../wine/wine.service';
import {ContextualService} from '../webSearch/contextual.service';
import {map} from 'rxjs/operators';
import {Image} from '../data/image';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-wine-card',
  templateUrl: './wine-card.component.html',
  styleUrls: ['./wine-card.component.css']
})
export class WineCardComponent implements OnInit {
  wine: Wine;
  wineImage: Image;
  length = 100;
  pageSize = 1;
  pageIndex = 0;
  pageSizeOptions: number[] = [1];

  constructor(private wineService: WineService, private contextualService: ContextualService) {
  }

  ngOnInit() {
    this.getWine(this.pageIndex + 1);
  }

  /*
  * TODO: Use self links
  * */
  handlePage(event?: PageEvent) {
    this.getWine(event.pageIndex + 1);
  }

  getWine(id: number): void {
    console.log('Fetching ' + id);
    this.wineService.getWineNo404(id).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    ).subscribe(wine => {
      this.wine = wine;
      if (wine.title) {
        this.getWineImage(wine.title);
      }
    });
  }

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
