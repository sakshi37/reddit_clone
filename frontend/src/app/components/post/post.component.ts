import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommentComponent } from '../comment/comment.component';
/*
  1 like Dislike on comments 
  2 Delete post
  3 Update post
  4 Delete comment
  5 Update Comment
  6 comment on comment
*/
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, CommentComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  posts: (Post & {
    disliked: boolean;
    liked: boolean;
    comments: CommentType[];
  })[];

  selectedPostId: number | null = null;
  selectedComment: number | null = null;
  comment = { body: '', id: 10 };
  newPost = { id: 10, title: '', body: '' };
  user = { id: 1, name: 'sakshi bahirat' };

  updatePostId: number | null = null;

  constructor() {
    this.posts = dummyPosts.map((p) => {
      return {
        ...p,
        disliked: false,
        liked: false,
      };
    });

    this.findComment(1, 102);
  }

  //
  findNeigbors() {}

  findComment(postId: number, commentId: number) {
    const post = this.posts.find((p) => p.id === postId);

    console.log('post', post?.id);
    console.log('comment', commentId);
    if (post === undefined) return null;
    const queue: CommentType[] = [];

    for (let i = 0; i < post.comments.length; i++) {
      queue.push(post.comments[i]);
    }
    //
    console.log(queue);
    while (queue.length !== 0) {
      const comment = queue.shift()!;
      if (comment?.id === commentId) {
        console.log('found', comment);
        return comment;
      } else {
        for (let i = 0; i < comment?.comments.length; i++) {
          queue.push(comment?.comments[i]);
        }
      }
    }

    return null;
  }

  likeComment(postid: number, commentid: number) {
    const post = this.posts.find((p) => p.id === postid);
    if (post === undefined) return;
    const comment = post.comments.find((c) => c.id === commentid);
    console.log(comment);
    if (comment === undefined) return;
    if (comment.liked === false) {
      if (comment.disliked === true) {
        comment.dislikes--;
        comment.disliked = false;
      }
      comment.likes += 1;
      comment.liked = true;
    } else {
      comment.likes--;
      comment.liked = false;
    }
  }

  deletePost(id: number) {
    this.posts = this.posts.filter((p) => p.id !== id);
  }

  deleteComment(postId: number, commentId: number) {
    console.log('sakshi');
    const post = this.posts.find((p) => p.id === postId);
    console.log(post);
    if (post === undefined) return;
    console.log(post.comments);
    post.comments = post.comments.filter((c) => c.id !== commentId);
    console.log(post.comments);
    console.log(commentId);
  }

  dislikeComment(postId: number, commentId: number) {
    const post = this.posts.find((p) => p.id === postId);
    if (post === undefined) return;
    const comment = post.comments.find((c) => c.id === commentId);
    if (comment === undefined) return;
    if (comment.disliked === false) {
      if (comment.liked === true) {
        comment.likes--;
        comment.liked = false;
      }
      comment.dislikes++;
      comment.disliked = true;
    } else {
      comment.dislikes--;
      comment.disliked = false;
    }
  }
  addPost() {
    this.posts.push({
      body: this.newPost.body,
      id: this.newPost.id,
      comments: [],
      createdAt: new Date(),
      dislikes: 0,
      likes: 0,
      title: this.newPost.title,
      user: this.user,
      disliked: false,
      liked: false,
    });
    this.newPost.body = '';
    this.newPost.title = '';
    this.newPost.id++;
  }
  //
  // updatePostId add changes into existing yes shall we check

  updatePost() {
    if (this.updatePostId === null) return;
    const post = this.posts.find((p) => p.id === this.updatePostId);
    if (post === undefined) return;

    post.title = this.newPost.title;
    post.body = this.newPost.body;
    this.newPost.title = '';
    this.newPost.body = '';
    this.updatePostId = null;
  }

  cancelUpdatePost() {
    this.updatePostId = null;
    this.newPost.body = '';
    this.newPost.title = '';
  }
  startPostUpdate(id: number) {
    const post = this.posts.find((p) => p.id === id);

    if (post === undefined) return;
    console.log(post);

    this.newPost.body = post.body;
    this.newPost.title = post.title;

    this.updatePostId = post.id;
  }

  addComment(postId: number, commentId: number) {
    const dummyComent: CommentType = {
      id: this.comment.id,
      user: this.user,
      createdAt: new Date(),
      body: this.comment.body,
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false,
      comments: [],
    };

    const post = this.posts.find((p) => p.id === postId);
    post?.comments.push(dummyComent);
    this.comment.body = '';
    this.comment.id++;
  }

  likePost(id: number) {
    const post = this.posts.find((p) => p.id === id)!;
    if (post.liked === false) {
      if (post.disliked === true) {
        post.dislikes--;
        post.disliked = false;
      }
      post.likes++;
      post.liked = true;
    } else {
      post.likes--;
      post.liked = false;
    }
    console.log(this.posts);
  }

  dislikePost(id: number) {
    const dislikePost = this.posts.find((d) => d.id === id)!;
    // dislikePost.disliked = true;

    if (dislikePost.disliked === false) {
      if (dislikePost.liked === true) {
        dislikePost.likes--;
        dislikePost.liked = false;
      }
      dislikePost.dislikes++;
      dislikePost.disliked = true;
    } else {
      dislikePost.dislikes--;
      dislikePost.disliked = false;
    }
  }

  toggleComments(id: number) {
    this.comment.body = '';
    if (this.selectedPostId === id) {
      this.selectedPostId = null;
    } else {
      this.selectedPostId = id;
    }
  }

  // console.log(id);
}

type Post = {
  id: number;
  title: string;
  body: string;
  comments: CommentType[];
  likes: number;
  dislikes: number;
  user: User;
  createdAt: Date;
};

type User = {
  id: number;
  name: string;
};

export type CommentType = {
  user: User;
  createdAt: Date;
  body: string;
  likes: number;
  dislikes: number;
  id: number;

  liked: boolean;
  disliked: boolean;

  comments: CommentType[];
};

const dummyPosts: Post[] = [
  {
    id: 1,
    title: 'First Post',
    body: 'This is the body of the first post.',
    likes: 10,
    dislikes: 2,
    createdAt: new Date('2025-07-14T10:00:00'),
    user: {
      id: 1,
      name: 'Alice',
    },
    comments: [
      {
        id: 101,
        body: 'Great post!',
        createdAt: new Date('2025-07-14T10:30:00'),
        likes: 4,
        dislikes: 0,
        liked: true,
        disliked: false,
        user: {
          id: 2,
          name: 'Bob',
        },
        comments: [
          {
            id: 102,
            body: 'Thanks, Bob!',
            createdAt: new Date('2025-07-14T11:00:00'),
            likes: 2,
            dislikes: 0,
            liked: false,
            disliked: false,
            user: {
              id: 1,
              name: 'Alice',
            },
            comments: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Second Post',
    body: "Here's some more content to check out.",
    likes: 5,
    dislikes: 1,
    createdAt: new Date('2025-07-15T09:00:00'),
    user: {
      id: 3,
      name: 'Charlie',
    },
    comments: [
      {
        id: 201,
        body: 'Interesting thoughts.',
        createdAt: new Date('2025-07-15T09:30:00'),
        likes: 3,
        dislikes: 0,
        liked: false,
        disliked: false,
        user: {
          id: 4,
          name: 'Diana',
        },
        comments: [],
      },
    ],
  },
];
