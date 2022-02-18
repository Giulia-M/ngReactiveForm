import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app01';
  myForm!: FormGroup;
  forbiddenNameProject = ['Test'];
  ngOnInit(): void {
    this.myForm = new FormGroup({
      project: new FormControl(null, [
        Validators.required,
        this.forbiddenNames.bind(this),
      ]),
      mail: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.forbiddenEmails
      ),
      status: new FormControl('critical'),
    });
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } | null {
    //non è uguale a -1, significa true, significa che l'abbiamo trovato il nome nell'array

    if (this.forbiddenNameProject.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
  onSave() {
    console.log(this.myForm);
  }
}
