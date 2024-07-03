
Dynamic Forms with Angular and GraphQL
This project demonstrates how to create a dynamic, server-driven form in an Angular application using GraphQL. The form structure, including validation rules and messages, is retrieved from a backend server, allowing for flexible and easily maintainable forms.

Features
Dynamic Form Generation: Forms are generated dynamically based on configuration data received from a GraphQL API.
Field Types Supported: Includes input fields, text areas, dropdowns, and more.
Custom Validators: Supports custom validation logic, including regex patterns.
Dependency Management: Fields can be enabled or disabled based on the values of other fields.
Validation Messages: Custom validation messages are dynamically retrieved and displayed based on server response.
Technologies Used
Angular: A platform and framework for building client-side applications using HTML and TypeScript.
GraphQL: A query language for your API, and a server-side runtime for executing queries.
ngx-formly: An Angular module that makes it easy to create dynamic forms.
Getting Started
Prerequisites
Node.js (v12 or later)
Angular CLI
Installation
Clone the repository:

sh
Copy code
git clone https://github.com/Sunveen/DynamicForms-Angular.git
cd dynamic-forms-angular-graphql
Install dependencies:

sh
Copy code
npm install
Run the application:

sh
Copy code
ng serve
Open your browser and navigate to http://localhost:4200.

Project Structure
src/app: Contains the main application code.
components: Contains the dynamic form and form field components.
services: Contains the GraphQL service(Mock data for now) for fetching form data.
models: Contains TypeScript interfaces for form data.
Usage
Dynamic Form Component: The DynamicFormComponent fetches form configuration data from the GraphQL API(Mock data for now) and generates the form dynamically.
Form Field Component: The FormFieldComponent renders individual form fields based on the configuration.
GraphQL Service: The GraphqlService is responsible for making GraphQL queries(Mock data for now) to fetch the form configuration data.
Example Configuration Data
The form configuration data is expected to be in the following format:

json
Copy code
{
  "data": {
    "form": {
      "sections": [
        {
          "name": "Personal Information",
          "fields": [
            { "type": "text", "label": "First Name", "required": true, "validationMessages": { "required": "First Name is required" } },
            { "type": "text", "label": "Last Name", "required": true, "validationMessages": { "required": "Last Name is required" } },
            { "type": "text", "label": "Contact Number", "required": true, "regex": "^[0-9]{10}$", "validationMessages": { "required": "Contact Number is required", "pattern": "Invalid Contact Number format" } },
            { "type": "textarea", "label": "Address" }
          ]
        },
        {
          "name": "Preferences",
          "fields": [
            { "type": "dropdown", "label": "Favorite Color", "options": [ { "value": "red", "label": "Red" }, { "value": "green", "label": "Green" }, { "value": "blue", "label": "Blue" } ] },
            { "type": "text", "label": "Additional Info", "dependency": "Favorite Color" }
          ]
        }
      ]
    }
  }
}
