import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
   Configure,
   Highlight,
   Hits,
   InstantSearch,
   Pagination,
   SearchBox,
   DynamicWidgets,
   RefinementList,
   Menu,
   Panel,
} from 'react-instantsearch-dom';

import type { Hit } from 'instantsearch.js';

import './App.css';

const searchClient = algoliasearch(
   'SPHFJBEO0O',
   '34f8abf0bd70fec2b8fc0ebe9d58d587'
);

export function App() {
   return (
      <div>
         <header className="header">
            <h1 className="header-title">
               <a href="/">Quick Bites</a>
            </h1>
         </header>

         <div className="container">
            <InstantSearch searchClient={searchClient} indexName="recipes">
               <Configure hitsPerPage={16} />
               <div className="search-panel">
                  <div className="search-panel__filters">
                     <DynamicWidgets fallbackComponent={Menu}>
                        <RefinementList attribute="yield" />
                        <Panel header="Categories">
                           <Menu attribute="category" />
                        </Panel>
                     </DynamicWidgets>
                  </div>

                  <div className="search-panel__results">
                     <SearchBox placeholder="Search for recipes..." className="searchbox" />
                     {/* Ensure Hits are wrapped in a div with hits-grid class */}
                     <div className="hits-grid">
                        <Hits hitComponent={Hit} />
                     </div>

                     <div className="pagination">
                        <Pagination />
                     </div>
                  </div>
               </div>
            </InstantSearch>
         </div>
      </div>
   );
}

type HitProps = {
   hit: Hit;
};

function Hit({ hit }: HitProps) {
   return (
      <article>
         {hit.img_src && <img src={hit.img_src} alt={hit.recipe_name} />}
         <div>
            <h1>
               <Highlight attribute="recipe_name" hit={hit} />
            </h1>
            <p>Total Time:<Highlight attribute="total_time" hit={hit} /></p>
            <p>Yield:<Highlight attribute="yield" hit={hit} /></p>
            <p>Ingredients:<Highlight attribute="ingredients" hit={hit} /></p>
         </div>
      </article>
   );
}