import { AutomationRule, type IAutomationRule, type TriggerType } from "#domain/organization/infrastructure/persistence/mongoose/automation-rule.model.js";
import { QUEUE_NAMES, QueueService } from "#domain/system/index.js";
import { QueryBuilder } from "@manoxen/core-util";
import { resolveBusinessUnitQuery } from "@manoxen/core-util";



// Helper for dot notation access
const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((o, i) => o?.[i], obj);
};

const evaluateConditions = (conditions: any[], payload: any): boolean => {
    return conditions.every(cond => {
        const value = getNestedValue(payload, cond.field);
        switch (cond.operator) {
            case 'eq': return value === cond.value;
            case 'neq': return value !== cond.value;
            case 'gt': return value > cond.value;
            case 'lt': return value < cond.value;
            case 'contains': return value?.includes?.(cond.value);
            default: return false;
        }
    });
};

const executeActions = async (actions: any[], _payload: any) => {
    for (const action of actions) {
        console.log(`[Automation] Executing Action: ${action.type}`, action.payload);
        // Implement action handlers here
    }
};

/**
 * CRUD Operations
 */
const createRule = async (payload: IAutomationRule) => {
    return await AutomationRule.create(payload);
};

const getAllRules = async (query: any) => {
    const finalQuery = await resolveBusinessUnitQuery(query);
    const apiQuery = new QueryBuilder(AutomationRule.find().populate('businessUnit', 'branding.name slug'), finalQuery)
        .search(['name', 'trigger'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await apiQuery.modelQuery;
    const meta = await apiQuery.countTotal();
    return { meta, result };
};

const getRuleById = async (id: string) => {
    return await AutomationRule.findById(id);
};

const updateRule = async (id: string, payload: Partial<IAutomationRule>) => {
    return await AutomationRule.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
};

const deleteRule = async (id: string) => {
    return await AutomationRule.findByIdAndDelete(id);
};

/**
 * Logic Operations
 */

// This is the implementation that runs in the worker
const processEvent = async (eventName: TriggerType, payload: any, businessUnitId: string) => {
    const rules = await AutomationRule.find({
        trigger: eventName,
        businessUnit: businessUnitId,
        isActive: true
    });

    if (!rules || rules.length === 0) return;

    for (const rule of rules) {
        const isMatch = evaluateConditions(rule.conditions, payload);
        if (isMatch) {
            await executeActions(rule.actions, payload);
            await AutomationRule.updateOne({ _id: rule._id }, {
                $inc: { triggeredCount: 1 },
                lastTriggeredAt: new Date()
            });
        }
    }
};

// This is the entry point called by controllers/services
const handleEvent = async (eventName: TriggerType, payload: any, businessUnitId: string) => {
    try {
        await QueueService.addJob(
            QUEUE_NAMES.AUTOMATION,
            `event-${eventName}-${new Date().getTime()}`,
            {
                triggerType: eventName,
                data: payload,
                businessUnitId
            }
        );
    } catch (error) {
        console.error(`[Automation] Failed to queue event:`, error);
    }
};

export const AutomationService = {
    createRule,
    getAllRules,
    getRuleById,
    updateRule,
    deleteRule,
    handleEvent,
    processEvent 
};
