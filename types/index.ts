type Creator = {
    $id: string
    name: string
    email: string
    avatar: string
}

type Gallery = {
    $id: string
    image: string
}

type Review = {
    $id: string
    name: string
    avatar: string
    review: string
    rating: number
}

export type PropertyProps = {
    $id: string
    $collectionId: string;
    $databaseId: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    name: string
    type: string
    description: string
    address: string
    price: number
    area: number
    bedrooms: number
    bathrooms: number
    rating: number
    facillities: string[]
    image: string
    geolocation: string
    creator: Creator
    gallery: Gallery[]
    reviews: Review[]
}
