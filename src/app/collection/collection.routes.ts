import { RouterConfig }          from '@angular/router';
import { CollectionListComponent } from './collection-list.component';
import { CollectionDetailComponent } from './collection-detail.component';

export const CollectionRoutes: RouterConfig = [
  { path: 'c',  component: CollectionListComponent },
  { path: 'c/:id', component: CollectionDetailComponent }
];