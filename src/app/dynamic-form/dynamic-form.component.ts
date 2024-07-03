import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../graphql.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Section, Field } from '../form-data.model';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})

export class DynamicFormComponent implements OnInit {
  
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = {};


  constructor(private graphqlService: GraphqlService) {}

  ngOnInit() {
    this.graphqlService.getTestFormData().subscribe(result => {
      this.model = {}; // Initialize the model
      this.fields = this.createFormlyFields(result.data.form.sections);
    });
  }

  createFormlyFields(sections: Section[]): FormlyFieldConfig[] {
    const formlyFields: FormlyFieldConfig[] = [];
    
    sections.forEach((section: Section) => {
      section.fields.forEach((field: Field) => {
        const formlyField: FormlyFieldConfig = {
          key: field.label,
          type: field.type === 'textarea' ? 'textarea' : field.type === 'dropdown' ? 'select' : 'input',
          templateOptions: {
            label: field.label,
            required: field.required,
            options: field.options || []
          },
          validators: {
            validation: []
          },
          validation: {
            messages: {
              //uncomment this for hardcoding error msg in component

              // required: `${field.label} field is required`,
              // pattern: 'Invalid format'
            }
          }
        };
        //Getting error msg from backend res
        if (field.validationMessages) {
          formlyField.validation!.messages = field.validationMessages;
        }

        if (field.regex) {
          formlyField.validators = {
            pattern: {
              expression: (control: AbstractControl) => {

               if (!field.regex) return true; // If regex is not defined, consider it valid
                const regex = new RegExp(field.regex);
                return regex.test(control.value);
              },
              // message: `${field.label} is not in the correct format` //uncomment this for hardcoding error msg in component
            }
          };
        }


        if (field.dependency) {
          formlyField.expressionProperties = {
            'templateOptions.disabled': (model: any) => {
              const dependencyValue = model[field.dependency!];
              return !dependencyValue;
            }
          };
        }

        formlyFields.push(formlyField);
      });
    });

    return formlyFields;
  }

  onSubmit() {
    if (this.form.valid) {
      this.graphqlService.submitForm(this.form.value).subscribe(response => {
        console.log('Form submission response:', response);
        // Handle response from backend
      });
    }
  }
}
