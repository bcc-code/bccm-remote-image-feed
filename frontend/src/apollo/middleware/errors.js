import { onError } from 'apollo-link-error'

export default onError(({ graphQLErrors, networkError, operation, forward}) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            switch (err.extensions.code) {
                case 'UNAUTHENTICATED':
                    localStorage.removeItem('STRAPI_TOKEN');
                    // retry the request, returning the new observable
                    return forward(operation);
            }
        }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
})