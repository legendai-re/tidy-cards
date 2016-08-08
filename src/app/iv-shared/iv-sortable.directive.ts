import { Directive, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { IvCollectionService }   from '../iv-collection/iv-collection.service';
import { IvCollection }   from '../iv-collection/iv-collection.class';
declare var JQuery: any;
declare var $: any;

@Directive({ selector: '[iv-sortable]' })
export class IvSortableDirective {

    @Input('list') list: any[];
    @Output() itemMoved = new EventEmitter();

    private el: HTMLElement;

    constructor(el: ElementRef, private collectionService: IvCollectionService) {
        this.el = el.nativeElement;
        let newIndex;
        let oldIndex;
        JQuery(this.el).sortable({
            handle: '.move-item-button',
            cancel: '.cancel-sort',
            start: (event, ui) => {
                 $(this).attr('data-previndex', ui.item.index());
            },
            update: (event, ui) => {
                newIndex = ui.item.index();
                oldIndex = $(this).attr('data-previndex');
                $(this).removeAttr('data-previndex');
            },
            stop: (event, ui) => {
                let tmpItem = this.list[oldIndex];
                if(!tmpItem)
                    return;

                tmpItem.position = newIndex;
                tmpItem.updatePosition = true;

                this.itemMoved.emit({
                    value: {modifiedItem: tmpItem}
                })

                tmpItem.updatePosition = false;
                this.list.splice(oldIndex,1);
                this.list.splice(newIndex, 0, tmpItem);
                for(let i in this.list){
                    this.list[i].position = i;
                }
            }
        }).disableSelection();
    }
}
