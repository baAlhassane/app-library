import { Component, OnInit,OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/Book.models';
import {Subject, Subscription} from "rxjs"
import { BooksService } from '../services/books.service';


import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {




books:Book[]=[]
bookSubscription:Subscription;



constructor(private bookService:BooksService,
             private router:Router
  ){


}



  ngOnInit(): void {
    this.bookSubscription=this.bookService.bookSubject.subscribe(
      (books:Book[])=>{
        this.books=books;

      }
    );
    this.bookService.getBooks() ; 
    this.bookService.emitBooks();
  }


  onNewBook(){
    this.router.navigate(["/books","new"]) // equivalent "books/new"
  }

  onDeleteBook(book:Book){

    this.bookService.removeBook(book);

  }

  onViewBook(id:number){
    this.router.navigate(["/books","view",id])
  }


  ngOnDestroy(){
    this.bookSubscription.unsubscribe();

  }

}
