

var wsUri = "ws://" + document.location.host + "/"+document.location.pathname.split("/")[1]+"/notificationendpoint";
var websocket = new WebSocket(wsUri);


websocket.onmessage = function (evt) {
    onMessageSoc(evt);
};

function send_notification(json_text) {
    websocket.send(json_text);
}

function onMessageSoc(evt) {
    var json_text = JSON.parse(evt.data);
    var form = json_text.form;
    switch (form) {
        case "newPatient":
            set_pat_Text(json_text);
            break;
        case "logout":
            sendLogoutDet(json_text);
            break;
        case "close":
            onCloseSoc(evt);
            break;
        case "deptChanged":
            deptChanged(json_text);
            break;
        case "message_clients":
            receiveMessageForClients(json_text);
            break;
        case "chatMessage_receiveMessage":
        	receiveChatMessage(json_text);
            break;
        case "chatMessage_broadcastMe":
        	sendIncomingUserDetails(json_text);
            break;
        case "chatMessage_removeMe":
        	sendRemovingUserDetails(json_text);
            break;
        case "logOUtAll":
        	window.location.href = 'Logout';
            break;
        case "reloadAll":
        	console.log("reloading...");
        	location.reload(true);
            break;
    }
}

websocket.onerror = function (evt) {
    onErrorSoc(evt);
};

function onErrorSoc(evt) {
    console.log("WebSocket Error 1 : " + evt.data);
    console.log("WebSocket Error 2 : " + evt);
}

//websocket.onclose = function(evt){
////    onCloseSoc(evt);
//};

function onCloseSoc() {
    window.location.href = 'index.html';
}

//**********************************************************************************************\\


var emp = "";
$(document).ready(function () {
    emp = localStorage.getItem("emp_id");
});

function get_pat_reg_N(json_pat_reg_N) {
    send_notification(json_pat_reg_N);
}

function set_pat_Text(json_text) {
    var emp_get_id = json_text.text_emp_N;
    if (emp === emp_get_id) {
        notify(json_text);
    }
}

function getLogoutDet(json_logout) {
    send_notification(json_logout);
}

function sendLogoutDet(json_text) {
    var emp_get_id = json_text.emp_id;
    if (emp === emp_get_id) {
    	if(localStorage.getItem("SESSION_ID")==null || localStorage.getItem("SESSION_ID")==json_text.session_id){
    		window.location.href = 'index.html';
    	} else if(localStorage.getItem("SESSION_ID")!=null){
    		window.location.href = 'Logout';
    	} else if(localStorage.getItem("SESSION_ID")==null && localStorage.getItem("SESSION_ID")!=json_text.session_id){
    		window.location.href = 'index.html';
    	}
    }
}

function getDeptChanged(json_dept_changed) {
    send_notification(json_dept_changed);
}

function deptChanged(json_text) {
    var thisModule = $('#departmentlink').attr('module');
    var thisDept = $('#departmentlink').text();
    var session_id = localStorage.getItem("SESSION_ID");
    if (emp === json_text.emp_id && thisModule == json_text.module && thisDept != json_text.dept && session_id == json_text.session_id) {
        window.location.href = 'Home';
    }
}

function sendMessageToClients(message_data) {
    send_notification(message_data);
}

function receiveMessageForClients(message_data) {
    addPopUp(message_data);
}

function sendChatMessage(message_data) {
    send_notification(message_data);
}

function receiveChatMessage(message_data) {
	if($(document).find('.contacts-list').html() !== undefined){
		getChat(message_data);
	}
}

function broadcastMe(broadcastDetails){
	send_notification(broadcastDetails);
}

function removeMe(removeDetails){
	send_notification(removeDetails);
}

function sendIncomingUserDetails(message_data) {
	if($(document).find('.contacts-list').html() !== undefined || $(document).find('.contacts-list-online').html() !== undefined){
		getIncomingUserDetails(message_data.userId);
	}
}
function sendRemovingUserDetails(message_data) {
	if($(document).find('.contacts-list').html() !== undefined || $(document).find('.contacts-list-online').html() !== undefined){
		removingUserDetails(message_data.userId);
	}
}
