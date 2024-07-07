import { Component } from '@angular/core';
import { DataService } from './data.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUDE_Operations';
  receivedData: any
  addNewEmployeeFlag = false
  employeeForm: FormGroup = new FormGroup({});

  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.fetchEmployeesData()
  }

  fetchEmployeesData() {
    this.dataService.getData().subscribe((res: any) => this.receivedData = res)
  }

  newEmpId: any = 0
  addEmployee(empId: any) {
    this.addNewEmployeeFlag = true
    this.receivedData.forEach((emp: any) => {
      if (emp.id > this.newEmpId) {
        this.newEmpId = emp.id + 1;
      }
    })

    this.employeeForm = this.formBuilder.group({
      empId: [{ value: this.newEmpId, disabled: true }],
      name: [],
      place: []
    })
  }

  successMsg = ''
  submitData() {
    this.employeeForm.value.id = this.newEmpId;

    this.dataService.postData(this.employeeForm.value).subscribe((success: any) => {
      this.successMsg = "Successfully added new employee with id - " + success.id
    })

    // RESET Values
    setTimeout(() => {
      this.fetchEmployeesData()

      this.addNewEmployeeFlag = false
      this.successMsg = ''
      this.newEmpId = 0
    }, 2000)
  }

  updateEmployee(empId: any) {
    alert('UPDATE')
  }

  deletedMsg = ''
  deleteEmployee(empId: any) {
    this.dataService.deleteData(empId).subscribe((resp: any) => {
      console.log(resp);
    })
  }
}
