import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../book.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CacheService} from '../cache.service';
import {IBook} from '../ibook';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EditComponent implements OnInit {
  // @ts-ignore
  public form: FormGroup;

  // @ts-ignore
  private book: IBook;

  constructor(
    private bookService: BookService,
    private router: Router,
    private cache: CacheService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
  }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    let id = this.activatedRoute.snapshot.params.id;
    this.book = await this.bookService.findById(id).toPromise();

    this.form.patchValue({
      title: this.book.title,
      author: this.book.author,
      description: this.book.description,
    });
  }

  onSubmit(): void {
    if (!this.form.invalid) {
      this.book.title = this.form.value.title;
      this.book.author = this.form.value.author;
      this.book.description = this.form.value.description;

      this.bookService.save(this.book).toPromise().then(() => {
        this.cache.set('success', 'Cập nhật sách thành công.');
        this.router.navigate(['']);
      });
    }
  }
}
