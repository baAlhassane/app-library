import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book.models';
import { retry, Subject } from "rxjs"
import { getAuth } from 'firebase/auth';

import { getDatabase, ref, set, get, onValue } from "firebase/database";

import { getStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import * as firebaseStorage from "firebase/storage"

import { on } from 'events';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() { }

  books: Book[] = [];
  fileUrlStrorage:string;

  bookSubject = new Subject<Book[]>()



  emitBooks() {
    this.bookSubject.next(this.books)
  }
  //https://www.educative.io/courses/complete-guide-firebase-web/gkJGzkWK7zk
  saveBooks() {
    const db = getDatabase();// initialise database
    const dbRef = ref(db);   // reference to database root 
    const booksRef = ref(db, "/books"); // reference to the users/tasks/* path
    set(booksRef, this.books)

  }



  getBooks() {
    // initialise database
    const db = getDatabase();

    const booksRef = ref(db, "/books");

    onValue(booksRef, (snapshot) => {
      this.books = snapshot.val() ? snapshot.val() : []
      const data = this.books
      this.emitBooks();
      console.log(data);


    });


  }


  async getSingleBook(id: number) {
    const db = getDatabase();
    const bookRef = ref(db, "/books/" + id);

    try {
      const snapshot = await get(bookRef);
      const data = snapshot.val() ? snapshot.val() : [];
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }


  }


  createNewBook(newBook: Book) {

    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }


  removeBook(book: Book) {
    // if(book.photo){
    //   const storage = getStorage();
    // //  const url = firebaseStorage.getDownloadURL() 
    //   const storageRef=firebaseStorage.ref(storage,book.photo)
    //   firebaseStorage.deleteObject(storageRef).then( ()=> 
    //   {console.log(" photo supprimer "); }
          
    //   ).catch(
    //     (error) => { console.log(" erreur de suppression   ")}
   
     // )

    
      const removeIndexToRemove = this.books.findIndex(
        (bookEl) => {
          if (bookEl === book) { return true; }
        });
      return this.books.splice(removeIndexToRemove, 1);
      this.saveBooks();
    }

    // else{
    //   const removeIndexToRemove = this.books.findIndex(
    //     (bookEl) => {
    //       if (bookEl === book) { return true; }
    //     });
    //   return this.books.splice(removeIndexToRemove, 1);
    //   this.saveBooks();

    // }

 
    
  //}



   uploadFile(file: File) {
   
    return new Promise( (resolve, rejeect) => { 
    
     
    const storage = getStorage();

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/png'
    };
    const almostUniqueFileName=Date.now().toString()
    console.log(" almostUniqueFileName"+almostUniqueFileName)
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = firebaseStorage.ref(storage, 'images/' +almostUniqueFileName+ file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
           
        
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.fileUrlStrorage=downloadURL;
           this.fileUrlStrorage= downloadURL
           console.log('this.fileUrlStrorage  available at', this.fileUrlStrorage);
           resolve(downloadURL);
             

          
        });
        
      }
    );
      
 
  });//end promise 
            

    }
  

  

}
