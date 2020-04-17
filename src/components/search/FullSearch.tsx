import React from "react";
import Router from "next/router";
import { ParsedUrlQuery } from "querystring";
import { InstantSearch } from "react-instantsearch-dom";
import { Grid, Cell } from "baseui/layout-grid";
import { BusinessCardGrid } from "./BusinessCardGrid";
import { SearchBox } from "./SearchBox";
import { RefinementList, StaticRefinementList, ToggleRefinement } from "./RefinementList";
import { useStyletron } from "baseui";
import { NoResultsIndicator } from "./NoResultsIndicator";
import { RefinementPane } from "./RefinementPane";
import { searchClient, searchStateToURL, INDEX_NAME, paramsToSearchState } from "./client";
import { findResultsState } from "react-instantsearch-dom/server";

const CATEGORY_REFINEMENT_OPTIONS = ["Grocery", "Restaurant", "Retail", "Brewery", "Coffee", "Other"].map((value) => ({
  value,
  label: value,
}));

export interface FullSearchProps {
  resultsState?: any;
  searchState?: any;
}

export const FullSearch = (props: FullSearchProps) => {
  const [css, $theme] = useStyletron();
  const [searchState, setSearchState] = React.useState(props.searchState || {});
  const controlledSearchStateProps = {
    searchState,
    onSearchStateChange: React.useCallback((newState) => {
      setSearchState(newState);
      const href = searchStateToURL(newState);
      setTimeout(() => Router.push(href, href, { shallow: true }), 700);
    }, []),
  };

  return (
    <InstantSearch searchClient={searchClient} indexName={INDEX_NAME} resultsState={props.resultsState} {...controlledSearchStateProps}>
      <Grid>
        <Cell span={[4, 8, 12]}>
          <SearchBox />
        </Cell>
        <Cell span={[4, 8, 3]}>
          <div
            className={css({
              display: "flex",
              flexDirection: "row",
              overflowX: "scroll",
              [$theme.mediaQuery.large]: {
                flexDirection: "column",
                overflowX: "auto",
              },
            })}
          >
            <RefinementPane title="Category" attributes={["category"]} {...controlledSearchStateProps}>
              <StaticRefinementList attribute="category" values={CATEGORY_REFINEMENT_OPTIONS} />
            </RefinementPane>
            <RefinementPane title="Location" attributes={["location"]} {...controlledSearchStateProps}>
              <RefinementList attribute="location" />
            </RefinementPane>
            <RefinementPane title="Delivery Methods" attributes={["delivery", "curbside", "takeout"]} {...controlledSearchStateProps}>
              <ToggleRefinement attribute="delivery" label="Delivery" value={true} />
              <ToggleRefinement attribute="curbside" label="Curbside Pickup" value={true} />
              <ToggleRefinement attribute="takeout" label="Takeout or In Store Pickup" value={true} />
            </RefinementPane>
          </div>
        </Cell>
        <Cell span={[4, 8, 9]}>
          <BusinessCardGrid />
          <NoResultsIndicator />
        </Cell>
      </Grid>
    </InstantSearch>
  );
};

export const getSearchServerSideProps = async (params: ParsedUrlQuery) => {
  const searchState = paramsToSearchState(params);
  const resultsState = await findResultsState(FullSearch, {
    indexName: INDEX_NAME,
    searchClient,
    searchState,
  });

  return {
    resultsState: { ...resultsState, state: { ...resultsState.state } }, // the .state key is a real object that next won't serialize
    searchState,
  };
};