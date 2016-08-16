import { GrantedUser }                     from '../iv-auth/iv-auth.guard';
import { IvCollectionMeComponent }         from './iv-collection-me/iv-collection-me.component';
import { IvCollectionLastComponent }       from './iv-collection-last/iv-collection-last.component';
import { IvCollectionPopularComponent }    from './iv-collection-popular/iv-collection-popular.component';
import { IvCollectionFeaturedComponent }   from './iv-collection-featured/iv-collection-featured.component';
import { IvCollectionDetailComponent }     from './iv-collection-detail/iv-collection-detail.component';

export const IvCollectionRoutes = [
{ path: 'c/me',  component: IvCollectionMeComponent, canActivate: [GrantedUser] },
{ path: 'c/last',  component: IvCollectionLastComponent },
{ path: 'c/popular',  component: IvCollectionPopularComponent },
{ path: 'c/featured',  component: IvCollectionFeaturedComponent },
{ path: 'c/:collection_id', component: IvCollectionDetailComponent }
];

