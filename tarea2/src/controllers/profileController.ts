import { Request, Response } from 'express';

export const getProfile = (req: Request, res: Response) => {
  // req.user contiene los datos del token (email y password)
  return res.status(200).json({
    success: true,
    user: req.user
  });
};