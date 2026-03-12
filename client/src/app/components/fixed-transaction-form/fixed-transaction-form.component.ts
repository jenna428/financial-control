import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fixed-transaction-form',
  templateUrl: './fixed-transaction-form.component.html',
  styleUrl: './fixed-transaction-form.component.scss'
})
export class FixedTransactionFormComponent implements OnInit {

  constructor(
    private readonly router: Router
  ){}

  @Input() action: string = '';
  @Input() primaryButton: string = '';
  @Input() secondaryButton: string = '';
  @Input() form: FormGroup;
  @Output() submitForm = new EventEmitter<void>();

  maxDate = new Date();

  ngOnInit(): void {
  }

  submit(){
    this.submitForm.emit();
  }

  secondaryAction(){
    if (this.secondaryButton == 'Limpar'){
      this.form.reset();
    }
    if(this.secondaryButton == 'Cancelar'){
      this.router.navigate(['/pecunia/dashboard']);
    }
  }
}
