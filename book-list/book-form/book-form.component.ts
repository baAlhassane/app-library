import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book.models';
import { Subject, Subscription } from "rxjs"
//import { getAuth } from 'firebase/auth';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BooksService } from 'src/app/services/books.service';
import { Router } from '@angular/router';
import { url } from 'inspector';
import { stringify } from '@angular/compiler/src/util';





@Injectable()
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {


  bookForm: FormGroup
  fileUrl :string;
  fileIsUploading=false;
  fileUploaded=false 

  constructor(
    private formBuilder: FormBuilder,
    private bookServiece: BooksService,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ["", Validators.required],
      author: ["", Validators.required]

    });
  }

  onSaveBook() {
    const title = this.bookForm.get("title")?.value;
    const author = this.bookForm.get("author")?.value;
    const newBook = new Book(title, author)
    if(this.fileUrl && this.fileUrl!==""){
      newBook.photo=this.fileUrl // ajouter apres avoir codé onUploadeFile
    }
    this.bookServiece.createNewBook(newBook);
    this.router.navigate(["/books"])

  }



   async onUploadFile(file:File){
    this.fileIsUploading=true;
    this.bookServiece.uploadFile(file).then(
      (url:string)=>{
    this.fileUrl=url;
      })

      this.fileIsUploading=false;
      this.fileUploaded=true;

    }
 
     
    

  


  detectFile(event){
    this.onUploadFile(event.target.files[0]);
    
  }
  
}
