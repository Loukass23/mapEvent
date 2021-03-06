import { EventLib } from "../@types"

export const mutationLogIn = (email: string, pwd: string) => <string>`
    mutation login { login(email: "${email}", password:"${pwd}")
  {
         email
         username,
         lastName,
         firstName,
         token
     
     }
}
        `


export const mutationRegister = (avatar: string, email: string, username: string, firstName: string, lastName: string, pwd: string) => <string>`
 mutation signup{
    signup(
      email: "${email}",
      username: "${username}",
      firstName: "${firstName}",
      lastName: "${lastName}",
      password: "${pwd}",
      avatar: "${avatar}"
   
    )
}
        `

export const queryAllEvents = () => <string>`
        {
            events {
                id,
                category,
                title,
                type,
                img,
                createdBy {
                    id,
                    username},
                geometry { 
                    coordinates
                    }
                }
        } `

export const queryEventsByRadius = (radius: number, longitude: number, latitude: number) => `
query eventsInRadius {
        eventsInRadius(
        radius: ${radius},
       
      location:  {
          type: Point,
    coordinates: [${longitude},${latitude}]
      }
         )
        {
              id,
              img,
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
export const queryEventsByRadiusCategory = (radius: number, longitude: number, latitude: number, category: string) => `
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
              img,
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
export const createEvent = (marker: EventLib.Event) => `
 mutation addEvent{
       addEvent( 
        coordinates: [ ${marker.geometry.coordinates[1]},${marker.geometry.coordinates[0]} ],
      type: "test",
      category: "${marker.category}", 
      title: "${marker.title}",
      img: "${marker.img}"

       ) 
       {
title,

       }
       
 }
`

