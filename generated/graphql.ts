import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  nowPlaying?: Maybe<MoviePage>;
  topRated?: Maybe<MoviePage>;
  upcoming?: Maybe<MoviePage>;
  movieById?: Maybe<DetailedMovie>;
  movieByTitle?: Maybe<MoviePage>;
  movieByKeyword?: Maybe<MoviePage>;
};


export type QueryNowPlayingArgs = {
  page?: Maybe<Scalars['Int']>;
};


export type QueryTopRatedArgs = {
  page?: Maybe<Scalars['Int']>;
};


export type QueryUpcomingArgs = {
  page?: Maybe<Scalars['Int']>;
};


export type QueryMovieByIdArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryMovieByTitleArgs = {
  title?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
};


export type QueryMovieByKeywordArgs = {
  keyword?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
};

export type Movie = {
  id: Scalars['String'];
  title: Scalars['String'];
  overview?: Maybe<Scalars['String']>;
};

export type SummaryMovie = Movie & {
  __typename?: 'SummaryMovie';
  id: Scalars['String'];
  title: Scalars['String'];
  overview?: Maybe<Scalars['String']>;
  backdrop?: Maybe<Scalars['String']>;
  releaseDate?: Maybe<Scalars['String']>;
  genreIds?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type MoviePage = {
  __typename?: 'MoviePage';
  movieList?: Maybe<Array<Maybe<SummaryMovie>>>;
  minDate?: Maybe<Scalars['String']>;
  maxDate?: Maybe<Scalars['String']>;
  totalPages?: Maybe<Scalars['Int']>;
  totalResults?: Maybe<Scalars['Int']>;
};

export type DetailedMovie = Movie & {
  __typename?: 'DetailedMovie';
  id: Scalars['String'];
  title: Scalars['String'];
  overview?: Maybe<Scalars['String']>;
  poster?: Maybe<Scalars['String']>;
  genres?: Maybe<Scalars['String']>;
  releaseDate?: Maybe<Scalars['String']>;
  voteAverage?: Maybe<Scalars['Float']>;
  voteCount?: Maybe<Scalars['Int']>;
  watchProviders?: Maybe<Array<Maybe<WatchProvider>>>;
};

export enum ProviderType {
  Flatrate = 'Flatrate',
  Rent = 'Rent',
  Buy = 'Buy'
}

export type WatchProvider = {
  __typename?: 'WatchProvider';
  type?: Maybe<ProviderType>;
  providers?: Maybe<Array<Maybe<ProviderDetail>>>;
};

export type ProviderDetail = {
  __typename?: 'ProviderDetail';
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  logoURL?: Maybe<Scalars['String']>;
};

export type MovieByIdQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type MovieByIdQuery = (
  { __typename?: 'Query' }
  & { movieById?: Maybe<(
    { __typename?: 'DetailedMovie' }
    & Pick<DetailedMovie, 'id' | 'title' | 'overview' | 'poster' | 'genres' | 'releaseDate' | 'voteAverage' | 'voteCount'>
    & { watchProviders?: Maybe<Array<Maybe<(
      { __typename?: 'WatchProvider' }
      & Pick<WatchProvider, 'type'>
      & { providers?: Maybe<Array<Maybe<(
        { __typename?: 'ProviderDetail' }
        & Pick<ProviderDetail, 'name' | 'logoURL'>
      )>>> }
    )>>> }
  )> }
);

export type MovieByKeywordQueryVariables = Exact<{
  keyword?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
}>;


export type MovieByKeywordQuery = (
  { __typename?: 'Query' }
  & { movieByKeyword?: Maybe<(
    { __typename?: 'MoviePage' }
    & Pick<MoviePage, 'totalPages' | 'totalResults'>
    & { movieList?: Maybe<Array<Maybe<(
      { __typename?: 'SummaryMovie' }
      & Pick<SummaryMovie, 'id' | 'title' | 'backdrop' | 'overview' | 'releaseDate' | 'genreIds'>
    )>>> }
  )> }
);

export type MovieByTitleQueryVariables = Exact<{
  title?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
}>;


export type MovieByTitleQuery = (
  { __typename?: 'Query' }
  & { movieByTitle?: Maybe<(
    { __typename?: 'MoviePage' }
    & Pick<MoviePage, 'totalPages' | 'totalResults'>
    & { movieList?: Maybe<Array<Maybe<(
      { __typename?: 'SummaryMovie' }
      & Pick<SummaryMovie, 'id' | 'title' | 'backdrop' | 'overview' | 'releaseDate' | 'genreIds'>
    )>>> }
  )> }
);

export type NowPlayingQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
}>;


