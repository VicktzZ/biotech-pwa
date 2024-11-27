export type User = {
    email: string;
    id: string;
    createdAt: string
    settings: {
        disableNotifications: boolean
        activeEnergySaving: boolean
        developerMode: boolean
        gaiaShareData: boolean
        gaiaComplementaryMessages: string
        plan: 'Freemium' | 'Premium' | 'Enterprise';
    }
};