// Temporarily disabled - depends on backend modules
export class InventoryAdapter {
    constructor(private readonly businessUnitId: string) { }
    async updateStock(_payload: any): Promise<boolean> { return true; }
    private async isModuleActive(moduleId: string): Promise<boolean> { return false; }
}




