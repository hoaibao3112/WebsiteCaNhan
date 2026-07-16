import { Request, Response, NextFunction } from 'express';

export const apiKeyGuard = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];
  const expectedApiKey = process.env.API_KEY;

  // If API_KEY is not defined in env, log a warning but bypass validation in development.
  // In production, you must set the API_KEY env variable.
  if (!expectedApiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Warning: API_KEY environment variable is not defined. Bypassing API Key check.');
      return next();
    }
    res.status(500).json({ error: 'Server configuration error: API_KEY is not set' });
    return;
  }

  if (!apiKey || apiKey !== expectedApiKey) {
    res.status(401).json({ error: 'Unauthorized: Invalid or missing API Key' });
    return;
  }

  next();
};
