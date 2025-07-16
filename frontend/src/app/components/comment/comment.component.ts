import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentType } from '../post/post.component';
import { CommonModule } from '@angular/common';
//
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input() comment!: CommentType;

  @Output() likeComment = new EventEmitter();
  @Output() dislikeComment = new EventEmitter();
  @Output() deleteComment = new EventEmitter();

  onLikeComment() {
    this.likeComment.emit();
  }
  onDislikeComment() {
    this.dislikeComment.emit();
  }
  onDeleteComment() {
    this.deleteComment.emit();
    console.log('dhsf');
  }
}

// postId, commentId
