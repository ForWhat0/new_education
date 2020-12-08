import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';



const client = new ApolloClient({
	uri:'http://education.local/graphql',
	cache: new InMemoryCache()
})

export default client;
