export const queryAllEvents = () => <string>`
        {
            events {
                id,
                category,
                title,
                type,
                createdBy {
                    id,
                    username},
                geometry { 
                    coordinates
                    }
                }
        } `

export const queryEventsByRadius = (radius: number, longitude: number, latitude: number, category: string) => `
query eventsInRadius {
        eventsInRadius(
        radius: ${radius},
        
      location:  {
          type: Point,
    coordinates: [${longitude},${latitude}]
      }
      category: "${category}"
         )
        {
              id,
        category,
        title,
        type,
        createdBy {
            id,
            username},
        geometry { 
            coordinates
            }
        }
    }
`

