import { Route } from '@angular/router'
import { MobileShowcaseComponent } from './mobile-showcase/mobile-showcase.component'
import { ProductComponent } from './product/product.component'
import { SaasV1Component } from './saas-v1/saas-v1.component'
import { SaasV2Component } from './saas-v2/saas-v2.component'
import { SaasV3Component } from './saas-v3/saas-v3.component'
import { SaasV4Component } from './saas-v4/saas-v4.component'
import { Shop1Component } from './shop-1/shop-1.component'
import { Shop2Component } from './shop-2/shop-2.component'
import { MarketingAgencyComponent } from './marketing-agency/marketing-agency.component'
import { CreativeAgencyComponent } from './creative-agency/creative-agency.component'
import { ConferenceComponent } from './conference/conference.component'
import { WebStudioComponent } from './web-studio/web-studio.component'
import { CorporateComponent } from './corporate/corporate.component'
import { InsuranceComponent } from './insurance/insurance.component'
import { BusinessConsultingComponent } from './business-consulting/business-consulting.component'
import { CoworkingSpaceComponent } from './coworking-space/coworking-space.component'
import { YogaStudioComponent } from './yoga-studio/yoga-studio.component'
import { InfluencerComponent } from './influencer/influencer.component'
import { BlogComponent } from './blog/blog.component'

export const LANDING_ROUTES: Route[] = [
  {
    path: 'mobile-showcase',
    component: MobileShowcaseComponent,
    data: { title: 'Mobile App Showcase' },
  },
  {
    path: 'product',
    component: ProductComponent,
    data: { title: 'Product Landing' },
  },
  {
    path: 'saas-1',
    component: SaasV1Component,
    data: { title: 'SaaS v.1' },
  },
  {
    path: 'saas-2',
    component: SaasV2Component,
    data: { title: 'SaaS v.2' },
  },
  {
    path: 'saas-3',
    component: SaasV3Component,
    data: { title: 'SaaS v.3' },
  },
  {
    path: 'saas-4',
    component: SaasV4Component,
    data: { title: 'SaaS v.4' },
  },
  {
    path: 'shop-1',
    component: Shop1Component,
    data: { title: 'Shop Homepage v.1' },
  },
  {
    path: 'shop-2',
    component: Shop2Component,
    data: { title: 'Shop Homepage v.2' },
  },
  {
    path: 'marketing-agency',
    component: MarketingAgencyComponent,
    data: { title: 'Marketing Agency' },
  },
  {
    path: 'creative-agency',
    component: CreativeAgencyComponent,
    data: { title: 'Creative Agency' },
  },
  {
    path: 'conference',
    component: ConferenceComponent,
    data: { title: 'Conference (Event)' },
  },
  {
    path: 'web-studio',
    component: WebStudioComponent,
    data: { title: 'Web Studio' },
  },
  {
    path: 'corporate',
    component: CorporateComponent,
    data: { title: 'Corporate' },
  },
  {
    path: 'insurance',
    component: InsuranceComponent,
    data: { title: 'Insurance' },
  },
  {
    path: 'business-consulting',
    component: BusinessConsultingComponent,
    data: { title: 'Business Consulting' },
  },
  {
    path: 'coworking-space',
    component: CoworkingSpaceComponent,
    data: { title: 'Coworking Space' },
  },
  {
    path: 'yoga-studio',
    component: YogaStudioComponent,
    data: { title: 'Yoga Studio' },
  },
  {
    path: 'influencer',
    component: InfluencerComponent,
    data: { title: 'Influencer' },
  },
  {
    path: 'blog',
    component: BlogComponent,
    data: { title: 'Blog Homepage' },
  },
]
