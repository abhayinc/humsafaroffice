export default {
    name: 'tour',
    title: 'Tours',
    type: 'document',
    fields: [
        { name: 'title', title: 'Tour Title', type: 'string' },
        { name: 'location', title: 'Location', type: 'string' },
        { name: 'region', title: 'Region (e.g., himachal, uttarakhand)', type: 'string' },
        { name: 'type', title: 'Trip Type (e.g., group, custom)', type: 'string' },
        { name: 'duration', title: 'Duration (e.g., 6 Days / 5 Nights)', type: 'string' },
        { name: 'price', title: 'Price', type: 'number' },
        { name: 'oldPrice', title: 'Old Price (e.g., 9,500)', type: 'string' },
        { name: 'image', title: 'Main Image', type: 'image', options: { hotspot: true } },
        { name: 'rating', title: 'Rating', type: 'number' },
        { name: 'reviews', title: 'Total Reviews', type: 'number' },
        { name: 'interestedCount', title: 'Interested Count', type: 'number' },
        { name: 'bestseller', title: 'Is Bestseller?', type: 'boolean' },
        { name: 'highlights', title: 'Highlights', type: 'array', of: [{ type: 'string' }] },
        {
            name: 'itinerary',
            title: 'Detailed Itinerary',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'day', title: 'Day Number', type: 'number' },
                        { name: 'title', title: 'Day Title', type: 'string' },
                        { name: 'desc', title: 'Description', type: 'text' }
                    ]
                }
            ]
        },
        { name: 'inclusions', title: 'Inclusions', type: 'array', of: [{ type: 'string' }] },
        { name: 'exclusions', title: 'Exclusions', type: 'array', of: [{ type: 'string' }] }
    ]
}