import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';



const client = new ApolloClient({
	uri:'https://testkp.flexreality.pro/graphql',
	cache: new InMemoryCache()
})

export default client;
