// FormInterfaces.ts

export interface EventFormValues {
    eventName: string;
    eventDate: string;
    location: string;
    eventType: string;
    description: string;
    isFree: boolean;
  };

export interface LoveFormValues{
    name:string;
    relationship:string;
    feeling:string;
    occasion:string;
    memory:string;
    lenght:string;
    type:string
};

export interface InspirationFormValues{
    title:string;
    category:string;
    message:string;
    hashtags:string;
};
export interface ProductFormValues{
    productName:string;
    description:string;
    price:string;
    category:string;
    startDate:string;
    endDate:string;
}
  