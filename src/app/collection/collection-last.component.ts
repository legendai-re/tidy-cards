import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';
import { Collection, CollectionService }   from './collection.service';

@Component({
	template: `
		<h2>Collections</h2>
		<ul class="items">
			<li *ngFor="let collection of collections"
				(click)="onSelect(collection)">
				<span class="badge">{{collection.id}}</span> {{collection.name}}
			</li>
	    </ul>
	`
})

export class CollectionLastComponent implements OnInit { 
	collections: Collection[];
	constructor(
		private router: Router,
		private service: CollectionService) { }

	ngOnInit() {
		this.service.getCollections().then(collections => this.collections = collections);		
	}
	onSelect(collection: Collection) {
		this.router.navigate(['/c', collection.id]);
	}	
}