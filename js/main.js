
$(document).ready(function (){
    drags();

});

function drags(){
    var drag = new dragmoduls();

    $('.drag_item').draggable({
        axis : 'x y',
        cursor:"grabbing",
        containment:'body',
       // helper: "clone",
        revert :function (e){
            drag.dragItme($(this))
            e = true
            return e

        },
        //start : test,
        stop : function (e){

        },
    });
    $('.drop_jon').droppable({
        accept : '.drag_item',
        drop : function (e){
            drag.drops(e.target);
        }
    });

    function dragmoduls(){
        var target = "";
        this.dragItme = function (tagets){
            target=tagets
            console.log(target)
        }
        this.drops = function (dropJone){
            console.log(dropJone);
        }
    }

}