import { Injectable } from '@angular/core';
import { ApolloClient, InMemoryCache, HttpLink, gql, Observable } from '@apollo/client/core';
import { ApolloLink } from '@apollo/client/link/core';
import { setContext } from '@apollo/client/link/context';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  
  constructor() {}

  getTestFormData() {
      const mockData = {
        data: {
          form: {
            sections: [
              {
                name: 'Personal Information',
                fields: [
                  { 
                    type: 'text', 
                    value: '', 
                    label: 'First Name', 
                    required: true, 
                    validationMessages: { required: 'First Name is required' } 
                  },
                  { 
                    type: 'text', 
                    value: '', 
                    label: 'Last Name', 
                    required: true, 
                    validationMessages: { required: 'Last Name is required' } 
                  },
                  { 
                    type: 'text', 
                    value: '', 
                    label: 'Contact Number', 
                    required: true, 
                    regex: '^[0-9]{10}$', 
                    validationMessages: { 
                      required: 'Contact Number is required', 
                      pattern: 'Invalid Contact Number format' 
                    } 
                  },
                  { 
                    type: 'textarea', 
                    value: '', 
                    label: 'Address' 
                  }
                ]
              },
              {
                name: 'Preferences',
                fields: [
                  {
                    type: 'dropdown',
                    value: '',
                    label: 'Favorite Color',
                    options: [
                      { value: 'red', label: 'Red' },
                      { value: 'green', label: 'Green' },
                      { value: 'blue', label: 'Blue' }
                    ]
                  },
                  { 
                    type: 'text', 
                    value: '', 
                    label: 'Additional Info', 
                    dependency: 'Favorite Color' 
                  }
                ]
              }
            ]
          }
        }
      };
      
    return of(mockData);
  }

  submitForm(formData: any) {
    console.log('Submitting form data:', formData);
    return of({ success: true });
  }
}