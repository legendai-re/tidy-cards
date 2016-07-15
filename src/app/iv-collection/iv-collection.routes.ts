import { RouterConfig }                  from '@angular/router';
import { IvCollectionLastComponent }       from './iv-collection-last.component';
import { IvCollectionPopularComponent }    from './iv-collection-popular.component';
import { IvCollectionDetailComponent }     from './iv-collection-detail.component';
import { IvCollectionCreateComponent }     from './iv-collection-create.component';

export const IvCollectionRoutes: RouterConfig = [
{ path: 'c/create',  component: IvCollectionCreateComponent },
{ path: 'c/last',  component: IvCollectionLastComponent },
{ path: 'c/popular',  component: IvCollectionPopularComponent },
{ path: 'c/:collection_id', component: IvCollectionDetailComponent }
];
