import { Component, Inject, Injector, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login-for-organization-board',
  templateUrl: './login-for-organization-board.component.html',
  styleUrls: ['./login-for-organization-board.component.css']
})
export class LoginForOrganizationBoardComponent implements OnInit {
  public signedIn:boolean=false;
  constructor(@Inject(Injector) private injector: Injector) { }
  private get _toast(): ToastrService {
    return this.injector.get(ToastrService);
  }

  ngOnInit(): void {
  }
  checkSignIn(){
    this.signedIn=true;
    this._toast.success("Login successfully!", "Successfully");
  }
  
}
