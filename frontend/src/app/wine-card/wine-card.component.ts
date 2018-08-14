import {Component, OnInit} from '@angular/core';
import {Wine} from '../data/wine';
import {WineService} from '../wine/wine.service';
import {ContextualService} from '../webSearch/contextual.service';
import {map} from 'rxjs/operators';
import {Image} from '../data/image';

@Component({
  selector: 'app-wine-card',
  templateUrl: './wine-card.component.html',
  styleUrls: ['./wine-card.component.css']
})
export class WineCardComponent implements OnInit {
  wine: Wine;
  wineImage: Image;

  constructor(private wineService: WineService, private contextualService: ContextualService) {

  }

  ngOnInit() {
    this.getWine();
  }

  getWine(): void {
    this.wineService.getWineNo404(1).pipe(
      map(res => {
        console.log(res);
        return res;
      })
    ).subscribe(wine => {
      this.wine = wine;
      if(wine.title){
        this.getWineImage(wine.title);
      }
    });
  }

  getWineImage(title: string){
    this.contextualService.getImage(title).pipe(
      map(res => {
        console.log("Fetching image %o", res);
        return res;
      })
    ).subscribe(image => {
      this.wineImage = image;
      // this.wineImage.Value
      console.log("Fetched " + image.value);
    });
}
}
