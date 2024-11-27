export type User = {
    email: string;
    id: string;
    name: string;
    plan: 'freemium' | 'premium' | 'enterprise';
    createdAt: string
};