var app = app || {};

(function(){

	function ContactDaoHandler(entityName){
		ContactDaoHandler._super.constructor.call(this,entityName);
	}
	brite.inherit(ContactDaoHandler,RemoteDaoHandler);


	ContactDaoHandler.prototype.getGroupsName = function(params,opts){
		params = params  || {};
		params.opts = opts;
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


	app.groupDao = brite.registerDao(new ContactDaoHandler("Group"));
})();