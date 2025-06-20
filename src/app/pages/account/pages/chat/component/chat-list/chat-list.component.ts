import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core'
import {
  SimplebarAngularComponent,
  SimplebarAngularModule,
} from 'simplebar-angular'
import { ContactType, contactsData, MessageType, messagesData } from '../data'
import { CommonModule } from '@angular/common'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import {
  NgbDropdownModule,
  NgbOffcanvas,
  NgbOffcanvasModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'account-chat-list',
  standalone: true,
  imports: [
    SimplebarAngularModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDropdownModule,
    NgbOffcanvasModule,
  ],
  templateUrl: './chat-list.component.html',
  styles: `
    .dropdown-toggle::after {
      display: none;
    }
  `,
})
export class ChatListComponent implements OnInit {
  contactList: ContactType[] = contactsData
  allContactList: ContactType[] = contactsData
  messagesData: MessageType[] = messagesData
  activeTab: number = 3
  formData!: UntypedFormGroup
  chatMessage: any[] = []
  username: string = 'Mark Virgows'
  avatar: string = 'assets/img/avatar/19.jpg'
  avatar2: string = 'MV'
  term: any
  @ViewChild('scrollRef', { static: false })
  scrollRef!: SimplebarAngularComponent

  private offcanvasService = inject(NgbOffcanvas)

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    // Validation
    this.formData = this.formBuilder.group({
      messages: ['', [Validators.required]],
    })
  }

  chatContactList(index: any, name: string, image: any, avatar: any) {
    this.activeTab = index
    this.username = name
    this.avatar = image
    this.avatar2 = avatar
  }

  messageSave() {
    const messageContent = this.formData.get('messages')!.value

    if (this.formData.valid && messageContent) {
      const newMessage = {
        id: this.messagesData.length + 1,
        date: 'Today',
        messages: [
          {
            sender: {
              avatar: 'assets/img/avatar/01.jpg',
            },
            content: messageContent,
            timestamp: new Date().toLocaleTimeString(),
            isSentByCurrentUser: true,
          },
        ],
      }
      this.messagesData.push(newMessage)
    }

    setTimeout(() => {
      const newMessage = {
        id: this.messagesData.length + 1,
        date: '',
        messages: [
          {
            sender: {
              avatar: 'assets/img/avatar/01.jpg',
            },
            content: messageContent,
            timestamp: new Date().toLocaleTimeString(),
            isSentByCurrentUser: false,
          },
        ],
      }
      this.messagesData.push(newMessage)
      this.onListScroll()
    }, 1000)
    this.onListScroll()
    this.formData.reset()
  }

  ngAfterViewInit() {
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 300
    this.onListScroll()
  }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight
      }, 100)
    }
  }

  // filterData
  filterChat() {
    if (this.term) {
      this.contactList = this.allContactList.filter((name: any) =>
        name.name.toLowerCase().includes(this.term.toLowerCase())
      )
    } else {
      this.contactList = this.allContactList
    }
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {
      backdrop: false,
      panelClass: 'rounded-5',
    })
  }
}
