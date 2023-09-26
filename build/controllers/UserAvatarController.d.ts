import { Request, Response } from "express";
declare class AvatarController {
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export { AvatarController };
