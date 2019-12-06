import gql from "graphql-tag";


export default gql`
            query{
                events {
                    id,
                    category,
                    title,
                    geometry { 
                        coordinates
                        }
                }

            }
            `