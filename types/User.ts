export type User = {
    email: string;
    id: string;
    createdAt: string
    biotechNodeAmount: number
    settings: {
        disableNotifications: boolean
        activeEnergySaving: boolean
        developerMode: boolean
        gaiaShareData: boolean
        gaiaComplementaryMessages: string
        plan: 'Freemium' | 'Premium' | 'Enterprise';
    }
};