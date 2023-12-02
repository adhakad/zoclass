
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
declare var jQuery: any;
import { isPlatformBrowser } from '@angular/common';
import { Banner } from 'src/app/modal/banner.model';
import { Teacher } from 'src/app/modal/teacher.model';
import { Ads } from 'src/app/modal/ads.model';
import { Topper } from 'src/app/modal/topper.model';
import { Testimonial } from 'src/app/modal/testimonial.model';
import { environment } from 'src/environments/environment';
import { BannerService } from 'src/app/services/banner.service';
import { AdsService } from 'src/app/services/ads.service';
import { TopperService } from 'src/app/services/topper.service';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  public baseUrl = environment.API_URL;
  bannerInfo: any[] = [];
  teacherInfo: any[] = [];
  adsInfo: any[] = [];
  topperInfo: any[] = [];
  testimonialInfo: any[] = [];
  cls: number = 0;
  loggedInStudentInfo: any;
  no: number = 0;
  loadTitle = false;
  loader: Boolean = true;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private bannerService: BannerService, private topperService: TopperService, private testimonialService: TestimonialService, private adsService: AdsService, private studentAuthService: StudentAuthService) { }

  async ngOnInit() {
    this.getLoggedInStudentInfo();
    this.getBanner();
    this.getAds()
    this.getTestimonial();
    this.getTopper();
  }

  getLoggedInStudentInfo() {
    this.loggedInStudentInfo = this.studentAuthService.getLoggedInStudentInfo();
    if (this.loggedInStudentInfo) {
      this.cls = this.loggedInStudentInfo?.class;
    }
  }
  ngAfterViewInit() {
    if (this.isBrowser) {

      setTimeout(() => {
        jQuery('.banner-carousel').owlCarousel({
          items: 1,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: false,
          loop: true,
          dots: false,
          margin: 0,
          nav: false,
          responsiveClass: true,
        });
        jQuery('.topper-carousel').owlCarousel({
          stagePadding: 30,
          items: 2,
          loop: false,
          dots: false,
          nav: true,
          responsiveClass: true,
          navText: [
            "<button style='position:absolute;left:-12px;background:#8c88ff3d;color:#4e4caacd;border:none;border-radius:50%;width:30px;height:30px;top:50%;transform:translateY(-50%);'><mat-icon style='margin-top:2px;margin-left:-3px;' class='material-icons'>keyboard_arrow_left</mat-icon></button>",
            "<button style='position:absolute;right:-12px;background:#8c88ff3d;color:#4e4caacd;border:none;border-radius:50%;width:30px;height:30px;top:50%;transform:translateY(-50%);'><mat-icon style='margin-top:2px;margin-left:-3px;' class='material-icons'>keyboard_arrow_right</mat-icon></button>"
          ],
          responsive: {
            600: {
              stagePadding: 30,
              items: 4,
            },
            1500: {
              stagePadding: 50,
              items: 5,
            },
          }
        });
        jQuery('.ads-carousel').owlCarousel({
          stagePadding: 25,
          items: 1,
          margin: 10,
          loop: true,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: false,
          dots: false,
          nav: false,
          responsiveClass: true,
          responsive: {
            600: {
              stagePadding: 65,
              items: 2,
              margin: 40,
            },
            1500: {
              stagePadding: 65,
              items: 3,
              margin: 40,
            },
          }
        });
        jQuery('.testimonial-carousel').owlCarousel({
          stagePadding: 30,
          items: 1,
          loop: false,
          dots: false,
          nav: true,
          responsiveClass: true,
          navText: [
            "<button style='position:absolute;left:-10px;background:#8c88ff3d;color:#4e4caacd;border:none;border-radius:50%;width:30px;height:30px;top:50%;transform:translateY(-50%);'><mat-icon style='margin-top:2px;margin-left:-3px;' class='material-icons'>keyboard_arrow_left</mat-icon></button>",
            "<button style='position:absolute;right:-10px;background:#8c88ff3d;color:#4e4caacd;border:none;border-radius:50%;width:30px;height:30px;top:50%;transform:translateY(-50%);'><mat-icon style='margin-top:2px;margin-left:-3px;' class='material-icons'>keyboard_arrow_right</mat-icon></button>"
          ],
          responsive: {
            600: {
              stagePadding: 50,
              items: 3,
            },
            1500: {
              stagePadding: 50,
              items: 4,
            },
          }
        });
        setTimeout(()=>{
          this.loader = false;
        },500)
      }, 3000);

    }
  }

  getBanner() {
    this.bannerService.getBannerList().subscribe((res: any[]) => {
      if (res) {
        this.bannerInfo = res;
      }
    })
  }
  getTopper() {
    this.topperService.getTopperList().subscribe((res: any[]) => {
      if (res) {
        this.topperInfo = res;
        setTimeout(() => {
          this.loadTitle = true;
        }, 1500)
      }
    })
  }
  getAds() {
    this.adsService.getAdsList().subscribe((res: any[]) => {
      if (res) {
        this.adsInfo = res;
      }
    })
  }

  getTestimonial() {
    this.testimonialService.getTestimonialList().subscribe((res: any[]) => {
      if (res) {
        this.testimonialInfo = res;
      }
    })
  }
}
