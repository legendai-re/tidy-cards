import { GrantedUser }                     from '../tc-auth/tc-auth.guard';
import { TcCollectionStarredComponent }    from './tc-collection-starred/tc-collection-starred.component';
import { TcCollectionLastComponent }       from './tc-collection-last/tc-collection-last.component';
import { TcCollectionPopularComponent }    from './tc-collection-popular/tc-collection-popular.component';
import { TcCollectionFeaturedComponent }   from './tc-collection-featured/tc-collection-featured.component';
import { TcCollectionDetailComponent }     from './tc-collection-detail/tc-collection-detail.component';
import { TcCollectionUserAllComponent }    from './tc-collection-user-all/tc-collection-user-all.component';

export const TcCollectionRoutes = [
{ path: 'c/starred',  component: TcCollectionStarredComponent, canActivate: [GrantedUser] },
{ path: 'c/last',  component: TcCollectionLastComponent },
{ path: 'c/popular',  component: TcCollectionPopularComponent },
{ path: 'c/featured',  component: TcCollectionFeaturedComponent },
{ path: 'c/:collection_id', component: TcCollectionDetailComponent },
{ path: ':username/collections', component: TcCollectionUserAllComponent }
];

