import { Request, Response } from "express";
declare class MessageController {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    index(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export { MessageController };
