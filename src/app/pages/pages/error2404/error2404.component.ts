import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-error2404',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './error2404.component.html',
  styles: `
    #lady {
      will-change: opacity, transform;
      transition: all 0.7s ease-in-out;
      transform: translateY(150px);
      opacity: 0;
    }
    #lady.show {
      transform: none;
      opacity: 1;
    }
    #bubble,
    #question {
      will-change: opacity, transform;
      transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      transform: scale(0.8);
      opacity: 0;
    }
    #question {
      transform: scale(0.8) rotate(20deg);
    }
    #bubble.show,
    #question.show {
      transform: scale(1) rotate(0);
      opacity: 1;
    }
  `,
})
export class Error2404Component {
  @ViewChild('lady') lady!: ElementRef
  @ViewChild('question') question!: ElementRef
  @ViewChild('bubble') bubble!: ElementRef
  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.handleAfterViewInit()
  }
  private handleAfterViewInit() {
    setTimeout(() => {
      this.renderer.addClass(this.lady.nativeElement, 'show')
    }, 300)

    setTimeout(() => {
      this.renderer.addClass(this.question.nativeElement, 'show')
    }, 1000)

    setTimeout(() => {
      this.renderer.addClass(this.bubble.nativeElement, 'show')
    }, 1600)
  }
}
