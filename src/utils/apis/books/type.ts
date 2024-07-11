export interface Book {
    id: number;
    title: string;
    author: string;
    featured: boolean;
    isbn: string;
    category: string;
    description: string;
    cover_image: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    key: string;
  }