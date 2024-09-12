export interface Hackathon {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
    image: string;
    level: 'easy' | 'medium' | 'hard';
}
