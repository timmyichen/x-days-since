import { Page } from "@/shared/models";
import { Maybe } from "@/shared/types";
import { WithId } from "mongodb";

declare global {
  namespace Express {
    interface Request {
      page?: WithId<Page>;
    }
  }
}
