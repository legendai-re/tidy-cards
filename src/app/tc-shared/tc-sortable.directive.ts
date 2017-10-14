import { Directive, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { TcCollectionService }   from '../tc-collection/tc-collection.service';
import { TcCollection }   from '../tc-collection/tc-collection.class';

require('jquery-ui/ui/core');
require('jquery-ui/ui/widget');
require('jquery-ui/ui/widgets/mouse');
require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');

declare var $: any;

@Directive({ selector: '[tc-sortable]' })
export class TcSortableDirective {

    @Input() list: any[];
    @Output() itemMoved = new EventEmitter();

    private el: HTMLElement;

    constructor(el: ElementRef, private collectionService: TcCollectionService) {
        this.el = el.nativeElement;
        var elCopy = this.el;
        let newIndex;
        let oldIndex;
        $(this.el).sortable({
            placeholder: "card-ghost col-xs-12 col-md-6 col-lg-4 col-xl-3",
            helper: function(x, y){ y.addClass('card-moving'); return y },
            handle: '.move-item-button',
            cancel: '.cancel-sort',
            tolerance: "pointer",
            start: (event, ui) => {
                $(this).attr('data-previndex', ui.item.index());
            },
            update: (event, ui) => {
                newIndex = ui.item.index();
                oldIndex = $(this).attr('data-previndex');
                $(this).removeAttr('data-previndex');
            },
            stop: (event, ui) => {
                ui.item.removeClass('card-moving');
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
