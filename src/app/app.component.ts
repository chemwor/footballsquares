import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { BackToTopComponent } from '@components/back-to-top/back-to-top.component'
import { CustomizerComponent } from '@components/customizer/customizer.component'
import { PreloaderComponent } from '@components/preloader/preloader.component'
import { TitleService } from '@core/services/title.service'
import { supabase } from 'src/app/data-sources/supabase.client'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PreloaderComponent,
    BackToTopComponent,
    CustomizerComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.init()

    // Load Supabase user/session on home screen after redirect
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Supabase session on home screen:', session)
      console.log('Supabase user on home screen:', session?.user)
    })
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(`[Supabase] Auth event on home screen: ${event}`)
      console.log('Session after event:', session)
      console.log('User after event:', session?.user)
    })
  }
}
