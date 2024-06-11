import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimeoutInfo } from 'rxjs';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit, OnDestroy {


  bannerImages = ["../../../assets/images/banner-image.jpg", "../../../assets/images/banner-image-2.jpg"];
  currentImage = 0;

  changeSlideInterval: any = undefined;

  constructor() {

  }

  ngOnInit(): void {
    
    // Change next Banner every 3 secounds
    this.changeSlideInterval = setInterval(() => {

      this.changeSlideNext();

    }, 3000);

  }

  ngOnDestroy(): void {
    
    clearInterval(this.changeSlideInterval);

  }

  changeSlide(n: number, next:boolean = false, previous: boolean = false, changeDot: boolean = false) {

    
    let bannerImageHtmlElement: HTMLElement;  
    let dots = document.querySelectorAll(".main-banner-navigation-button-dot");

    for (let i = 0; i < this.bannerImages.length; i++) {
      
      
      
      bannerImageHtmlElement = document.getElementById("img" + (i + 1)) as HTMLElement;
      bannerImageHtmlElement.style.opacity = '0';

      dots[i].className = dots[i].className.replace(" main-banner-navigation-button-active", "");
      
      
      

    }

    if(next === true) {
      this.currentImage = (this.currentImage + 1) % this.bannerImages.length;
    }
    
    if(previous === true) {
      this.currentImage = n-1;
    }

    if(changeDot === true) {
        this.currentImage = n;
    }

    bannerImageHtmlElement = document.getElementById("img" + (this.currentImage + 1)) as HTMLElement

    dots[this.currentImage].className += " main-banner-navigation-button-active";
    bannerImageHtmlElement.style.opacity = '1';

  }

  
  changeSlideNext() {

    let n = 0;
    
    if(this.currentImage === 0) {      
      n = (this.currentImage + 1) % this.bannerImages.length;
      if(n > this.bannerImages.length - 1) {
        n = 0;
      }
    }
    
    this.changeSlide(n, true, false, false);

  }

  changeSlidePrevious() {

    let n = this.currentImage;
    
    if(this.currentImage === 0) {
        n = (this.currentImage - 1) % this.bannerImages.length;
        
        
        if(n <= 0) {
            n = this.bannerImages.length;
        }

    }

    this.changeSlide(n, false, true, false);
    
  }

  

}
