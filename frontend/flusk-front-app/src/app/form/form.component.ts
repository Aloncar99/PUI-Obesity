import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    DropdownModule,
    TooltipModule,
    ButtonModule,
    FormsModule, 
    InputTextModule
  ],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  bmiForm!: FormGroup;

  genderOptions = [
    { label: 'Male', value: true },
    { label: 'Female', value: false }
];

yesNoOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
];

caecOptions = [
    { label: 'Frequently', value: 'Frequently' },
    { label: 'Sometimes', value: 'Sometimes' },
    { label: 'No', value: 'no' }
];

calcOptions = [
    { label: 'Frequently', value: 'Frequently' },
    { label: 'Sometimes', value: 'Sometimes' },
    { label: 'No', value: 'no' }
];

mtransOptions = [
    { label: 'Bike', value: 'Bike' },
    { label: 'Motorbike', value: 'Motorbike' },
    { label: 'Public Transportation', value: 'Public_Transportation' },
    { label: 'Walking', value: 'Walking' }
];

  predictedBMI: number | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient  // OVO MORA BITI TU
  ) {}
  

  ngOnInit() {
    this.bmiForm = this.fb.group({
        Age: [null, Validators.required],
        Height: [null, Validators.required],
        FCVC: [null, Validators.required],
        NCP: [null, Validators.required],
        CH2O: [null, Validators.required],
        FAF: [null, Validators.required],
        TUE: [null, Validators.required],
        Gender: [null, Validators.required],
        family_history: [null, Validators.required],
        FAVC: [null, Validators.required],
        CAEC: [null, Validators.required],
        SMOKE: [null, Validators.required],
        SCC: [null, Validators.required],
        CALC: [null, Validators.required],
        MTRANS: [null, Validators.required]
    });
  }

  submitForm(): void {
    if (this.bmiForm.valid) {
        const formValues = this.bmiForm.value;

        const payload = {
            Age: parseFloat(formValues.Age),   // pretvaramo string u broj
            Height: parseFloat(formValues.Height),
            FCVC: parseFloat(formValues.FCVC),
            NCP: parseFloat(formValues.NCP),
            CH2O: parseFloat(formValues.CH2O),
            FAF: parseFloat(formValues.FAF),
            TUE: parseFloat(formValues.TUE),
            Gender_Male: formValues.Gender,   // true ako je Male, false ako je Female
            family_history_yes: formValues.family_history,  // true ili false iz dropdowna
            FAVC_yes: formValues.FAVC,   // true ili false iz dropdowna
            CAEC_Frequently: formValues.CAEC === 'Frequently',
            CAEC_Sometimes: formValues.CAEC === 'Sometimes',
            CAEC_no: formValues.CAEC === 'no',
            SMOKE_yes: formValues.SMOKE,  // true ili false iz dropdowna
            SCC_yes: formValues.SCC,      // true ili false iz dropdowna
            CALC_Frequently: formValues.CALC === 'Frequently',
            CALC_Sometimes: formValues.CALC === 'Sometimes',
            CALC_no: formValues.CALC === 'no',
            MTRANS_Bike: formValues.MTRANS === 'Bike',
            MTRANS_Motorbike: formValues.MTRANS === 'Motorbike',
            MTRANS_Public_Transportation: formValues.MTRANS === 'Public_Transportation',
            MTRANS_Walking: formValues.MTRANS === 'Walking',
        };

        console.log('Payload za slanje:', payload);  // čisto da vidiš u konzoli

        this.http.post<{ BMI: number }>('http://localhost:5000/predict', payload)
            .subscribe(response => {
                this.predictedBMI = response.BMI;
            });
    }
}


  setCAEC(value: string) {
    this.bmiForm.patchValue({
      CAEC_Frequently: value === 'Frequently',
      CAEC_Sometimes: value === 'Sometimes',
      CAEC_no: value === 'No'
    });
  }
  
  setCALC(value: string) {
    this.bmiForm.patchValue({
      CALC_Frequently: value === 'Frequently',
      CALC_Sometimes: value === 'Sometimes',
      CALC_no: value === 'No'
    });
  }
  
  setMTRANS(value: string) {
    this.bmiForm.patchValue({
      MTRANS_Bike: value === 'Bike',
      MTRANS_Motorbike: value === 'Motorbike',
      MTRANS_Public_Transportation: value === 'Public Transportation',
      MTRANS_Walking: value === 'Walking'
    });
  }
  
}
