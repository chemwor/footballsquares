import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sq-request-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="open" class="modal-backdrop debug-modal" (click)="onBackdrop($event)" tabindex="-1">
      <div class="modal" role="dialog" aria-modal="true" (keydown.escape)="close()"
        (click)="$event.stopPropagation()">
        <h2>Request Square [{{row}},{{col}}]</h2>
        <form (submit)="submit($event)" #form="ngForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              [(ngModel)]="name"
              required
              #nameInput="ngModel"
              #nameField
              placeholder="Your name"
            />
            <div class="error" *ngIf="nameInput.invalid && nameInput.touched">
              Name is required
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="email"
              required
              email
              #emailInput="ngModel"
              placeholder="your@email.com"
            />
            <div class="error" *ngIf="emailInput.invalid && emailInput.touched">
              Valid email is required
            </div>
          </div>

          <div class="actions">
            <button type="button" (click)="close()">Cancel</button>
            <button
              type="submit"
              [disabled]="form.invalid"
              class="primary"
            >
              Request Square
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      display: flex !important;
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.8);
      align-items: center;
      justify-content: center;
      z-index: 99999;
    }
    .modal {
      display: block !important;
      background: #2a2d30;
      color: #fff;
      border-radius: 12px;
      padding: 2rem;
      min-width: 320px;
      box-shadow: 0 2px 16px #0008;
      z-index: 100000;
    }
    h2 {
      margin: 0 0 1.5rem;
      font-size: 1.4rem;
      color: #f7c873;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #eee;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      border-radius: 6px;
      border: 1px solid #444;
      background: #1a1d20;
      color: #fff;
      font-size: 1rem;
    }
    input:focus {
      outline: none;
      border-color: #f7c873;
    }
    .error {
      color: #ff4444;
      font-size: 0.9rem;
      margin-top: 0.25rem;
    }
    .actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }
    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    button[type="button"] {
      background: #444;
      color: #fff;
    }
    button[type="button"]:hover {
      background: #555;
    }
    button.primary {
      background: #f7c873;
      color: #000;
    }
    button.primary:hover {
      background: #f9d48f;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class RequestModalComponent implements OnChanges {
  @Input() open = false;
  @Input() row!: number;
  @Input() col!: number;
  @Output() closed = new EventEmitter<void>();
  @Output() requested = new EventEmitter<{ name: string; email: string }>();

  name = '';
  email = '';

  @ViewChild('nameField') nameField!: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open'] && this.open) {
      setTimeout(() => {
        this.nameField.nativeElement.focus();
      }, 0);
    }
  }

  close() {
    this.closed.emit();
    this.name = '';
    this.email = '';
  }

  submit(event: Event) {
    event.preventDefault();
    if (this.name && this.email) {
      this.requested.emit({ name: this.name, email: this.email });
      this.close();
    }
  }

  onBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) this.close();
  }
}
