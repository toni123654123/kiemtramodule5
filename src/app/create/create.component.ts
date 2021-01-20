import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BookService} from '../book.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IBook} from '../ibook';
import {Router} from '@angular/router';
import {CacheService} from '../cache.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {
  // @ts-ignore
  public form: FormGroup;

  constructor(
    private bookService: BookService,
    private router: Router,
    private cache: CacheService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (!this.form.invalid) {
      let book: IBook = {
        title: this.form.value.title,
        author: this.form.value.author,
        description: this.form.value.description,
      };
      this.bookService.save(book).toPromise().then(() => {
        this.cache.set('success', 'Tạo mới thành công.');
        this.router.navigate(['']);
      });
    }
  }
}
