import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from './../shared/comment';

import 'rxjs/add/operator/switchMap';
import { validateBasis } from '@angular/flex-layout';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})


export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;
  date = new Date();

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
    },
    'comment': {
      'required':      'Comment is required.',
    }
  };

  constructor(private dishService: DishService, private route: ActivatedRoute,
    private location: Location, private fb: FormBuilder) {
      this.createCommentForm();
  }
  
  ngOnInit() {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params.switchMap((params: Params) => this.dishService.getDish(+params['id']))
    .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id)});
  }

  onSubmit(): void {
    this.comment = this.commentForm.value;
    this.comment.date = this.date.toISOString();
    this.dish.comments.push(this.comment);
    this.comment = null;
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: ''
    });
  }

  createCommentForm() : void {
    this.commentForm = this.fb.group({
      rating: [5, []],
      comment: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) { 
    if(!this.commentForm){
      return;
    } else if(this.commentForm.invalid){
      this.comment = null;
        const form = this.commentForm;
        for(const field in this.formErrors){
          this.formErrors[field] = '';
          const control = form.get(field);
          if(control && control.dirty && !control.valid){
            const messages = this.validationMessages[field];
            for(const key in control.errors){
              this.formErrors[field] += messages[key] + '\n';
            }
          }
        }
    } else {
      this.comment = data;
      for(const field in this.formErrors){
        this.formErrors[field] = '';
      }
    }
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
}
