import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { Collection, CollectionService }from './collection.service';

@Component({
	template: `
		<h2>Collection detail</h2>
		<div *ngIf="collection">
			<h3>"{{collection.name}}"</h3>
			<div>
				<label>Id: </label>{{collection.id}}</div>
			<div>
				<label>Name: </label>
				<input [(ngModel)]="collection.name" placeholder="name"/>
			</div>
			<p>
				<button (click)="goToCollections()">Back</button>
			</p>
		</div>
	`
})

export class CollectionDetailComponent implements OnInit, OnDestroy  {
	collection: Collection;
	private sub: any;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private service: CollectionService) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			let id = +params['id']; // (+) converts string 'id' to a number
			this.service.getCollection(id).then(collection => this.collection = collection);
		});
	}
	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	goToCollections() { this.router.navigate(['/c']); }
}