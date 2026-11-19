import isHostedApp from "@/utils/hostDetection";

export const useHostedApp = (): boolean => isHostedApp();
