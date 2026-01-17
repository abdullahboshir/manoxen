import type { Schema, Document } from 'mongoose';
import { ContextService } from "../services/context.service";

export function auditDiffPlugin(schema: Schema) {
    schema.pre('save', function (next) {
        const doc = this as Document;

        if (doc.isNew) {
            return next();
        }

        const modifiedPaths = doc.modifiedPaths();
        const changes: Record<string, any> = {};

        modifiedPaths.forEach((path) => {
            if (path.startsWith('_') || path === 'updatedAt') return;
            const newValue = doc.get(path);
            changes[path] = newValue;
        });

        if (Object.keys(changes).length > 0) {
            ContextService.addDiff({
                collection: (doc.constructor as any).modelName,
                id: doc._id,
                changes
            });
        }

        next();
    });
}
