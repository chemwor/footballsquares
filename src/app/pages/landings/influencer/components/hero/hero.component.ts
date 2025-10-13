import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { currency } from 'src/app/states/constants'
import { supabase } from '../../../../../data-sources/supabase.client'

@Component({
  selector: 'influencer-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent implements OnInit {
  selectedCurrency = currency
  userName: string = ''
  isLoading = true

  async ngOnInit() {
    await this.loadUserInfo()
  }

  async loadUserInfo() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error) {
        console.error('Error loading user info:', error)
        this.isLoading = false
        return
      }

      if (user) {
        // Extract name from user metadata or email
        this.userName =
          user.user_metadata?.['full_name'] ||
          user.user_metadata?.['display_name'] ||
          user.user_metadata?.['name'] ||
          user.email?.split('@')[0] ||
          ''
      }
    } catch (err) {
      console.error('Unexpected error loading user info:', err)
    } finally {
      this.isLoading = false
    }
  }
}
