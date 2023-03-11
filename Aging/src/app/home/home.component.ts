import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { WebcamImage } from 'ngx-webcam';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	// imageURL: string;
	registerForm: any = FormGroup;
	submitted = false;
	isFileUploaded=false;
  file:any = null;
	products:any;
	public show:boolean=true;
	public framework='angular';
	public formUpload = this._formBuilder.group({
		name:['',Validators.compose([Validators.required,Validators.minLength(3)])],
		//name:['',[Validators.required,Validators.minLength(3)]],
		file:[''],
		price:['']
	})
	public formUpload1 = this._formBuilder.group({
		name:['',Validators.compose([Validators.required,Validators.minLength(3)])],
	})
	public formUpload2 = this._formBuilder.group({
		file:['', [Validators.required]],
	})
// webcamImage: WebcamImage = null;
  webcamImage: WebcamImage | undefined;

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }
  constructor(private _formBuilder: FormBuilder, private _router: Router) {
	this.registerForm = this._formBuilder.group({
		avatar: [null],
		name: ['']
   })
}
  get f() { return this.registerForm.controls; }
  onSubmitImage() {
	
	// this.submitted = true;
	// // stop here if form is invalid
	// if (this.registerForm.invalid) {
	// 	return;
	// }
	// //True if all the fields are filled
	// if(this.submitted)
	// {
	//   alert("Great!!");
	// }
	}
  ngOnInit(): void {
	//   this._service.getAllProducts().subscribe({
	// 		  next: data=>this.products=data,
	// 		  error: error=>console.log(error)
	// 	  })
	// this.getData();
	this.registerForm = this._formBuilder.group({
		imageInput: ['', [Validators.required]],
   
	  });
  }
  onImageChangeFromFile($event:any)
  {
	  this.isFileUploaded=true;
      if ($event.target.files && $event.target.files[0]) {
        let file = $event.target.files[0];
        console.log(file);
          if(file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/jpg") {
			// this.isFileUploaded=true;
            console.log("correct");
           
          }
          else {
            //call validation
			// this.isFileUploaded=true;
            this.registerForm.reset();
            this.registerForm.controls["imageInput"].setValidators([Validators.required]);
            this.registerForm.get('imageInput').updateValueAndValidity();
          }
      }
	  else {
		// nháp
		// this.isFileUploaded=true;
		// this.registerForm.reset();
		// this.registerForm.controls["imageInput"].setValidators([Validators.required]);
		// this.registerForm.get('imageInput').updateValueAndValidity();
	  }
  }
  onVideoChangeFromFile($event:any)
  {
	  this.isFileUploaded=true;
      if ($event.target.files && $event.target.files[0]) {
        let file = $event.target.files[0];
        console.log(file);
          if(file.type == "Video/mp4") {
			// this.isFileUploaded=true;
            console.log("correct");
           
          }
      }
	  else {
		// nháp
		// this.isFileUploaded=true;
		// this.registerForm.reset();
		// this.registerForm.controls["imageInput"].setValidators([Validators.required]);
		// this.registerForm.get('imageInput').updateValueAndValidity();
	  }
  }
  // getData(){
	//     this._service.getAllProducts().subscribe({
	// 		  next: data=>this.products=data,
	// 		  error: error=>console.log(error)
	// 	  })
  // }

  onChange(event:any){
	if(event.target.files.length>0){
		this.file=event.target.files[0];
		console.log("File info: ",event.target.files[0]);
		if(this.file.typefile.type == "image/jpeg"){
			console.log("correct");
		}
		else{
			this.file=null;
		}
	}else{
		this.file=null;
	}
}
// showPreview(event) {
//     const file = (event.target as HTMLInputElement).files[0];
//     this.registerForm.patchValue({
//       avatar: file
//     });
//     this.registerForm.get('avatar').updateValueAndValidity()
//     // File Preview
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.imageURL = reader.result as string;
//     }
//     reader.readAsDataURL(file)
//   }
  onSubmit(data:any){
	/* console.log("Data:",data); */
	let formData=new FormData();
	formData.append("name",data.name);
	formData.append("file",this.file);
	formData.append("price",data.price);
	// console.log("FormData:",formData);
	// for(let pair of formData.entries()){
	// 	//cấu hình entries trong tsconfig.json
	// 	console.log(pair[0],pair[1]);
	// }
	
	//Send data to server
	// this._service.uploadData(formData).subscribe({
	// 	next: res=>{
	// 		console.log(res);
	// 		this.getData();
	// 	},
	// 	error:err=>{
	// 		console.log(err.message);
	// 	}
	// })


}
onSubmitForm1(data:any){
	/* console.log("Data:",data); */
	let formData=new FormData();
	formData.append("name",data.name);
}
onSubmitForm2(data:any){
	/* console.log("Data:",data); */
	let formData=new FormData();
	formData.append("file",this.file);
}
onSelect(id:any){
	this._router.navigate(['/details',id])
}
  get nameInput(){
	// return this.formUpload.controls['name'];
	return this.formUpload1.controls['name'];
}
changeView():void{
	this.show=!this.show;
}
changeView1():void{
	this.show=!this.show;
}
selectedMode = 'Chuyển đổi bằng hình ảnh';
// 	onSelected(value:string): void {
// 		this.selectedMode = value;
// 	}
// 	isVisible: any;
//   isSelected: boolean = true;

  GoogleDriveInput:boolean=false;
  OneDriveInput:boolean=false;
  FacebookInput:boolean=false;
  resetAllForms(){
	this.isFileUploaded=false;
	this.registerForm.reset();
	this.registerForm.controls["imageInput"].setValidators([Validators.required]);
	this.registerForm.get('imageInput').updateValueAndValidity();
	this.formUpload1.reset();
	this.formUpload1.controls["nameInput"].setValidators([Validators.required]);
	// this.formUpload1.get('nameInput').updateValueAndValidity(); // lỗi
  } 
  values = 'Nothing';

  onKey(event: any) { // without type info
	var splitted = event.target.value.split("://"); 
	var demo='';
    // this.values = event.target.value;
	for (var var0 of splitted){
		demo+=var0+'.';
	}
	var demo2 = demo.split("."); 
	for (var val of demo2) {
		if(val=='facebook'){
			this.values = 'Facebook';
			break;
		}
		else if(val=='google'){
			this.values = 'Google Drive';
			break;
		}
		else if(val=='onedrive' || val=='1drv'){
			this.values = 'OneDrive';
			break;
		}
		else{
			this.values = 'Nothing';
		}
	  
  }
  
}

public showResults:boolean=false;
hienKetQua(){
	this.showResults=true;
  }
}