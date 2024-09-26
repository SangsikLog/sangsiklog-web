import type Long from "long";

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
    PopularKnowledge,
    Category,
    CategoryKnowledgeStatistic
}