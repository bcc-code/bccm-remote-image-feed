
import {ApolloLink} from "apollo-link"
export default new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const token = localStorage.getItem('STRAPI_TOKEN')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : null
      }
    })
  
    return forward(operation)
  })
  