export type NowPlayingQuery = (
  { __typename?: 'Query' }
  & { nowPlaying?: Maybe<(
    { __typename?: 'MoviePage' }
    & Pick<MoviePage, 'minDate' | 'maxDate' | 'totalPages' | 'totalResults'>
    & { movieList?: Maybe<Array<Maybe<(
      { __typename?: 'SummaryMovie' }
      & Pick<SummaryMovie, 'id' | 'title' | 'overview' | 'backdrop' | 'releaseDate' | 'genreIds'>
    )>>> }
  )> }
);

export type TopRatedQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
}>;


export type TopRatedQuery = (
  { __typename?: 'Query' }
  & { topRated?: Maybe<(
    { __typename?: 'MoviePage' }
    & Pick<MoviePage, 'totalPages' | 'totalResults'>
    & { movieList?: Maybe<Array<Maybe<(
      { __typename?: 'SummaryMovie' }
      & Pick<SummaryMovie, 'id' | 'title' | 'overview' | 'backdrop' | 'releaseDate' | 'genreIds'>
    )>>> }
  )> }
);

export type UpcomingQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
}>;


export type UpcomingQuery = (
  { __typename?: 'Query' }
  & { upcoming?: Maybe<(
    { __typename?: 'MoviePage' }
    & Pick<MoviePage, 'minDate' | 'maxDate' | 'totalPages' | 'totalResults'>
    & { movieList?: Maybe<Array<Maybe<(
      { __typename?: 'SummaryMovie' }
      & Pick<SummaryMovie, 'id' | 'title' | 'overview' | 'backdrop' | 'releaseDate' | 'genreIds'>
    )>>> }
  )> }
);


export const MovieByIdDocument = gql`
    query MovieById($id: String) {
  movieById(id: $id) {
    id
    title
    overview
    poster
    genres
    releaseDate
    voteAverage
    voteCount
    watchProviders {
      type
      providers {
        name
        logoURL
      }
    }
  }
}
    `;

