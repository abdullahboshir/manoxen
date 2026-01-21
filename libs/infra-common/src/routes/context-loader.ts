/**
 * Context Route Loader
 * 
 * This module provides utilities for loading routes from bounded contexts.
 * Each context exports its routes through `interface/http/routes/index.ts`
 * 
 * DDD Pattern: Routes belong to the Interface layer of each context.
 * The app layer only aggregates and composes these routes.
 */

import { Router } from 'express';

export interface ContextRouteConfig {
  basePath: string;
  router: Router;
  middleware?: any[];
  guards?: any[];
  requiresAuth?: boolean;
  requiresModule?: string;
}

/**
 * Register multiple context routes with a base router
 */
export function loadContextRoutes(
  baseRouter: Router,
  contexts: ContextRouteConfig[]
): void {
  for (const context of contexts) {
    const handlers: any[] = [];
    
    // Add middleware
    if (context.middleware) {
      handlers.push(...context.middleware);
    }
    
    // Add guards
    if (context.guards) {
      handlers.push(...context.guards);
    }
    
    // Register route
    baseRouter.use(context.basePath, ...handlers, context.router);
  }
}

/**
 * Create a context route config
 */
export function createContextRoute(
  basePath: string,
  router: Router,
  options?: Partial<Omit<ContextRouteConfig, 'basePath' | 'router'>>
): ContextRouteConfig {
  return {
    basePath,
    router,
    ...options,
  };
}
