import { Component } from '@angular/core';
import {
  DataUrl,
  NgxImageCompressService,
  UploadResponse,
} from 'ngx-image-compress';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imgResultBeforeCompress: DataUrl = '';
  imgResultAfterCompress: DataUrl = '';
  ratio: any;
  quality: number;
  orientation: any;
  constructor(private imageCompress: NgxImageCompressService) {}
  rangeChange(event: any, name: string) {
    switch (name) {
      case 'ratio':
        this.ratio = event;
        break;

      case 'quality':
        this.quality = event;
        break;
      default:
        break;
    }
    this.compressFile(
      this.imgResultBeforeCompress,
      this.orientation,
      this.ratio,
      this.quality
    );
  }

  async uploadFile() {
    const { image, orientation, fileName } =
      await this.imageCompress.uploadFile();
    this.imgResultBeforeCompress = image;
    this.orientation = orientation;
    console.log(
      `Original: ${image.substring(0, 50)}... (${image.length} characters)`
    );
    console.log('Size in bytes was:', this.imageCompress.byteCount(image));
    if (image) {
      this.compressFile(
        this.imgResultBeforeCompress,
        this.orientation,
        undefined,
        undefined
      );
    }
  }
  compressFile(
    image?: string,
    orientation?: any,
    ratio?: number,
    quality?: number
  ) {
    this.imageCompress
      .compressFile(
        image,
        orientation,
        ratio ? ratio : 100,
        quality ? quality : 50
      )
      .then((result_1: DataUrl) => {
        this.imgResultAfterCompress = result_1;
      });
  }
}
