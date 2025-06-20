import { Component } from '@angular/core'
import { NavigationBar3Component } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { AboutComponent } from './components/about/about.component'
import { CategoriesComponent } from './components/categories/categories.component'
import { TrendingComponent } from './components/trending/trending.component'
import { CollectionsComponent } from './components/collections/collections.component'
import { FeaturesComponent } from './components/features/features.component'
import { GalleryComponent } from './components/gallery/gallery.component'
import { BannerComponent } from './components/banner/banner.component'
import { BlogComponent } from './components/blog/blog.component'
import { InstagramComponent } from './components/instagram/instagram.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'landings-shop-1',
  standalone: true,
  imports: [
    NavigationBar3Component,
    HeroComponent,
    AboutComponent,
    CategoriesComponent,
    TrendingComponent,
    CollectionsComponent,
    FeaturesComponent,
    GalleryComponent,
    BannerComponent,
    BlogComponent,
    InstagramComponent,
    FooterComponent,
  ],
  templateUrl: './shop-1.component.html',
})
export class Shop1Component {}
