import { Request, Response } from "express";
declare class BackgroundController {
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export { BackgroundController };
