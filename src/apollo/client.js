import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';



const client = new ApolloClient({
	uri:'http://testkp.flexreality.pro/graphql',
	cache: new InMemoryCache()
})

export default client;
