import type Long from "long";

interface Knowledge {
    id: Long;
    title: string;
    description: string;
    category: Category;
    likeCount: Long;
    createdAt: string;
}

interface PopularKnowledge {
    id: Long;
    title: string;
    description: string;
    category: Category;
    likeCount: Long;
}

interface Category {
    id: Long;
    name: string;
}

interface CategoryKnowledgeStatistic {
    categoryId: Long;
    knowledgeCount: Long;
}


export type {
    Knowledge,
    PopularKnowledge,
    Category,
    CategoryKnowledgeStatistic
}