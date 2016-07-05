import { RouterConfig }          from '@angular/router';
import { CollectionLastComponent } from './collection-last.component';
import { CollectionDetailComponent } from './collection-detail.component';

export const CollectionRoutes: RouterConfig = [
  { path: 'c/last',  component: CollectionLastComponent },
  { path: 'c/:id', component: CollectionDetailComponent }
];