/**
 * __useMovieByIdQuery__
 *
 * To run a query within a React component, call `useMovieByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovieByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovieByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMovieByIdQuery(baseOptions?: Apollo.QueryHookOptions<MovieByIdQuery, MovieByIdQueryVariables>) {
        return Apollo.useQuery<MovieByIdQuery, MovieByIdQueryVariables>(MovieByIdDocument, baseOptions);
      }
export function useMovieByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MovieByIdQuery, MovieByIdQueryVariables>) {
          return Apollo.useLazyQuery<MovieByIdQuery, MovieByIdQueryVariables>(MovieByIdDocument, baseOptions);
        }
export type MovieByIdQueryHookResult = ReturnType<typeof useMovieByIdQuery>;
export type MovieByIdLazyQueryHookResult = ReturnType<typeof useMovieByIdLazyQuery>;
export type MovieByIdQueryResult = Apollo.QueryResult<MovieByIdQuery, MovieByIdQueryVariables>;
export const MovieByKeywordDocument = gql`
    query MovieByKeyword($keyword: String, $page: Int) {
  movieByKeyword(keyword: $keyword, page: $page) {
    movieList {
      id
      title
      backdrop
      overview
      releaseDate
      genreIds
    }
    totalPages
    totalResults
  }
}
    `;

/**
 * __useMovieByKeywordQuery__
 *
 * To run a query within a React component, call `useMovieByKeywordQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovieByKeywordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovieByKeywordQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useMovieByKeywordQuery(baseOptions?: Apollo.QueryHookOptions<MovieByKeywordQuery, MovieByKeywordQueryVariables>) {
        return Apollo.useQuery<MovieByKeywordQuery, MovieByKeywordQueryVariables>(MovieByKeywordDocument, baseOptions);
      }
export function useMovieByKeywordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MovieByKeywordQuery, MovieByKeywordQueryVariables>) {
          return Apollo.useLazyQuery<MovieByKeywordQuery, MovieByKeywordQueryVariables>(MovieByKeywordDocument, baseOptions);
        }
export type MovieByKeywordQueryHookResult = ReturnType<typeof useMovieByKeywordQuery>;
export type MovieByKeywordLazyQueryHookResult = ReturnType<typeof useMovieByKeywordLazyQuery>;
export type MovieByKeywordQueryResult = Apollo.QueryResult<MovieByKeywordQuery, MovieByKeywordQueryVariables>;
export const MovieByTitleDocument = gql`
    query MovieByTitle($title: String, $page: Int) {
  movieByTitle(title: $title, page: $page) {
    movieList {
      id
      title
      backdrop
      overview
      releaseDate
      genreIds
    }
    totalPages
    totalResults
  }
}
    `;

/**
 * __useMovieByTitleQuery__
 *
 * To run a query within a React component, call `useMovieByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovieByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovieByTitleQuery({
 *   variables: {
 *      title: // value for 'title'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useMovieByTitleQuery(baseOptions?: Apollo.QueryHookOptions<MovieByTitleQuery, MovieByTitleQueryVariables>) {
        return Apollo.useQuery<MovieByTitleQuery, MovieByTitleQueryVariables>(MovieByTitleDocument, baseOptions);
      }
export function useMovieByTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MovieByTitleQuery, MovieByTitleQueryVariables>) {
          return Apollo.useLazyQuery<MovieByTitleQuery, MovieByTitleQueryVariables>(MovieByTitleDocument, baseOptions);
        }
export type MovieByTitleQueryHookResult = ReturnType<typeof useMovieByTitleQuery>;
export type MovieByTitleLazyQueryHookResult = ReturnType<typeof useMovieByTitleLazyQuery>;
export type MovieByTitleQueryResult = Apollo.QueryResult<MovieByTitleQuery, MovieByTitleQueryVariables>;
export const NowPlayingDocument = gql`
    query NowPlaying($page: Int) {
  nowPlaying(page: $page) {
    movieList {
      id
      title
      overview
      backdrop
      releaseDate
      genreIds
    }
    minDate
    maxDate
    totalPages
    totalResults
  }
}
    `;

/**
 * __useNowPlayingQuery__
 *
 * To run a query within a React component, call `useNowPlayingQuery` and pass it any options that fit your needs.
 * When your component renders, `useNowPlayingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNowPlayingQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useNowPlayingQuery(baseOptions?: Apollo.QueryHookOptions<NowPlayingQuery, NowPlayingQueryVariables>) {
        return Apollo.useQuery<NowPlayingQuery, NowPlayingQueryVariables>(NowPlayingDocument, baseOptions);
      }
export function useNowPlayingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NowPlayingQuery, NowPlayingQueryVariables>) {
          return Apollo.useLazyQuery<NowPlayingQuery, NowPlayingQueryVariables>(NowPlayingDocument, baseOptions);
        }
export type NowPlayingQueryHookResult = ReturnType<typeof useNowPlayingQuery>;
export type NowPlayingLazyQueryHookResult = ReturnType<typeof useNowPlayingLazyQuery>;
export type NowPlayingQueryResult = Apollo.QueryResult<NowPlayingQuery, NowPlayingQueryVariables>;
export const TopRatedDocument = gql`
    query TopRated($page: Int) {
  topRated(page: $page) {
    movieList {
      id
      title
      overview
      backdrop
      releaseDate
      genreIds
    }
    totalPages
    totalResults
  }
}
    `;

/**
 * __useTopRatedQuery__
 *
 * To run a query within a React component, call `useTopRatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopRatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopRatedQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useTopRatedQuery(baseOptions?: Apollo.QueryHookOptions<TopRatedQuery, TopRatedQueryVariables>) {
        return Apollo.useQuery<TopRatedQuery, TopRatedQueryVariables>(TopRatedDocument, baseOptions);
      }
export function useTopRatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopRatedQuery, TopRatedQueryVariables>) {
          return Apollo.useLazyQuery<TopRatedQuery, TopRatedQueryVariables>(TopRatedDocument, baseOptions);
        }
export type TopRatedQueryHookResult = ReturnType<typeof useTopRatedQuery>;
export type TopRatedLazyQueryHookResult = ReturnType<typeof useTopRatedLazyQuery>;
export type TopRatedQueryResult = Apollo.QueryResult<TopRatedQuery, TopRatedQueryVariables>;
export const UpcomingDocument = gql`
    query Upcoming($page: Int) {
  upcoming(page: $page) {
    movieList {
      id
      title
      overview
      backdrop
      releaseDate
      genreIds
    }
    minDate
    maxDate
    totalPages
    totalResults
  }
}
    `;

/**
 * __useUpcomingQuery__
 *
 * To run a query within a React component, call `useUpcomingQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpcomingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpcomingQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useUpcomingQuery(baseOptions?: Apollo.QueryHookOptions<UpcomingQuery, UpcomingQueryVariables>) {
        return Apollo.useQuery<UpcomingQuery, UpcomingQueryVariables>(UpcomingDocument, baseOptions);
      }
export function useUpcomingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpcomingQuery, UpcomingQueryVariables>) {
          return Apollo.useLazyQuery<UpcomingQuery, UpcomingQueryVariables>(UpcomingDocument, baseOptions);
        }
export type UpcomingQueryHookResult = ReturnType<typeof useUpcomingQuery>;
export type UpcomingLazyQueryHookResult = ReturnType<typeof useUpcomingLazyQuery>;
export type UpcomingQueryResult = Apollo.QueryResult<UpcomingQuery, UpcomingQueryVariables>;