import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import type { VariableExpenditureDto } from '../../dto/variable-expenditure.dto';
import { VariableExpenditureService } from '../../service/variable-expentidure.service';
import { VariableExpenditureUpdateComponent } from '../variable-expenditure-update/variable-expenditure-update.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-variable-expenditure-form',
  templateUrl: './variable-expenditure-form.component.html',
  styleUrl: './variable-expenditure-form.component.scss'
})
export class VariableExpenditureFormComponent {

  @Input() data: VariableExpenditureDto;

  @Output()
  onSubmit: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly variableExpenditureService: VariableExpenditureService,
    @Optional() private readonly dialogRef: MatDialogRef <VariableExpenditureUpdateComponent>,
  ){}

  @Input() action: string = '';

  form: FormGroup;
  primaryButton: string;
  secondButton: string;
  title: string;

  async ngOnInit(): Promise<void> {
    if(this.action == 'create'){

      this.form = this.fb.group({
        name: ['']
      });

      this.title = 'Adicionar'
      this.primaryButton = 'Adicionar';
      this.secondButton = 'Limpar';

      return;
    }

    this.form = this.fb.group({
      name: [this.data.name],
    });

    this.title = 'Editar'
    this.primaryButton = 'Salvar';
    this.secondButton = 'Cancelar'
  
    console.log(this.action)
  }
  
  async submit(){
    if(this.action == 'create'){
        const variableExpenditureDto: VariableExpenditureDto = {
        name: this.form.get('name').value,
        isActive: true
      }
      await this.variableExpenditureService.save(variableExpenditureDto);

      this.onSubmit.emit();
    }

    if(this.action == 'update'){
        const variableExpenditureDto: VariableExpenditureDto = {
        name: this.form.get('name').value,
        isActive: true
      }

      variableExpenditureDto.id = this.data.id;

      await this.variableExpenditureService.update(variableExpenditureDto);
      this.dialogRef.close();
    }
    
  }

  secondaryAction(){
    if (this.action == 'create'){
      this.form.reset();
    }
    
    if(this.action == 'update'){
      this.dialogRef.close();
    }
  }
}
