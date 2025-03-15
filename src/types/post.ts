/** @format */

import { Category } from "./category";

export interface Post {
    id: number;
    title: string;
    content: string;
    viewed: number;
    image: string;
    categoryId: number;
    category: Category;
    createdAt: string;
}
