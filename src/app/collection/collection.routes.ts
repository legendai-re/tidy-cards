import { RouterConfig }                  from '@angular/router';
import { CollectionLastComponent }       from './collection-last.component';
import { CollectionPopularComponent }    from './collection-popular.component';
import { CollectionDetailComponent }     from './collection-detail.component';
import { CollectionCreateComponent }     from './collection-create.component';

export const CollectionRoutes: RouterConfig = [
{ path: 'c/create',  component: CollectionCreateComponent },
{ path: 'c/last',  component: CollectionLastComponent },
{ path: 'c/popular',  component: CollectionPopularComponent },
{ path: 'c/:collection_id', component: CollectionDetailComponent }
];
