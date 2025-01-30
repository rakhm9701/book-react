import { LikeGroup } from "../enums/like.enum";

export interface Like {
  _id: string;
  LikeGroup: LikeGroup;
  memberId: string;
  likeRefId: string;
  createdAt: Date;
  updatedAt: Date;
}
