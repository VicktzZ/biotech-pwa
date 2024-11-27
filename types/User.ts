import { Crop } from "./Crop";

export type User = {
    email: string;
    id: string;
    name: string;
    plan: 'freemium' | 'premium' | 'enterprise';
    crops: Crop[];
    createdAt: string
};