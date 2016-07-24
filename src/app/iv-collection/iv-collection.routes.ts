import { RouterConfig }                    from '@angular/router';
import { GrantedUser }                     from '../iv-auth/iv-auth.guard';
import { IvCollectionMeComponent }         from './iv-collection-me.component';
import { IvCollectionLastComponent }       from './iv-collection-last.component';
import { IvCollectionPopularComponent }    from './iv-collection-popular.component';
import { IvCollectionFeaturedComponent }    from './iv-collection-featured.component';
import { IvCollectionDetailComponent }     from './iv-collection-detail.component';

export const IvCollectionRoutes: RouterConfig = [
{ path: 'c/me',  component: IvCollectionMeComponent, canActivate: [GrantedUser] },
{ path: 'c/last',  component: IvCollectionLastComponent },
{ path: 'c/popular',  component: IvCollectionPopularComponent },
{ path: 'c/featured',  component: IvCollectionFeaturedComponent },
{ path: 'c/:collection_id', component: IvCollectionDetailComponent }
];
