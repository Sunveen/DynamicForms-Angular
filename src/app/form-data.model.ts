export interface Option {
    value: string;
    label: string;
  }
  
  export interface Field {
    validationMessages?: any;
    type: string;
    value: string;
    label: string;
    required?: boolean;
    regex?: string;
    options?: Option[];
    dependency?: string;
  }
  
  export interface Section {
    name: string;
    fields: Field[];
  }
  
  export interface FormData {
    sections: Section[];
  }
  
  export interface GraphqlResponse {
    data: {
      form: FormData;
    };
  }
  