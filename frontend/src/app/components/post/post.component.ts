import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  posts: (Post & { disliked: boolean; liked: boolean })[];
  selectedPostId: number | null = null;
  commentBody = '';

  constructor() {
    this.posts = dummyPosts.map((p) => {
      return { ...p, disliked: false, liked: false };
    });
  }

  likePost(id: number) {
    const post = this.posts.find((p) => p.id === id)!;
    if (post.liked === false) {
      post.likes++;
      post.liked = true;
    } else {
      post.likes--;
      post.liked = false;
    }

    console.log(this.posts);
  }
  //
  addComment(postId: number) {
    const dummyComent: CommentType = {
      id: 1,
      user: { id: 1, name: 'sakshi' },
      createdAt: new Date(),
      body: this.commentBody,
    };

    const post = this.posts.find((p) => p.id === postId);
    post?.comments.push(dummyComent);
    this.commentBody = '';
  }

  dislikePost(id: number) {
    const dislikePost = this.posts.find((d) => d.id === id)!;
    // dislikePost.disliked = true;
    if (dislikePost.disliked === false) {
      dislikePost.dislikes++;
      dislikePost.disliked = true;
    } else {
      dislikePost.dislikes--;
      dislikePost.disliked = false;
    }
  }

  toggleComments(id: number) {
    this.commentBody = '';
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
      },
      {
        id: 2,
        user: { id: 3, name: 'Sam Smith' },
        createdAt: new Date('2025-07-01T11:00:00Z'),
        body: 'Still learning it, but it already helps me write better code.',
      },

      {
        id: 3,
        user: { id: 4, name: 'sakshi Bahirat' },
        createdAt: new Date(),
        body: 'hellooo',
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
];
