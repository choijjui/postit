import _ from "lodash"
import $ from "jquery"
import './main.css'

function initialize() {
    createContextMenu();
    registerEvent();
}


/**
 * body 전체에 마우스 우클릭 이벤트 (context 메뉴 생성)
 */
function registerEvent() {
    document.addEventListener('contextmenu', (event)=> {
        event.preventDefault();
        let contextMenu = $(".context-menu");
        $(contextMenu).css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        }).show();
    });

    document.addEventListener("mousedown", (event)=>{
        if ((event.button != 2) || (event.which != 3)) {
            $(".context-menu").hide();
        }
    })

    let context = $(".context-menu").get(0);
    context.querySelector(".new").addEventListener("mousedown", (event)=>{
        event.stopPropagation();
        event.preventDefault();
        console.log("new");
    })

    context.querySelector(".sort").addEventListener("mousedown", (event)=>{
        event.stopPropagation();
        event.preventDefault();
        console.log("sort");
    })

    context.querySelector(".delete").addEventListener("mousedown", (event)=>{
        event.stopPropagation();
        event.preventDefault();
        console.log("delete");
    })
}

/**
 * 컨텍스트 메뉴 돔 생성 메소드
 * @param event
 * @returns {*|jQuery}
 */
function createContextMenu() {
    let contextStr = `<div class="context-menu">
                        <div class="new">새로운 포스트잇</div>
                        <div class="sort">정렬하기</div>
                        <div class="delete">전체삭제</div>
                      </div>`;

    $(contextStr).appendTo("body").hide()
}




initialize();

