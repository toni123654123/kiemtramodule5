import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IBook} from '../ibook';
import {BookService} from '../book.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit {
  // @ts-ignore
  public book: IBook;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    this.book = await this.bookService.findById(id).toPromise();
  }

}
