import type Long from "long";

interface UserInfo {
    id: Long;
    nickname: string;
    email: string;
}

export type {
    UserInfo
}