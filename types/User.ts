export type User = {
    email: string;
    id: string;
    name: string;
    createdAt: string
    settings: {
        disableNotifications: boolean
        activeEnergySaving: boolean
        developerMode: boolean
        gaiaShareData: boolean
        gaiaComplementaryMessages: string
        plan: 'freemium' | 'premium' | 'enterprise';
    }
};