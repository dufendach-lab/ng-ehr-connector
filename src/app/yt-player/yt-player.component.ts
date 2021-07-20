import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-yt-player',
  templateUrl: './yt-player.component.html',
  styleUrls: ['./yt-player.component.scss']
})
export class YtPlayerComponent implements OnInit {
  @Input('vidToGet') vidId: string | undefined = undefined;
  id: string = '';
  width: number = 0;

  constructor() {
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
