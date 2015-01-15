var app = app || {};

(function(){

	function ContactDaoHandler(entityName){
		ContactDaoHandler._super.constructor.call(this,entityName);
	}
	brite.inherit(ContactDaoHandler,RemoteDaoHandler);


	ContactDaoHandler.prototype.getGroupsName = function(params){
		params = params  || {};
		var resultDfd = $.Deferred();
		var ajax = $.ajax(this._opts.contextPath + "getGroupsName",{
			dataType: "json",
			data: params,
			type: "GET"
		});

		ajax.done(function(data){
			resultDfd.resolve(data.result);
		});

		ajax.fail(function(ex){
			resultDfd.fail(ex);
		});

		return resultDfd.promise();
	};

	ContactDaoHandler.prototype.list = function(params){
		params = params  || {};
		var resultDfd = $.Deferred();
		var ajax = $.ajax(this._opts.contextPath + "list",{
			dataType: "json",
			data: params,
			type: "GET"
		});

		ajax.done(function(data){
			resultDfd.resolve(data.result);
		});

		ajax.fail(function(ex){
			resultDfd.fail(ex);
		});

		return resultDfd.promise();
	};


	app.contactDao = brite.registerDao(new ContactDaoHandler("Contact"));
})();