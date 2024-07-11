export interface Book {
  title: string;
}

export interface User {
  full_name: string;
}

export interface Borrow {
  id: number;
  borrow_date: string;
  due_date: string;
  return_date: string | null;
  book: Book;
  user: User;
}
