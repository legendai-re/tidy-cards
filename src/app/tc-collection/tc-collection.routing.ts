import { GrantedUser }                     from '../tc-auth/tc-auth.guard';
import { IvCollectionMeComponent }         from './tc-collection-me/tc-collection-me.component';
import { IvCollectionStarredComponent }    from './tc-collection-starred/tc-collection-starred.component';
import { IvCollectionLastComponent }       from './tc-collection-last/tc-collection-last.component';
import { IvCollectionPopularComponent }    from './tc-collection-popular/tc-collection-popular.component';
import { IvCollectionFeaturedComponent }   from './tc-collection-featured/tc-collection-featured.component';
import { IvCollectionDetailComponent }     from './tc-collection-detail/tc-collection-detail.component';

export const IvCollectionRoutes = [
{ path: 'c/me',  component: IvCollectionMeComponent, canActivate: [GrantedUser] },
{ path: 'c/starred',  component: IvCollectionStarredComponent, canActivate: [GrantedUser] },
{ path: 'c/last',  component: IvCollectionLastComponent },
{ path: 'c/popular',  component: IvCollectionPopularComponent },
{ path: 'c/featured',  component: IvCollectionFeaturedComponent },
{ path: 'c/:collection_id', component: IvCollectionDetailComponent }
];

