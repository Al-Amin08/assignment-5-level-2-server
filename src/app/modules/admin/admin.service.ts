/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminSystem } from "./admin.model"

const setConfig = async () => {
    let config =await AdminSystem.findOne()
    if (config) {
        console.log("Already exist");
        return
}
    if (!config) {
        config = await AdminSystem.create({
            commission: 1,
            minBalance: 10,
            updatedBy:"system-initial"
        })
    }
    return config
}

const updateConfig = async (commission:number,minBalance:number,adminId:any) => {
    let config =await AdminSystem.findOne()
    if (!config) {
        config = await AdminSystem.create({
            commission,
            minBalance,
            adminId
        })
    }
    else {
        config.minBalance = minBalance;
        config.commission = commission;
        config.adminId = adminId;
        config.updatedBy ="ADMIN"
        await config.save()
    }
    return config

}

export const adminService = {
    setConfig,
    updateConfig
}