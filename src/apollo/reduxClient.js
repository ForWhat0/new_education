import { ApolloClient, InMemoryCache } from '@apollo/client';



const reduxClient = new ApolloClient({
    uri:'https://testkp.flexreality.pro/graphql',
    cache: new InMemoryCache()
})

export default reduxClient;