import { ApolloClient, InMemoryCache } from '@apollo/client';



const reduxClient = new ApolloClient({
    uri:process.env.WP_NEXT_PUBLIC_URL,
    cache: new InMemoryCache()
})

export default reduxClient;