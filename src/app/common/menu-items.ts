export type MenuItemType = {
  key: string
  label: string
  image?: string
  isMega?: boolean
  isNew?: boolean
  url?: string
  parentKey?: string
  target?: '_self' | '_blank' | '_parent' | '_top'
  children?: MenuItemType[]
}

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'mobile-showcase',
    label: 'Home',
    url: '/landings/mobile-showcase',
  },
  {
    key: 'contacts-2',
    url: '/contacts/v2',
    label: 'Contact',
  },
  {
    key: 'coworking-space',
    label: 'Get Your Gameplan',
    url: '/landings/coworking-space',
  },
  {
    key: 'landings',
    label: 'Landings',
    isMega: true,
    // children: [
    //   {
    //     key: 'template-intro-page',
    //     label: 'Template Intro Page',
    //     url: '/',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/landings.jpg',
    //   },
    //   {
    //     key: 'mobile-showcase',
    //     label: 'Mobile App Showcase',
    //     url: '/landings/mobile-showcase',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/mobile-app.jpg',
    //   },
    //   {
    //     key: 'product-landing',
    //     label: 'Product Landing',
    //     url: '/landings/product',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/product-landing.jpg',
    //   },
    //   {
    //     key: 'saas-1',
    //     label: 'SaaS v.1',
    //     url: '/landings/saas-1',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/saas-1.jpg',
    //   },
    //   {
    //     key: 'saas-2',
    //     label: 'SaaS v.2',
    //     url: '/landings/saas-2',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/saas-2.jpg',
    //   },
    //   {
    //     key: 'saas-3',
    //     label: 'SaaS v.3',
    //     url: '/landings/saas-3',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/saas-3.jpg',
    //   },
    //   {
    //     key: 'saas-4',
    //     label: 'SaaS v.4',
    //     isNew: true,
    //     url: '/landings/saas-4',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/saas-4.jpg',
    //   },
    //   {
    //     key: 'shop-1',
    //     label: 'Shop Homepage v.1',
    //     url: '/landings/shop-1',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/shop-homepage-1.jpg',
    //   },
    //   {
    //     key: 'shop-2',
    //     label: 'Shop Homepage v.2',
    //     isNew: true,
    //     url: '/landings/shop-2',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/shop-homepage-2.jpg',
    //   },
    //   {
    //     key: 'marketing-agency',
    //     label: 'Marketing Agency',
    //     url: '/landings/marketing-agency',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/marketing-agency.jpg',
    //   },
    //   {
    //     key: 'creative-agency',
    //     label: 'Creative Agency',
    //     url: '/landings/creative-agency',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/creative-agency.jpg',
    //   },
    //   {
    //     key: 'conference',
    //     label: 'Conference (Event)',
    //     url: '/landings/conference',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/conference.jpg',
    //   },
    //   {
    //     key: 'web-studio',
    //     label: 'Web Studio',
    //     url: '/landings/web-studio',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/web-studio.jpg',
    //   },
    //   {
    //     key: 'corporate',
    //     label: 'Corporate',
    //     url: '/landings/corporate',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/corporate.jpg',
    //   },
    //   {
    //     key: 'insurance',
    //     label: 'Insurance Company',
    //     isNew: true,
    //     url: '/landings/insurance',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/insurance.jpg',
    //   },
    //   {
    //     key: 'business-consulting',
    //     label: 'Business Consulting',
    //     url: '/landings/business-consulting',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/business-consulting.jpg',
    //   },
    //   {
    //     key: 'coworking-space',
    //     label: 'Coworking Space',
    //     url: '/landings/coworking-space',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/coworking.jpg',
    //   },
    //   {
    //     key: 'yoga-studio',
    //     label: 'Yoga Studio',
    //     url: '/landings/yoga-studio',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/yoga-studio.jpg',
    //   },
    //   {
    //     key: 'influencer',
    //     label: 'Influencer',
    //     url: '/landings/influencer',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/influencer.jpg',
    //   },
    //   {
    //     key: 'blog',
    //     label: 'Blog Homepage',
    //     url: '/landings/blog',
    //     parentKey: 'landings',
    //     image: 'assets/img/megamenu/blog-homepage.jpg',
    //   },
    // ],
  },
  // {
  //   key: 'pages',
  //   label: 'Pages',
  //   children: [
  //     {
  //       key: 'pages-portfolio',
  //       label: 'Portfolio',
  //       parentKey: 'pages',
  //       children: [
  //         {
  //           key: 'portfolio-list-1',
  //           url: '/portfolio/list-1',
  //           parentKey: 'pages-portfolio',
  //           label: 'List View v.1',
  //         },
  //         {
  //           key: 'portfolio-list-2',
  //           url: '/portfolio/list-2',
  //           parentKey: 'pages-portfolio',
  //           label: 'List View v.2',
  //         },
  //         {
  //           key: 'portfolio-grid-1',
  //           url: '/portfolio/grid-1',
  //           parentKey: 'pages-portfolio',
  //           label: 'Grid View v.1',
  //         },
  //         {
  //           key: 'portfolio-grid-2',
  //           url: '/portfolio/grid-2',
  //           parentKey: 'pages-portfolio',
  //           label: 'Grid View v.2',
  //         },
  //         {
  //           key: 'portfolio-slider',
  //           url: '/portfolio/slider',
  //           parentKey: 'pages-portfolio',
  //           label: 'Slider View',
  //         },
  //         {
  //           key: 'portfolio-single-1',
  //           url: '/portfolio/single-1',
  //           parentKey: 'pages-portfolio',
  //           label: 'Single Project v.1',
  //         },
  //         {
  //           key: 'portfolio-single-2',
  //           url: '/portfolio/single-2',
  //           parentKey: 'pages-portfolio',
  //           label: 'Single Project v.2',
  //         },
  //       ],
  //     },
  //     {
  //       key: 'pages-shop',
  //       label: 'Shop',
  //       parentKey: 'pages',
  //       children: [
  //         {
  //           key: 'shop-catalog',
  //           url: '/shop/catalog',
  //           parentKey: 'pages-shop',
  //           label: 'Catalog (Listing)',
  //         },
  //         {
  //           key: 'shop-product',
  //           url: '/shop/product',
  //           parentKey: 'pages-shop',
  //           label: 'Product Page',
  //         },
  //         {
  //           key: 'shop-checkout',
  //           url: '/shop/checkout',
  //           parentKey: 'pages-shop',
  //           label: 'Checkout',
  //         },
  //       ],
  //     },
  //     {
  //       key: 'pages-blog',
  //       label: 'Blog',
  //       parentKey: 'pages',
  //       children: [
  //         {
  //           key: 'blog-grid-sidebar',
  //           url: '/blog/grid-sidebar',
  //           parentKey: 'pages-blog',
  //           label: 'Grid View with Sidebar',
  //         },
  //         {
  //           key: 'blog-grid-no-sidebar',
  //           url: '/blog/grid-no-sidebar',
  //           parentKey: 'pages-blog',
  //           label: 'Grid View no Sidebar',
  //         },
  //         {
  //           key: 'blog-list-with-sidebar',
  //           url: '/blog/list-sidebar',
  //           parentKey: 'pages-blog',
  //           label: 'List View with Sidebar',
  //         },
  //         {
  //           key: 'blog-list-sidebar',
  //           url: '/blog/list-no-sidebar',
  //           parentKey: 'pages-blog',
  //           label: 'List View no Sidebar',
  //         },
  //         {
  //           key: 'blog-post-1',
  //           url: '/blog/post-1',
  //           parentKey: 'pages-blog',
  //           label: 'Single post v.1',
  //         },
  //         {
  //           key: 'blog-post-2',
  //           url: '/blog/post-2',
  //           parentKey: 'pages-blog',
  //           label: 'Single post v.2',
  //         },
  //         {
  //           key: 'blog-post-3',
  //           url: '/blog/post-3',
  //           parentKey: 'pages-blog',
  //           label: 'Single post v.3',
  //         },
  //       ],
  //     },
  //     {
  //       key: 'pages-about',
  //       label: 'About',
  //       parentKey: 'pages',
  //       children: [
  //         {
  //           key: 'about-agency',
  //           url: '/about/agency',
  //           parentKey: 'pages-about',
  //           label: 'About - Agency',
  //         },
  //         {
  //           key: 'about-product',
  //           url: '/about/product',
  //           parentKey: 'pages-about',
  //           label: 'About - Product',
  //         },
  //       ],
  //     },
  //     {
  //       key: 'pages-services',
  //       label: 'Services',
  //       parentKey: 'pages',
  //       children: [
  //         {
  //           key: 'services-1',
  //           url: '/services/v1',
  //           parentKey: 'pages-services',
  //           label: 'Services v.1',
  //         },
  //         {
  //           key: 'services-2',
  //           url: '/services/v2',
  //           parentKey: 'pages-services',
  //           label: 'Services v.2',
  //         },
  //         {
  //           key: 'services-3',
  //           url: '/services/v3',
  //           parentKey: 'pages-services',
  //           label: 'Services v.3',
  //         },
  //       ],
  //     },
  //     {
  //       key: 'pages-pricing',
  //       url: '/pages/pricing',
  //       label: 'Pricing',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'pages-contacts',
  //       label: 'Contacts',
  //       parentKey: 'pages',
  //       children: [
  //         {
  //           key: 'contacts-1',
  //           url: '/contacts/v1',
  //           parentKey: 'pages-contacts',
  //           label: 'Contacts v.1',
  //         },
  //         {
  //           key: 'contacts-2',
  //           url: '/contacts/v2',
  //           parentKey: 'pages-contacts',
  //           label: 'Contacts v.2',
  //         },
  //         {
  //           key: 'contacts-3',
  //           url: '/contacts/v3',
  //           parentKey: 'pages-contacts',
  //           label: 'Contacts v.3',
  //         },
  //       ],
  //     },
  //     {
  //       key: 'pages-specialty',
  //       label: 'Specialty Pages',
  //       parentKey: 'pages',
  //       children: [
  //         {
  //           key: 'specialty-coming-soon-1',
  //           url: '/pages/coming-soon-1',
  //           parentKey: 'pages-specialty',
  //           label: 'Coming Soon v.1',
  //           target: '_blank',
  //         },
  //         {
  //           key: 'specialty-coming-soon-2',
  //           url: '/pages/coming-soon-2',
  //           parentKey: 'pages-specialty',
  //           label: 'Coming Soon v.2',
  //           target: '_blank',
  //         },
  //         {
  //           key: 'specialty-error-404-1',
  //           url: '/pages/error-404-1',
  //           parentKey: 'pages-specialty',
  //           label: '404 Error v.1',
  //           target: '_blank',
  //         },
  //         {
  //           key: 'specialty-error-404-2',
  //           url: '/pages/error-404-2',
  //           parentKey: 'pages-specialty',
  //           label: '404 Error v.2',
  //           target: '_blank',
  //         },
  //         {
  //           key: 'specialty-error-404-3',
  //           url: '/pages/error-404-3',
  //           parentKey: 'pages-specialty',
  //           label: '404 Error v.3',
  //           target: '_blank',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   key: 'account',
  //   label: 'Account',
  //   children: [
  //     {
  //       key: 'account-auth',
  //       label: 'Auth pages',
  //       parentKey: 'account',
  //       children: [
  //         {
  //           key: 'account-sign-in',
  //           url: '/auth/sign-in',
  //           parentKey: 'account-auth',
  //           label: 'Sign In',
  //           target: '_blank',
  //         },
  //         {
  //           key: 'account-sign-up',
  //           url: '/auth/sign-up',
  //           parentKey: 'account-auth',
  //           label: 'Sign Up',
  //           target: '_blank',
  //         },
  //         {
  //           key: 'account-sign-in-n-up',
  //           url: '/auth/sign-in-n-up',
  //           parentKey: 'account-auth',
  //           label: 'Sign In / Up',
  //           target: '_blank',
  //         },
  //         {
  //           key: 'account-password-recovery',
  //           url: '/auth/password-recovery',
  //           parentKey: 'account-auth',
  //           label: 'Password Recovery',
  //           target: '_blank',
  //         },
  //       ],
  //     },
  //     {
  //       key: 'account-overview',
  //       label: 'Overview',
  //       url: '/account/overview',
  //       parentKey: 'account',
  //     },
  //     {
  //       key: 'account-settings',
  //       label: 'Settings',
  //       url: '/account/settings',
  //       parentKey: 'account',
  //     },
  //     {
  //       key: 'account-billing',
  //       label: 'Billing',
  //       url: '/account/billing',
  //       parentKey: 'account',
  //     },
  //     {
  //       key: 'account-orders',
  //       label: 'Orders',
  //       url: '/account/orders',
  //       parentKey: 'account',
  //     },
  //     {
  //       key: 'account-earnings',
  //       label: 'Earnings',
  //       url: '/account/earnings',
  //       parentKey: 'account',
  //     },
  //     {
  //       key: 'account-chat',
  //       label: 'Chat (Messages)',
  //       url: '/account/chat',
  //       parentKey: 'account',
  //     },
  //     {
  //       key: 'account-favorites',
  //       label: 'Favorites (Wishlist)',
  //       url: '/account/favorites',
  //       parentKey: 'account',
  //     },
  //   ],
  // },
]
