import { Request, Response, NextFunction } from "express";
declare function ensureAuth(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
export { ensureAuth };
