// ==UserScript==
// @name UserAgentChangeModLite.uc.js
// @namespace http://www.sephiroth-j.de/mozilla/
// @charset     utf-8
// @note  modify by lastdream2013 at 20130616 mino fix
// @note  modify by lastdream2013 at 20130409 sitelist : change SITELIST idx to Name
// @note  modify by lastdream2013 for navigator.userAgent https://g.mozest.com/thread-43428-1-2
// @include chrome://browser/content/browser.xul
// ==/UserScript==
var ucjs_UAChanger = {
	//现有版本firefox的图标
	NOW_UA_IMG: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACslBMVEUAAADt4dvu4txPTk7///z7+PdeXVx8eWH////v8PObm5vHfj7d3t7/NwDNdVz6+/uboaO5ubqwrazQ09auxcq/w8gX//+isb6tyOEZadfl1s/68u3z7+zt6un07+zo2NHx7Onk5ea1x8+DqLlnmK5omK61x8/i5OXu6une3NXM1ttrma+IqLPS2dzp6OrFdC7WonTe4Nzf3+PQjWDhdR3f1KXi4+XA1+rhp2/e2srW2ufItZjlijfh163c3+rIpX3heSfi0ZTc3+e/iWLZZh3eyIna3uiukIDKXCnZxZrX3uyXwc28Y0bY0MLDzuGxhXiwPSPPr4XZ3eKTws2ydmmpNiDOq3TW1dO0usGmuLy2jIKyVD7Kr47V1dTFyc+m0924qqW4fmq8bEzFbD/MfEfOlmPJtJvP1Nm0ub+Cw9Soub6vsLCztrmwwtGPt+QecJYNaJILZ5IMZ5Epc5Viipoeao1JanY+anoOaJIPaJIPaJFMhI+0vqLCejO/eT23aC4zY3UQZo4PZo8NZY8tc4zEw3zlbgziYwjfZw7Vaxq0dkFpcmcPYokPY4oPYooOYYiQonPt0HDgXgPbXAjbZhLmgzCnjm00aHsOXoUPX4YPX4dxinPzzFfdXgnZZBDKVhOcakEzZnYJWoIMW4IOXIIPXIIVX4GurWr6zUjbYA7UYRHCQAKAYEMfYHwlYXo9bHodYX8OWX8aXnzAr1X6yDPTVQzbaxTfYQTabRW2dDe9ejWqfEM/aXIJVX1PcmfqtC/wsB++OAnTXxPidhbfchShWypbU0ceUGgOU3cnXXGokEH1pg7cnC62MwbVYxXgeBvVfymddkV0bVOHcUbFgiTrlxXijQ+0MATOVg7dbRXjdhPkdw/kdQrnewbfihe2Ng7HRQbXXAbgaAPicQTTgyr///+qmyGdAAAAb3RSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEbTGtLARV30fT8/NB1FCm2/f2zIh7IrxFw/vxqE8TCETrs6jZT9/VOUPb0SzHm4y0LtLAKU/TzUAeO/PuLBhCJ8fCGDwZHo9jq6teiRgYGHzU1HwY6tUZ2AAAAAWJLR0QIht6VegAAARtJREFUGNMBEAHv/gAAAAABGhscHR0eGx8CAAAAAAADBCAhIiMkJSMmJygFBgAABwgpKitvcHFxcnMsLS4JCgALLzB0dXZ3eHl5ent8MTIMAA0zNH1+f4CBgoKDhIU1NggANziGh4iJiouMjY6PkJE5OgA7PJKTlJWWl5iZmZqbnD0+AD9AnZ6foKGio6SlpqeoQUIAQ0Spqqusra6vsLGys7RFRgBHSLW2t7i5uru8vb6/wElKAEtMwcLDxMXGx8jJysvMTU4ADk9Qzc7P0NHS09TV1lFSDwAQU1RV19jZ2tvc3d5WV1gRAAASWVpb3+Dh4uPkXF1eEwAAAAAUX2BhYmNkZWZnaBUAAAAAAAAWF2lqa2xtbhgZAAAAYo1oY5LAgHQAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMTEtMjlUMDk6MDI6MzYrMDg6MDBTSBdrAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTExLTI5VDA5OjAyOjM2KzA4OjAwIhWv1wAAAABJRU5ErkJggg==",
	//其他版本firefox的图标
	EXT_FX_LIST_IMG: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADgElEQVQ4jX2Te0wUdADHf3cEyEtAJCBkDqWZBWpAirIaA7kGIpOI44CTp2EQ8qrAbNSBxFJAOx/DFlM0HoEzKGVgQJTEIw3iDjjkcXV40IaMDbEk5+DTf23h1ufvz/e/70eIVfiH59nI3lYroksbK7NruzuOt2jbSnomzipLGsKjolRmq/3/4CcvkHsqK/S5Aw/4aQWmgHuAbgVO62ZJOlU/+O5HF4KfGi435X6Yk5hWaeZ9FJmqh+pzZXT1tdH99wo9D5/Q9uAJ52eWiK+5Q03jCVo/e+f6/ZFmZyGEEBNnQsyNca7G3mh72jL86FR4cSNpJ+o5aHoMzYvLlP++SPIP0wSqtdR8XYqxV8Gt08o+o7HBQow0n3fWpzotGKIsmIy0YizSknb5ZprVudS1NnBqbpnimSUyRv9E1jSH4vgZHk9EY2iRMWsoe0Ms1Cfk6Q+YMBRswa8yKzSRttx9azPTn4RSUFJKXO9fxLTPEXLtD7aV/IxbzAUGroWB/nXmh+I/FrMn9/SM7DVlUGaNJtyWsSQX5k/uIr68EZ+L0wRVG/BWdbLpUC2OMVUEpxRx92ooy0MBTF4M7hDGD7w02r3mDEXYcUtmy5eea4mOzWRrwfc8X6LBvbCfDUl1OIWUYr67GGVWOugCeNT3Cleyfe+LcYXL8ECQNcMKB77ZbsZ3L0tJOJyPfWorL6Z/xYFjlXhmX8UuoAjptnySU6Ogz5uFZnf6Pt8xInqV/pVdPqZoFY4MhlkysU/KSIIDHZne6DI3oj+6icO5x5B4F2DqkUhnuSfLLW7MV1gxV/1qhbiTlxze6CqhK9CO0SRH7qXY0h26lvLtLmT7+uC6IwPhVYRwzWX3nn08rHJk8QtbJo9I0Xyavl9cUqnW1G/dMFS1XsrtcAd0h5wwZDlTG/sS/r4KbJzD2Lh+CzkBHgwWurOgtmcy5xlq5FvQ3azwFEIIMXZOHaQ2N1m+7GbG7bB1DB90xJDuyG9p9vQn2DKcbM1M+hpm8y2ZKV7HeL5gqi2tAiEk/965KTY6vtRUsnTpWSk/vmaDVm7P6EE7JhPXMhFvgz7FhqksK/TvWTHbFFGoUqmkTzXREBu287KHU88VB0HLCxJ+CTRDt1/CuFzCWKIJNxTOj7Rn38/73yIboqJMrseFvHkzYpe6PfC5b/sTfOt6j/iVaU7IUjorlR6r/X8ACyEFfsUfVDgAAAAASUVORK5CYII=",

	UANameIdxHash: [],

	// ----- 下面设置开始 -----
	// defautl: ステータスバーの右端に表示する
	TARGET: null,
	// 定义一个target，用来调整状态栏顺序,null为空
	ADD_OTHER_FX: true,
	// true:自动添加其他版本firefox的ua  false:不添加
	//2种版本firefox，下面请勿修改
	EXT_FX_LIST: [{
		name: "Firefox4.0",
		ua: "Mozilla/5.0 (Windows; Windows NT 6.1; rv:2.0b2) Gecko/20100720 Firefox/4.0b2",
		label: "Fx4.0",
		img: ""
	}, {
		name: "Firefox3.6",
		ua: "Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8",
		label: "Fx3.6",
		img: ""
	}, ],
	// ----------------------
	// UA リストのインデックス
	def_idx: 0,
	Current_idx: 0,

	// 初期化
	init: function() {
		this.reload();
		this.mkData(); // UA データ(UA_LIST)を作る
		var menu = document.createElement("menu");
		menu.setAttribute("id", "ucjs_UserAgentChanger");
		menu.setAttribute('class', 'menu-iconic');
		menu.setAttribute("label", "UserAgentChange");
		menu.setAttribute("image", this.UA_LIST[this.def_idx].img);
		var insPos = document.getElementById('devToolsSeparator');
		insPos.parentNode.insertBefore(menu, insPos);
		this.mkPanel(); // パネルとメニューを作る
		this.setSiteIdx();
		// Observer 登録
		var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
		os.addObserver(this, "http-on-modify-request", false);
		os.addObserver(this.onDocumentCreated, "content-document-global-created", false);
		// イベント登録
		var contentArea = document.getElementById("appcontent");
		contentArea.addEventListener("load", this, true);
		contentArea.addEventListener("select", this, false);
		var contentBrowser = this.getContentBrowser();
		contentBrowser.tabContainer.addEventListener("TabClose", this, false);
		window.addEventListener("unload", this, false);
	},
	reload: function(isAlert) {
		var data = this.importUserAgentChange();
		if (!data) return this.alert('Load Error: 配置文件不存在');
		var sandbox = new Cu.Sandbox(new XPCNativeWrapper(window));
		try {
			Cu.evalInSandbox(data, sandbox, "1.8");
		} catch (e) {
			this.alert('Error: ' + e + '\n请重新检查配置文件');
			return;
		}
		this.DISPLAY_TYPE = sandbox.DISPLAY_TYPE
		this.SITE_LIST = sandbox.SITE_LIST
		this.UA_LIST = sandbox.UA_LIST;
		try{
			document.getElementById("ucjs_UserAgentChanger").removeChild(document.getElementById("uac_popup"));
			this.mkData();
			this.mkPanel();
			
		}catch(e){}
		if (isAlert) this.alert('配置已经重新载入');
	},
	alert: function(aString, aTitle) {
		Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", aTitle || "UserAgentChanger", aString, false, "", null);
	},

	userAgentChangeFile: function() {
		var aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
		aFile.appendRelativePath("Local");
		aFile.appendRelativePath("_userAgentChange.js");
		if (!aFile.exists() || !aFile.isFile()) return null;
		delete this.file;
		return this.file = aFile;
	},

	importUserAgentChange: function() {
		var file = this.userAgentChangeFile();
		var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
		var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
		fstream.init(file, -1, 0, 0);
		sstream.init(fstream);
		var data = sstream.read(sstream.available());
		try {
			data = decodeURIComponent(escape(data));
		} catch (e) {}
		sstream.close();
		fstream.close();
		return data;
	},

	edit: function() {
		var aFile = this.userAgentChangeFile();
		if (!aFile || !aFile.exists() || !aFile.isFile()) return;
		var editor;
		try {
			editor = Services.prefs.getComplexValue("view_source.editor.path", Ci.nsILocalFile);
		} catch (e) {
			this.alert("请设置编辑器的路径。\nview_source.editor.path");
			toOpenWindowByType('pref:pref', 'about:config?filter=view_source.editor.path');
			return;
		}
		var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
		UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0 ? "gbk" : "UTF-8";
		var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);

		try {
			var path = UI.ConvertFromUnicode(aFile.path);
			var args = [path];
			process.init(editor);
			process.run(false, args, args.length);
		} catch (e) {
			this.alert("编辑器不正确！")
		}
	},


	onDocumentCreated: function(aSubject, aTopic, aData) {
		var aChannel = aSubject.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIWebNavigation).QueryInterface(Ci.nsIDocShell).currentDocumentChannel;
		if (aChannel instanceof Ci.nsIHttpChannel) {
			var navigator = aSubject.navigator;
			var userAgent = aChannel.getRequestHeader("User-Agent");
			if (navigator.userAgent != userAgent) Object.defineProperty(XPCNativeWrapper.unwrap(navigator), "userAgent", {
				value: userAgent,
				enumerable: true
			});
		}
	},

	// UA データを作る
	mkData: function() {
		var ver = this.getVer(); // 現在使っている Firefox のバージョン
		// 現在使っている Firefox のデータを作る
		var tmp = [];
		tmp.name = "Firefox" + ver;
		tmp.ua = "";
		tmp.img = this.NOW_UA_IMG;
		tmp.label = "Fx" + (this.ADD_OTHER_FX ? ver : "");
		this.UA_LIST.unshift(tmp);
		// Fx のバージョンを見て UA を追加する
		if (this.ADD_OTHER_FX) {
			if (ver == 3.6) { // Fx3.6 の場合 Fx4 を追加する
				this.EXT_FX_LIST[0].img = this.EXT_FX_LIST_IMG;
				this.UA_LIST.push(this.EXT_FX_LIST[0]);
			} else { // Fx3.6 以外では Fx3.6 を追加する
				this.EXT_FX_LIST[1].img = this.EXT_FX_LIST_IMG;
				this.UA_LIST.push(this.EXT_FX_LIST[1]);
			}
		}
		// 起動時の UA を 初期化 (general.useragent.override の値が有るかチェック 07/03/02)
		var preferencesService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("");
		if (preferencesService.getPrefType("general.useragent.override") != 0) {
			for (var i = 0; i < this.UA_LIST.length; i++) {
				if (preferencesService.getCharPref("general.useragent.override") == this.UA_LIST[i].ua) {
					this.def_idx = i;
					break;
				}
			}
		}
	},
	// UA パネルを作る
	mkPanel: function() {
		// UA パネルのコンテクストメニューを作る
		var PopupMenu = document.createElement("menupopup");
		PopupMenu.setAttribute("id", "uac_popup");
		for (var i = 0; i < this.UA_LIST.length; i++) {
			if (this.UA_LIST[i].name == "分隔线") {
				var mi = document.createElement("menuseparator");
				PopupMenu.appendChild(mi);
			} else {
				var mi = document.createElement("menuitem");

				mi.setAttribute('label', this.UA_LIST[i].name);
				mi.setAttribute('tooltiptext', this.UA_LIST[i].ua);
				mi.setAttribute('oncommand', "ucjs_UAChanger.setUA(" + i + ");");

				if (this.DISPLAY_TYPE) {
					mi.setAttribute('class', 'menuitem-iconic');
					mi.setAttribute('image', this.UA_LIST[i].img);
				} else {
					mi.setAttribute("type", "radio");
					mi.setAttribute("checked", i == this.def_idx);
				}
				if (i == this.def_idx) {
					mi.setAttribute("style", 'font-weight: bold;');
					mi.style.color = 'red';
				} else {
					mi.setAttribute("style", 'font-weight: normal;');
					mi.style.color = 'black';
				}
				mi.setAttribute("uac-generated", true);
				PopupMenu.appendChild(mi);
			}
		}
		// パネルの変更を可能にする
		var mi = document.createElement("menuseparator");
		PopupMenu.appendChild(mi);
		var mi = document.createElement("menuitem");
		mi.setAttribute('id', 'ucjs_UAChangerConfig');
		mi.setAttribute('label', '重载UA配置');
		mi.setAttribute("tooltiptext", '左键重载；右键编辑');
		mi.setAttribute('oncommand', 'event.preventDefault(); ucjs_UAChanger.reload(true);');
		mi.setAttribute('onclick', 'if (event.button == 2) {event.preventDefault(); closeMenus(event.currentTarget); ucjs_UAChanger.edit(); }');
		PopupMenu.appendChild(mi);
		var menu = document.getElementById("ucjs_UserAgentChanger");
		menu.addEventListener("popupshowing", this, false);
		menu.appendChild(PopupMenu);

	},
	// URL 指定で User-Agent の書き換え(UserAgentSwitcher.uc.js より)
	observe: function(subject, topic, data) {
		if (topic != "http-on-modify-request") return;
		var http = subject.QueryInterface(Ci.nsIHttpChannel);
		for (var i = 0; i < this.SITE_LIST.length; i++) {
			if (http.URI && (new RegExp(this.SITE_LIST[i].url)).test(http.URI.spec)) {
				var idx = this.SITE_LIST[i].idx;
				http.setRequestHeader("User-Agent", this.UA_LIST[idx].ua, false);
			}
		}
	},
	// イベント・ハンドラ
	handleEvent: function(aEvent) {
		var contentBrowser = this.getContentBrowser();
		var menu = document.getElementById("ucjs_UserAgentChanger");
		var uacMenu = document.getElementById("uac_popup");
		switch (aEvent.type) {
		case "popupshowing":
			// コンテクスト・メニュー・ポップアップ時にチェック・マークを更新する
			var menu = aEvent.target;
			for (var i = 0; i < menu.childNodes.length; i++) {
				if (i == ucjs_UAChanger.Current_idx) {
					menu.childNodes[i].setAttribute("style", 'font-weight: bold;');
					menu.childNodes[i].style.color = 'red';
					if (!this.DISPLAY_TYPE) menu.childNodes[i].setAttribute("checked", true);
				} else {
					menu.childNodes[i].setAttribute("style", 'font-weight: normal;');
					menu.childNodes[i].style.color = 'black';
				}
			}
			break;
		case "load":
			// SITE_LIST に登録された URL の場合
		case "select":
		case "TabClose":
			for (var i = 0; i < ucjs_UAChanger.SITE_LIST.length; i++) {
				if ((new RegExp(this.SITE_LIST[i].url)).test(contentBrowser.currentURI.spec)) {
					var idx = this.SITE_LIST[i].idx;
					this.setImage(idx);
					return;
				}
			}
			this.setImage(this.def_idx);

			break;
		case "unload":
			// 終了処理
			var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
			os.removeObserver(this, "http-on-modify-request");
			os.removeObserver(this.onDocumentCreated, "content-document-global-created");
			var contentArea = document.getElementById("appcontent");
			contentArea.removeEventListener("load", this, true);
			contentArea.removeEventListener("select", this, false);
			if (contentBrowser) contentBrowser.tabContainer.removeEventListener("TabClose", this, false);
			uacMenu.removeEventListener("popupshowing", this, false);
			window.removeEventListener("unload", this, false);
			break;
		}
	},
	// 番号を指定して UA を設定
	setUA: function(i) {
		var preferencesService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("");
		if (i == 0) { // オリジナル UA にする場合
			// 既にオリジナル UA の場合は何もしない
			if (preferencesService.getPrefType("general.useragent.override") == 0) return;
			preferencesService.clearUserPref("general.useragent.override");
		} else { // 指定した UA にする場合
			preferencesService.setCharPref("general.useragent.override", this.UA_LIST[i].ua);
		}
		this.def_idx = i;
		this.setImage(i);
	},
	// UA パネル画像とツールチップを設定
	setImage: function(i) {
		var menu = document.getElementById("ucjs_UserAgentChanger");

		menu.setAttribute("image", this.UA_LIST[i].img);
		menu.style.padding = "0px 2px";

		this.Current_idx = i;
	},
	// アプリケーションのバージョンを取得する(Alice0775 氏のスクリプトから頂きました。)
	getVer: function() {
		var info = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULAppInfo);
		var ver = parseInt(info.version.substr(0, 3) * 10, 10) / 10;
		return ver;
	},
	setSiteIdx: function() {
		for (let i = 0; i < this.UA_LIST.length; i++) {
			this.UANameIdxHash[this.UA_LIST[i].name] = i;
		}
		for (let j = 0; j < this.SITE_LIST.length; j++) {
			var uaName = this.SITE_LIST[j].Name;
			if (this.UANameIdxHash[uaName]) {
				this.SITE_LIST[j].idx = this.UANameIdxHash[uaName];

			} else {
				this.SITE_LIST[j].idx = this.def_idx;

			}
		}
	},
	// 現在のブラウザオブジェクトを得る。
	getContentBrowser: function() {
		var windowMediator = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
		var topWindowOfType = windowMediator.getMostRecentWindow("navigator:browser");
		if (topWindowOfType) return topWindowOfType.document.getElementById("content");
		return null;
	}
}
ucjs_UAChanger.init();