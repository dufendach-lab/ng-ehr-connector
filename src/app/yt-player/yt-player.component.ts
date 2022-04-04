import { Component, Input, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-yt-player',
  templateUrl: './yt-player.component.html',
  styleUrls: ['./yt-player.component.scss']
})
export class YtPlayerComponent implements OnInit {
  @Input('vidToGet') vidId: string | undefined = undefined;
  id: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
   }

  ngOnInit(): void {
    this.setId()
  }

  setId() {
    if(this.vidId == 'TTS') {
      this.id = 'JW-_L5aBQew'
    } else if(this.vidId == 'CDH') {
      this.id = '4jVs_PYxCao'
    } else if(this.vidId == 'BOO') {
      this.id = 'QmRPm_HjZVU'
    } else if(this.vidId == 'SpinaBifida') {
      this.id = '0Gf6o2ZEQkc'
    }
  }

}
