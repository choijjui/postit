import _ from "lodash"
import $ from "jquery"
import './main.css'

function initialize() {
    createContextMenu();
    registerEvent();
}


/**
 * body 전체에 마우스 이벤트 (context 메뉴 생성)
 */
function registerEvent() {
    document.addEventListener('contextmenu', (event)=> {
        event.preventDefault();
        let contextMenu = $(".context-menu");
        $(contextMenu).css({
			left: event.clientX + "px",
			top: event.clientY + "px"
        }).show();
    });

    document.addEventListener("mousedown", (event)=>{
        if ((event.button != 2) || (event.which != 3)) {
            $(".context-menu").hide();
        }
    })
}

/**
 * 컨텍스트 메뉴 돔 생성 메소드
 */
function createContextMenu() {
    let contextStr = `<div class="context-menu">
                        <div class="new">새로운 포스트잇</div>
                        <div class="sort">정렬하기</div>
                        <div class="delete">전체삭제</div>
                      </div>`;

    $(contextStr).appendTo("body").hide();

	let context = $(".context-menu").get(0);
	context.querySelector(".new").addEventListener("mousedown", (event)=>{
		event.stopPropagation();
		event.preventDefault();

		$(".context-menu").hide();
		createPostit(event.clientX, event.clientY);
	})

	context.querySelector(".sort").addEventListener("mousedown", (event)=>{
		event.stopPropagation();
		event.preventDefault();
	})

	context.querySelector(".delete").addEventListener("mousedown", (event)=>{
		event.stopPropagation();
		event.preventDefault();
	})
}

/**
 * 포스트잇 생성 메소드
 * @param x
 * @param y
 */
function createPostit(x, y) {
	// 포스트잇 생성
	let tmpl = `<div class="post-container">
					<div class="header"></div>
					<div class="content">
						<textarea></textarea>
					</div>
				</div>`;
	let $tmpl = $(tmpl);
	let header = $tmpl.get(0).querySelector(".header");


	$tmpl.appendTo("body").css({"left": x, "top": y});
	header.addEventListener("mousedown", (event)=>{
		function moveAt(pageX, pageY) {
			header.parentElement.style.left = pageX - header.offsetWidth / 2 + 'px';
			header.parentElement.style.top = pageY - header.offsetHeight / 2 + 'px';
		}

		function onMouseMove(event) {
			moveAt(event.pageX, event.pageY);
		}

		document.addEventListener('mousemove', onMouseMove);

		header.onmouseup = function() {
			document.removeEventListener('mousemove', onMouseMove);
			header.onmouseup = null;
		};
	})

	header.addEventListener("dragstart", ()=>{return false;})
}


initialize();
