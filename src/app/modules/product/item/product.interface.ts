export interface IProduct {
    id: number,
    product_images: {
        toArray: [
            {
                filename: string,
                isMainPhoto: boolean
            }
        ],
        first_image: string,
        second_image: string
    },
    product_price: {
        price: number,
        discount: number,
        spatial_price: number,
        is_actives: boolean,
        created_at: string
    },
    product_quantity: [{
        quantity: number,
        is_actives: boolean,
        created_at: string
    }],
    product_features: [{
        name: string,
        value: string,
        created_at: string
    }],
    ProductCategories: [
        {
            id: number,
            name: string
        }
    ],
    title: string,
    short_description: string,
    long_description: string,
    meta_title: string,
    meta_keywords: string,
    meta_description: string
}
