import {Component, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {IBook} from '../ibook';
import {BookService} from '../book.service';
import {CacheService} from '../cache.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  // // @ts-ignore
  // public books: Array<IBook>;
  // // @ts-ignore
  // public form: FormGroup;
  //
  // // @ts-ignore
  // public success: string;
  // // @ts-ignore
  // public modalRef: BsModalRef;
  //
  // constructor(private bookService: BookService,
  //             private cache: CacheService,
  //             private modalService: BsModalService,
  //             private router: Router,
  //             private formBuilder: FormBuilder) {
  // }
  //
  // // tslint:disable-next-line:typedef
  // async ngOnInit() {
  //   this.books = await this.bookService.findAll().toPromise();
  //   this.success = this.cache.flash('success');
  //   this.form = this.formBuilder.group({
  //     title: ['', [Validators.required]],
  //     author: ['', [Validators.required]],
  //     description: ['', [Validators.required]],
  //   });
  // }
  //
  // public openModal(template: TemplateRef<any>): void {
  //   this.modalRef = this.modalService.show(template);
  // }
  //
  // onSubmit(): void {
  //   if (!this.form.invalid) {
  //     let book: IBook = {
  //       title: this.form.value.title,
  //       author: this.form.value.author,
  //       description: this.form.value.description,
  //     };
  //     this.bookService.save(book).toPromise().then(() => {
  //       this.cache.set('success', 'Tạo mới thành công.');
  //     });
  //   }
  // }

  // @ts-ignore
  List: IBook[];
  // @ts-ignore
  newUF: FormGroup;
  // @ts-ignore
  public modalRef: BsModalRef;
  // @ts-ignore
  public success: string;

  constructor(private bookService: BookService,
              private modalService: BsModalService,
              private http: HttpClient,
              private fb: FormBuilder,
              private router: Router,
              private cache: CacheService) {
  }

  ngOnInit(): void {
    this.getAllUser();
    this.success = this.cache.flash('success');
    this.newUF = this.fb.group({
      title: [''],
      author: [''],
      description: ['']
      }
    );
  }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  // @ts-ignore
  getAllUser(): IUser[] {
    this.bookService.findAll().subscribe((data: any) => {
      this.List = data;
    });
    return this.List;
  }
  // tslint:disable-next-line:typedef
  create() {
    let newU: IBook = this.newUF.value;
    this.bookService.save(newU).subscribe(() => {
      alert('successfully');
      this.getAllUser();
    });
  }
}
