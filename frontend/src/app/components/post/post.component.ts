import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
/*
  1 like Dislike on comments 
  2 Delete post
  3 Update post
  4 Delete comment
  5 Update Comment
  6 comments on comment
*/
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  posts: (Post & {
    disliked: boolean;
    liked: boolean;
    comments: CommentType[];
  })[];

  //
  // postComment: (CommentType & { likes: number; dislikes: number })[];
  selectedPostId: number | null = null;
  selectedComment: number | null = null;
  comment = { body: '', id: 10 };
  newPost = { id: 10, title: '', body: '' };
  user = { id: 1, name: 'sakshi bahirat' };

  constructor() {
    this.posts = dummyPosts.map((p) => {
      return {
        ...p,
        disliked: false,
        liked: false,
      };
    });
  }
  likeComment(postid: number, commentid: number) {
    const post = this.posts.find((p) => p.id == postid);
    if (post === undefined) return;
    const comment = post.comments.find((c) => c.id === commentid);
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
  //we want user id thre right on comment comment id
  addComment(postId: number) {
    const dummyComent: CommentType = {
      id: this.comment.id,
      user: this.user,
      createdAt: new Date(),
      body: this.comment.body,
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false,
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

type CommentType = {
  id: number;
  user: User;
  createdAt: Date;
  body: string;
  likes: number;
  dislikes: number;
  liked: boolean;
  disliked: boolean;
};

const dummyPosts: Post[] = [
  {
    id: 1,
    title: 'The Rise of TypeScript',
    body: 'TypeScript is gaining massive popularity among JavaScript developers due to its powerful type system.',
    comments: [
      {
        id: 1,
        user: { id: 2, name: 'Jane Doe' },
        createdAt: new Date('2025-07-01T10:15:00Z'),
        body: 'Absolutely agree! I love working with TypeScript.',
        likes: 1,
        dislikes: 1,
        liked: false,
        disliked: false,
      },

      {
        id: 2,
        user: { id: 3, name: 'Sam Smith' },
        createdAt: new Date('2025-07-01T11:00:00Z'),
        body: 'Still learning it, but it already helps me write better code.',
        likes: 1,
        dislikes: 1,
        liked: false,
        disliked: false,
      },

      {
        id: 3,
        user: { id: 4, name: 'sakshi Bahirat' },
        createdAt: new Date(),
        body: 'hellooo',
        likes: 1,
        dislikes: 1,
        liked: false,
        disliked: false,
      },
    ],
    likes: 120,
    dislikes: 5,
    user: { id: 1, name: 'John Developer' },
    createdAt: new Date('2025-07-01T09:00:00Z'),
  },
  {
    id: 2,
    title: 'Dark Mode: A Developer’s Favorite?',
    body: 'Dark mode has become a staple in developer tools. Is it really better, or just a trend?',
    comments: [
      {
        id: 3,
        user: { id: 4, name: 'Alice Johnson' },
        createdAt: new Date('2025-07-03T14:20:00Z'),
        body: "I can't live without dark mode anymore!",
        likes: 1,
        dislikes: 1,
        liked: false,
        disliked: false,
      },
    ],
    likes: 95,
    dislikes: 12,
    user: { id: 5, name: 'Emily Wright' },
    createdAt: new Date('2025-07-03T13:00:00Z'),
  },
  {
    id: 3,
    title: 'Why Remote Work is Here to Stay',
    body: 'Remote work offers flexibility, access to global talent, and better work-life balance.',
    comments: [],
    likes: 210,
    dislikes: 8,
    user: { id: 6, name: 'Michael Chen' },
    createdAt: new Date('2025-07-05T08:45:00Z'),
  },

  {
    id: 4,
    title: 'new post',
    body: 'ello',
    comments: [],
    likes: 1,
    dislikes: 2,
    user: { id: 7, name: 'Akshata Dange' },
    createdAt: new Date(),
  },
  // {
  //   id: 5,
  //   title: 'Bhushan is my love',
  //   body: 'Very handsome, intelligent and funny ',
  //   comments: [],
  //   likes: 1,
  //   dislikes: 2,
  //   user: { id: 8, name: 'sAKSHI bahirat' },
  //   createdAt: new Date(),
  // },
];
