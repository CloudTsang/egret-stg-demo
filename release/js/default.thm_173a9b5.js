window.skins=window.skins||{};
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"};generateEUI.paths['resource/eui_skins/BtnBullet.exml'] = window.skins.BtnBullet = (function (_super) {
	__extends(BtnBullet, _super);
	function BtnBullet() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 200;
		this.width = 200;
		this.elementsContent = [];
		this._Rect1_i();
		
		this._Rect2_i();
		
		this._Image1_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Rect1","",0,""),
					new eui.AddItems("_Image1","",1,"")
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Rect2","",1,""),
					new eui.AddItems("_Image1","",1,"")
				])
		];
	}
	var _proto = BtnBullet.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.ellipseHeight = 200;
		t.ellipseWidth = 200;
		t.fillAlpha = 0.3;
		t.fillColor = 0xAEABAB;
		t.height = 200;
		t.width = 200;
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		this._Rect2 = t;
		t.ellipseHeight = 200;
		t.ellipseWidth = 200;
		t.fillAlpha = 0.8;
		t.fillColor = 0x515050;
		t.height = 200;
		t.width = 200;
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.height = 175;
		t.source = "sheet_json#btn_bullet";
		t.width = 74;
		t.x = 62;
		t.y = 11;
		return t;
	};
	return BtnBullet;
})(eui.Skin);generateEUI.paths['resource/eui_skins/BtnJet.exml'] = window.skins.BtnJet = (function (_super) {
	__extends(BtnJet, _super);
	function BtnJet() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 100;
		this.width = 100;
		this.elementsContent = [];
		this._Rect1_i();
		
		this._Rect2_i();
		
		this._Image1_i();
		
		this.states = [
			new eui.State ("up",
				[
					new eui.AddItems("_Rect1","",0,""),
					new eui.AddItems("_Image1","",1,""),
					new eui.SetProperty("_Image1","width",165),
					new eui.SetProperty("_Image1","height",96),
					new eui.SetProperty("_Image1","x",14),
					new eui.SetProperty("_Image1","y",53),
					new eui.SetProperty("","width",200),
					new eui.SetProperty("","height",200)
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Rect2","",1,""),
					new eui.AddItems("_Image1","",1,""),
					new eui.SetProperty("_Image1","x",14),
					new eui.SetProperty("_Image1","y",53),
					new eui.SetProperty("_Image1","width",165),
					new eui.SetProperty("_Image1","height",96),
					new eui.SetProperty("","width",200),
					new eui.SetProperty("","height",200)
				])
		];
	}
	var _proto = BtnJet.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.ellipseHeight = 200;
		t.ellipseWidth = 200;
		t.fillAlpha = 0.2;
		t.fillColor = 0xAEABAB;
		t.height = 200;
		t.width = 200;
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		this._Rect2 = t;
		t.ellipseHeight = 200;
		t.ellipseWidth = 200;
		t.fillAlpha = 0.8;
		t.fillColor = 0x515050;
		t.height = 200;
		t.width = 200;
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.height = 57;
		t.source = "sheet_json#btnjet";
		t.width = 90;
		t.x = 3;
		t.y = 24;
		return t;
	};
	return BtnJet;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 50;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ControlPanel.exml'] = window.skins.ControlPanel = (function (_super) {
	__extends(ControlPanel, _super);
	function ControlPanel() {
		_super.call(this);
		this.skinParts = ["btn_jet","btn_shot","leftup","up","rightup","left","right","leftdown","down","rightdown","analog"];
		
		this.height = 400;
		this.width = 800;
		this.elementsContent = [this.btn_jet_i(),this.btn_shot_i(),this.analog_i()];
	}
	var _proto = ControlPanel.prototype;

	_proto.btn_jet_i = function () {
		var t = new eui.Button();
		this.btn_jet = t;
		t.label = "Button";
		t.skinName = "skins.BtnJet";
		t.x = 601;
		t.y = -26;
		return t;
	};
	_proto.btn_shot_i = function () {
		var t = new eui.Button();
		this.btn_shot = t;
		t.label = "Button";
		t.skinName = "skins.BtnBullet";
		t.x = 601;
		t.y = 203;
		return t;
	};
	_proto.analog_i = function () {
		var t = new eui.Group();
		this.analog = t;
		t.anchorOffsetX = 200;
		t.anchorOffsetY = 200;
		t.height = 400;
		t.width = 400;
		t.x = 200;
		t.y = 200;
		t.elementsContent = [this._Rect1_i(),this._Group4_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 100;
		t.ellipseHeight = 200;
		t.ellipseWidth = 200;
		t.fillAlpha = 0;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.strokeColor = 0x2B2828;
		t.strokeWeight = 8;
		t.width = 200;
		t.x = 200;
		t.y = 200;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.height = 400;
		t.width = 400;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this._Group3_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 133;
		t.width = 400;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.leftup_i(),this.up_i(),this.rightup_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto.leftup_i = function () {
		var t = new eui.Rect();
		this.leftup = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.width = 133;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.up_i = function () {
		var t = new eui.Rect();
		this.up = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.width = 133;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.rightup_i = function () {
		var t = new eui.Rect();
		this.rightup = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.width = 133;
		t.x = 20;
		t.y = 20;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 133;
		t.width = 400;
		t.x = 10;
		t.y = 10;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.left_i(),this._Rect2_i(),this.right_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto.left_i = function () {
		var t = new eui.Rect();
		this.left = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 133;
		t.x = 0;
		t.y = 133;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0;
		t.height = 133;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 133;
		t.x = 10;
		t.y = 143;
		return t;
	};
	_proto.right_i = function () {
		var t = new eui.Rect();
		this.right = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 133;
		t.x = 20;
		t.y = 153;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.height = 133;
		t.width = 400;
		t.x = 20;
		t.y = 20;
		t.layout = this._HorizontalLayout3_i();
		t.elementsContent = [this.leftdown_i(),this.down_i(),this.rightdown_i()];
		return t;
	};
	_proto._HorizontalLayout3_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto.leftdown_i = function () {
		var t = new eui.Rect();
		this.leftdown = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 133;
		t.x = 0;
		t.y = 133;
		return t;
	};
	_proto.down_i = function () {
		var t = new eui.Rect();
		this.down = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 133;
		t.x = 10;
		t.y = 143;
		return t;
	};
	_proto.rightdown_i = function () {
		var t = new eui.Rect();
		this.rightdown = t;
		t.fillAlpha = 0;
		t.height = 133;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 133;
		t.x = 20;
		t.y = 153;
		return t;
	};
	return ControlPanel;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Description.1.exml'] = window.DescriptionMobile = (function (_super) {
	__extends(DescriptionMobile, _super);
	function DescriptionMobile() {
		_super.call(this);
		this.skinParts = ["decript_group"];
		
		this.height = 800;
		this.width = 600;
		this.elementsContent = [this.decript_group_i()];
	}
	var _proto = DescriptionMobile.prototype;

	_proto.decript_group_i = function () {
		var t = new eui.Group();
		this.decript_group = t;
		t.height = 800;
		t.width = 600;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this._Label1_i(),this._Group1_i(),this._Group2_i(),this._Rect2_i(),this._Image4_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.4;
		t.height = 800;
		t.width = 600;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 50;
		t.text = "：移动\n：射击\n：喷射";
		t.x = 257.332;
		t.y = 82.599;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 150.125;
		t.width = 348.321;
		t.x = 45;
		t.y = 559.3;
		t.elementsContent = [this._Image1_i(),this._Label2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 80;
		t.source = "sheet_json#drift";
		t.width = 80;
		t.x = 216.3;
		t.y = 5.663;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.size = 50;
		t.text = "射击击破        漂流物，\n会变成强化道具，\n拾取后获得各种效果。";
		t.x = -1;
		t.y = 40.063;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 137.058;
		t.width = 342.509;
		t.x = 22.812;
		t.y = 204.039;
		t.elementsContent = [this._Image2_i(),this._Label3_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 80;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "sheet_json#jet";
		t.width = 80;
		t.x = 312.831;
		t.y = 122.69;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.height = 206.584;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 50;
		t.text = "喷射消耗一格       喷射槽，随时间经过回复。";
		t.width = 528.503;
		t.x = 13.085;
		t.y = 157.336;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 40;
		t.source = "sheet_json#btnjet";
		t.width = 50;
		t.x = 178.272;
		t.y = -20;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.fillAlpha = 0;
		t.height = 50;
		t.strokeColor = 0x000000;
		t.strokeWeight = 4;
		t.width = 50;
		t.x = 205.244;
		t.y = 73.216;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 50;
		t.source = "sheet_json#btn_bullet";
		t.width = 20;
		t.x = 220.112;
		t.y = 125.942;
		return t;
	};
	return DescriptionMobile;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Description.exml'] = window.Description = (function (_super) {
	__extends(Description, _super);
	function Description() {
		_super.call(this);
		this.skinParts = ["decript_group"];
		
		this.height = 800;
		this.width = 600;
		this.elementsContent = [this.decript_group_i()];
	}
	var _proto = Description.prototype;

	_proto.decript_group_i = function () {
		var t = new eui.Group();
		this.decript_group = t;
		t.height = 800;
		t.width = 600;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Rect1_i(),this._Label1_i(),this._Group1_i(),this._Group2_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.4;
		t.height = 800;
		t.width = 600;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 50;
		t.text = "十字键：移动\nZ：射击\nX：喷射";
		t.x = 141.252;
		t.y = 84.502;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 150.125;
		t.width = 348.321;
		t.x = 45;
		t.y = 559.3;
		t.elementsContent = [this._Image1_i(),this._Label2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 80;
		t.source = "sheet_json#drift";
		t.width = 80;
		t.x = 216.3;
		t.y = 5.663;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.size = 50;
		t.text = "射击击破        漂流物，\n会变成强化道具，\n拾取后获得各种效果。";
		t.x = -1;
		t.y = 40.063;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 137.058;
		t.width = 342.509;
		t.x = 22.812;
		t.y = 204.039;
		t.elementsContent = [this._Image2_i(),this._Label3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 80;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "sheet_json#jet";
		t.width = 80;
		t.x = 312.831;
		t.y = 122.69;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.height = 206.584;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 50;
		t.text = "喷射消耗一格       喷射槽，随时间经过回复。";
		t.width = 528.503;
		t.x = 13.085;
		t.y = 157.336;
		return t;
	};
	return Description;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameResult.exml'] = window.skins.GameResult = (function (_super) {
	__extends(GameResult, _super);
	function GameResult() {
		_super.call(this);
		this.skinParts = ["txt_type","txt_hit_type","txt_time","txt_bullet","txt_hit","btn_retry"];
		
		this.height = 800;
		this.width = 600;
		this.elementsContent = [this._Rect1_i(),this.txt_type_i(),this._Group1_i(),this.btn_retry_i()];
	}
	var _proto = GameResult.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.5;
		t.height = 800;
		t.width = 600;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.txt_type_i = function () {
		var t = new eui.Label();
		this.txt_type = t;
		t.size = 80;
		t.text = "Stage Clear";
		t.width = 425.438;
		t.x = 87.281;
		t.y = 62.336;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 465;
		t.width = 600;
		t.x = 0;
		t.y = 177.76;
		t.elementsContent = [this._Label1_i(),this._Label2_i(),this.txt_hit_type_i(),this.txt_time_i(),this.txt_bullet_i(),this.txt_hit_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.text = "通关时长：";
		t.x = 60;
		t.y = 89;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.text = "消耗弹药：";
		t.x = 60;
		t.y = 192.24;
		return t;
	};
	_proto.txt_hit_type_i = function () {
		var t = new eui.Label();
		this.txt_hit_type = t;
		t.text = "被击中次数：";
		t.x = 55.055;
		t.y = 291;
		return t;
	};
	_proto.txt_time_i = function () {
		var t = new eui.Label();
		this.txt_time = t;
		t.x = 241.659;
		t.y = 89;
		return t;
	};
	_proto.txt_bullet_i = function () {
		var t = new eui.Label();
		this.txt_bullet = t;
		t.x = 241.659;
		t.y = 192.24;
		return t;
	};
	_proto.txt_hit_i = function () {
		var t = new eui.Label();
		this.txt_hit = t;
		t.x = 241.659;
		t.y = 291;
		return t;
	};
	_proto.btn_retry_i = function () {
		var t = new eui.Button();
		this.btn_retry = t;
		t.height = 66.683;
		t.label = "再玩";
		t.width = 170.902;
		t.x = 219.323;
		t.y = 696.659;
		return t;
	};
	return GameResult;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);