import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentType, Post } from '../post/post.component';
import { CommonModule } from '@angular/common';
//display then comment
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input() comment!: CommentType;

  @Output() likeComment = new EventEmitter<number>();
  @Output() dislikeComment = new EventEmitter<number>();
  @Output() deleteComment = new EventEmitter<number>();
  //
  onLikeComment() {
    this.likeComment.emit(this.comment.id);
  }
  onDislikeComment() {
    this.dislikeComment.emit(this.comment.id);
  }
  onDeleteComment() {
    this.deleteComment.emit(this.comment.id);
    console.log('dhsf');
  }
}
